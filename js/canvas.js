const waterCanvas = document.getElementById('waterCanvas');
const dustCanvas = document.getElementById('dustCanvas');

const state = {
  running: true,
  time: 0,
};

const BOAT_PALETTE = window.wishingWellPalette || ['#e07a7a', '#e8c46a', '#6dcde0', '#8be3c6', '#b39cff'];

let boats = [];

function initBoats(canvas) {
  if (!canvas) return;
  const cw = canvas.width;
  const ch = canvas.height;
  if (cw < 1 || ch < 1) return;
  const cx = cw / 2;
  const cy = ch / 2;
  const radius = Math.min(cw, ch) * 0.38;
  const count = 8 + Math.floor(Math.random() * 5);
  boats = [];
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.6;
    const distRatio = 0.15 + Math.random() * 0.6;
    boats.push({
      angle,
      distRatio,
      size: (12 + Math.random() * 8) * (cw / 800),
      color: BOAT_PALETTE[i % BOAT_PALETTE.length],
      phase: Math.random() * Math.PI * 2,
      driftPhase: Math.random() * Math.PI * 2,
      x: 0, y: 0,
    });
  }
}

function updateBoats(t) {
  if (!waterCanvas || !boats.length) return;
  const cw = waterCanvas.width;
  const ch = waterCanvas.height;
  const cx = cw / 2;
  const cy = ch / 2;
  const radius = Math.min(cw, ch) * 0.38;
  const scale = cw / 800;
  for (const b of boats) {
    const driftX = Math.sin(t * 0.0004 + b.driftPhase) * 12 * scale;
    const driftY = Math.sin(t * 0.0006 + b.phase * 1.3) * 5 * scale;
    b.x = cx + Math.cos(b.angle) * radius * b.distRatio + driftX;
    b.y = cy + Math.sin(b.angle) * radius * b.distRatio + driftY;
  }
}

function drawBoat(ctx, b) {
  const s = b.size;
  ctx.save();
  ctx.translate(b.x, b.y);
  ctx.shadowColor = 'rgba(0,0,0,0.18)';
  ctx.shadowBlur = 4;
  ctx.shadowOffsetY = 1;
  ctx.beginPath();
  ctx.moveTo(-s * 0.85, 0);
  ctx.lineTo(-s * 0.55, s * 0.45);
  ctx.lineTo(s * 0.55, s * 0.45);
  ctx.lineTo(s * 0.85, 0);
  ctx.closePath();
  ctx.fillStyle = b.color;
  ctx.fill();
  ctx.strokeStyle = 'rgba(0,0,0,0.25)';
  ctx.lineWidth = 0.5;
  ctx.stroke();
  ctx.shadowColor = 'transparent';
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(0, s * 0.45);
  ctx.strokeStyle = 'rgba(0,0,0,0.1)';
  ctx.lineWidth = 0.5;
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(0, -s * 1.3);
  ctx.lineTo(-s * 0.5, 0);
  ctx.lineTo(s * 0.5, 0);
  ctx.closePath();
  ctx.fillStyle = 'rgba(255,255,255,0.55)';
  ctx.fill();
  ctx.strokeStyle = 'rgba(0,0,0,0.07)';
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(0, -s * 1.3);
  ctx.lineTo(0, 0);
  ctx.strokeStyle = 'rgba(0,0,0,0.07)';
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(0, -s * 1.3);
  ctx.lineTo(s * 0.18, -s * 1.45);
  ctx.lineTo(0, -s * 1.45);
  ctx.closePath();
  ctx.fillStyle = b.color;
  ctx.fill();
  ctx.restore();
}

function drawBoats(ctx) {
  for (const b of boats) drawBoat(ctx, b);
}

function addBoatToWater(color) {
  if (!waterCanvas) return;
  const cw = waterCanvas.width;
  const ch = waterCanvas.height;
  if (cw < 1 || ch < 1) return;
  const angle = Math.random() * Math.PI * 2;
  const distRatio = 0.15 + Math.random() * 0.6;
  boats.push({
    angle,
    distRatio,
    size: (12 + Math.random() * 8) * (cw / 800),
    color: color || BOAT_PALETTE[Math.floor(Math.random() * BOAT_PALETTE.length)],
    phase: Math.random() * Math.PI * 2,
    driftPhase: Math.random() * Math.PI * 2,
    x: 0, y: 0,
  });
}

function getCanvasCoords(event) {
  const rect = waterCanvas.getBoundingClientRect();
  const dpr = waterCanvas.width / rect.width;
  return {
    x: (event.clientX - rect.left) * dpr,
    y: (event.clientY - rect.top) * dpr,
  };
}

function handleBoatClick(event) {
  const { x, y } = getCanvasCoords(event);
  const rect = waterCanvas.getBoundingClientRect();
  const dpr = waterCanvas.width / rect.width;
  const minHitR = 22 * dpr;
  for (const b of boats) {
    const dx = x - b.x;
    const dy = y - b.y;
    const hitR = Math.max(b.size * 1.5, minHitR);
    if (dx * dx + dy * dy < hitR * hitR) {
      waterCanvas.dispatchEvent(new CustomEvent('boat-click', {
        detail: { color: b.color },
        bubbles: true,
      }));
      return true;
    }
  }
  return false;
}

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
    if (waterCtx) {
      drawWater(waterCtx, t);
      updateBoats(t);
      drawBoats(waterCtx);
    }
  }

  if (dustCanvas) {
    const dustCtx = dustCanvas.getContext('2d');
    if (dustCtx) drawDust(dustCtx, t);
  }

  requestAnimationFrame(frame);
}

window.wishingWellScene = {
  addBoat(color) {
    addBoatToWater(color);
  },
};

if (waterCanvas) {
  waterCanvas.style.cursor = 'pointer';
  waterCanvas.style.touchAction = 'manipulation';
  waterCanvas.addEventListener('click', handleBoatClick);
  waterCanvas.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      if (boats.length > 0) {
        const b = boats[Math.floor(Math.random() * boats.length)];
        waterCanvas.dispatchEvent(new CustomEvent('boat-click', {
          detail: { color: b.color },
          bubbles: true,
        }));
      }
    }
  });
}

[waterCanvas, dustCanvas].forEach(resizeCanvas);
window.addEventListener('resize', () => {
  [waterCanvas, dustCanvas].forEach(resizeCanvas);
  initBoats(waterCanvas);
});
initBoats(waterCanvas);

const canvasVisibility = {};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    canvasVisibility[entry.target.id] = entry.isIntersecting;
  });
  state.running = Object.values(canvasVisibility).some(Boolean);
  if (state.running) requestAnimationFrame(frame);
}, { threshold: 0.05 });

[waterCanvas, dustCanvas].forEach((canvas) => {
  if (canvas) {
    observer.observe(canvas);
    canvasVisibility[canvas.id] = false;
  }
});

requestAnimationFrame(frame);
