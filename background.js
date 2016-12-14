var id = "com.hehehey.notify";
var homeUrl = "https://www.hehehey.com/";
var jumpUrl;
var sheep = new Audio("sheep.wav");
var dog = new Audio("dog.wav");

var lastUpdate = 0;
var key = "evc3h1";

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
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "https://api.hehehey.com/message.json?key=" + key, true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      var resp = JSON.parse(xhr.responseText);
      if (resp && resp.status == "ok" && resp.data.lastUpdate > lastUpdate) {
        jumpUrl = resp.data.url;
        showNotify(resp.data.opt);
        playSound();
        lastUpdate = resp.data.lastUpdate;
      }
    }
  }
  xhr.send();
}

function init() {
  chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.tabs.create({
      url: homeUrl
    });
  });
  chrome.notifications.onClicked.addListener(function() {
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
  chrome.alarms.onAlarm.addListener(function() {
    request();
  });
}

init();
