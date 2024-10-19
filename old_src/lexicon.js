function openLexicon(){
    var lexicon_popup = document.querySelector('#lexicon-popup');
    lexicon_popup.showModal();
    populateLexiconPane();
}
function populateLexiconPane(){
    var pane = document.querySelector('#lexicon-sidebar');
    if(window.lexicon == undefined){
        axios.get(`${url}/lexicon/get`).then((response) => {
            var lexicon = response.data.patterns;
            window.lexicon = lexicon;
            console.log(lexicon);
            populateLexiconPane();
        }).catch((error) => {
            console.error(error);
        });
        return;
    }else if(window.lexiworker == undefined){
        const lexiworker = new Worker('lexiconworker.js');
        window.lexiworker = lexiworker;
    }
    /*pane.innerHTML = `
        <span class="loading loading-spinner loading-lg text-primary"></span>
    `;*/
    pane.innerHTML = "";
    if(window.search_entries == undefined){
        lexiworker.postMessage({
            type: "populate",
            list: window.lexicon
        });
    }else{
        lexiworker.postMessage({
            "type": "populate",
            list: window.search_entries
        })
    }
    lexiworker.onmessage = (message) => {
        switch (message.data.type) {
            case "html":
                pane.classList.remove('skeleton');
                pane.innerHTML = message.data.html;
                attachLexiconListeners();
                break;
            case "error":
                pane.innerHTML = `
                    <div class="toast toast-error">
                        <button class="btn btn-clear float-right"></button>
                        <p>${message.data.message}</p>
                    </div>
                `;
                break;
            case "lexicon-entry":
                console.log("Changing lexicon popup")
                var entry = message.data.entry;
                var header = document.querySelector('#lexicon-details-header');
                header.innerHTML = entry['name'];
                var body = `Created by: ${entry["creator"]}<br>RLE: ${entry["rle"]}<br>Width: ${entry["xbounds"]}<br>Height: ${entry["ybounds"]}`
                document.querySelector("#lexicon-details-body").innerHTML = body
                document.querySelector("#lexicon-details-actions").classList.remove("hidden");
                break;
            case "search":
                var entry = message.data.entry;
                window.search_entries = entry;
                break;
        }
    }
    window.lexiworker = lexiworker;
}
function attachLexiconListeners(){
    console.log("Attaching lexicon listeners")
    var lexicon_sidebar = document.querySelectorAll('#lexicon-sidebar > div');
    console.log(lexicon_sidebar);
    lexicon_sidebar.forEach((e) => {
        e.querySelector('div').addEventListener('click', (e) => {
            console.log(e.target)
                var hash = e.target.getAttribute('data-hash')
                window.selected_hash = hash;
                window.lexiworker.postMessage({
                    type: "find",
                    hash: hash,
                    list: window.lexicon
                });
        });
    });
    document.querySelector('#lexicon-search-box').addEventListener('keydown', searchKeydown);
    /*
    document.querySelector('#lexicon-search-box').addEventListener('keydown', (e) => {
        window.lexiworker.postMessage({
            type: "search",
            query: e.target.value,
            backendUrl: `http://${url}:5000`
        });
    });*/
}

function searchKeydown(e){
    if(e.key == "Enter" && e.target.value == ""){
        window.lexiworker.postMessage({
            type: "populate",
            list: window.lexicon
        });
    }else if (e.key == "Enter"){
        console.log("Searching for " + e.target.value)
        window.lexiworker.postMessage({
            type: "search",
            query: e.target.value,
            backendUrl: url
        });
    }else if(e.key == "Escape"){
        e.target.value = "";
        window.lexiworker.postMessage({
            type: "populate",
            list: window.lexicon
        });
    }else if(e.target.value == ""){
        clearSearchBox();
    }else{
        if(document.querySelector("#lexicon-search-cancel-icon").classList.contains("hidden")){
            document.querySelector("#lexicon-search-cancel-icon").classList.remove("hidden");
            document.querySelector("#lexicon-search-icon").classList.add("hidden");
        }
    }
}

function clearSearchBox(){
    var sb = document.querySelector('#lexicon-search-box');
    sb.value = "";

    if(!document.querySelector("#lexicon-search-cancel-icon").classList.contains("hidden")){
        document.querySelector("#lexicon-search-cancel-icon").classList.add("hidden");
        document.querySelector("#lexicon-search-icon").classList.remove("hidden");
        window.lexiworker.postMessage({
            type: "populate",
            list: window.lexicon
        });
    }
}