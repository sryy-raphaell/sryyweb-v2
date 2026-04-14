/* ── HELLO TEXT ── */
const texts = [
  "Hello World",
  "Halo Dunia",
  "こんにちは世界",
  "Bonjour le monde",
  "Hola Mundo",
];
let hi = 0;
const helloEl = document.getElementById("helloText");
setInterval(() => {
  helloEl.style.opacity = "0";
  setTimeout(() => {
    hi = (hi + 1) % texts.length;
    helloEl.textContent = texts[hi];
    helloEl.style.opacity = "1";
  }, 400);
}, 1600);
