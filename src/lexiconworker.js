// Define the function
onmessage = (e) => {
    switch (e.data.type) {
        case "populate":
            var list = e.data.list;
            var html = generateHTML(list);
            postMessage({
                "type": "html",
                "html": html
            });
            break;
        case "find":
            var list = e.data.list;
            var hash = e.data.hash;
            var entry = list.find((entry) => {
                return entry.hash == hash;
            });
            postMessage({
                "type": "lexicon-entry",
                "entry": entry
            });
            break;
        case "search":
            var q = e.data.query;
            var backendUrl = e.data.backendUrl
            fetch(`${backendUrl}/lexicon/search?q=${q}`).then((response) => {
                return response.json();
            }).then((data) => {
                var list = data.patterns;
                var html = generateHTML(list);
                postMessage({
                    "type": "html",
                    "html": html
                });
                postMessage({
                    "type": "search",
                    entry: list
                })
            }).catch((error) => {
                postMessage({
                    "type": "error",
                    "message": error
                });
            });
    }
}

function generateHTML(list) {
    var html = '';
    for (var i = 0; i < list.length; i++) {
        html += `
            <div class="tooltip" data-tip="${list[i].name}">
                <div id="lexicon-sidebar-${list[i].hash}" class="lexicon-entry btn btn-outline" data-hash="${list[i].hash}">
                    <span data-hash="${list[i].hash}">${list[i].name}</span>
                </div>
            </div>
                
        `;
    }
    return html;
}