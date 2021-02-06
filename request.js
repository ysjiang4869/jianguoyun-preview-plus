var authCredentials = { cancel: true }
chrome.storage.local.get(['jgy_bcode'], function (result) {
    if (!result.jgy_bcode) {
        return;
    }
    updateCredentials(result.jgy_bcode);
});
chrome.webRequest.onAuthRequired.addListener(
    function handler(details) {
        //get info        
        return { authCredentials: authCredentials };
    },
    { urls: ["https://dav.jianguoyun.com/*"] },
    ['blocking']
);

function handleMessage(request, sender, sendResponse) {
    if (request.jgy_bcode) {
        console.log("update auth");
        updateCredentials(request.jgy_bcode);
    }
}

function updateCredentials(bcode) {
    var data = atob(bcode).split(':');
    authCredentials = { username: data[0], password: data[1] };
}

chrome.runtime.onMessage.addListener(handleMessage);