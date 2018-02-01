chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		chrome.storage.local.get("conversions", function (data) {
			chrome.contextMenus.removeAll();
			var conversions = 3;
			if (data['conversions']) {
				conversions = data['conversions'];
			}
			results = convert(request.selection, parseInt(conversions));

			for (var i = 0; i < results.length; i++) {
				createMenuItem(results[i]["name"], results[i]["value"]);
			}
		});
	});

function createMenuItem(name, val) {
	chrome.contextMenus.create({
		"id": name,
		"title": val,
		"contexts": ["selection"]
	});
}
