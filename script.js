/* ═══════════════════════════════════════════════
   HASINI'S BIRTHDAY WEBSITE — JAVASCRIPT
   ═══════════════════════════════════════════════ */

// ── 1. PARTICLE CANVAS (Floating sparkle dots) ──────────────────────
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

let particles = [];

function resizeCanvas() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

function randomBetween(a, b) { return a + Math.random() * (b - a); }

class Particle {
  constructor() { this.reset(); }
  reset() {
    this.x     = randomBetween(0, canvas.width);
    this.y     = randomBetween(0, canvas.height);
    this.size  = randomBetween(1, 3);
    this.speedY = randomBetween(-0.4, -0.15);
    this.speedX = randomBetween(-0.2, 0.2);
    this.opacity = randomBetween(0.3, 0.9);
    this.fade  = randomBetween(0.003, 0.007);
    const colors = ['#f9a825', '#e91e8c', '#f48fb1', '#ffffff', '#ffd740'];
    this.color = colors[Math.floor(Math.random() * colors.length)];
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.opacity -= this.fade;
    if (this.opacity <= 0 || this.y < -10) this.reset();
  }
  draw() {
    ctx.save();
    ctx.globalAlpha = this.opacity;
    ctx.fillStyle = this.color;
    ctx.shadowColor = this.color;
    ctx.shadowBlur = 6;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

// Create particles
for (let i = 0; i < 80; i++) {
  const p = new Particle();
  p.y = randomBetween(0, canvas.height); // spread initially
  particles.push(p);
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => { p.update(); p.draw(); });
  requestAnimationFrame(animateParticles);
}
animateParticles();


// ── 2. FLOATING HEARTS ──────────────────────────────────────────────
const heartsContainer = document.getElementById('floatingHearts');
const heartSymbols = ['💕', '💖', '💗', '💓', '🌹', '✨', '💫', '🌸'];

function createHeart() {
  const heart = document.createElement('div');
  heart.className = 'float-heart';
  heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
  heart.style.left     = randomBetween(5, 95) + '%';
  heart.style.bottom   = '-50px';
  heart.style.fontSize = randomBetween(1, 2.2) + 'rem';
  const duration = randomBetween(6, 14);
  const delay    = randomBetween(0, 4);
  heart.style.animationDuration = duration + 's';
  heart.style.animationDelay    = delay + 's';
  heartsContainer.appendChild(heart);
  setTimeout(() => heart.remove(), (duration + delay) * 1000);
}

// Spawn hearts periodically
setInterval(createHeart, 1200);
for (let i = 0; i < 6; i++) setTimeout(createHeart, i * 300);


// ── 3. SCROLL REVEAL ─────────────────────────────────────────────────
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const delay = parseInt(el.dataset.delay || '0');
      setTimeout(() => el.classList.add('visible'), delay);
      revealObserver.unobserve(el);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reason-card, .wish-card').forEach(el => {
  revealObserver.observe(el);
});


// ── 4. LETTER CARD TILT EFFECT ───────────────────────────────────────
const letterCard = document.getElementById('letterCard');
if (letterCard) {
  letterCard.addEventListener('mousemove', (e) => {
    const rect = letterCard.getBoundingClientRect();
    const cx   = rect.left + rect.width  / 2;
    const cy   = rect.top  + rect.height / 2;
    const rx   = ((e.clientY - cy) / rect.height) * 8;
    const ry   = ((e.clientX - cx) / rect.width)  * -8;
    letterCard.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;
  });
  letterCard.addEventListener('mouseleave', () => {
    letterCard.style.transform = '';
  });
}


// ── 5. CAKE CLICK → CONFETTI ─────────────────────────────────────────
const cakeBtn   = document.getElementById('cakeBtn');
const confettiEl = document.getElementById('confettiBurst');
const flames    = document.querySelectorAll('.flame');
let   blown     = false;

const confettiColors = ['#e91e8c', '#f9a825', '#f48fb1', '#ffd740', '#ffffff', '#ff80ab', '#ffcc02'];

function launchConfetti() {
  confettiEl.innerHTML = '';
  for (let i = 0; i < 60; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    piece.style.left = randomBetween(10, 90) + '%';
    piece.style.background = confettiColors[Math.floor(Math.random() * confettiColors.length)];
    piece.style.width  = randomBetween(6, 14) + 'px';
    piece.style.height = randomBetween(6, 14) + 'px';
    piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
    piece.style.animationDelay    = randomBetween(0, 0.6) + 's';
    piece.style.animationDuration = randomBetween(1.2, 2.2) + 's';
    confettiEl.appendChild(piece);
  }
  setTimeout(() => confettiEl.innerHTML = '', 3000);
}

if (cakeBtn) {
  cakeBtn.addEventListener('click', () => {
    if (!blown) {
      // Blow out candles
      flames.forEach(f => {
        f.style.opacity = '0';
        f.style.transform = 'scale(0)';
        f.style.transition = 'all 0.3s ease';
      });
      blown = true;
      document.querySelector('.cake-hint').textContent = '🎉 Happy Birthday Hasini! 🎂';
    } else {
      // Relight
      flames.forEach(f => {
        f.style.opacity = '';
        f.style.transform = '';
        f.style.transition = '';
      });
      blown = false;
      document.querySelector('.cake-hint').textContent = '🎉 Click the cake to celebrate!';
    }
    launchConfetti();

    // Screen flash
    const flash = document.createElement('div');
    flash.style.cssText = `
      position: fixed; inset: 0;
      background: radial-gradient(circle, rgba(249,168,37,0.3), rgba(194,24,91,0.2), transparent);
      pointer-events: none; z-index: 9999;
      animation: flashOut 0.8s ease forwards;
    `;
    const style = document.createElement('style');
    style.textContent = `@keyframes flashOut { from { opacity:1; } to { opacity:0; } }`;
    document.head.appendChild(style);
    document.body.appendChild(flash);
    setTimeout(() => { flash.remove(); style.remove(); }, 900);
  });
}


// ── 6. GALLERY LIGHTBOX ──────────────────────────────────────────────
function setupLightbox() {
  const galleryCards = document.querySelectorAll('.gallery-card:not(.placeholder-card)');

  if (galleryCards.length === 0) return; // no real photos yet

  const overlay = document.createElement('div');
  overlay.id = 'lightboxOverlay';
  overlay.style.cssText = `
    display:none; position:fixed; inset:0; z-index:10000;
    background:rgba(10,4,8,0.95); backdrop-filter:blur(12px);
    align-items:center; justify-content:center; padding:2rem;
    cursor: zoom-out;
  `;

  const img = document.createElement('img');
  img.id = 'lightboxImg';
  img.style.cssText = `
    max-width:90vw; max-height:85vh;
    border-radius:16px;
    box-shadow: 0 0 60px rgba(194,24,91,0.5);
    object-fit:contain;
    animation: lightboxIn 0.3s ease;
  `;

  const caption = document.createElement('p');
  caption.id = 'lightboxCaption';
  caption.style.cssText = `
    position:absolute; bottom:2rem; left:50%; transform:translateX(-50%);
    font-family:'Playfair Display',serif; font-style:italic;
    color:#f9a825; font-size:1.1rem; text-align:center;
  `;

  const style = document.createElement('style');
  style.textContent = `@keyframes lightboxIn { from { opacity:0; transform:scale(0.9); } to { opacity:1; transform:scale(1); } }`;
  document.head.appendChild(style);

  overlay.appendChild(img);
  overlay.appendChild(caption);
  document.body.appendChild(overlay);

  galleryCards.forEach(card => {
    card.style.cursor = 'zoom-in';
    card.addEventListener('click', () => {
      img.src = card.querySelector('img').src;
      caption.textContent = card.querySelector('.gallery-caption')?.textContent || '';
      overlay.style.display = 'flex';
    });
  });

  overlay.addEventListener('click', () => overlay.style.display = 'none');
  document.addEventListener('keydown', e => { if (e.key === 'Escape') overlay.style.display = 'none'; });
}
setupLightbox();


// ── 7. DYNAMIC DATE ───────────────────────────────────────────────────
(function() {
  const badge = document.getElementById('dateBadge');
  if (!badge) return;
  const now = new Date();
  const opts = { year: 'numeric', month: 'long', day: 'numeric' };
  badge.textContent = `✨ ${now.toLocaleDateString('en-US', opts)} ✨`;
})();


// ── 8. SMOOTH SCROLL FOR CTA ──────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});


// ── 9. CURSOR SPARKLE TRAIL ───────────────────────────────────────────
(function() {
  const sparkles = ['✨', '💕', '🌸', '⭐', '💫'];
  let lastTime = 0;
  document.addEventListener('mousemove', (e) => {
    const now = Date.now();
    if (now - lastTime < 120) return; // throttle
    lastTime = now;

    const spark = document.createElement('div');
    spark.textContent = sparkles[Math.floor(Math.random() * sparkles.length)];
    spark.style.cssText = `
      position: fixed;
      left: ${e.clientX - 10}px;
      top: ${e.clientY - 10}px;
      font-size: ${randomBetween(0.8, 1.4)}rem;
      pointer-events: none;
      z-index: 9999;
      animation: sparkTrail 0.8s ease forwards;
    `;
    document.body.appendChild(spark);
    setTimeout(() => spark.remove(), 850);
  });

  const trailStyle = document.createElement('style');
  trailStyle.textContent = `
    @keyframes sparkTrail {
      0%   { opacity: 1; transform: translateY(0) scale(1); }
      100% { opacity: 0; transform: translateY(-30px) scale(0.3); }
    }
  `;
  document.head.appendChild(trailStyle);
})();

console.log('%c💕 Happy Birthday Hasini! 💕', 'color: #e91e8c; font-size: 24px; font-weight: bold; font-family: Georgia, serif;');
