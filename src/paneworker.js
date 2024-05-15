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
        html += `<div id="pane-entry-${list[i].id}" class="sidebar-pattern flex flex-row w-full">
            <div>${list[i].name}</div>
            <div class="flex-auto"></div>
            <div class="inline-block line">
                <span class="material-symbols-outlined align-middle">text_select_start</span>
                <span class="material-symbols-outlined align-middle">edit</span>
            </div>
        </div>
        <div class="divider divider-none"></div>`;
    }
    return html;
}