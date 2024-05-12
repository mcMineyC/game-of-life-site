function exporter(){
  const canvas = document.getElementById('pixelCanvas');
  const ctx = canvas.getContext('2d');
  const pixelSize = 10;
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const pixelData = [];
  for (let y = 0; y < canvas.height; y += pixelSize) {
    let row = [];
    for (let x = 0; x < canvas.width; x += pixelSize) {
        const index = (x + y * imageData.width) * 4;
        const color = imageData.data.slice(index, index + 4)[0];
        row.push(color);
    }
    pixelData.push(row);
  }
  console.log(pixelData)
}