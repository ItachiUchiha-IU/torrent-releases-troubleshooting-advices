// navbar.js


// --- 1. CONFIGURATION ---
const BREAKPOINT = 1120; 
const scrollDelta = 5; 
let lastScrollTop = 0;
// Initialize state immediately
let isMobileMode = window.innerWidth <= BREAKPOINT;


// --- 2. THE "INSTANT" PATH (Visuals) ---
// This function does NOT touch the <body>, so it can run at the very top of the file
// without crashing, making it effectively instant.
function applyInstantVisuals() {
    const currentMode = window.innerWidth <= BREAKPOINT;
    
    // Set the class on <html> immediately
    document.documentElement.classList.toggle('is-mobile', currentMode);

    // Sync width logic
    const savedWidth = localStorage.getItem('width');
    if (savedWidth) {
        document.documentElement.style.setProperty('--user-width', savedWidth);
    } else {
        document.documentElement.style.removeProperty('--user-width');
    }

    // Apply background color to the root so there is no white flash
    const savedTheme = localStorage.getItem('theme') || 'Dark Blue';
    const bgColors = {
        'Dark Blue': "#101D29", 'Blue': "#212F3D", 'Light': "#AEB6BF",
        'White': "#F0F0F0", 'Dark': "#1F1F1F", 'Black': "black"
    };
    document.documentElement.style.setProperty('--background-color', bgColors[savedTheme] || "#101D29");

    // Detect threshold crossing for width reset
    if (currentMode !== isMobileMode) {
        isMobileMode = currentMode;
        localStorage.removeItem('width'); // Reset manual width on switch
    }
}

// EXECUTE IMMEDIATELY
applyInstantVisuals();


// --- 3. EVENT LISTENERS ---

window.onresize = function() {
    applyInstantVisuals();
    if (document.readyState === "complete" || document.readyState === "interactive") {
        applySavedSettings(); // Sync UI dropdowns
    }
};

window.onscroll = function() {
    const btn = document.getElementById("scrollToTopBtn");
    const nav = document.querySelector(".topnav");
    const isMobile = document.documentElement.classList.contains('is-mobile');
    let scrollTop = window.scrollY || document.documentElement.scrollTop;

    // --- 1. Floating Back to Top Button ---
    if (btn) {
        btn.style.display = (scrollTop > 300) ? "block" : "none";
    }

    // --- 2. Smart Navbar Hide/Show ---
    if (nav && isMobile) {
        
        // Only act if we scrolled more than the delta (5px)
        if (Math.abs(lastScrollTop - scrollTop) <= scrollDelta) return;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // SCROLLING DOWN
            nav.classList.add("nav-hidden");
            
            // Auto-close any open sub-menus
            ['toggleSettingsMenu', 'toggleIndexMenu'].forEach(id => {
                const el = document.getElementById(id);
                if (el) el.style.display = 'none';
            });
        } else {
            // SCROLLING UP (Immediate re-appearance)
            nav.classList.remove("nav-hidden");
        }
    } else if (nav) {
        // Desktop safety: always show
        nav.classList.remove("nav-hidden");
    }

    // Update lastScrollTop, ensuring it doesn't go negative (iOS bounce)
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
};

document.addEventListener("DOMContentLoaded", () => {
    // Inject Navbar
    const path = window.location.pathname;
    const isHome = path === "/" || path === "/index.html" || path === "";
    const isMPV_lua = path.includes('MPV_lua');
    const isHashes = path.includes('Hashes');

    const navHtml = `
    <div class="topnav">
        <!-- LEFT SECTION: All navigation and controls -->
        <div class="nav-left">
            <!-- 1. The Index Icon Button -->
            <button class="nav-btn index-toggle" onclick="toggleMenu('toggleIndexMenu')" title="Page Index">&#9776;</button>

            <!-- Vertical Divider -->
            <div class="nav-divider"></div>

            <!-- 2. The Navigation Links -->
            <a href="/" class="${isHome ? 'active' : ''}">Home</a>
            <a href="/MPV_lua" class="${isMPV_lua ? 'active' : ''}">MPV .lua</a>
            <a href="/Hashes" class="${isHashes ? 'active' : ''}">Hashes</a>
            
            <!-- Vertical Divider -->
            <div class="nav-divider"></div>

            <!-- 3. The Layout Button -->
            <button class="nav-btn" onclick="toggleMenu('toggleSettingsMenu')">Layout</button>
            
            <!-- Vertical Divider -->
            <div class="nav-divider"></div>

            <span class="likebtn-wrapper" data-theme="custom" data-icon_l="hrt2" data-icon_l_c_v="#ff0000" data-identifier="ghwuirghnpwiugbnerwugrbjn" data-dislike_enabled="false"></span>
        </div>

        <!-- RIGHT SECTION (Pinned to the right edge) -->
        <div class="nav-right">
        </div>

        <!-- DROPDOWN MENUS (Absolute positioned below the bar) -->
        <div id="toggleIndexMenu">
            <div class="settings-grid">
                <a class="nav-btn" href="#" onclick="toggleMenu('toggleIndexMenu')" title="Back to Top">&uarr; Top</a>
                ${isHome ? `<a class="nav-btn" href="#media-players" onclick="toggleMenu('toggleIndexMenu')">Media Players</a>` : ''}
                ${isHome ? `<a class="nav-btn" href="#Track_Auto-Selection" onclick="toggleMenu('toggleIndexMenu')">Track Auto-Selection</a>` : ''}
                ${isHome ? `<a class="nav-btn" href="#more-troubleshooting-and-advices" onclick="toggleMenu('toggleIndexMenu')">More T&A</a>` : ''}
                ${isMPV_lua ? `<a class="nav-btn" href="#security-notice" onclick="toggleMenu('toggleIndexMenu')">Security Note</a>` : ''}
                ${isMPV_lua ? `<a class="nav-btn" href="#MPV-Track-Selection-Script-lua" onclick="toggleMenu('toggleIndexMenu')">Track Auto-Selector (.lua)</a>` : ''}
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
                        <option>40%</option><option>50%</option><option>60%</option><option>65%</option><option>70%</option><option>80%</option><option>90%</option><option>96%</option><option>100%</option>
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
    </div>
    <button id="scrollToTopBtn" onclick="window.scrollTo({top: 0, behavior: 'smooth'})" title="Go to top">&uarr;</button>
    `;

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
    applyInstantVisuals(); // Update variables immediately
    applySavedSettings(); // Sync UI
}

function resetSettings() {
    localStorage.clear();
    location.reload();
}

function applySavedSettings() {
    const s = {
        theme: localStorage.getItem('theme') || 'Dark Blue',
        width: localStorage.getItem('width'),
        fontSize: localStorage.getItem('fontSize') || '16.5',
        fontFamily: localStorage.getItem('fontFamily') || 'Consolas',
        fontWeight: localStorage.getItem('fontWeight') || 'Normal',
        scaleX: localStorage.getItem('scaleX') || '1.0'
    };

    // Note: Background and Width are handled by applyInstantVisuals() to avoid delay.
    // This function now primarily handles text colors and UI sync.

    const target = document.getElementById("changetextcolor");
    if(target) {
        if (['Light', 'White'].includes(s.theme)) { target.style.color = "black"; }
        else { target.style.color = "#e9e9e9"; }
    }
    
    if (document.body) {
        document.body.style.marginLeft = "auto";
        document.body.style.marginRight = "auto";
    }
    
    // Apply Settings to DIVs
    const elFS = document.getElementById("changefontsize"); if(elFS) elFS.style.fontSize = s.fontSize + "px";
    const elFF = document.getElementById("changefontfamily"); if(elFF) elFF.style.fontFamily = s.fontFamily;
    const elFW = document.getElementById("changefontweight"); if(elFW) elFW.style.fontWeight = s.fontWeight;
    const elSX = document.getElementById("scaleXY"); if(elSX) elSX.style.transform = `scaleX(${s.scaleX})`;

    // --- Sync UI Elements ---
    if(document.getElementById('themeSelect')) document.getElementById('themeSelect').value = s.theme;
    // Improved Width Sync
    const widthSelect = document.getElementById('widthSelect');
    if(widthSelect) {
        const savedWidth = localStorage.getItem('width');
        // If there is a manual width in storage, show it.
        // Otherwise, show the responsive default (96% for mobile, 65% for desktop).
        const isMobile = document.documentElement.classList.contains('is-mobile');
        widthSelect.value = s.width || (isMobile ? '96%' : '65%');
    }

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

// --- EVENT LISTENERS ---

// 1. Trigger the GitHub date fetch when HTML is ready
document.addEventListener("DOMContentLoaded", fetchLastUpdated);

// 2. Force textareas and inputs to reset to original values every time page is shown
window.addEventListener("pageshow", () => {
    // List the IDs of the elements you want to reset
    const toReset = ["ITAstring", "ENGstring", "fakebutton"];
    
    toReset.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            // .defaultValue is the text you wrote in the HTML file
            // Setting .value to .defaultValue wipes out anything the browser "remembered"
            el.value = el.defaultValue;
        }
    });
});