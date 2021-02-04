
window.onload = async function () {
    var monitorButtonRow = document.getElementsByClassName('action-button-rou')[1]
    while (!monitorButtonRow) {
        await new Promise(resolve => setTimeout(resolve, 100));
        monitorButtonRow = document.getElementsByClassName('action-button-rou')[1]
    }
    document.body.appendChild(createElementFromHTML(modleHtml));
    // 创建一个观察器实例并传入回调函数
    const observer = new MutationObserver(callback);
    // 以上述配置开始观察目标节点
    observer.observe(monitorButtonRow, config);
}

// 观察器的配置（需要观察什么变动）
const config = { attributes: false, childList: true, subtree: false };
var buttonAdded = false;
// 当观察到变动时执行的回调函数
var file_name;
const callback = function (mutationsList, observer) {
    // Use traditional 'for loops' for IE 11
    // console.log(mutationsList);
    //some item selected
    //check if only one selected
    var selected = document.getElementsByClassName('cube-wrap selected');
    console.log[selected]
    if (selected.length === 1) {
        //judge is select is video
        file_name = getFileName(selected[0]);
        if (file_name.match(/.(mp4|mov|mpeg|rmvb)$/i)) {
            appendButton();
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
    previewButton.setAttribute('data-toggle', 'modal');
    previewButton.setAttribute('data-target', '#videoModal');
    previewButton.onclick = showPreview;
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
    return pathNode.getAttribute('patharr').trim();
}

const basic
function showPreview() {
    //just get the url and add to
    var url = 'http://127.0.0.1:8092/jianguoyun/video/preview?paths=' 
    + getFilePath() + '&file=' + file_name+'&auth='+auth;
    var videoElem = document.getElementById('jgy-video');
    videoElem.setAttribute('src', url);
}

function createElementFromHTML(htmlString) {
    var div = document.createElement('div');
    div.innerHTML = htmlString.trim();

    // Change this to div.childNodes to support multiple top-level nodes
    return div.firstChild;
}

const modleHtml = '<div class="modal fade" id="videoModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"> \
<div class="modal-dialog"> \
  <div class="modal-content"> \
    <div class="modal-body"> \
      <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button> \
      <video id="jgy-video" controls width="100%"> \
        <source src="" type="video/mp4"> \
      </video> \
    </div> \
  </div> \
</div> \
</div> ';

document.head.appendChild(createElementFromHTML('<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css">'));