/* ===================================================================
   WISHING WELL — Scroll-driven parallax
   Section 10: parallax only — well is always visible as cutaway diorama.
   Passive listener + rAF for performant CSS custom property updates.
   =================================================================== */

const journey = document.querySelector('.scroll-journey');

let ticking = false;

function updateScrollProgress() {
  if (!journey) return;
  const start = journey.offsetTop;
  const total = Math.max(1, journey.offsetHeight - window.innerHeight);
  const progress = Math.min(1, Math.max(0, (window.scrollY - start) / total));
  document.documentElement.style.setProperty('--scroll-progress', progress.toFixed(4));
  ticking = false;
}

function onScroll() {
  if (!ticking) {
    ticking = true;
    requestAnimationFrame(updateScrollProgress);
  }
}

window.addEventListener('scroll', onScroll, { passive: true });
window.addEventListener('resize', updateScrollProgress);
updateScrollProgress();
