var id = "com.hehehey.notify";
var homeUrl = "https://www.hehehey.com/";
var messageUrl = "https://api.hehehey.com/message.json?key=";
var jumpUrl;
var sheep = new Audio("/audio/sheep.wav");
var dog = new Audio("/audio/dog.wav");

var lastUpdate = 0;

function showNotify(opt) {
    if (!opt) {
        opt = {
            type: "basic",
            title: "Yes!",
            message: "A new notification!",
            iconUrl: "icon.png"
        };
    }
    chrome.notifications.create(id, opt, null);
}

function playSound() {
    if (Math.random() > 0.5)
        dog.play();
    else
        sheep.play();
}

function request() {
    chrome.storage.sync.get({
        key: 'a1key'
    }, function (items) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", messageUrl + items.key, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                var resp = JSON.parse(xhr.responseText);
                if (resp && resp.status == "ok" && resp.data.lastUpdate > lastUpdate) {
                    jumpUrl = resp.data.url;
                    showNotify(resp.data.opt);
                    playSound();
                    lastUpdate = resp.data.lastUpdate;
                }
            }
        };
        xhr.send();
    });
}

function init() {
    chrome.browserAction.onClicked.addListener(function () {
        chrome.tabs.create({
            url: homeUrl
        });
    });
    chrome.notifications.onClicked.addListener(function () {
        if (jumpUrl) {
            chrome.tabs.create({
                url: jumpUrl
            });
            chrome.notifications.clear(id);
        }
    });

    chrome.alarms.create(id, {
        when: Date.now(),
        periodInMinutes: 1
    });
    chrome.alarms.onAlarm.addListener(function () {
        request();
    });
}

init();
