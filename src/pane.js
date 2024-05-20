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
    myWorker.postMessage(list);
    myWorker.onmessage = (message) => {
        pane.classList.remove('skeleton');
        pane.innerHTML = '<div class="divider divider-none"></div>';
        pane.innerHTML += message.data;
    }
}