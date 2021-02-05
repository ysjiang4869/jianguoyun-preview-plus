var authCredentials = { cancel: true }
chrome.storage.local.get(['jgy_bcode'], function (result) {
    if (!result.jgy_bcode) {
        return;
    }
    var data = atob(result.jgy_bcode).split(':');
    authCredentials = { username: data[0], password: data[1] };
});
chrome.webRequest.onAuthRequired.addListener(
    function handler(details) {
        //get info        
        return { authCredentials: authCredentials };
    },
    { urls: ["<all_urls>"] },
    ['blocking']
);