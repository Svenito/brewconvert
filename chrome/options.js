// Saves options to chrome.storage
function save_options() {
	var conv = document.getElementById('conversions').value;
	chrome.storage.local.set({
		conversions: conv,
	}, function () {
		// Update status to let user know options were saved.
		var status = document.getElementById('status');
		status.textContent = 'Options saved.';
		setTimeout(function () {
			status.textContent = '';
		}, 750);
	});
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
	// Use default value color = 'red' and likesColor = true.
	chrome.storage.local.get({
		conversions: '3'
	}, function (items) {
		document.getElementById('conversions').value = items.conversions;
	});
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
	save_options);