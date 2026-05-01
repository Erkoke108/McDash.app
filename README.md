# McDash.app 🚀
### Premium Standalone Minecraft Dashboard v1.0

McDash.app is a professional, high-performance administrative dashboard for Minecraft servers. Unlike traditional plugins or mods, McDash.app runs as a **standalone** service, communicating with your server via RCON and real-time log analysis.

![Dashboard Preview](https://raw.githubusercontent.com/Erkoke108/McDash.app/main/preview.png)

## 🌟 Why McDash.app?

Most dashboard solutions are implemented as Minecraft plugins (Bukkit/Spigot) or mods (Forge/Fabric). This has several drawbacks:
- **Dependency:** If the server crashes, the dashboard goes down.
- **Performance:** They consume valuable server ticks (TPS), causing lag.
- **Incompatibility:** You need different versions for different modpacks.

**McDash.app solves this by being Standalone:**
- ✅ **Zero TPS Impact:** Does not run inside the Minecraft JVM loop.
- ✅ **Universal Compatibility:** Works with Vanilla, Forge, NeoForge, Fabric, Quilt, BungeeCord, and Velocity.
- ✅ **Resilience:** Monitor your server even when it's starting, stopping, or crashing.
- ✅ **Real-time:** Uses WebSockets for a lag-free live console.

## ✨ Key Features

- **💻 Live Console:** Real-time terminal with RCON command execution.
- **👥 Player Management:** Monitor health, hunger, dimension, and playtime. Perform actions (Kick, Ban, OP) in bulk.
- **📁 Advanced File Manager:** Upload, download, and manage server files with security traversal protection.
- **📊 Performance Metrics:** High-fidelity charts for CPU, RAM, and Disk usage.
- **📦 Backup System:** Integrated support for FTB Backups 3 or custom backup scripts.
- **🌍 Multi-language:** Support for English, Spanish, French, German, and Portuguese.
- **🔐 Security:** Protected by Basic Auth and Global CSRF Handshake headers.

## 🛠️ Installation & Setup

### Prerequisites
- Java 17 or higher
- Maven
- RCON enabled in your `server.properties`

### 1. Clone the repository
```bash
git clone https://github.com/Erkoke108/McDash.app.git
cd McDash.app
```

### 2. Configure
Edit `config.properties` with your server details:
```properties
# Minecraft Server Path
minecraft.path=../server/
# RCON Config
rcon.host=127.0.0.1
rcon.port=25575
rcon.password=your_secret_password
```

### 3. Build & Run
```bash
chmod +x setup.sh
./setup.sh

# Start with PM2 (Recommended)
pm2 start java --name McDash.app -- -jar target/mcdash-standalone-1.0.jar
```

## 🔒 Security Notice
The dashboard is protected by a mandatory login. The default credentials are:
- **User:** `rufuls`
- **Pass:** `C001D2061371E`
*It is highly recommended to change these in `config.properties` before public deployment.*

---
Developed with ❤️ by [Erkoke](https://github.com/Erkoke108)
