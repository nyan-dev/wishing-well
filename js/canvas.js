const waterCanvas = document.getElementById('waterCanvas');
const dustCanvas = document.getElementById('dustCanvas');

const state = {
  running: true,
  time: 0,
};

function resizeCanvas(canvas) {
  if (!canvas) return;
  const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
  const rect = canvas.getBoundingClientRect();
  canvas.width = Math.max(1, Math.floor(rect.width * dpr));
  canvas.height = Math.max(1, Math.floor(rect.height * dpr));
}

function drawWater(ctx, t) {
  const { width, height } = ctx.canvas;
  const cx = width * 0.5;
  const cy = height * 0.5;

  ctx.clearRect(0, 0, width, height);

  const grad = ctx.createRadialGradient(cx, cy * 0.82, width * 0.05, cx, cy, width * 0.55);
  grad.addColorStop(0, 'rgba(164, 219, 255, 0.34)');
  grad.addColorStop(0.45, 'rgba(74, 142, 204, 0.42)');
  grad.addColorStop(1, 'rgba(13, 43, 83, 0.7)');

  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.ellipse(cx, cy, width * 0.5, height * 0.5, 0, 0, Math.PI * 2);
  ctx.fill();

  const shimmerX = cx + Math.sin(t * 0.0012) * width * 0.14;
  const shimmer = ctx.createLinearGradient(shimmerX - 50, 0, shimmerX + 50, height);
  shimmer.addColorStop(0, 'rgba(255, 255, 255, 0)');
  shimmer.addColorStop(0.5, 'rgba(255, 255, 255, 0.16)');
  shimmer.addColorStop(1, 'rgba(255, 255, 255, 0)');

  ctx.fillStyle = shimmer;
  ctx.beginPath();
  ctx.ellipse(cx, cy, width * 0.48, height * 0.48, 0, 0, Math.PI * 2);
  ctx.fill();
}

function drawDust(ctx, t) {
  const { width, height } = ctx.canvas;
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = 'rgba(240, 243, 255, 0.18)';
  for (let i = 0; i < 40; i += 1) {
    const phase = t * 0.0004 + i * 0.75;
    const x = ((Math.sin(phase * 1.7) + 1) * 0.5 * width * 0.8) + width * 0.1;
    const y = ((Math.cos(phase * 1.2 + i) + 1) * 0.5 * height * 0.8) + height * 0.1;
    const size = 1 + ((i + Math.sin(phase)) % 2.4);
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function frame(t) {
  if (!state.running) return;
  state.time = t;

  if (waterCanvas) {
    const waterCtx = waterCanvas.getContext('2d');
    if (waterCtx) drawWater(waterCtx, t);
  }

  if (dustCanvas) {
    const dustCtx = dustCanvas.getContext('2d');
    if (dustCtx) drawDust(dustCtx, t);
  }

  requestAnimationFrame(frame);
}

[waterCanvas, dustCanvas].forEach(resizeCanvas);
window.addEventListener('resize', () => [waterCanvas, dustCanvas].forEach(resizeCanvas));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.target === waterCanvas) {
      state.running = entry.isIntersecting;
      if (state.running) requestAnimationFrame(frame);
    }
  });
}, { threshold: 0.05 });

if (waterCanvas) {
  observer.observe(waterCanvas);
  requestAnimationFrame(frame);
}
