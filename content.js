chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.cursor) {
    const cursorUrl = chrome.runtime.getURL(request.cursor);
    console.log("Cursor URL:", cursorUrl); // Debugging: Log the URL

    // Check if the file is accessible
    fetch(cursorUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        document.body.style.cursor = `url(${cursorUrl}) 10 10, auto`;
      })
      .catch(error => {
        console.error("Failed to load cursor:", error);
      });
  }
});
