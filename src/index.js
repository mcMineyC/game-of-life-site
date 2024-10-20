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
var mainBox

function body_loaded () {
    resizablilty();
};


//fires once to initialize sidebar resizing feature
function resizablilty () { // creadit: https://github.com/Tivotal/Resizable-Sidebar-Menu-with-Theme-Toggle-in-HTML-CSS-and-JavaScript
    Divider = document.querySelector(".divider");
    sideBar = document.querySelector(".sidebar");
    mainBox = document.querySelector(".mainbox");

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