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