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

var list_counter = 0; //counts number of pattern items in sidebar
const light_color = "inherit";
const dark_color = "rgb(190, 215, 190)";
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
  let heights =
    window.innerHeight - document.getElementById("topbar").offsetHeight;
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
}

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
}

//input: pattern with info to display
//result: adds button-list-item-pattern thingy to sidebar with info
function add_pattern(apPatterns) {
  list_counter++;
  let item = document.createElement("div");
  let myName = `${apPatterns["name"]} | ${apPatterns["xbounds"]}x${apPatterns["ybounds"]} | ${apPatterns["creator"]}`;
  item.innerHTML = myName;
  item.title = myName;
  item.className = "pattern_button";
  item.style.backgroundColor =
    list_counter % 2 === 0 ? dark_color : light_color; //create alternating colors
  listSideBar.appendChild(item);
}

//all this stuff controls the page toggling. there are four functions, one for each button.
const aGreen = "rgb(0, 114, 68)";
const darkerGreen = "rgb(0, 60, 0)";
function show_Game() {
  showGame.style.borderColor = darkerGreen;
  showRLE.style.borderColor = aGreen;
  showTranslator.style.borderColor = aGreen;
  showLEDcontrols.style.borderColor = aGreen;

  lifeViewer.style.display = "inline";
  RLEmodeTop.style.display = "none";
  RLEmodeBottom.style.display = "none";
  viewerCache.style.display = "none";
  translator.style.display = "none";
  LEDcontrols.style.display = "none";

  mainBox.style.overflowY = "hidden";
}

function show_RLE() {
  showGame.style.borderColor = aGreen;
  showRLE.style.borderColor = darkerGreen;
  showTranslator.style.borderColor = aGreen;
  showLEDcontrols.style.borderColor = aGreen;

  lifeViewer.style.display = "none";
  RLEmodeTop.style.display = "block";
  RLEmodeBottom.style.display = "block";
  viewerCache.style.display = "block";
  translator.style.display = "none";
  LEDcontrols.style.display = "none";

  mainBox.style.overflowY = "scroll";
  document.querySelectorAll("textarea").forEach((el) => {
    el.style.width = mainBox.offsetWidth * 0.8 + "px";
  }); //set a moderate width of all textareas
}

function show_Translator() {
  showGame.style.borderColor = aGreen;
  showRLE.style.borderColor = aGreen;
  showTranslator.style.borderColor = darkerGreen;
  showLEDcontrols.style.borderColor = aGreen;

  lifeViewer.style.display = "none";
  RLEmodeTop.style.display = "none";
  RLEmodeBottom.style.display = "none";
  viewerCache.style.display = "none";
  translator.style.display = "block";
  LEDcontrols.style.display = "none";

  mainBox.style.overflowY = "scroll";
}

function show_LEDcontrols() {
  showGame.style.borderColor = aGreen;
  showRLE.style.borderColor = aGreen;
  showTranslator.style.borderColor = aGreen;
  showLEDcontrols.style.borderColor = darkerGreen;

  lifeViewer.style.display = "none";
  RLEmodeTop.style.display = "none";
  RLEmodeBottom.style.display = "none";
  viewerCache.style.display = "none";
  translator.style.display = "none";
  LEDcontrols.style.display = "block";

  mainBox.style.overflowY = "scroll";
}

//accepts data in the format
/*
{
    "type": "lexicon",
    "hash": "1cc274d3d0702d311b34621142b86ad4",
    "name": "101",
    "creator": "LifeWiki Lexicon",
    "xbounds": "18",
    "ybounds": "12",
    "rle": "4b2o6b2o$3bobo6bobo$3bo10bo$2obo10bob2o$2obobo2b2o2bobob2o$3bobobo2bobobo$3bobobo2bobobo$2obobo2b2o2bobob2o$2obo10bob2o$3bo10bo$3bobo6bobo$4b2o6b2o!",
    "raw_rle": "#C [[ ZOOM 7 GRID COLOR GRID 31 31 31 COLOR DEADRAMP 31 0 0 COLOR ALIVE 255 255 255 COLOR ALIVERAMP 255 255 255 COLOR DEAD 0 0 47 COLOR BACKGROUND 0 0 0 GPS 10 WIDTH 937 HEIGHT 600 ]]\nx = 18, y = 12, rule = B3/S23\n4b2o6b2o$3bobo6bobo$3bo10bo$2obo10bob2o$2obobo2b2o2bobob2o$3bobobo2bobobo$3bobobo2bobobo$2obobo2b2o2bobob2o$2obo10bob2o$3bo10bo$3bobo6bobo$4b2o6b2o!",
    "comments": {
      We can ignore these :)
    }
}
*/

function changePattern(pat) {
  window.selectedPattern = pat; // used to keep track of state.
  var type = pat.type; // Lexicon or user, used to not overwrite the lexicon
  var rleTextarea = document.querySelector(".viewer_cache");
  rleTextarea.innerHTML = pat.raw_rle; // aka with comment line
  window.updateMe(document.querySelector("canvas")); // updates viewer
  if (type == "lexicon") {
    document.querySelector("#rle-save-overwrite").style.display = "none"; // very hacky way of doing this but you left me no choice
  } else {
    document.querySelector("#rle-save-new").style.display = "block";
  }
  document.querySelector("#rle-author").innerHTML = pat.creator;
  document.querySelector("#rle-name").innerHTML = pat.name;
}

async function testPattern() {
  // this needs async because it uses fetch.  get ready for a wild ride now
  var url = "http://localhost:5000";
  var pat = await getRequest(
    `${url}/patterns/get-named?id=1cc274d3d0702d311b34621142b86ad4`,
  );
  console.log(pat);
  pat.type = "lexicon";
  changePattern(pat);
}

async function getRequest(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.result;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
async function postRequest(url) {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data.result;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
