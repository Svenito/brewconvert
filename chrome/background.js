

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      chrome.contextMenus.removeAll();
      results = convert(request.selection);

      for (var i=0; i < results.length; i++) {
        createMenuItem(results[i]["name"], results[i]["value"]);
      }
    }
);

function createMenuItem(name, val) {
    console.log(name, val);
    chrome.contextMenus.create({
      "id": name,
      "title": val,
      "contexts": ["selection"]
    });
  }
