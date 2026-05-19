// ═══════════════════════════════════════════════
// BEARS ENGINE — Cute walking bears for all pages
// ═══════════════════════════════════════════════

const BEAR_VARIANTS = [
  { body: '#c8935a', belly: '#e8b88a', cheek: '#ffb3c8' },
  { body: '#d4829a', belly: '#f0b4c8', cheek: '#ffcce0' },
  { body: '#a07ac8', belly: '#c8b0e8', cheek: '#e0caff' },
  { body: '#e8c48a', belly: '#f5dfc0', cheek: '#ffd0b0' },
  { body: '#88a8c8', belly: '#b8cce0', cheek: '#d0e8ff' },
];

const BEAR_HEARTS = ['💕','💖','💗','🌸','✨','⭐','🎀'];

function makeBearSVG(c, w, h) {
  const hx = Math.random() > 0.55 ? `<text x="40" y="-8" text-anchor="middle" font-size="13" style="animation:bhf 2.2s ease-in-out infinite">${BEAR_HEARTS[Math.floor(Math.random()*BEAR_HEARTS.length)]}</text>` : '';
  return `<svg width="${w}" height="${h}" viewBox="0 0 80 108" xmlns="http://www.w3.org/2000/svg">
  ${hx}
  <circle cx="17" cy="17" r="13" fill="${c.body}"/>
  <circle cx="63" cy="17" r="13" fill="${c.body}"/>
  <circle cx="17" cy="17" r="7" fill="${c.belly}"/>
  <circle cx="63" cy="17" r="7" fill="${c.belly}"/>
  <circle cx="40" cy="36" r="27" fill="${c.body}"/>
  <ellipse cx="40" cy="44" rx="13" ry="9" fill="${c.belly}"/>
  <circle cx="29" cy="30" r="4.5" fill="#180810"/>
  <circle cx="51" cy="30" r="4.5" fill="#180810"/>
  <circle cx="30.5" cy="28.5" r="1.8" fill="white"/>
  <circle cx="52.5" cy="28.5" r="1.8" fill="white"/>
  <ellipse cx="40" cy="41" rx="3.8" ry="2.8" fill="#180810"/>
  <path d="M34 48 Q40 54 46 48" stroke="#180810" stroke-width="1.8" fill="none" stroke-linecap="round"/>
  <circle cx="21" cy="40" r="7" fill="${c.cheek}" opacity="0.55"/>
  <circle cx="59" cy="40" r="7" fill="${c.cheek}" opacity="0.55"/>
  <ellipse cx="40" cy="84" rx="24" ry="24" fill="${c.body}"/>
  <ellipse cx="40" cy="84" rx="15" ry="16" fill="${c.belly}"/>
  <ellipse cx="11" cy="77" rx="9" ry="13" fill="${c.body}" transform="rotate(18 11 77)"/>
  <ellipse cx="69" cy="77" rx="9" ry="13" fill="${c.body}" transform="rotate(-18 69 77)"/>
  <ellipse cx="27" cy="103" rx="10" ry="11" fill="${c.body}"/>
  <ellipse cx="53" cy="103" rx="10" ry="11" fill="${c.body}"/>
</svg>`;
}

function spawnBear() {
  const stage = document.querySelector('.bears-stage');
  if (!stage) return;

  const el = document.createElement('div');
  el.className = 'bear';

  const color   = BEAR_VARIANTS[Math.floor(Math.random() * BEAR_VARIANTS.length)];
  const scale   = 0.55 + Math.random() * 0.65;
  const w       = Math.round(80 * scale);
  const h       = Math.round(108 * scale);
  const goRight = Math.random() > 0.5;
  const speed   = 70 + Math.random() * 60; // px/sec
  const screenW = window.innerWidth;
  const dist    = screenW + 250;
  const dur     = Math.round((dist / speed) * 1000);
  const bottom  = Math.random() * 18;

  el.innerHTML = makeBearSVG(color, w, h);
  el.style.bottom = bottom + 'px';
  el.style.transition = `left ${dur}ms linear`;

  if (goRight) {
    el.style.left = `-${w + 10}px`;
    el.style.transform = 'scaleX(1)';
  } else {
    el.style.left = `${screenW + 10}px`;
    el.style.transform = 'scaleX(-1)';
  }

  stage.appendChild(el);

  // Trigger walk
  requestAnimationFrame(() => requestAnimationFrame(() => {
    el.style.left = goRight ? `${screenW + 10}px` : `-${w + 10}px`;
  }));

  setTimeout(() => el.remove(), dur + 600);
}

// Inject heart float keyframe
(function() {
  const s = document.createElement('style');
  s.textContent = `@keyframes bhf{0%,100%{opacity:0;transform:translateY(0) scale(.6)}30%{opacity:1}100%{opacity:0;transform:translateY(-40px) scale(1)}}`;
  document.head.appendChild(s);
})();

function initBears() {
  if (!document.querySelector('.bears-stage')) {
    const stage = document.createElement('div');
    stage.className = 'bears-stage';
    document.body.appendChild(stage);
  }
  setTimeout(() => spawnBear(), 600);
  setTimeout(() => spawnBear(), 2200);
  setTimeout(() => spawnBear(), 4000);
  setInterval(() => spawnBear(), 5500);
}

document.addEventListener('DOMContentLoaded', initBears);
