// Define the function
onmessage = (e) => {
    console.log("Worker received message:");
    console.log(e.data);
    var list = e.data;
    var html = generateHTML(list);
    postMessage(html);
}

function generateHTML(list) {
    var html = '';
    for (var i = 0; i < list.length; i++) {
        html += `<div id="pane-entry-${list[i].hash}" class="sidebar-pattern flex flex-row w-full">
            <div id="pane-entry-${list[i].hash}-text" class="tootltip pane-entry-text flex-1 line-clamp-1" data-tip="${list[i].name}">${list[i].name}</div>
            <div class="inline-block line select-none">
                <span class="material-symbols-outlined align-middle cursor-pointer">text_select_start</span>
                <span class="material-symbols-outlined align-middle cursor-pointer">edit</span>
            </div>
        </div>
        <div class="divider divider-none"></div>`;
    }
    return html;
}