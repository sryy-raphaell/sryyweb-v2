const cloudLeft = document.querySelector(".cloud-left");
// Mengambil elemen awan kiri dari DOM (disimpan agar tidak query berulang)

const cloudRight = document.querySelector(".cloud-right");
// Mengambil elemen awan kanan dari DOM

window.addEventListener("scroll", () => {
  // Event listener yang berjalan setiap halaman di-scroll

  const scroll = window.scrollY;
  // Menyimpan posisi scroll vertikal saat ini (dalam pixel)

  if (cloudLeft)
    cloudLeft.style.transform = `translateY(${scroll * -0.2}px) scaleX(-1)`;
  // Jika elemen ada, geser ke atas dengan kecepatan 0.2x dari scroll (efek parallax)

  if (cloudRight)
    cloudRight.style.transform = `translateY(${scroll * -0.25}px)`;
  // Geser awan kanan sedikit lebih cepat (0.25x) untuk memberi ilusi kedalaman berbeda
});

const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  if (window.scrollY > 60) {
    navbar.style.background = "rgba(4,5,15,0.92)";
    navbar.style.backdropFilter = "blur(20px)";
  } else {
    navbar.style.background = "transparent";
    navbar.style.backdropFilter = "none";
  }
});

/* ── STARFIELD ── */
const canvas = document.getElementById("starCanvas");
const ctx = canvas.getContext("2d");
let W, H;
function resize() {
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
  initStars();
}

class Star {
  constructor() {
    this.reset(true);
  }
  reset(init) {
    this.x = Math.random() * W;
    this.y = init ? Math.random() * H : Math.random() * H;
    this.r = Math.random() * 1.8 + 0.2;
    this.baseAlpha = Math.random() * 0.8 + 0.2;
    this.alpha = this.baseAlpha;
    this.twinkleSpeed = Math.random() * 0.02 + 0.005;
    this.twinkleOffset = Math.random() * Math.PI * 2;
    this.age = 0;
    // color: mostly white-blue, some purple
    const t = Math.random();
    if (t < 0.6)
      this.color = "232,240,255"; // white-blue
    else if (t < 0.85)
      this.color = "168,196,255"; // blue
    else this.color = "201,168,255"; // purple
  }
  update(t) {
    this.alpha =
      this.baseAlpha *
      (0.5 + 0.5 * Math.sin(t * this.twinkleSpeed + this.twinkleOffset));
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${this.color},${this.alpha})`;
    if (this.r > 1.2) {
      ctx.shadowBlur = 6;
      ctx.shadowColor = `rgba(${this.color},.6)`;
    }
    ctx.fill();
    ctx.shadowBlur = 0;
  }
}

/* Shooting star */
class ShootingStar {
  constructor() {
    this.reset();
  }
  reset() {
    this.x = Math.random() * W * 0.8;
    this.y = Math.random() * H * 0.4;
    this.len = Math.random() * 140 + 60;
    this.speed = Math.random() * 12 + 8;
    this.angle = Math.PI / 6 + Math.random() * 0.3;
    this.alpha = 0;
    this.active = false;
    this.timer = 0;
    this.nextFire = Math.random() * 400 + 200;
  }
  update() {
    this.timer++;
    if (!this.active && this.timer > this.nextFire) {
      this.active = true;
      this.alpha = 1;
      this.timer = 0;
    }
    if (this.active) {
      this.x += Math.cos(this.angle) * this.speed;
      this.y += Math.sin(this.angle) * this.speed;
      this.alpha -= 0.035;
      if (this.alpha <= 0) this.reset();
    }
  }
  draw() {
    if (!this.active || this.alpha <= 0) return;
    const tx = this.x - Math.cos(this.angle) * this.len;
    const ty = this.y - Math.sin(this.angle) * this.len;
    const grad = ctx.createLinearGradient(tx, ty, this.x, this.y);
    grad.addColorStop(0, "rgba(232,240,255,0)");
    grad.addColorStop(1, `rgba(232,240,255,${this.alpha})`);
    ctx.beginPath();
    ctx.moveTo(tx, ty);
    ctx.lineTo(this.x, this.y);
    ctx.strokeStyle = grad;
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }
}

let stars = [],
  shooters = [];
function initStars() {
  stars = Array.from({ length: 280 }, () => new Star());
  shooters = Array.from({ length: 4 }, () => new ShootingStar());
}
resize();
window.addEventListener("resize", resize);

let t = 0;
(function anim() {
  ctx.clearRect(0, 0, W, H);
  t += 1;
  stars.forEach((s) => {
    s.update(t);
    s.draw();
  });
  shooters.forEach((s) => {
    s.update();
    s.draw();
  });
  requestAnimationFrame(anim);
})();
