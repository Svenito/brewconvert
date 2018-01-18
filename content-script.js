window.addEventListener("mouseup", notifyExtension);

function notifyExtension(e) {
    console.log(e);
    console.log(window.getSelection().toString());
    browser.runtime.sendMessage({"text": window.getSelection().toString()});

}
