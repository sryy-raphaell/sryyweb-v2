const cursor = document.getElementById("cursor");
const ring = document.getElementById("cursorRing");
let mx = 0,
  my = 0,
  rx = 0,
  ry = 0;
document.addEventListener("mousemove", (e) => {
  mx = e.clientX;
  my = e.clientY;
  cursor.style.left = mx + "px";
  cursor.style.top = my + "px";
});
(function tick() {
  rx += (mx - rx) * 0.1;
  ry += (my - ry) * 0.1;
  ring.style.left = rx + "px";
  ring.style.top = ry + "px";
  requestAnimationFrame(tick);
})();
document
  .querySelectorAll("a,button,.skill-card,.project-table tr")
  .forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursor.style.width = "20px";
      cursor.style.height = "20px";
    });
    el.addEventListener("mouseleave", () => {
      cursor.style.width = "8px";
      cursor.style.height = "8px";
    });
  });
