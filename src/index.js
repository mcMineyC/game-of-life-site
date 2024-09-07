// var url = window.location.href.substring(window.location.protocol.length + 2, window.location.href.length).split('/')[0].split(':')[0];
var port = window.location.href.substring(window.location.protocol.length + 2, window.location.href.length).split('/')[0].split(':')[1];
var url = "https://eatthecow.mooo.com:5050";

refreshPatterns();

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
