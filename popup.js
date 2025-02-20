document.querySelectorAll('.cursor-option').forEach(cursor => {
    cursor.addEventListener('click', function () {
        let cursorFile = this.getAttribute('data-cursor');  // Example: "cursors/cursor1.png"
        let cursorPath = chrome.runtime.getURL(cursorFile); // Get correct local URL

        // Save the cursor path in Chrome storage
        chrome.storage.sync.set({ cursor: cursorPath });

        // Send message to content script to update cursor
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs.length === 0 || tabs[0].url.startsWith("chrome://")) {
                console.warn("Cannot inject script on a chrome:// page.");
                return; // Prevent errors
            }

            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                func: updateCursor,
                args: [cursorPath]
            });
        });
    });
});

function updateCursor(cursorUrl) {
    document.body.style.cursor = `url(${cursorUrl}), auto`;
}
