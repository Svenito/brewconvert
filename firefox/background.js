function onCreated() {
  if (browser.runtime.lastError) {
    console.log(`Error: ${browser.runtime.lastError}`);
  } else {
    console.log("Item created successfully");
  }
}

browser.runtime.onMessage.addListener(notify);
function notify(x) {
  browser.contextMenus.removeAll();
  results = convert(x["text"]);

  for (var i=0; i < results.length; i++) {
    createMenuItem(results[i]["name"], results[i]["value"]);
  }
}

function createMenuItem(name, val) {
  browser.contextMenus.create({
    id: name,
    title: val,
    contexts: ["selection"]
  }, onCreated);
}
