const journey = document.querySelector('.scroll-journey');

function updateScrollProgress() {
  if (!journey) return;
  const start = journey.offsetTop;
  const total = Math.max(1, journey.offsetHeight - window.innerHeight);
  const progress = Math.min(1, Math.max(0, (window.scrollY - start) / total));
  document.documentElement.style.setProperty('--scroll-progress', progress.toFixed(4));
}

window.addEventListener('scroll', updateScrollProgress, { passive: true });
window.addEventListener('resize', updateScrollProgress);
updateScrollProgress();
