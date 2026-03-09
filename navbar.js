// navbar.js
document.addEventListener("DOMContentLoaded", () => {
    const isHome = window.location.pathname === "/" || (window.location.pathname.endsWith("index.html") && !window.location.pathname.includes("/Hashes/"));

    const navHtml = `
    <div class="topnav">
        <a href="/" class="${isHome ? 'active' : ''}">Home Page</a>
        ${isHome ? `<button class="nav-btn" onclick="toggleMenu('toggleIndexMenu')">Page INDEX</button>` : ''}
        <a href="/Hashes" class="${window.location.pathname.includes('/Hashes') ? 'active' : ''}">Hashes</a>
        <button class="nav-btn" onclick="toggleMenu('toggleSettingsMenu')">Settings</button>
        <span class="likebtn-wrapper" data-theme="custom" data-icon_l="hrt2" data-icon_l_c_v="#ff0000" data-identifier="torrent_advices_main" data-dislike_enabled="false" style="vertical-align:middle; margin-left:10px;"></span>

        <div id="toggleIndexMenu">
            <a href="#media-players" onclick="toggleMenu('toggleIndexMenu')">Media Players</a>
            <a href="#LAV-Splitter" onclick="toggleMenu('toggleIndexMenu')">LAV Splitter</a>
            <a href="#more-troubleshooting-and-advices" onclick="toggleMenu('toggleIndexMenu')">More T&A</a>
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
                        <option>15</option><option>16</option><option>16.5</option><option>17</option><option>18</option><option>20</option><option>22</option><option>26</option>
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
                    <button class="reset-btn" onclick="resetSettings()">Reset All</button>
                </div>
            </div>
        </div>
    </div>`;

    document.body.insertAdjacentHTML("afterbegin", navHtml);
    applySavedSettings();

    // Like Button
    (function(d,e,s){if(d.getElementById("likebtn_wjs"))return;a=d.createElement(e);m=d.getElementsByTagName(e)[0];a.async=1;a.id="likebtn_wjs";a.src=s;m.parentNode.insertBefore(a, m)})(document,"script","//w.likebtn.com/js/w/widget.js");
});

function toggleMenu(id) {
    const ids = ['toggleSettingsMenu', 'toggleIndexMenu'];
    ids.forEach(mId => {
        const el = document.getElementById(mId);
        if (el) el.style.display = (mId === id && el.style.display !== 'block') ? 'block' : 'none';
    });
}

function updateSetting(key, value) {
    localStorage.setItem(key, value);
    applySavedSettings();
}

function resetSettings() {
    if(confirm("Reset all layout settings to default?")) {
        localStorage.clear();
        location.reload();
    }
}

function applySavedSettings() {
    // Defaults
    const s = {
        theme: localStorage.getItem('theme') || 'Dark Blue',
        width: localStorage.getItem('width') || '65%',
        fontSize: localStorage.getItem('fontSize') || '16.5',
        fontFamily: localStorage.getItem('fontFamily') || 'Consolas',
        fontWeight: localStorage.getItem('fontWeight') || 'Normal',
        scaleX: localStorage.getItem('scaleX') || '1.0'
    };

    // 1. Theme Logic
    const target = document.getElementById("changetextcolor");
    if(target) {
        if (s.theme === "Dark Blue") { target.style.color = "#e9e9e9"; document.body.style.backgroundColor = "#101D29"; }
        else if (s.theme === "Blue") { target.style.color = "#e9e9e9"; document.body.style.backgroundColor = "#212F3D"; }
        else if (s.theme === "Light") { target.style.color = "black"; document.body.style.backgroundColor = "#AEB6BF"; }
        else if (s.theme === "White") { target.style.color = "black"; document.body.style.backgroundColor = "#F0F0F0"; }
        else if (s.theme === "Dark") { target.style.color = "#E6E6E6"; document.body.style.backgroundColor = "#1F1F1F"; }
        else if (s.theme === "Black") { target.style.color = "#E6E6E6"; document.body.style.backgroundColor = "black"; }
    }

    // 2. CSS Logic
    document.body.style.width = s.width;
    
    const divs = {
        changefontsize: (el) => el.style.fontSize = s.fontSize + "px",
        changefontfamily: (el) => el.style.fontFamily = s.fontFamily,
        changefontweight: (el) => el.style.fontWeight = s.fontWeight,
        scaleXY: (el) => el.style.transform = `scaleX(${s.scaleX})`
    };

    Object.keys(divs).forEach(id => {
        const el = document.getElementById(id);
        if(el) divs[id](el);
    });

    // 3. Sync the Settings UI (Dropdowns/Sliders)
    const selectSync = {
        'themeSelect': s.theme,
        'widthSelect': s.width,
        'fontpxSelect': s.fontSize, // Fixed: This was likely the "disappearing" bug
        'fontFamilySelect': s.fontFamily,
        'fontWeightSelect': s.fontWeight
    };

    Object.keys(selectSync).forEach(id => {
        const el = document.getElementById(id);
        if(el) el.value = selectSync[id];
    });
    
    if(document.getElementById('scaleXslider')) {
        document.getElementById('scaleXslider').value = s.scaleX;
    }
}

// Keep your copy functions...
function copyText0(){navigator.clipboard.writeText(window.location.origin + "/#");}
function copyITAstring() {let t = document.getElementById("ITAstring"); t.select(); document.execCommand("copy");}
function doPlus(){ document.getElementById("fakebutton").value = ++document.getElementById("fakebutton").value; }