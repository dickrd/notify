var title, label, userKey, save, success;

// Saves options to chrome.storage.sync.
function saveOptions() {
    chrome.storage.sync.set({
        key: userKey.value
    }, function () {
        // Let user know options were saved.
        success.style.display = "inline";
        setTimeout(function () {
            success.style.display = "none";
        }, 750);
    });
}

// Restores preferences stored in chrome.storage.
function restoreOptions() {
    // Use default value.
    chrome.storage.sync.get({
        key: 'a1key'
    }, function (items) {
        document.getElementById('key').value = items.key;
    });
}

// Localize by replacing __MSG_***__ meta tags
function localizeHtmlPage() {
    title.innerText = chrome.i18n.getMessage("appName");
    label.innerText = chrome.i18n.getMessage("tipKey");
    save.innerText = chrome.i18n.getMessage("actionSave");
    success.innerText = chrome.i18n.getMessage("tipSaved");
}

function getAllElements() {
    title = document.getElementById('title');
    label = document.getElementById('key-label');
    userKey = document.getElementById('key');
    save = document.getElementById('save');
    success = document.getElementById('success');
}

document.addEventListener('DOMContentLoaded', function () {
    getAllElements();
    localizeHtmlPage();
    restoreOptions();
});
document.getElementById('save').addEventListener('click', saveOptions);
