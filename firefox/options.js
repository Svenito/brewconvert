function saveOptions(e) {
	e.preventDefault();
	var e = document.getElementById("conversions");
	var conv = e.options[e.selectedIndex].value;
	console.log(conv);
	browser.storage.local.set({
		conversions: conv
	});
}

function restoreOptions() {

	function setCurrentChoice(result) {
		document.getElementById("conversions").value = result.conversions || 3;
	}

	function onError(error) {
		console.log(`Error: ${error}`);
	}

	var getting = browser.storage.local.get("conversions");
	getting.then(setCurrentChoice, onError);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);