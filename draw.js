let isDrawing = false;

document.addEventListener('mousedown', function(event) {
  if (event.button === 0) { // Left mouse button
    isDrawing = true;
  }
});

document.addEventListener('mouseup', function(event) {
  if (event.button === 0) { // Left mouse button
    isDrawing = false;
  }
});

document.addEventListener('mouseover', function(event) {
  if (isDrawing) {
    if (event.target.tagName.toLowerCase() === 'td') {
      if (event.target.style.backgroundColor === 'black') {
        event.target.style.backgroundColor = 'white';
      } else {
        event.target.style.backgroundColor = 'black';
      }
    }
  }
});