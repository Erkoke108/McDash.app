package de.erkoke.mcdash

import io.ktor.serialization.jackson.*
import io.ktor.server.application.*
import io.ktor.server.engine.*
import io.ktor.server.netty.*
import io.ktor.server.plugins.contentnegotiation.*
import io.ktor.server.http.content.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import io.ktor.server.websocket.*
import io.ktor.server.auth.*
import io.ktor.websocket.*
import kotlinx.coroutines.*
import kotlinx.coroutines.channels.ClosedReceiveChannelException
import java.io.File
import java.io.FileInputStream
import java.io.RandomAccessFile
import java.util.*
import java.util.concurrent.ConcurrentHashMap
import org.slf4j.LoggerFactory
import oshi.SystemInfo
import nl.vv32.rcon.Rcon

private val logger = LoggerFactory.getLogger("McDash.app")

fun main() {
    val props = Properties()
    val configFile = File("config.properties")
    if (configFile.exists()) {
        FileInputStream(configFile).use { props.load(it) }
    }

    val port = props.getProperty("server.port", "7867").toInt()
    val host = props.getProperty("server.host", "0.0.0.0")

    embeddedServer(Netty, port = port, host = host) {
        module(props)
    }.start(wait = true)
}

fun Application.module(props: Properties) {
    install(ContentNegotiation) {
        jackson()
    }
    install(WebSockets)
    
    val authUser = props.getProperty("auth.user", "rufuls")
    val authPass = props.getProperty("auth.pass", "C001D2061371E")

    install(Authentication) {
        basic("auth-basic") {
            realm = "McDash.app Admin Panel"
            validate { credentials ->
                if (credentials.name == authUser && credentials.password == authPass) {
                    UserIdPrincipal(credentials.name)
                } else {
                    null
                }
            }
        }
    }

    // Configurable Paths
    val mcPath = props.getProperty("minecraft.path", "../")
    val serverRoot = File(mcPath).canonicalFile
    val logFile = File(serverRoot, "logs/latest.log")
    
    // RCON Config
    val rconHost = props.getProperty("rcon.host", "127.0.0.1")
    val rconPort = props.getProperty("rcon.port", "25575").toInt()
    val rconPassword = props.getProperty("rcon.password", "your_rcon_password")

    // Backup Config
    val backupDirName = props.getProperty("backup.dir.name", "backups")
    val backupCommand = props.getProperty("backup.command", "save-all")

    val connections = ConcurrentHashMap.newKeySet<DefaultWebSocketSession>()
    val si = SystemInfo()
    var prevTicks = si.hardware.processor.systemCpuLoadTicks
    
    // Player Session Tracking
    val playerJoinTimes = ConcurrentHashMap<String, Long>()
    val playerIpCache = ConcurrentHashMap<String, String>()
    val playerUuidCache = ConcurrentHashMap<String, String>()

    // Initialize UUID cache from usercache.json
    fun refreshUuidCache() {
        val cacheFile = File(serverRoot, "usercache.json")
        if (cacheFile.exists()) {
            try {
                val json = com.fasterxml.jackson.module.kotlin.jacksonObjectMapper().readTree(cacheFile)
                json.forEach { node ->
                    val name = node.get("name")?.asText()
                    val uuid = node.get("uuid")?.asText()
                    if (name != null && uuid != null) playerUuidCache[name] = uuid
                }
            } catch (e: Exception) { logger.error("Failed to parse usercache.json: ${e.message}") }
        }
    }

    // Initialize IP and JoinTime cache from logs
    fun refreshLogCaches() {
        if (logFile.exists()) {
            try {
                val sdf = java.text.SimpleDateFormat("[ddMMMyyyy HH:mm:ss.SSS]", java.util.Locale.ENGLISH)
                logFile.useLines { lines ->
                    lines.forEach { line ->
                        if (line.contains("logged in with entity id")) {
                            try {
                                val timeStr = line.substringBefore("]") + "]"
                                val date = sdf.parse(timeStr)
                                
                                val msgPart = line.substringAfterLast("]: ")
                                val namePart = msgPart.substringBefore("[/")
                                val ipPart = msgPart.substringAfter("[/").substringBefore(":")
                                
                                if (namePart.isNotEmpty()) {
                                    playerJoinTimes[namePart] = date.time
                                    if (ipPart.isNotEmpty()) playerIpCache[namePart] = ipPart
                                }
                            } catch (e: Exception) {}
                        }
                    }
                }
            } catch (e: Exception) { logger.error("Failed to parse logs: ${e.message}") }
        }
    }

    refreshUuidCache()
    refreshLogCaches()

    // RCON Helper
    fun sendRconCommand(command: String): String {
        return try {
            val rcon = Rcon.open(rconHost, rconPort)
            rcon.authenticate(rconPassword)
            val response = rcon.sendCommand(command)
            rcon.close()
            response
        } catch (e: Exception) {
            "Error: ${e.message}"
        }
    }

    // Log Tailing Job
    launch(Dispatchers.IO) {
        var lastKnownPosition = 0L
        if (logFile.exists()) {
            lastKnownPosition = logFile.length()
        }

        while (isActive) {
            if (logFile.exists()) {
                val currentLength = logFile.length()
                if (currentLength > lastKnownPosition) {
                    RandomAccessFile(logFile, "r").use { reader ->
                        reader.seek(lastKnownPosition)
                        var line: String?
                        while (reader.readLine().also { line = it } != null) {
                            val msg = line ?: ""
                            if (msg.contains("RCON Client") || msg.contains("RCON Listener")) continue
                            
                            connections.forEach { session ->
                                launch { 
                                    try { session.send(Frame.Text(msg)) } catch (ignored: Exception) {}
                                }
                            }
                        }
                        lastKnownPosition = reader.filePointer
                    }
                } else if (currentLength < lastKnownPosition) {
                    lastKnownPosition = 0L
                }
            }
            delay(500)
        }
    }

    routing {
        get("/admpanel") { call.respondRedirect("/admpanel/index.html") }
        get("/admpanel/") { call.respondRedirect("/admpanel/index.html") }

        authenticate("auth-basic") {
            staticResources("/admpanel", "static")

            route("/admpanel/api") {
                intercept(io.ktor.server.application.ApplicationCallPipeline.Plugins) {
                    if (call.request.local.method == io.ktor.http.HttpMethod.Post) {
                        if (call.request.headers["X-Requested-With"] != "MCDash") {
                            call.respond(io.ktor.http.HttpStatusCode.Forbidden, "CSRF Security Violation")
                            return@intercept finish()
                        }
                    }
                }

                get("/health") {
                    call.respondText("McDash.app API is running", io.ktor.http.ContentType.Text.Plain)
                }

                post("/console") {
                    val command = (call.parameters["command"] ?: "").trim()
                    if (command.isEmpty()) return@post call.respond(mapOf("error" to "No command provided"))
                    if (command.contains("\n") || command.contains("\r")) {
                        return@post call.respond(mapOf("error" to "Invalid command format"))
                    }
                    val response = sendRconCommand(command)
                    call.respond(mapOf("response" to response))
                }

                get("/metrics") {
                    val cpu = si.hardware.processor
                    val memory = si.hardware.memory
                    val file = serverRoot
                    val cpuLoad = cpu.getSystemCpuLoadBetweenTicks(prevTicks)
                    prevTicks = cpu.systemCpuLoadTicks

                    call.respond(mapOf(
                        "cpu_load" to (cpuLoad * 100),
                        "cpu_cores" to cpu.logicalProcessorCount,
                        "ram_used" to (memory.total - memory.available) / (1024 * 1024),
                        "ram_total" to memory.total / (1024 * 1024),
                        "disk_used" to (file.totalSpace - file.freeSpace) / (1024 * 1024 * 1024),
                        "disk_total" to file.totalSpace / (1024 * 1024 * 1024),
                        "tps" to 20.0
                    ))
                }

                get("/files") {
                    val path = call.parameters["path"] ?: ""
                    val targetDir = File(serverRoot, path).canonicalFile
                    if (!targetDir.path.startsWith(serverRoot.canonicalPath)) {
                        return@get call.respond(io.ktor.http.HttpStatusCode.Forbidden, mapOf("error" to "Access Denied"))
                    }
                    if (!targetDir.exists() || !targetDir.isDirectory) {
                        return@get call.respond(mapOf("error" to "Invalid path"))
                    }
                    val files = targetDir.listFiles()?.map { 
                        mapOf("name" to it.name, "isDir" to it.isDirectory, "size" to it.length(), "modified" to it.lastModified())
                    } ?: emptyList<Any>()
                    call.respond(files)
                }

                get("/worlds") {
                    val worlds = listOf(
                        mapOf("id" to "minecraft:overworld", "name" to "Overworld", "icon" to "🌳"),
                        mapOf("id" to "minecraft:the_nether", "name" to "Nether", "icon" to "🔥"),
                        mapOf("id" to "minecraft:the_end", "name" to "The End", "icon" to "🌌")
                    )
                    call.respond(worlds)
                }

                get("/players") {
                    refreshLogCaches()
                    val response = sendRconCommand("list")
                    val playersPart = response.substringAfter("online:").trim()
                    val names = if (playersPart.isEmpty()) emptyList<String>() else playersPart.split(", ")
                    val players = names.map { name ->
                        val joinTime = playerJoinTimes[name] ?: System.currentTimeMillis()
                        val playtimeMs = System.currentTimeMillis() - joinTime
                        val seconds = (playtimeMs / 1000) % 60
                        val minutes = (playtimeMs / (1000 * 60)) % 60
                        val hours = (playtimeMs / (1000 * 60 * 60))
                        val playtimeStr = String.format("%02d:%02d:%02d", hours, minutes, seconds)

                        val healthResponse = sendRconCommand("data get entity $name Health")
                        val healthStr = healthResponse.substringAfter("data: ").substringBefore("f").trim()
                        val foodResponse = sendRconCommand("data get entity $name foodLevel")
                        val foodStr = foodResponse.substringAfter("data: ").trim()
                        val dimResponse = sendRconCommand("data get entity $name Dimension")
                        val dimStr = dimResponse.substringAfter("data: \"").substringBefore("\"").trim()
                        val gmResponse = sendRconCommand("gamemode query $name")
                        val gm = if (gmResponse.contains("survival", ignoreCase = true)) "Survival"
                                 else if (gmResponse.contains("creative", ignoreCase = true)) "Creative"
                                 else if (gmResponse.contains("adventure", ignoreCase = true)) "Adventure"
                                 else if (gmResponse.contains("spectator", ignoreCase = true)) "Spectator"
                                 else "Survival"

                        mapOf(
                            "name" to name,
                            "uuid" to (playerUuidCache[name] ?: "N/A"),
                            "ip" to (playerIpCache[name] ?: "Hidden"),
                            "joinTime" to joinTime,
                            "playtime" to playtimeStr,
                            "health" to (healthStr.toDoubleOrNull() ?: 20.0),
                            "hunger" to (foodStr.toIntOrNull() ?: 20),
                            "world" to dimStr.substringAfterLast(":").replaceFirstChar { it.uppercase() },
                            "gamemode" to gm
                        )
                    }
                    playerJoinTimes.keys.retainAll(names.toSet())
                    call.respond(players)
                }

                post("/players/action") {
                    val player = call.parameters["player"] ?: return@post call.respond(mapOf("error" to "No player"))
                    val action = call.parameters["action"] ?: return@post call.respond(mapOf("error" to "No action"))
                    val command = when(action) {
                        "kick" -> "kick $player"
                        "ban" -> "ban $player"
                        "op" -> "op $player"
                        "deop" -> "deop $player"
                        else -> ""
                    }
                    if (command.isEmpty()) return@post call.respond(mapOf("error" to "Invalid action"))
                    call.respond(mapOf("response" to sendRconCommand(command)))
                }

                get("/mods") {
                    val modsDir = File(serverRoot, "mods")
                    val mods = modsDir.listFiles { _, name -> name.endsWith(".jar") }?.map {
                        mapOf("name" to it.name, "size" to it.length())
                    } ?: emptyList<Any>()
                    call.respond(mods)
                }

                get("/backups") {
                    val backupDir = File(serverRoot, backupDirName).canonicalFile
                    if (!backupDir.path.startsWith(serverRoot.canonicalPath)) {
                        return@get call.respond(io.ktor.http.HttpStatusCode.Forbidden, mapOf("error" to "Access Denied"))
                    }
                    if (!backupDir.exists()) return@get call.respond(emptyList<Any>())
                    val backups = backupDir.listFiles { _, name -> name.endsWith(".zip") }?.map {
                        mapOf("name" to it.name, "size" to it.length(), "modified" to it.lastModified())
                    }?.sortedByDescending { it["modified"] as Long } ?: emptyList<Any>()
                    call.respond(backups)
                }

                post("/backups/create") {
                    call.respond(mapOf("response" to sendRconCommand(backupCommand)))
                }

                webSocket("/ws/console") {
                    connections.add(this)
                    try {
                        for (frame in incoming) {
                            if (frame is Frame.Text) {
                                send(Frame.Text("[RCON Response] ${sendRconCommand(frame.readText())}"))
                            }
                        }
                    } catch (e: ClosedReceiveChannelException) {
                    } catch (e: Exception) {
                        logger.error("WebSocket error", e)
                    } finally {
                        connections.remove(this)
                    }
                }
            }
        }
    }
}
