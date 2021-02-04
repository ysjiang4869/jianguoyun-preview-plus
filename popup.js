document.addEventListener('DOMContentLoaded', documentEvents, false);

function myAction(input) {
    console.log("input value is : " + input.value);
    alert("The entered data is : " + input.value);
    // do processing with data
    // you need to right click the extension icon and choose "inspect popup"
    // to view the messages appearing on the console.
}

function documentEvents() {
    document.getElementById('ok_btn').addEventListener('click',
        function () {
            var account = document.getElementById('account_box').value;
            var code = document.getElementById('code_box').value;
            var auth = btoa(account + ':' + code);
            alert(auth);
            chrome.storage.local.set({ jgy_bcode: auth }, function () {
                alert('saved success');
            });
        });

    // you can add listeners for other objects ( like other buttons ) here 
}