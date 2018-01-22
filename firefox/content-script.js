window.addEventListener("mouseup", notifyExtension);

function notifyExtension(e) {
    browser.runtime.sendMessage({"text": window.getSelection().toString()});
}
