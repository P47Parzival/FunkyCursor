document.addEventListener('DOMContentLoaded', function () {
  // Sections for different cursor categories
  const defaultCursorList = document.getElementById('default-cursor-list');
  const minecraftCursorList = document.getElementById('minecraft-cursor-list');

  // Cursor categories
  const defaultCursors = [
    { file: 'cursors/cursor1.png' },
    { file: 'cursors/cursor2.png' },
    { file: 'cursors/cursor3.png' },
    { file: 'cursors/cursor4.png' }
  ];

  const minecraftCursors = [
    { file: 'cursors/minecraftbox/mcaxe.png' },
    { file: 'cursors/minecraftbox/mcpickaxe.png' },
    { file: 'cursors/minecraftbox/mcshovel.png' },
    { file: 'cursors/minecraftbox/mcsword.png' }
  ];

  function createCursorElement(cursor, container) {
    const cursorOption = document.createElement('div');
    cursorOption.className = 'cursor-option';

    const img = document.createElement('img');
    img.src = cursor.file;
    img.className = 'cursor-image';

    cursorOption.addEventListener('click', () => {
      chrome.storage.local.set({ selectedCursor: cursor.file }, () => {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
          chrome.tabs.sendMessage(tabs[0].id, { cursor: cursor.file });
        });
      });
    });

    cursorOption.appendChild(img);
    container.appendChild(cursorOption);
  }

  // Populate sections
  defaultCursors.forEach(cursor => createCursorElement(cursor, defaultCursorList));
  minecraftCursors.forEach(cursor => createCursorElement(cursor, minecraftCursorList));
});
