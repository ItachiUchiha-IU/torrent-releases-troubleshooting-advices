// navbar.js
document.addEventListener("DOMContentLoaded", () => {
    const isHome = window.location.pathname === "/" || (window.location.pathname.endsWith("index.html") && !window.location.pathname.includes("/Hashes/"));

    const navHtml = `
    <div class="topnav">
        <!-- LEFT SECTION -->
        <div class="nav-left">
            <a href="/" class="${isHome ? 'active' : ''}">Home Page</a>
            <a href="/MPV_Track_Auto-Selection" class="${window.location.pathname.includes('/MPV_Track_Auto-Selection') ? 'active' : ''}">MPV .lua</a>
            <a href="/Hashes" class="${window.location.pathname.includes('/Hashes') ? 'active' : ''}">Hashes</a>
        </div>

        <!-- CENTER SECTION (Locked) -->
        <div class="nav-center">
        </div>

        <!-- RIGHT SECTION (Leaning against center) -->
        <div class="nav-right">
            <button class="nav-btn" onclick="toggleMenu('toggleIndexMenu')">Page Index</button>
            <button class="nav-btn" onclick="toggleMenu('toggleSettingsMenu')">Layout</button>
            <span class="likebtn-wrapper" data-theme="custom" data-icon_l="hrt2" data-icon_l_c_v="#ff0000" data-identifier="ghwuirghnpwiugbnerwugrbjn" data-dislike_enabled="false"></span>
        </div>

        <!-- DROPDOWN MENUS -->
        <div id="toggleIndexMenu">
            <div class="settings-grid">
                <a class="nav-btn" href="#" onclick="toggleMenu('toggleIndexMenu')">To Top</a>
                ${isHome ? `<a class="nav-btn" href="#media-players" onclick="toggleMenu('toggleIndexMenu')">Media Players</a>` : ''}
                ${isHome ? `<a class="nav-btn" href="#Track_Auto-Selection" onclick="toggleMenu('toggleIndexMenu')">Track Auto-Selection</a>` : ''}
                ${isHome ? `<a class="nav-btn" href="#more-troubleshooting-and-advices" onclick="toggleMenu('toggleIndexMenu')">More T&A</a>` : ''}
            </div>
        </div>

        <div id="toggleSettingsMenu">
            <div class="settings-grid">
                <div class="setting-item">
                    <label>Theme:</label>
                    <select id="themeSelect" onchange="updateSetting('theme', this.value)">
                        <option>Dark Blue</option><option>Blue</option><option>Light</option><option>White</option><option>Dark</option><option>Black</option>
                    </select>
                </div>
                <div class="setting-item">
                    <label>Width:</label>
                    <select id="widthSelect" onchange="updateSetting('width', this.value)">
                        <option>40%</option><option>50%</option><option>60%</option><option>65%</option><option>70%</option><option>80%</option><option>90%</option><option>100%</option>
                    </select>
                </div>
                <div class="setting-item">
                    <label>Font-px:</label>
                    <select id="fontpxSelect" onchange="updateSetting('fontSize', this.value)">
                        <option value="15">15</option><option value="16">16</option><option value="16.5">16.5</option><option value="17">17</option><option value="18">18</option><option value="20">20</option><option value="22">22</option><option value="26">26</option>
                    </select>
                </div>
                <div class="setting-item">
                    <label>Font-family:</label>
                    <select id="fontFamilySelect" onchange="updateSetting('fontFamily', this.value)">
                        <option>Consolas</option><option>Cronos Pro</option><option>Montserrat</option><option>Segoe UI</option><option>Helvetica</option><option>Baskervville</option>
                    </select>
                </div>
                <div class="setting-item">
                    <label>Weight:</label>
                    <select id="fontWeightSelect" onchange="updateSetting('fontWeight', this.value)">
                        <option>Normal</option><option>Bold</option>
                    </select>
                </div>
                <div class="setting-item">
                    <label>ScaleX</label>
                    <input id="scaleXslider" type="range" value="1.0" min="0.5" max="1.5" step="0.001" oninput="updateSetting('scaleX', this.value)" />
                </div>
                <div class="setting-item">
                    <button class="reset-btn" onclick="resetSettings()">Reset</button>
                </div>
            </div>
        </div>
    </div>`;

    document.body.insertAdjacentHTML("afterbegin", navHtml);
    applySavedSettings();

    (function(d,e,s){if(d.getElementById("likebtn_wjs"))return;a=d.createElement(e);m=d.getElementsByTagName(e)[0];a.async=1;a.id="likebtn_wjs";a.src=s;m.parentNode.insertBefore(a, m)})(document,"script","//w.likebtn.com/js/w/widget.js");
});

function toggleMenu(id) {
    const menus = ['toggleSettingsMenu', 'toggleIndexMenu'];
    menus.forEach(m => {
        const el = document.getElementById(m);
        if (el) el.style.display = (m === id && el.style.display !== 'block') ? 'block' : 'none';
    });
}

function updateSetting(key, value) {
    localStorage.setItem(key, value);
    applySavedSettings();
}

function resetSettings() {
    localStorage.clear();
    location.reload();
}

function applySavedSettings() {
    const s = {
        theme: localStorage.getItem('theme') || 'Dark Blue',
        width: localStorage.getItem('width') || '65%',
        fontSize: localStorage.getItem('fontSize') || '16.5',
        fontFamily: localStorage.getItem('fontFamily') || 'Consolas',
        fontWeight: localStorage.getItem('fontWeight') || 'Normal',
        scaleX: localStorage.getItem('scaleX') || '1.0'
    };

    const target = document.getElementById("changetextcolor");
    if(target) {
        if (s.theme === "Dark Blue") { target.style.color = "#e9e9e9"; document.body.style.backgroundColor = "#101D29"; }
        else if (s.theme === "Blue") { target.style.color = "#e9e9e9"; document.body.style.backgroundColor = "#212F3D"; }
        else if (s.theme === "Light") { target.style.color = "black"; document.body.style.backgroundColor = "#AEB6BF"; }
        else if (s.theme === "White") { target.style.color = "black"; document.body.style.backgroundColor = "#F0F0F0"; }
        else if (s.theme === "Dark") { target.style.color = "#E6E6E6"; document.body.style.backgroundColor = "#1F1F1F"; }
        else if (s.theme === "Black") { target.style.color = "#E6E6E6"; document.body.style.backgroundColor = "black"; }
    }

    document.body.style.width = s.width;
    
    // Apply Settings to DIVs
    const elFS = document.getElementById("changefontsize"); if(elFS) elFS.style.fontSize = s.fontSize + "px";
    const elFF = document.getElementById("changefontfamily"); if(elFF) elFF.style.fontFamily = s.fontFamily;
    const elFW = document.getElementById("changefontweight"); if(elFW) elFW.style.fontWeight = s.fontWeight;
    const elSX = document.getElementById("scaleXY"); if(elSX) elSX.style.transform = `scaleX(${s.scaleX})`;

    // Sync UI
    if(document.getElementById('themeSelect')) document.getElementById('themeSelect').value = s.theme;
    if(document.getElementById('widthSelect')) document.getElementById('widthSelect').value = s.width;
    if(document.getElementById('fontpxSelect')) document.getElementById('fontpxSelect').value = s.fontSize;
    if(document.getElementById('fontFamilySelect')) document.getElementById('fontFamilySelect').value = s.fontFamily;
    if(document.getElementById('fontWeightSelect')) document.getElementById('fontWeightSelect').value = s.fontWeight;
    if(document.getElementById('scaleXslider')) document.getElementById('scaleXslider').value = s.scaleX;
}

// Global UI helpers
function doPlus(){ 
    const el = document.getElementById("fakebutton");
    if(el) el.value = ++el.value; 
}

// Universal copy function for section links
function copyLink(id) {
    const url = window.location.origin + window.location.pathname + (id ? "#" + id : "");
    
    navigator.clipboard.writeText(url).then(() => {
        const feedback = document.getElementById('copied-feedback');
        if (feedback) {
            feedback.textContent = "Link Copied!";
            feedback.style.opacity = '1';
            setTimeout(() => { feedback.style.opacity = '0'; }, 2000);
        }
    });
}

// Unique logic for textareas
function copyITAstring() { let t = document.getElementById("ITAstring"); t.select(); document.execCommand("copy"); }
function copyENGstring() { let t = document.getElementById("ENGstring"); t.select(); document.execCommand("copy"); }

// Unique logic for commands (page2.html)
function copyTriggerCmd() {
    const cmd = document.getElementById('cf-trigger').textContent;
    navigator.clipboard.writeText(cmd).then(() => {
        // Re-using your existing feedback logic
        const feedback = document.getElementById('copied-feedback');
        if (feedback) {
            feedback.textContent = "Commands Copied!";
            feedback.style.opacity = '1';
            setTimeout(() => { feedback.style.opacity = '0'; }, 2000);
        }
    });
}

async function fetchLastUpdated() {
    const linkElement = document.getElementById('last-updated-link');
    if (!linkElement) return; // Only run if the element exists on the page

    try {
        // Fetch repo info from GitHub API
        const response = await fetch('https://api.github.com/repos/ItachiUchiha-IU/torrent-releases-troubleshooting-advices');
        const data = await response.json();
        
        // Get the "pushed_at" date (last time you pushed code)
        const date = new Date(data.pushed_at);
        
        // Format it nicely (e.g., "March 9, 2026")
        const formattedDate = date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        linkElement.textContent = formattedDate;
    } catch (error) {
        console.error("Failed to fetch GitHub date:", error);
        linkElement.textContent = "Visit GitHub for updates";
    }
}

document.addEventListener("DOMContentLoaded", fetchLastUpdated);
