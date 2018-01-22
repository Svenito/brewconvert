window.addEventListener("mouseup", notifyExtension);

function notifyExtension(e) {
    chrome.runtime.sendMessage({selection: window.getSelection().toString()});
}