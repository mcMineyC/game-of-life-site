var url = window.location.href.substring(window.location.protocol.length + 2, window.location.href.length).split('/')[0].split(':')[0];
var port = window.location.href.substring(window.location.protocol.length + 2, window.location.href.length).split('/')[0].split(':')[1];

refreshPatterns();

function refreshPatterns() {
    axios.get(`http://${url}:5000/patterns/get`).then((response) => {
        var patterns = response.data.patterns;
        window.patterns = patterns;
        console.log(patterns);
        populatePane(patterns);
    }).catch((error) => {
        console.error(error);
    });
    axios.get(`http://${url}:5000/lexicon/get`).then((response) => {
        var lexicon = response.data.patterns;
        window.lexicon = lexicon;
        console.log(lexicon);
    }).catch((error) => {
        console.error(error);
    });
}
