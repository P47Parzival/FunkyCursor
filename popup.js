// document.addEventListener('DOMContentLoaded', function () {
//   const cursorList = document.getElementById('cursor-list');

//   // List of available cursors
//   const cursors = [
//     { name: 'Cursor 1', file: 'cursors/cursor1.png' },
//     { name: 'Cursor 2', file: 'cursors/cursor2.png' },
//     { name: 'Cursor 3', file: 'cursors/cursor3.png' }
//   ];

//   // Dynamically create cursor options
//   cursors.forEach(cursor => {
//     const cursorOption = document.createElement('div');
//     cursorOption.className = 'cursor-option';
//     cursorOption.textContent = cursor.name;
//     cursorOption.addEventListener('click', () => {
//       chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//         chrome.tabs.sendMessage(tabs[0].id, { cursor: cursor.file });
//       });
//     });
//     cursorList.appendChild(cursorOption);
//   });
// });

document.addEventListener('DOMContentLoaded', function () {
  const cursorList = document.getElementById('cursor-list');

  // List of available cursors
  const cursors = [
    { name: 'Cursor 1', file: 'cursors/cursor1.png' },
    { name: 'Cursor 2', file: 'cursors/cursor2.png' },
    { name: 'Cursor 3', file: 'cursors/cursor3.png' },
    { name: 'Cursor 4', file: 'cursors/cursor4.png' },
    { name: 'Cursor 5', file: 'cursors/cursor5.png' }
  ];

  // Dynamically create cursor options
  cursors.forEach(cursor => {
    const cursorOption = document.createElement('div');
    cursorOption.className = 'cursor-option';

    // Create an image element
    const img = document.createElement('img');
    img.src = cursor.file;
    img.className = 'cursor-image';

    // Create a text label
    const text = document.createElement('span');
    text.textContent = cursor.name;
    text.className = 'cursor-text';

    // Add event listener to the whole div (both image and text are clickable)
    cursorOption.addEventListener('click', () => {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { cursor: cursor.file });
      });
    });

    // Append elements to cursorOption div
    cursorOption.appendChild(img);
    cursorOption.appendChild(text);

    // Add cursor option to the list
    cursorList.appendChild(cursorOption);
  });
});
