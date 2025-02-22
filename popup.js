document.addEventListener('DOMContentLoaded', function () {
  // Sections for different cursor categories
  const defaultCursorList = document.getElementById('default-cursor-list');
  const minecraftCursorList = document.getElementById('minecraft-cursor-list');
  const gunsCursorList = document.getElementById('guns-cursor-list');
  const physicalCursorList = document.getElementById('physical-cursor-list');
  const resetCursorButton = document.getElementById('reset-cursor'); // Add reset button reference

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

  const gunsCursors = [
    { file: 'cursors/gunbox/gun1.png' },
    { file: 'cursors/gunbox/gun2.png' },
    { file: 'cursors/gunbox/gun3.png' },
    { file: 'cursors/gunbox/gun4.png' }
  ];

  const physicalCursor = [
    { file: 'cursors/physicalbox/physical1.png' },
    { file: 'cursors/physicalbox/physical2.png' },
    { file: 'cursors/physicalbox/physical3.png' },
    { file: 'cursors/physicalbox/physical4.png' }
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
  gunsCursors.forEach(cursor => createCursorElement(cursor, gunsCursorList));
  physicalCursor.forEach(cursor => createCursorElement(cursor, physicalCursorList));

  // Handle cursor reset
  resetCursorButton.addEventListener('click', function () {
    chrome.storage.local.remove('selectedCursor', () => {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { cursor: 'default' });
      });
    });
  });
});
