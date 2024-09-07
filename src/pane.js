function renamePattern(id){
    var entry = document.querySelector(`#pane-entry-${id}-text`);
    var name = entry.innerText;
    console.log(entry)
    entry.innerHTML = `<input id="pane-entry-${id}-input" class="input input-primary" type="text" value="${name}">`;
}
function populatePane(list){
    var pane = document.querySelector('#pane-content');
    /*pane.innerHTML = `
        <span class="loading loading-spinner loading-lg text-primary"></span>
    `;*/
    pane.innerHTML = "";
    const myWorker = new Worker('paneworker.js');
    myWorker.onmessage = (message) => {
        pane.classList.remove('skeleton');
        pane.innerHTML = '<div class="divider divider-none"></div>';
        pane.innerHTML += message.data;
        attachPaneListeners();
    }
    myWorker.postMessage(list);
}
function attachPaneListeners(){
    var entries = document.querySelectorAll('.pane-entry-text');
    entries.forEach((entry) => {
        entry.addEventListener('click', (event) => {
            var id = entry.getAttribute('data-id');
            var name = entry.getAttribute('data-name');
            loadPattern(id, 'patterns');
        });
    });
}

function loadPattern(id, source){
    if(id == undefined || source == undefined){
        return;
    }
    axios.get(`${url}/${source}/get-named?id=${id}`).then((response) => {
                console.log(response)
                if(response.data.success){
                    var pattern = response.data.result;
                    var name = pattern.name;
                    var rle = pattern.rle;
                    var creator = pattern.creator;
                    var width = pattern.xbounds;
                    var height = pattern.ybounds;
                    var body = `Created by: ${creator}\nWidth: ${width}\nHeight: ${height}\nRLE: ${rle}`;
                    document.querySelector('#advanced-textarea').value = body;
                    var header = document.querySelector('#pane-title');
                    header.innerHTML = name.substring(0,1).toUpperCase()+name.substring(1);
                }else{
                    alert(response.data.error + " " + id);
                }
            }).catch((error) => {
                alert(error);
                console.error(error);
            })
}