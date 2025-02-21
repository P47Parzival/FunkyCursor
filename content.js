// all the tags of html "input, textarea, select, button, a, svg, img, div, span, p, h1, h2, h3, h4, h5, h6, ul, ol, li, table, tr, td, th, form, label, iframe, canvas, video, audio, embed, object, article, aside, details, figcaption, figure, footer, header, main, mark, nav, section, summary, time, blockquote, pre, code, kbd, samp, var, b, i, u, small, strong, em, abbr, cite, dfn, q, sub, sup, ins, del, s, address, bdo, bdi, ruby, rt, rp, wbr, area, map, track, meter, progress, output, datalist, keygen, command, menu, dialog"

function applyCursor(cursorFile) {
  const cursorUrl = chrome.runtime.getURL(cursorFile);
  console.log("Applying Cursor URL:", cursorUrl);

  const customCursor = `url(${cursorUrl}) 10 10, auto`;

  document.body.style.cursor = customCursor;

  document.querySelectorAll("input, textarea, select, button, a, svg, img, div, span, p, h1, h2, h3, h4, h5, h6, ul, ol, li, table, tr, td, th, form, label, iframe, canvas, video, audio, embed, object, article, aside, details, figcaption, figure, footer, header, main, mark, nav, section, summary, time, blockquote, pre, code, kbd, samp, var, b, i, u, small, strong, em, abbr, cite, dfn, q, sub, sup, ins, del, s, address, bdo, bdi, ruby, rt, rp, wbr, area, map, track, meter, progress, output, datalist, keygen, command, menu, dialog").forEach(element => {
      element.style.cursor = customCursor;
  });
}

// Listen for messages (when user selects a cursor)
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.cursor) {
      chrome.storage.local.set({ selectedCursor: request.cursor }); // Save to storage
      applyCursor(request.cursor);
  }
});

// When a page loads, check for a stored cursor and apply it
chrome.storage.local.get("selectedCursor", function (data) {
  if (data.selectedCursor) {
      applyCursor(data.selectedCursor);
  }
});

