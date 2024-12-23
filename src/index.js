`// var url = window.location.href.substring(window.location.protocol.length + 2, window.location.href.length).split('/')[0].split(':')[0];
var port = window.location.href.substring(window.location.protocol.length + 2, window.location.href.length).split('/')[0].split(':')[1];
var url = "https://eatthecow.mooo.com:5050";
`;

//refreshPatterns();

function refreshPatterns() {
    axios
        .get(`${url}/patterns/get`)
        .then((response) => {
            var patterns = response.data.patterns;
            window.patterns = patterns;
            console.log(patterns);
            populatePane(patterns);
        })
        .catch((error) => {
            console.error(error.stack);
        });
    axios
        .get(`${url}/lexicon/get`)
        .then((response) => {
            var lexicon = response.data.patterns;
            window.lexicon = lexicon;
            console.log(lexicon);
        })
        .catch((error) => {
            console.error(error.stack);
        });
}

//All code above is by McMineyC
//Most code below is by Mixel-MurP-427


var list_counter = 0 //counts number of pattern items in sidebar
const light_color = 'inherit'
const dark_color = 'rgb(190, 215, 190)'
const viewer_padding = 10; //slight limit on viewer width to act as padding-right
//global elements
var Divider;
var sideBar;
var listSideBar;
var mainBox;
var lifeViewer;
var RLEmodeTop;
var RLEmodeBottom;
var viewerCache;
var htmlStyle;
var translator;
var LEDcontrols;
var showGame;
var showRLE;
var showTranslator;
var showLEDcontrols;

function body_loaded() {
    //set a whole bunch of vars for elements (is this too much?)
    Divider = document.getElementById("divider");
    sideBar = document.getElementById("sidebar");
    listSideBar = document.getElementById("listsidebar");
    mainBox = document.getElementById("mainbox");
    lifeViewer = document.querySelector("canvas");
    RLEmodeTop = document.querySelector(".RLE_modeTop");
    RLEmodeBottom = document.querySelector(".RLE_modeBottom");
    viewerCache = document.querySelector(".viewer_cache");
    translator = document.querySelector(".Translator");
    LEDcontrols = document.querySelector(".LEDcontrols");
    htmlStyle = getComputedStyle(document.querySelector("html"));
    showGame = document.getElementById("showGame");
    showRLE = document.getElementById("showRLE");
    showTranslator = document.getElementById("showTranslator");
    showLEDcontrols = document.getElementById("showLEDcontrols");

    // set heights of everything
    let heights = window.innerHeight - document.getElementById("topbar").offsetHeight;
    heights = `${heights}px`;
    console.log(heights);
    sideBar.style.height = heights;
    Divider.style.height = heights;
    mainBox.style.height = heights;
    lifeViewer.height = parseInt(heights);
    lifeViewer.width = parseInt(getComputedStyle(mainBox).width);


    resizablilty();
    add_pattern(server_patterns["169b44d834c77490384040f7f18d9be7"]);
    add_pattern(server_patterns["169b44d834c77490384040f7f18d9be7"]);
    add_pattern(server_patterns["169b44d834c77490384040f7f18d9be7"]);
    add_pattern(server_patterns["169b44d834c77490384040f7f18d9be7"]);
};

//--TODO-- add border limitations so that divider cannot slide all the way to the edge of screen. use 10px marign or so.

//fires once to initialize sidebar resizing feature
function resizablilty() {
    // credit: https://github.com/Tivotal/Resizable-Sidebar-Menu-with-Theme-Toggle-in-HTML-CSS-and-JavaScript

    Divider.addEventListener("mousedown", () => {
        document.addEventListener("mousemove", resize, true);
    });

    document.addEventListener("mouseup", () => {
        document.removeEventListener("mousemove", resize, true);
    });
}

function resize(e) {
    let size = `${e.x}px`;
    let mainWidth = htmlStyle.getPropertyValue("--dividewidth");
    if (window.innerWidth - e.x - parseInt(mainWidth) <= 50) {
        // If mainbox width is less than 20px, don't resize
        // mainbox calculation taken from below but replaced with absolute values
        return;
    }
    sideBar.style.width = size;
    Divider.style.left = size;
    mainBox.style.width = `calc(100% - ${size} - ${mainWidth})`;

    // Life viewer resize
    lifeViewer.width = parseInt(getComputedStyle(mainBox).width);
    lifeViewer.height = parseInt(getComputedStyle(mainBox).height);
};

//input: pattern with info to display
//result: adds button-list-item-pattern thingy to sidebar with info
function add_pattern(apPatterns) {
    list_counter++;
    let item = document.createElement("div")
    let myName = `${apPatterns['name']} | ${apPatterns['xbounds']}x${apPatterns['ybounds']} | ${apPatterns['creator']}`;
    item.innerHTML = myName
    item.title = myName;
    item.className = "pattern_button";
    item.style.backgroundColor = list_counter%2===0 ? dark_color : light_color; //create alternating colors
    listSideBar.appendChild(item);
};


//all this stuff controls the page toggling. there are four functions, one for each button.
const aGreen = 'rgb(0, 114, 68)';
const darkerGreen = 'rgb(0, 60, 0)';
function show_Game() {

    showGame.style.borderColor = darkerGreen;
    showRLE.style.borderColor = aGreen;
    showTranslator.style.borderColor = aGreen;
    showLEDcontrols.style.borderColor = aGreen;

    lifeViewer.style.display = 'inline';
    RLEmodeTop.style.display = 'none';
    RLEmodeBottom.style.display = 'none';
    viewerCache.style.display = 'none';
    translator.style.display = 'none';
    LEDcontrols.style.display = 'none';

    mainBox.style.overflowY = 'hidden';
};

function show_RLE() {
    showGame.style.borderColor = aGreen;
    showRLE.style.borderColor = darkerGreen;
    showTranslator.style.borderColor = aGreen;
    showLEDcontrols.style.borderColor = aGreen;

    lifeViewer.style.display = 'none';
    RLEmodeTop.style.display = 'block';
    RLEmodeBottom.style.display = 'block';
    viewerCache.style.display = 'block';
    translator.style.display = 'none';
    LEDcontrols.style.display = 'none';

    mainBox.style.overflowY = 'scroll';
    document.querySelectorAll('textarea').forEach((el) => {el.style.width = mainBox.offsetWidth * 0.8 + 'px'}); //set a moderate width of all textareas
};

function show_Translator() {
    showGame.style.borderColor = aGreen;
    showRLE.style.borderColor = aGreen;
    showTranslator.style.borderColor = darkerGreen;
    showLEDcontrols.style.borderColor = aGreen;

    lifeViewer.style.display = 'none';
    RLEmodeTop.style.display = 'none';
    RLEmodeBottom.style.display = 'none';
    viewerCache.style.display = 'none';
    translator.style.display = 'block';
    LEDcontrols.style.display = 'none';

    mainBox.style.overflowY = 'scroll';
};

function show_LEDcontrols() {
    showGame.style.borderColor = aGreen;
    showRLE.style.borderColor = aGreen;
    showTranslator.style.borderColor = aGreen;
    showLEDcontrols.style.borderColor = darkerGreen;

    lifeViewer.style.display = 'none';
    RLEmodeTop.style.display = 'none';
    RLEmodeBottom.style.display = 'none';
    viewerCache.style.display = 'none';
    translator.style.display = 'none';
    LEDcontrols.style.display = 'block';

    mainBox.style.overflowY = 'scroll';
};