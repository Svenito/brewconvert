function onCreated() {
	if (browser.runtime.lastError) {
		console.log(`Error: ${browser.runtime.lastError}`);
	} else {
		//console.log("Item created successfully");
	}
}

browser.runtime.onMessage.addListener(notify);

function notify(x) {
	var getting = browser.storage.local.get("conversions");
	getting.then(function(data) {
		browser.contextMenus.removeAll();
		var conversions = 3;
		if (data.conversions) {
			conversions = parseInt(data.conversions);
		}

		results = convert(x["text"], conversions);

		for (var i = 0; i < results.length; i++) {
			createMenuItem(results[i]["name"], results[i]["value"]);
		}
	});
}

function createMenuItem(name, val) {
	browser.contextMenus.create({
		id: name,
		title: val,
		contexts: ["selection"]
	}, onCreated);
}
