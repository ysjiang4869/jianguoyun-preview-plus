
window.onload = async function () {
    var monitorButtonRow = document.getElementsByClassName('action-button-rou')[1]
    while (!monitorButtonRow) {
        await new Promise(resolve => setTimeout(resolve, 100));
        monitorButtonRow = document.getElementsByClassName('action-button-rou')[1]       
    }
    // 创建一个观察器实例并传入回调函数
    const observer = new MutationObserver(callback);
    // 以上述配置开始观察目标节点
    observer.observe(monitorButtonRow, config);
}

// 观察器的配置（需要观察什么变动）
const config = { attributes: false, childList: true, subtree: false };
var buttonAdded = false;
// 当观察到变动时执行的回调函数
const callback = function (mutationsList, observer) {
    // Use traditional 'for loops' for IE 11
    // console.log(mutationsList);
    //some item selected
    //check if only one selected
    var selected = document.getElementsByClassName('cube-wrap selected');
    console.log[selected]
    if (selected.length === 1) {
        //judge is select is video
        var file_name = getFileName(selected[0]);
        if (file_name.match(/.(jpg|jpeg|png|gif)$/i)) {
            appendButton();
            console.log(getFilePath());
        }
    } else {
        removeButton();
    }
};

function appendButton() {
    if (buttonAdded) {
        return;
    }
    var a = document.getElementsByClassName('action-button-rou')[1];
    let previewSpan = document.createElement('span');
    previewSpan.setAttribute("class", "btn-text");
    previewSpan.textContent = "预览+";

    let previewButton = document.createElement('button');
    previewButton.setAttribute("class", "btn-item");
    previewButton.setAttribute("id", "jgy_preview_plus");
    previewButton.appendChild(previewSpan);
    previewButton.onclick = showPreview
    a.appendChild(previewButton);
    buttonAdded = true;
}

function removeButton() {
    if (buttonAdded) {
        var elem = document.getElementById('jgy_preview_plus');
        elem.parentNode.removeChild(elem);
        buttonAdded = false;
    }
}

function getFileName(node) {
    for (let child of node.parentNode.childNodes) {
        if (child.getAttribute('class') === 'file-name') {
            return child.childNodes[0].textContent.trim();
        }
    }
    return "";
}

function getFilePath() {
    var pathNode = document.getElementsByClassName('explorer-list-header')[0];
    return pathNode.getAttribute('patharr');
}


function showPreview() {
    
}

function createElementFromHTML(htmlString) {
    var div = document.createElement('div');
    div.innerHTML = htmlString.trim();

    // Change this to div.childNodes to support multiple top-level nodes
    return div.firstChild;
}