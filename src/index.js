var url = window.location.href.substring(window.location.protocol.length + 2, window.location.href.length).split('/')[0].split(':')[0];
var port = window.location.href.substring(window.location.protocol.length + 2, window.location.href.length).split('/')[0].split(':')[1];
axios.get(`http://${url}:5000/patterns/get`).then((response) => {
    var patterns = response.data.patterns;
    console.log(patterns);
    populatePane(patterns);
}).catch((error) => {
    console.error(error);
});