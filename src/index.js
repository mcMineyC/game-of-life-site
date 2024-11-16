`// var url = window.location.href.substring(window.location.protocol.length + 2, window.location.href.length).split('/')[0].split(':')[0];
var port = window.location.href.substring(window.location.protocol.length + 2, window.location.href.length).split('/')[0].split(':')[1];
var url = "https://eatthecow.mooo.com:5050";
`
//refreshPatterns();

function refreshPatterns() {
    axios.get(`${url}/patterns/get`).then((response) => {
        var patterns = response.data.patterns;
        window.patterns = patterns;
        console.log(patterns);
        populatePane(patterns);
    }).catch((error) => {
        console.error(error.stack);
    });
    axios.get(`${url}/lexicon/get`).then((response) => {
        var lexicon = response.data.patterns;
        window.lexicon = lexicon;
        console.log(lexicon);
    }).catch((error) => {
        console.error(error.stack);
    });
}

//All code above is by McMineyC
//All code below is by Mixel-MurP-427

var Divider
var sideBar
var listSideBar
var mainBox

function body_loaded () {
    Divider = document.getElementById("divider")
    sideBar = document.getElementById("sidebar")
    listSideBar = document.getElementById("listsidebar")
    mainBox = document.getElementById("mainbox")

    resizablilty();
    add_pattern(server_patterns["169b44d834c77490384040f7f18d9be7"]);
};


//TODO add border limitations so that divider cannot slide all the way to the edge of screen. use 10px marign or so.
//fires once to initialize sidebar resizing feature
function resizablilty () { // creadit: https://github.com/Tivotal/Resizable-Sidebar-Menu-with-Theme-Toggle-in-HTML-CSS-and-JavaScript

    Divider.addEventListener("mousedown", () => {
        document.addEventListener("mousemove", resize, false);
        });

    document.addEventListener("mouseup", () => {
        document.removeEventListener("mousemove", resize, false);
    });
};

function resize (e) {
    let size = `${e.x}px`;
    let mainWidth = getComputedStyle(document.querySelector("html")).getPropertyValue("--dividewidth");
    sideBar.style.width = size;
    Divider.style.left = size;
    mainBox.style.width = `calc(100% - ${size} - ${mainWidth})`;
};


//input: list of patterns with info to display
//returns: nothing
//result: adds buttons/listItems to sidebar with info
function add_pattern(apPatterns) {
    let item = document.createElement("div")
    item.innerHTML = `dis a pattern`
    item.className = "pattern_button";
    listSideBar.appendChild(item)
};