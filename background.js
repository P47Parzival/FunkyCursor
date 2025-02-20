chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === "complete" && tab.url && !tab.url.startsWith("chrome://")) {
        chrome.storage.sync.get("cursor", (data) => {
            if (data.cursor) {
                chrome.scripting.executeScript({
                    target: { tabId: tabId },
                    func: updateCursor,
                    args: [data.cursor]
                });
            }
        });
    }
});

function updateCursor(cursorUrl) {
    document.body.style.cursor = `url(${cursorUrl}), auto`;
}
