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
//All code below is by Mixel-MurP-427 and possibly inspired by Tivotal (see credits)

console.log('Javascript is online!')

function moveDivider () {
    

    var Divider = document.querySelector(".divider");
    var sideBar = document.querySelector(".sidebar");
    var mainBox = document.querySelector(".mainbox");

    function resize (e) {
        let size = `${e.x}px`;
        sideBar.style.width = size;
        Divider.style.left = size;
        mainBox.style.width = `calc(100% - ${size})`;
    };

    //Divider.addEventListener("mousedown", () => {
        document.addEventListener("mousemove", resize, false);
        console.log('moving');
        };

Divider.addEventListener("mouseup", () => {
    document.removeEventListener("mousemove", resize, false);
});