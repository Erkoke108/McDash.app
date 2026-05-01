document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links li');
    const terminal = document.getElementById('terminal-output');
    const consoleInput = document.getElementById('console-input');

    // Internationalization (i18n)
    const translations = {
        'es': {
            'nav-console': 'Consola',
            'nav-players': 'Jugadores',
            'nav-files': 'Archivos',
            'nav-worlds': 'Mundos',
            'nav-plugins': 'Plugins',
            'nav-backups': 'Backups',
            'nav-performance': 'Rendimiento',
            'nav-settings': 'Ajustes',
            'status-online': 'Servidor Online',
            'console-title': 'Consola en Vivo',
            'btn-clear': 'Limpiar',
            'players-title': 'Jugadores Conectados',
            'worlds-title': 'Mundos del Servidor',
            'btn-create-world': '+ CREAR MUNDO',
            'stat-players': 'Jugadores',
            'stat-time': 'Hora',
            'stat-weather': 'Clima',
            'stat-difficulty': 'Dificultad',
            'btn-weather': 'CLIMA',
            'btn-time': 'TIEMPO',
            'btn-difficulty': 'DIFICULTAD',
            'files-title': 'Gestor de Archivos',
            'plugins-title': 'Plugins Instalados',
            'table-username': 'Nombre de Usuario',
            'table-player-id': 'ID del Jugador',
            'table-current-world': 'Mundo Actual',
            'table-ip': 'Dirección IP',
            'table-health': 'Vida',
            'table-hunger': 'Hambre',
            'table-gamemode': 'Modo de Juego',
            'table-playtime': 'Tiempo de Juego',
            'table-filename': 'Nombre del Archivo',
            'chart-cpu': 'Uso de CPU (%)',
            'chart-ram': 'Uso de RAM (GB)',
            'table-size': 'Tamaño',
            'table-status': 'Estado',
            'backups-title': 'Copias de Seguridad',
            'btn-create-backup': 'Crear Backup Ahora',
            'metrics-cpu': 'Uso de CPU',
            'metrics-ram': 'Uso de Memoria RAM',
            'settings-title': 'Ajustes del Panel',
            'settings-desc': 'Aquí puedes gestionar el estado del dashboard y del servidor Minecraft.',
            'btn-stop': 'Detener Servidor',
            'btn-restart': 'Reiniciar Dashboard',
            'overview-title': 'Vista General Rápida',
            'stat-cpu-cores': 'Núcleos-CPU',
            'stat-disk': 'Disco',
            'control-title': 'Control Rápido',
            'btn-shutdown': 'APAGAR',
            'btn-reload': 'REINICIAR'
        },
        'en': {
            'nav-console': 'Console',
            'nav-players': 'Players',
            'nav-files': 'Files',
            'nav-worlds': 'Worlds',
            'nav-plugins': 'Plugins',
            'nav-backups': 'Backups',
            'nav-performance': 'Performance',
            'nav-settings': 'Settings',
            'status-online': 'Backend Online',
            'console-title': 'Live Console',
            'btn-clear': 'Clear',
            'players-title': 'Online Players',
            'worlds-title': 'Server Worlds',
            'btn-create-world': '+ CREATE WORLD',
            'stat-players': 'Players',
            'stat-time': 'Time',
            'stat-weather': 'Weather',
            'stat-difficulty': 'Difficulty',
            'btn-weather': 'WEATHER',
            'btn-time': 'TIME',
            'btn-difficulty': 'DIFFICULTY',
            'files-title': 'File Manager',
            'plugins-title': 'Installed Plugins',
            'table-username': 'Username',
            'table-player-id': 'Player-ID',
            'table-current-world': 'Current world',
            'table-ip': 'IP-Address',
            'table-health': 'Health',
            'table-hunger': 'Hunger',
            'table-gamemode': 'Gamemode',
            'table-playtime': 'Playtime',
            'table-filename': 'Mod Filename',
            'chart-cpu': 'CPU Usage (%)',
            'chart-ram': 'RAM Usage (GB)',
            'table-size': 'Size',
            'table-status': 'Status',
            'backups-title': 'Backups',
            'btn-create-backup': 'Create Backup Now',
            'metrics-cpu': 'CPU Usage',
            'metrics-ram': 'RAM Usage',
            'settings-title': 'Dashboard Settings',
            'settings-desc': 'Here you can manage the dashboard and server state.',
            'btn-stop': 'Stop Server',
            'btn-restart': 'Restart Dashboard',
            'overview-title': 'Quick Overview',
            'stat-cpu-cores': 'CPU-Cores',
            'stat-disk': 'Disk',
            'control-title': 'Quick Control',
            'btn-shutdown': 'SHUTDOWN',
            'btn-reload': 'RELOAD'
        },
        'fr': {
            'nav-console': 'Console', 'nav-players': 'Joueurs', 'nav-files': 'Fichiers', 'nav-worlds': 'Mondes',
            'nav-mods': 'Mods', 'nav-backups': 'Sauvegardes', 'nav-performance': 'Performance', 'nav-settings': 'Paramètres',
            'status-online': 'Serveur en Ligne', 'console-title': 'Console en Direct', 'btn-clear': 'Effacer',
            'players-title': 'Joueurs en Ligne', 'worlds-title': 'Mondes du Serveur', 'btn-create-world': '+ CRÉER UN MONDE',
            'stat-players': 'Joueurs', 'stat-time': 'Temps', 'stat-weather': 'Météo', 'stat-difficulty': 'Difficulté',
            'btn-weather': 'MÉTÉO', 'btn-time': 'TEMPS', 'btn-difficulty': 'DIFFICULTÉ',
            'files-title': 'Gestionnaire de Fichiers', 'mods-title': 'Mods Installés', 'table-filename': 'Nom du Fichier',
            'table-size': 'Taille', 'table-status': 'Statut', 'backups-title': 'Sauvegardes',
            'btn-create-backup': 'Créer une Sauvegarde', 'metrics-cpu': 'Utilisation CPU', 'metrics-ram': 'Utilisation RAM',
            'settings-title': 'Paramètres du Dashboard', 'settings-desc': 'Gérer le dashboard et l\'état du serveur.',
            'btn-stop': 'Arrêter le Serveur', 'btn-restart': 'Redémarrer le Dashboard',
            'overview-title': 'Aperçu Rapide', 'stat-cpu-cores': 'Cœurs CPU', 'stat-disk': 'Disque',
            'control-title': 'Contrôle Rapide', 'btn-shutdown': 'ÉTEINDRE', 'btn-reload': 'RECHARGER'
        },
        'de': {
            'nav-console': 'Konsole', 'nav-players': 'Spieler', 'nav-files': 'Dateien', 'nav-worlds': 'Welten',
            'nav-mods': 'Mods', 'nav-backups': 'Backups', 'nav-performance': 'Leistung', 'nav-settings': 'Einstellungen',
            'status-online': 'Server Online', 'console-title': 'Live-Konsole', 'btn-clear': 'Leeren',
            'players-title': 'Online-Spieler', 'worlds-title': 'Serverwelten', 'btn-create-world': '+ WELT ERSTELLEN',
            'stat-players': 'Spieler', 'stat-time': 'Zeit', 'stat-weather': 'Wetter', 'stat-difficulty': 'Schwierigkeit',
            'btn-weather': 'WETTER', 'btn-time': 'ZEIT', 'btn-difficulty': 'SCHWIERIGKEIT',
            'files-title': 'Dateimanager', 'mods-title': 'Installierte Mods', 'table-filename': 'Dateiname',
            'table-size': 'Größe', 'table-status': 'Status', 'backups-title': 'Backups',
            'btn-create-backup': 'Jetzt Backup erstellen', 'metrics-cpu': 'CPU-Auslastung', 'metrics-ram': 'RAM-Auslastung',
            'settings-title': 'Dashboard-Einstellungen', 'settings-desc': 'Hier können Sie das Dashboard verwalten.',
            'btn-stop': 'Server stoppen', 'btn-restart': 'Dashboard neustarten',
            'overview-title': 'Schnellübersicht', 'stat-cpu-cores': 'CPU-Kerne', 'stat-disk': 'Festplatte',
            'control-title': 'Schnellsteuerung', 'btn-shutdown': 'HERUNTERFAHREN', 'btn-reload': 'NEU LADEN'
        },
        'pt': {
            'nav-console': 'Console', 'nav-players': 'Jogadores', 'nav-files': 'Arquivos', 'nav-worlds': 'Mundos',
            'nav-mods': 'Mods', 'nav-backups': 'Backups', 'nav-performance': 'Desempenho', 'nav-settings': 'Configurações',
            'status-online': 'Servidor Online', 'console-title': 'Console ao Vivo', 'btn-clear': 'Limpar',
            'players-title': 'Jogadores Online', 'worlds-title': 'Mundos do Servidor', 'btn-create-world': '+ CRIAR MUNDO',
            'stat-players': 'Jogadores', 'stat-time': 'Tempo', 'stat-weather': 'Clima', 'stat-difficulty': 'Dificuldade',
            'btn-weather': 'CLIMA', 'btn-time': 'TEMPO', 'btn-difficulty': 'DIFICULDADE',
            'files-title': 'Gerenciador de Arquivos', 'mods-title': 'Mods Instalados', 'table-filename': 'Nome do Arquivo',
            'table-size': 'Tamanho', 'table-status': 'Status', 'backups-title': 'Backups',
            'btn-create-backup': 'Criar Backup Agora', 'metrics-cpu': 'Uso de CPU', 'metrics-ram': 'Uso de RAM',
            'settings-title': 'Configurações do Painel', 'settings-desc': 'Gerencie o dashboard e o estado do servidor.',
            'btn-stop': 'Parar Servidor', 'btn-restart': 'Reiniciar Dashboard',
            'overview-title': 'Visão Geral Rápida', 'stat-cpu-cores': 'Núcleos CPU', 'stat-disk': 'Disco',
            'control-title': 'Controle Rápido', 'btn-shutdown': 'DESLIGAR', 'btn-reload': 'RECARREGAR'
        }
    };

    let currentLang = localStorage.getItem('lang') || 'es';

    window.toggleLangMenu = () => {
        document.getElementById('lang-menu').classList.toggle('show');
    };

    window.setLanguage = (lang) => {
        currentLang = lang;
        localStorage.setItem('lang', lang);
        applyTranslations();
        
        const btn = document.getElementById('current-lang');
        if (btn) {
            const flagMap = { 'es': 'es', 'en': 'us', 'fr': 'fr', 'de': 'de', 'pt': 'pt' };
            btn.innerHTML = `<img src="https://flagcdn.com/w40/${flagMap[lang]}.png" class="flag-img"> ${lang.toUpperCase()}`;
        }
        document.getElementById('lang-menu').classList.remove('show');
    };

    function applyTranslations() {
        const langData = translations[currentLang];
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (langData[key]) el.textContent = langData[key];
        });
        
        // Update placeholders
        const input = document.getElementById('console-input');
        if (input) input.placeholder = currentLang === 'es' ? 'Escribe un comando...' : 'Enter command...';
        
        // Refresh active section content
        const activeLink = document.querySelector('.nav-links li.active');
        if (activeLink) {
            const section = activeLink.getAttribute('data-section');
            if (section === 'worlds') loadWorlds();
            if (section === 'players') loadPlayers();
            if (section === 'backups') loadBackups();
            if (section === 'mods') loadMods();
            if (section === 'metrics') updateOverview();
        }
    }

    // Close lang menu on click outside
    window.addEventListener('click', (e) => {
        if (!e.target.closest('.lang-selector')) {
            const menu = document.getElementById('lang-menu');
            if (menu) menu.classList.remove('show');
        }
    });

    applyTranslations();
    setLanguage(currentLang);

    // Metrics Charts Logic
    let cpuChart, ramChart;
    const cpuData = [], ramData = [], chartLabels = [];
    const maxDataPoints = 20;

    function initCharts() {
        const cpuCtx = document.getElementById('cpuChart')?.getContext('2d');
        const ramCtx = document.getElementById('ramChart')?.getContext('2d');
        if (!cpuCtx || !ramCtx || cpuChart) return;

        const commonOptions = {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: { display: false },
                y: { beginAtZero: true, grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#94a3b8' } }
            },
            plugins: { legend: { display: false } },
            elements: { line: { tension: 0.4 }, point: { radius: 0 } }
        };

        cpuChart = new Chart(cpuCtx, {
            type: 'line',
            data: { labels: chartLabels, datasets: [{ data: cpuData, borderColor: '#a855f7', backgroundColor: 'rgba(168,85,247,0.1)', fill: true, borderWidth: 2 }] },
            options: commonOptions
        });

        ramChart = new Chart(ramCtx, {
            type: 'line',
            data: { labels: chartLabels, datasets: [{ data: ramData, borderColor: '#22c55e', backgroundColor: 'rgba(34,197,94,0.1)', fill: true, borderWidth: 2 }] },
            options: commonOptions
        });
    }

    // Overview Logic
    async function updateOverview() {
        try {
            const res = await fetch('/admpanel/api/metrics');
            const data = await res.json();
            const cpuCores = document.getElementById('cpu-cores-val');
            const tps = document.getElementById('tps-val');
            const ram = document.getElementById('ram-overview-val');
            const disk = document.getElementById('disk-val');

            if (cpuCores) cpuCores.textContent = data.cpu_cores || '64';
            if (tps) tps.textContent = (data.tps || 20.0).toFixed(1);
            
            const usedRam = (data.ram_used || 0) / 1024;
            const totalRam = (data.ram_total || 1) / 1024;
            if (ram) ram.textContent = `${usedRam.toFixed(2)} / ${totalRam.toFixed(2)} GB`;
            
            const usedDisk = data.disk_used || 0;
            const totalDisk = data.disk_total || 1;
            if (disk) disk.textContent = `${usedDisk} / ${totalDisk} GB`;

            // Update Charts
            if (!cpuChart) initCharts();
            if (cpuChart) {
                const now = new Date().toLocaleTimeString();
                cpuData.push(parseFloat(data.cpu_load) || 0);
                ramData.push(usedRam);
                chartLabels.push(now);

                if (cpuData.length > maxDataPoints) {
                    cpuData.shift();
                    ramData.shift();
                    chartLabels.shift();
                }

                cpuChart.update('none');
                ramChart.update('none');
            }
        } catch (e) { console.error('Metrics update failed', e); }
    }
    setInterval(updateOverview, 5000);
    
    // Mobile Navigation Logic
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            sidebar.classList.toggle('active');
        });
    }

    // Navigation
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            const sectionId = link.getAttribute('data-section');
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            // Close sidebar on mobile after selection
            if (window.innerWidth <= 768) {
                sidebar.classList.remove('active');
            }

            sections.forEach(s => {
                s.classList.remove('active-section');
                if (s.id === `${sectionId}-section`) {
                    s.classList.add('active-section');
                    if (sectionId === 'worlds') loadWorlds();
                    if (sectionId === 'backups') loadBackups();
                    if (sectionId === 'players') loadPlayers();
                    if (sectionId === 'mods') loadMods();
                    if (sectionId === 'files') loadFiles();
                    if (sectionId === 'plugins') loadPlugins();
                    if (sectionId === 'metrics') updateOverview();
                }
            });
        });
    });

    // WebSocket Console
    let ws;
    function connectWS() {
        const wsProtocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
        ws = new WebSocket(`${wsProtocol}//${window.location.host}/admpanel/api/ws/console`);

        ws.onmessage = (event) => {
            const line = document.createElement('div');
            let msg = event.data;
            
            if (msg.startsWith('[RCON Response]')) {
                line.className = 'line rcon-res';
                msg = msg.replace('[RCON Response]', '');
            } else {
                line.className = 'line';
                if (msg.includes('[INFO]')) line.classList.add('info');
                if (msg.includes('[WARN]')) line.classList.add('warn');
                if (msg.includes('[ERROR]')) line.classList.add('error');
            }
            
            line.textContent = msg;
            terminal.appendChild(line);
            terminal.scrollTop = terminal.scrollHeight;
            
            if (terminal.childNodes.length > 500) {
                terminal.removeChild(terminal.firstChild);
            }
        };

        ws.onclose = () => {
            const line = document.createElement('div');
            line.className = 'line sys';
            line.textContent = 'Disconnected from log stream. Retrying in 3s...';
            terminal.appendChild(line);
            setTimeout(connectWS, 3000);
        };
    }

    connectWS();

    consoleInput.addEventListener('keydown', async (e) => {
        if (e.key === 'Enter') {
            const cmd = consoleInput.value;
            if (!cmd) return;
            
            // Send via WS
            ws.send(cmd);
            
            const line = document.createElement('div');
            line.className = 'line sys';
            line.textContent = `> ${cmd}`;
            terminal.appendChild(line);
            terminal.scrollTop = terminal.scrollHeight;
            
            consoleInput.value = '';
        }
    });

    // Console Handlers
    window.clearConsole = () => {
        const consoleEl = document.getElementById('console');
        if (consoleEl) consoleEl.innerHTML = '';
    };

    window.sendCommand = async () => {
        const input = document.getElementById('console-input');
        const command = input.value;
        if (!command) return;
        
        try {
            await fetch(`/admpanel/api/console?command=${encodeURIComponent(command)}`, { 
                method: 'POST',
                headers: { 'X-Requested-With': 'MCDash' }
            });
            input.value = '';
        } catch (e) { alert('Failed to execute command'); }
    };

    // File Manager
    async function loadFiles(path = "") {
        const container = document.getElementById('file-container');
        const breadcrumb = document.getElementById('file-breadcrumb');
        container.innerHTML = '<div class="line sys">Loading files...</div>';
        breadcrumb.textContent = path || "/root";
        
        try {
            const res = await fetch(`/admpanel/api/files?path=${encodeURIComponent(path)}`);
            const files = await res.json();
            
            container.innerHTML = "";
            
            // Add "Up" navigation if not at root
            if (path) {
                const upItem = document.createElement('div');
                upItem.className = 'file-item dir';
                const parentPath = path.substring(0, path.lastIndexOf('/'));
                upItem.innerHTML = `
                    <div class="file-icon">⤴</div>
                    <div class="file-info">
                        <div class="file-name">..</div>
                    </div>
                `;
                upItem.onclick = () => loadFiles(parentPath);
                container.appendChild(upItem);
            }

            files.forEach(f => {
                const item = document.createElement('div');
                item.className = `file-item ${f.isDir ? 'dir' : 'file'}`;
                const size = f.isDir ? "" : (f.size / 1024 < 1024 ? (f.size/1024).toFixed(2) + " KB" : (f.size/(1024*1024)).toFixed(2) + " MB");
                const date = f.modified ? new Date(f.modified).toLocaleString() : "Unknown Date";

                item.innerHTML = `
                    <div class="file-icon">${f.isDir ? '📁' : '📄'}</div>
                    <div class="file-info">
                        <div class="file-name">${f.name}</div>
                        <div class="file-meta">
                            <span class="file-size">${size}</span>
                            <span class="file-date">${date}</span>
                        </div>
                    </div>
                `;
                if (f.isDir) {
                    item.onclick = () => loadFiles(path + (path.endsWith('/') ? '' : '/') + f.name);
                }
                container.appendChild(item);
            });
        } catch (e) {
            container.innerHTML = '<div class="line sys">Error loading files.</div>';
        }
    }
    
    loadFiles();

    // Worlds Logic
    async function loadWorlds() {
        const container = document.getElementById('worlds-container');
        const lang = translations[currentLang];
        try {
            const res = await fetch('/admpanel/api/worlds');
            const worlds = await res.json();
            container.innerHTML = worlds.map(w => `
                <div class="card world-card">
                    <div class="card-header">
                        <h4>${w.name}</h4>
                        <div class="world-icon" style="font-size: 1.8rem; line-height: 1;">${w.icon}</div>
                    </div>
                    <div class="world-stats-grid">
                        <div class="stat-item">${lang['stat-players']}: <b>${w.players}</b></div>
                        <div class="stat-item">${lang['stat-time']}: <b>${w.time}</b></div>
                        <div class="stat-item">${lang['stat-weather']}: <b>${w.weather}</b></div>
                        <div class="stat-item">${lang['stat-difficulty']}: <b>${w.difficulty}</b></div>
                    </div>
                    <div class="world-card-footer">
                        <div class="world-controls-container" style="flex: 1;">
                            <div class="action-bar">
                                <button onclick="toggleWorldPanel('${w.id}', 'weather', this)">${lang['btn-weather']}</button>
                                <button onclick="toggleWorldPanel('${w.id}', 'time', this)">${lang['btn-time']}</button>
                                <button onclick="toggleWorldPanel('${w.id}', 'diff', this)">${lang['btn-difficulty']}</button>
                            </div>
                            
                            <div class="options-panel" id="panel-weather-${w.id}">
                                <div class="option-btn" onclick="worldAction('${w.id}', 'weather', 'clear')">☀️ Clear</div>
                                <div class="option-btn" onclick="worldAction('${w.id}', 'weather', 'rain')">🌧️ Rain</div>
                                <div class="option-btn" onclick="worldAction('${w.id}', 'weather', 'thunder')">⚡ Thunder</div>
                            </div>
                            <div class="options-panel" id="panel-time-${w.id}">
                                <div class="option-btn" onclick="worldAction('${w.id}', 'time', 'day')">🌅 Day</div>
                                <div class="option-btn" onclick="worldAction('${w.id}', 'time', '6000')">☀️ Noon</div>
                                <div class="option-btn" onclick="worldAction('${w.id}', 'time', 'night')">🌙 Night</div>
                                <div class="option-btn" onclick="worldAction('${w.id}', 'time', '18000')">🌑 Midnight</div>
                            </div>
                            <div class="options-panel" id="panel-diff-${w.id}">
                                <div class="option-btn" onclick="worldAction('${w.id}', 'difficulty', 'peaceful')">🕊️ Peaceful</div>
                                <div class="option-btn" onclick="worldAction('${w.id}', 'difficulty', 'easy')">🛡️ Easy</div>
                                <div class="option-btn" onclick="worldAction('${w.id}', 'difficulty', 'normal')">⚔️ Normal</div>
                                <div class="option-btn" onclick="worldAction('${w.id}', 'difficulty', 'hard')">💀 Hard</div>
                            </div>
                        </div>
                        <button class="world-delete-btn" title="Delete World" style="margin-top: -15px;">🗑️</button>
                    </div>
                </div>
            `).join('');
        } catch (e) { container.innerHTML = '<div class="line sys">Error loading worlds</div>'; }
    }

    window.worldAction = async (worldId, type, value) => {
        try {
            const commandMap = {
                'weather': `execute in ${worldId} run weather ${value}`,
                'time': `execute in ${worldId} run time set ${value}`,
                'difficulty': `execute in ${worldId} run difficulty ${value}`
            };
        try {
            await fetch(`/admpanel/api/console?command=${encodeURIComponent(commandMap[type])}`, { 
                method: 'POST',
                headers: { 'X-Requested-With': 'MCDash' }
            });
            loadWorlds();
        } catch (e) { alert('Action failed'); }
            
            // Hide panels after action
            document.querySelectorAll('.options-panel').forEach(p => p.classList.remove('show'));
            document.querySelectorAll('.action-bar button').forEach(b => b.classList.remove('active'));
            setTimeout(loadWorlds, 1000); // Refresh data after a second
        } catch (e) { alert('Failed to execute command'); }
    };

    window.toggleWorldPanel = (worldId, type, btn) => {
        const panelId = `panel-${type}-${worldId}`;
        const panel = document.getElementById(panelId);
        const wasVisible = panel.classList.contains('show');
        
        // Hide all panels for this world
        document.querySelectorAll(`[id^="panel-"][id$="-${worldId}"]`).forEach(p => p.classList.remove('show'));
        btn.parentElement.querySelectorAll('button').forEach(b => b.classList.remove('active'));
        
        if (!wasVisible) {
            panel.classList.add('show');
            btn.classList.add('active');
        }
    };

    // Modal Handlers
    const modal = document.getElementById('create-world-modal');
    document.getElementById('open-create-world').onclick = () => modal.classList.add('show-modal');
    document.querySelector('.close-modal').onclick = () => modal.classList.remove('show-modal');
    window.onclick = (e) => { if (e.target == modal) modal.classList.remove('show-modal'); };

    document.getElementById('confirm-create-world').onclick = async () => {
        const name = document.getElementById('new-world-name').value;
        const type = document.getElementById('new-world-type').value;
        if (!name) return alert('Enter world name');
        
        try {
            // This is a simulated action as Vanilla/Forge doesn't support easy world creation via RCON
            await fetch(`/admpanel/api/console?command=say Creating world ${name} of type ${type}...`, { method: 'POST' });
            modal.classList.remove('show-modal');
            alert('World creation request sent! (Check console for details)');
        } catch (e) { alert('Failed to create world'); }
    };

    // Players Logic
    async function loadPlayers() {
        const container = document.getElementById('players-container');
        const countBadge = document.getElementById('player-count');
        const lang = translations[currentLang];

        try {
            const res = await fetch('/admpanel/api/players');
            const players = await res.json();
            
            countBadge.textContent = players.length;
            
            if (!players || players.length === 0) {
                container.innerHTML = `<tr><td colspan="9" style="text-align:center; padding:30px;">${lang['sys-no-players'] || 'No players online'}</td></tr>`;
                return;
            }

            container.innerHTML = players.map(p => `
                <tr data-join-time="${p.joinTime}">
                    <td><input type="checkbox" class="player-checkbox" data-name="${p.name}"></td>
                    <td data-label="${lang['table-username']}">
                        <div class="player-cell">
                            <img src="https://mc-heads.net/avatar/${p.name}" class="player-mini-avatar">
                            <span>${p.name}</span>
                        </div>
                    </td>
                    <td data-label="${lang['table-player-id']}"><span class="uuid-text">${p.uuid || 'N/A'}</span></td>
                    <td data-label="${lang['table-current-world']}">${p.world || 'Overworld'}</td>
                    <td data-label="${lang['table-ip']}">${p.ip || 'Hidden'}</td>
                    <td data-label="${lang['table-health']}">
                        <div class="stat-badge">
                            <span class="heart-icon">❤</span> ${p.health || 20}
                        </div>
                    </td>
                    <td data-label="${lang['table-hunger']}">
                        <div class="stat-badge">
                            <span class="food-icon">🍖</span> ${p.hunger || 20}
                        </div>
                    </td>
                    <td data-label="${lang['table-gamemode']}">${p.gamemode || 'Survival'}</td>
                    <td data-label="${lang['table-playtime']}" class="playtime-cell">${p.playtime || '00:00:00'}</td>
                </tr>
            `).join('');
            
            const selectAll = document.getElementById('select-all-players');
            if (selectAll) {
                selectAll.onchange = (e) => {
                    document.querySelectorAll('.player-checkbox').forEach(cb => cb.checked = e.target.checked);
                };
            }
        } catch (e) { 
            console.error('Player load error:', e);
            container.innerHTML = '<tr><td colspan="9">Error loading players</td></tr>'; 
        }
    }

    // Playtime Ticker (Every Second)
    setInterval(() => {
        document.querySelectorAll('#players-container tr').forEach(row => {
            const joinTime = parseInt(row.getAttribute('data-join-time'));
            if (!joinTime) return;
            
            const playtimeMs = Date.now() - joinTime;
            const s = Math.floor(playtimeMs / 1000) % 60;
            const m = Math.floor(playtimeMs / (1000 * 60)) % 60;
            const h = Math.floor(playtimeMs / (1000 * 60 * 60));
            
            const pad = (n) => n.toString().padStart(2, '0');
            const cell = row.querySelector('.playtime-cell');
            if (cell) cell.textContent = `${pad(h)}:${pad(m)}:${pad(s)}`;
        });
    }, 1000);

    setInterval(loadPlayers, 10000);

    window.bulkPlayerAction = async (action) => {
        const selected = Array.from(document.querySelectorAll('.player-checkbox:checked')).map(cb => cb.getAttribute('data-name'));
        if (selected.length === 0) return alert('Select at least one player');
        
        if (!confirm(`Are you sure you want to ${action} ${selected.length} player(s)?`)) return;

        try {
            for (const name of selected) {
                await fetch(`/admpanel/api/players/action?player=${name}&action=${action}`, { 
                    method: 'POST',
                    headers: { 'X-Requested-With': 'MCDash' }
                });
            }
            loadPlayers();
        } catch (e) { alert('Action failed'); }
    }

    // Plugins Logic
    async function loadPlugins() {
        const container = document.getElementById('plugins-container');
        try {
            const res = await fetch('/admpanel/api/mods');
            const plugins = await res.json();
            
            if (!plugins || plugins.length === 0) {
                container.innerHTML = '<div class="line sys">No plugins found</div>';
                return;
            }

            container.innerHTML = plugins.map(p => {
                const isEnabled = !p.name.endsWith('.disabled');
                const cleanName = p.name.replace('.jar', '').replace('.disabled', '');
                // Simulated metadata as NeoForge mods often don't provide this easily via a simple file listing API
                const version = p.version || "1.0.0";
                const author = p.author || "Unknown";
                const description = p.description || "No description provided for this plugin/mod.";

                return `
                    <div class="plugin-card">
                        <div class="plugin-header">
                            <div class="plugin-name">${cleanName}</div>
                            <div class="plugin-version">${version}</div>
                        </div>
                        <div class="plugin-author">by ${author}</div>
                        <div class="plugin-desc">${description}</div>
                        <div class="plugin-footer">
                            <button class="btn-plugin-action ${isEnabled ? 'btn-disable' : 'btn-enable'}" 
                                    onclick="pluginAction('${p.name}', '${isEnabled ? 'disable' : 'enable'}')">
                                ${isEnabled ? 'DISABLE' : 'ENABLE'}
                            </button>
                        </div>
                    </div>
                `;
            }).join('');
        } catch (e) { container.innerHTML = '<div class="line sys">Error loading plugins</div>'; }
    }

    window.pluginAction = async (name, action) => {
        try {
            // Action logic: renaming file to .disabled or back
            await fetch(`/admpanel/api/mods/action?name=${encodeURIComponent(name)}&action=${action}`, { 
                method: 'POST',
                headers: { 'X-Requested-With': 'MCDash' }
            });
            loadPlugins();
        } catch (e) { alert('Action failed'); }
    }

    // Backups Logic
    async function loadBackups() {
        const container = document.getElementById('backups-container');
        try {
            const res = await fetch('/admpanel/api/backups');
            const backups = await res.json();
            container.innerHTML = backups.map(b => `
                <tr>
                    <td>${b.name}</td>
                    <td>${(b.size / (1024 * 1024)).toFixed(1)} MB</td>
                    <td>${new Date(b.date).toLocaleString()}</td>
                    <td><button class="btn btn-sm btn-outline">Restore</button></td>
                </tr>
            `).join('');
        } catch (e) { container.innerHTML = '<tr><td colspan="4">Error loading backups</td></tr>'; }
    }

    document.getElementById('create-backup').onclick = async () => {
        const btn = document.getElementById('create-backup');
        btn.textContent = 'Creating...';
        btn.disabled = true;
        try {
            await fetch('/admpanel/api/backups/create', { 
                method: 'POST',
                headers: { 'X-Requested-With': 'MCDash' }
            });
            setTimeout(loadBackups, 5000); // Wait 5s for the ZIP to start appearing
        } catch (e) { alert('Failed to trigger backup'); }
        btn.textContent = 'Create Backup Now';
        btn.disabled = false;
    };
});
