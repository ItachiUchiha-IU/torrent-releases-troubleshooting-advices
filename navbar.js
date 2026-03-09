// navbar.js
document.addEventListener("DOMContentLoaded", () => {
    const isHome = window.location.pathname === "/" || window.location.pathname.endsWith("index.html");

    const navHtml = `
    <div class="topnav">
        <a class="${isHome ? 'active' : ''}" href="/" target="_self">${isHome ? 'To Top' : 'Home'}</a>
        ${isHome ? `
            <a href="#media-players" target="_self" onclick="hideSettingsMenu()">Media Players</a>
            <a href="#LAV-Splitter" target="_self" onclick="hideSettingsMenu()">LAV Splitter</a>
            <a href="#more-troubleshooting-and-advices" target="_self" onclick="hideSettingsMenu()">More T&A</a>
        ` : ''}
        <a href="/Hashes">Hashes</a>
        <div class="settingsmenu">
            <button onclick="toggleSettingsMenu()" class="settingsmenubutton">Settings</button>
        </div>
        <span class="likebtn-wrapper" data-theme="custom" data-icon_l="hrt2" data-icon_l_c_v="#ff0000" data-identifier="ghwuirghnpwiugbnerwugrbjn" data-dislike_enabled="false" style="position:relative;top:-3px;left:10px;margin-right:1px;"></span>

        <div id="toggleSettingsMenu">
            <div style="position: relative;top: 23px;display: inline-block;font-family: Baskerville;font-size: 17px; padding-bottom: 20px;">
                <div style="float:left;margin-left:5px;margin-right:15px;">
                    <Label style="display:block;">Theme:</Label>
                    <select id="themeSelect" onchange="theme(this);">
                        <option selected>Dark Blue</option><option>Blue</option><option>Light</option><option>White</option><option>Dark</option><option>Black</option>
                    </select>
                </div>
                <div style="float:left;margin-left:15px;margin-right:15px;">
                    <Label style="display:block;">Width:</Label>
                    <select id="widthSelect" onchange="margin(this);">
                        <option>40%</option><option>50%</option><option>60%</option><option selected>65%</option><option>70%</option><option>80%</option><option>90%</option><option>100%</option>
                    </select>
                </div>
                <div style="float:left;margin-left:15px;margin-right:5px;">
                    <Label style="display:block;">Font-px:</Label>
                    <select id="fontpxSelect" onchange="fontsize(this);">
                        <option>15</option><option>16</option><option selected>16.5</option><option>17</option><option>18</option><option>19</option><option>20</option><option>22</option><option>24</option><option>26</option><option>28</option><option>30</option><option>32</option>
                    </select>
                </div>
                <div style="float:left;margin-left:5px;margin-right:5px;">
                    <Label style="display:block;">Font-family:</Label>
                    <select id="fontFamilySelect" onchange="fontfamily(this);">
                        <option selected>Consolas</option><option>Cronos Pro</option><option>Montserrat</option><option>Segoe UI</option><option>Helvetica</option><option>Baskervville</option>
                    </select>
                </div>
                <div style="float:left;margin-left:5px;margin-right:15px;">
                    <Label style="display:block;">Font-weight:</Label>
                    <select id="fontWeightSelect" onchange="fontweight(this);">
                        <option selected>Normal</option><option>Bold</option>
                    </select>
                </div>
                <div style="float:right;margin-left:5px;margin-right:5px;">
                    <Label style="display:block;">ScaleX</Label>
                    <input id="scaleXslider" oninput="scaleXfont(event)" type="range" value="1.0" min="0.5" max="1.5" step="0.001" />
                </div>
            </div>
        </div>
        <br>
    </div>`;

    document.body.insertAdjacentHTML("afterbegin", navHtml);

    // Initialize Like Button
    (function(d,e,s){if(d.getElementById("likebtn_wjs"))return;a=d.createElement(e);m=d.getElementsByTagName(e)[0];a.async=1;a.id="likebtn_wjs";a.src=s;m.parentNode.insertBefore(a, m)})(document,"script","//w.likebtn.com/js/w/widget.js");
});

/* Original Functions */
function doPlus(){ document.getElementById("fakebutton").value = ++document.getElementById("fakebutton").value; }
function toggleSettingsMenu() { 
    var x = document.getElementById("toggleSettingsMenu");
    x.style.display = (x.style.display === "block") ? "none" : "block"; 
}
function hideSettingsMenu() { document.getElementById("toggleSettingsMenu").style.display = "none"; }

function theme(selectTag) {
    var listValue = selectTag.options[selectTag.selectedIndex].text;
    var target = document.getElementById("changetextcolor");
    if (listValue === "Dark Blue") { target.style.color = "#e9e9e9"; document.body.style.backgroundColor = "#101D29"; }
    else if (listValue === "Blue") { target.style.color = "#e9e9e9"; document.body.style.backgroundColor = "#212F3D"; }
    else if (listValue === "Light") { target.style.color = "black"; document.body.style.backgroundColor = "#AEB6BF"; }
    else if (listValue === "White") { target.style.color = "black"; document.body.style.backgroundColor = "#F0F0F0"; }
    else if (listValue === "Dark") { target.style.color = "#E6E6E6"; document.body.style.backgroundColor = "#1F1F1F"; }
    else if (listValue === "Black") { target.style.color = "#E6E6E6"; document.body.style.backgroundColor = "black"; }
}

function margin(selectTag) { document.body.style.width = selectTag.options[selectTag.selectedIndex].text; }
function fontsize(selectTag) { document.getElementById("changefontsize").style.fontSize = selectTag.options[selectTag.selectedIndex].text + "px"; }
function fontfamily(selectTag) { document.getElementById("changefontfamily").style.fontFamily = selectTag.options[selectTag.selectedIndex].text; }
function fontweight(selectTag) { document.getElementById("changefontweight").style.fontWeight = selectTag.options[selectTag.selectedIndex].text; }
function scaleXfont(e) { document.getElementById("scaleXY").style.transform = "scaleX(" + document.getElementById("scaleXslider").value + ")"; }

/* Content Copy Functions */
function copyText0(){navigator.clipboard.writeText("https://torrent-releases-troubleshooting-advices.pages.dev/#");}
function copyText1(){navigator.clipboard.writeText("https://torrent-releases-troubleshooting-advices.pages.dev/#media-players");}
function copyText2(){navigator.clipboard.writeText("https://torrent-releases-troubleshooting-advices.pages.dev/#LAV-Splitter");}
function copyText3(){navigator.clipboard.writeText("https://torrent-releases-troubleshooting-advices.pages.dev/#my-strings-for-lav-splitter");}
function copyText4(){navigator.clipboard.writeText("https://torrent-releases-troubleshooting-advices.pages.dev/#more-troubleshooting-and-advices");}
function copyITAstring() {let textarea = document.getElementById("ITAstring");textarea.select();document.execCommand("copy");}
function copyENGstring() {let textarea = document.getElementById("ENGstring");textarea.select();document.execCommand("copy");}