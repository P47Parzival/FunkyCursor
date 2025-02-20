chrome.storage.sync.get("cursor", (data) => {
    if (data.cursor) {
        document.body.style.cursor = `url(${data.cursor}), auto`;
    }
});
