// Saves options to chrome.storage.sync.
function save_options() {
    var userKey = document.getElementById('key').value;
    chrome.storage.sync.set({
        key: userKey
    }, function () {
        // Update status to let user know options were saved.
        var status = document.getElementById('success');
        status.style.display = "inline";
        setTimeout(function () {
            status.style.display = "none";
        }, 750);
    });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
    // Use default value.
    chrome.storage.sync.get({
        key: 'a1key'
    }, function (items) {
        document.getElementById('key').value = items.key;
    });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);
