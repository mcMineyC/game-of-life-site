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

function body_loaded() {
  Divider = document.getElementById("divider");
  sideBar = document.getElementById("sidebar");
  listSideBar = document.getElementById("listsidebar");
  mainBox = document.getElementById("mainbox");

    resizablilty();
    add_pattern(server_patterns["169b44d834c77490384040f7f18d9be7"]);
    add_pattern(server_patterns["169b44d834c77490384040f7f18d9be7"]);
    add_pattern(server_patterns["169b44d834c77490384040f7f18d9be7"]);
    add_pattern(server_patterns["169b44d834c77490384040f7f18d9be7"]);
}

//--TODO-- add border limitations so that divider cannot slide all the way to the edge of screen. use 10px marign or so.
// Done

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
  let mainWidth = getComputedStyle(
    document.querySelector("html"),
  ).getPropertyValue("--dividewidth");
  if (window.innerWidth - e.x - parseInt(mainWidth) <= 50) {
    // If mainbox width is less than 20px, don't resize
    // mainbox calculation taken from below but replaced with absolute values
    return;
  }
  sideBar.style.width = size;
  Divider.style.left = size;
  mainBox.style.width = `calc(100% - ${size} - ${mainWidth})`;

  // Life viewer resize
  canvas.width = parseInt(getComputedStyle(mainBox).width) - getScrollbarWidth();
  canvas.height = parseInt(getComputedStyle(mainBox).height);
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
    listSideBar.appendChild(item)
};

function getScrollbarWidth() {
  // Creating invisible container
  const outer = document.createElement('div');
  outer.style.visibility = 'hidden';
  outer.style.overflow = 'scroll'; // forcing scrollbar to appear
  outer.style.msOverflowStyle = 'scrollbar'; // needed for WinJS apps
  document.body.appendChild(outer);

  // Creating inner element and placing it in the container
  const inner = document.createElement('div');
  outer.appendChild(inner);
  
  // Calculating difference between container's full width and the child width
  const scrollbarWidth = (outer.offsetWidth - inner.offsetWidth);

  // Removing temporary elements from the DOM
  outer.parentNode.removeChild(outer);

  return scrollbarWidth;
    
};