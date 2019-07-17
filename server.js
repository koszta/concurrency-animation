const http = require('http');
const nativeCanvas = require('native-canvas');
const block = (ms) => {
  const waitTill = new Date(new Date().getTime() + ms);
  while (waitTill > new Date()) {}
};
const imageFiles = [
  'hasselhof-0.png',
  'hasselhof-1.png',
  'hasselhof-2.png',
  'hasselhof-3.png',
  'hasselhof-4.png',
  'hasselhof-5.png',
  'hasselhof-6.png',
  'hasselhof-7.png',
  'hasselhof-8.png',
  'hasselhof-9.png',
  'hasselhof-10.png',
  'hasselhof-11.png',
  'hasselhof-12.png',
];
const imageCount = imageFiles.length;

global.window.close();

const window = nativeCanvas.createWindow({ title: 'Hasselhof', fitCanvasInWindow: true, width: 1120, height: 696 });
const { canvas } = window;
const ctx = canvas.getContext('2d');

ctx.scale(4, 4);

Promise.all(imageFiles.map(imageFile => window.loadImage(imageFile))).then((images) => {
  let currentIndex = 0;
  setInterval(() => {
    ctx.drawImage(images[currentIndex], 0, 0);
    currentIndex++;
    if (currentIndex >= imageCount) currentIndex = 0;
  }, 40);
});

http.createServer((req, res) => {
  const [digits] = req.url.match(/\d+/) || [];
  const ms = Number(digits) || 100;
  block(ms);

  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end(`${ms}`);
}).listen(3333);
