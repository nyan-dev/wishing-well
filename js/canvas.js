/* ===================================================================
   WISHING WELL — 16-bit Isometric Pixel Art Well (Hero Sprite)
   Wide shallow well with thin walls, visible water, many boats,
   wooden beam/rope, irregular stone blocks.
   All DESIGN.md rules: no CSS 3D, no gradients, dithered water,
   1px dark outline, top-left light, stepped animation, integer sizes.

   Canvas layers:
   - #wellCanvas   — main well sprite (stones, beam, water)
   - #waterCanvas  — water surface + boats (click detection)
   - #dustCanvas   — floating dust particles
   - #sparkleCanvas — magic sparkle particles
   =================================================================== */

/* --- Element References --- */
const wellCanvas = document.getElementById('wellCanvas');
const waterCanvas = document.getElementById('waterCanvas');
const dustCanvas = document.getElementById('dustCanvas');
const sparkleCanvas = document.getElementById('sparkleCanvas');

/* --- Animation State --- */
const state = {
  running: true,
  time: 0,
  lastFrame: 0,
  frameInterval: 1000 / 10,
  scrollProgress: 0,
};

/* --- DESIGN.md Palette (no gradients, hard color bands) --- */
const PALETTE = {
  stone: ['#2b2440', '#4a3f6b', '#6f6291', '#9b8fb8', '#c7bfe0'],
  water: ['#0c2d48', '#17587a', '#2f9bb5', '#6fd6d6'],
  gold:  ['#6b4a1a', '#b3811f', '#e8b33d', '#ffe27a'],
  moss:  ['#1e3b24', '#356b3a', '#5c9c4f', '#a3d66b'],
  wood:  ['#3a2510', '#6b4a1a', '#9b6a2f', '#c7a060'],
  ink:   '#1a1428',
  paper: '#f4ecd8',
};

/* --- Well Geometry (wide shallow, thin walls) --- */
const WELL = {
  cx: 240,
  cy: 255,
  rimRx: 178,
  rimRy: 92,
  shaftInset: 16,
  rimHeight: 10,
  beamHeight: 80,
};

/* Scale WELL constants to current canvas size */
function scaledWell(canvas) {
  const s = Math.min(canvas.width, canvas.height) / 480;
  return {
    cx: Math.round(WELL.cx * s),
    cy: Math.round(WELL.cy * s),
    rimRx: Math.round(WELL.rimRx * s),
    rimRy: Math.round(WELL.rimRy * s),
    shaftInset: Math.round(WELL.shaftInset * s),
    rimHeight: Math.round(WELL.rimHeight * s),
    beamHeight: Math.round(WELL.beamHeight * s),
  };
}

/* ================================================================
   CANVAS SETUP
   ================================================================ */
function setupCanvas(canvas) {
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (ctx) ctx.imageSmoothingEnabled = false;
}

function resizeCanvas(canvas) {
  if (!canvas) return;
  const rect = canvas.getBoundingClientRect();
  let w = Math.floor(rect.width) || 480;
  let h = Math.floor(rect.height) || 480;
  if (w < 1) w = 480;
  if (h < 1) h = 480;
  canvas.width = w;
  canvas.height = h;
  setupCanvas(canvas);
}

/* ================================================================
   PIXEL ART DRAWING PRIMITIVES
   ================================================================ */

function px(ctx, x, y, size, color) {
  ctx.fillStyle = color;
  ctx.fillRect(Math.round(x), Math.round(y), size, size);
}

/* Scanline-filled isometric ellipse (for water) */
function fillEllipse(ctx, cx, cy, rx, ry, color) {
  ctx.fillStyle = color;
  for (let dy = -Math.ceil(ry); dy <= Math.ceil(ry); dy++) {
    const row = Math.round(cy + dy);
    const t = ry > 0 ? dy / ry : 0;
    if (Math.abs(t) > 1) continue;
    const halfW = Math.round(rx * Math.sqrt(Math.max(0, 1 - t * t)));
    if (halfW < 1) continue;
    ctx.fillRect(Math.round(cx - halfW), row, halfW * 2, 1);
  }
}

/* Dithered ellipse fill */
function drawDitheredEllipse(ctx, cx, cy, rx, ry, colors, phase) {
  for (let dy = -Math.ceil(ry); dy <= Math.ceil(ry); dy++) {
    const row = Math.round(cy + dy);
    const t = ry > 0 ? dy / ry : 0;
    if (Math.abs(t) > 1) continue;
    const halfW = Math.round(rx * Math.sqrt(Math.max(0, 1 - t * t)));
    if (halfW < 1) continue;
    for (let dx = -halfW; dx < halfW; dx++) {
      const ix = Math.round(cx + dx);
      const pattern = ((ix + row + phase) & 1);
      ctx.fillStyle = colors[pattern];
      ctx.fillRect(ix, row, 1, 1);
    }
  }
}

/* ================================================================
   INDIVIDUAL STONE BLOCK
   Draws one irregular stone with top-left highlight, bottom-right shadow
   ================================================================ */
function drawStoneBlock(ctx, x, y, w, h, colorIdx) {
  const c = PALETTE.stone[colorIdx];
  const hi = PALETTE.stone[Math.min(4, colorIdx + 1)];
  const lo = PALETTE.stone[Math.max(0, colorIdx - 1)];

  /* Main stone body */
  ctx.fillStyle = c;
  ctx.fillRect(x, y, w, h);

  /* Top-left highlight (top-left light source) */
  ctx.fillStyle = hi;
  ctx.fillRect(x, y, w, 2);
  ctx.fillRect(x, y, 2, h);

  /* Bottom-right shadow */
  ctx.fillStyle = lo;
  ctx.fillRect(x, y + h - 2, w, 2);
  ctx.fillRect(x + w - 2, y, 2, h);

  /* Dark outline (1px) */
  ctx.fillStyle = PALETTE.ink;
  ctx.fillRect(x, y, w, 1);
  ctx.fillRect(x, y + h - 1, w, 1);
  ctx.fillRect(x, y, 1, h);
  ctx.fillRect(x + w - 1, y, 1, h);
}

/* ================================================================
   STONE RIM — Many individual blocks forming an irregular ring
   ================================================================ */
function drawStoneRim(ctx, cx, cy, rimRx, rimRy, yOffset) {
  const circumference = Math.PI * 2 * Math.sqrt((rimRx * rimRx + rimRy * rimRy) / 2);
  const avgStoneW = 15;
  const numStones = Math.floor(circumference / avgStoneW);

  for (let i = 0; i < numStones; i++) {
    const angle = (i / numStones) * Math.PI * 2;
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);

    /* Position on ellipse */
    const sx = cx + cos * rimRx;
    const sy = cy + sin * rimRy + yOffset;

    /* Vary stone size (isometric: wider than tall) */
    const wobble = ((i * 7 + 3) % 5) - 2;
    const w = 12 + wobble;
    const h = 8 + ((i * 3) % 3);

    /* Top-left light factor: upper-left stones are lighter */
    const lightAngle = Math.cos(angle + Math.PI * 0.75);
    const colorIdx = lightAngle > 0.3 ? 3 : lightAngle > -0.3 ? 2 : 1;

    /* Slight position jitter for organic feel */
    const jx = ((i * 13) % 5) - 2;
    const jy = ((i * 7) % 3) - 1;

    drawStoneBlock(ctx, sx - w / 2 + jx, sy - h / 2 + jy, w, h, colorIdx);
  }
}

/* ================================================================
   INNER WALL — Thin wall visible inside the rim
   ================================================================ */
function drawInnerWall(ctx, cx, cy, rimRx, rimRy, inset) {
  const innerRx = rimRx - inset;
  const innerRy = rimRy - Math.floor(inset * 0.5);
  const scale = rimRx / WELL.rimRx;
  const wallDepth = Math.round(20 * scale);

  /* Draw inner wall as a band of stones (darker, showing depth) */
  for (let dy = 0; dy < wallDepth; dy++) {
    const progress = dy / wallDepth;
    const colorIdx = Math.floor(progress * 2);
    const shrink = inset * (1 - progress * 0.3);
    const bandRx = innerRx - shrink * 0.3;
    const bandRy = innerRy - shrink * 0.15;

    /* Only draw the back half (visible part) */
    for (let a = Math.PI * 1.1; a < Math.PI * 1.9; a += 0.08) {
      const ix = cx + Math.cos(a) * bandRx;
      const iy = cy + Math.sin(a) * bandRy + dy;
      px(ctx, ix, iy, 3, PALETTE.stone[colorIdx]);
    }
  }

  /* Inner rim ellipse outline */
  ctx.fillStyle = PALETTE.stone[1];
  for (let a = 0; a < Math.PI * 2; a += 0.05) {
    const ix = cx + Math.cos(a) * innerRx;
    const iy = cy + Math.sin(a) * innerRy;
    ctx.fillRect(Math.round(ix), Math.round(iy), 1, 1);
  }
}

/* ================================================================
   WATER — Dithered shimmer, large visible surface
   Uses WELL constants so water fits inside the thin walls.
   ================================================================ */
function drawWater(ctx, t) {
  const W = scaledWell(ctx.canvas);
  const { cx, cy, rimRx, rimRy, shaftInset } = W;
  const innerRx = rimRx - shaftInset;
  const innerRy = rimRy - Math.floor(shaftInset * 0.5);

  const shimmerPhase = Math.floor(t * 0.004) % 4;

  /* Concentric dithered bands (not gradient) */
  drawDitheredEllipse(ctx, cx, cy, innerRx, innerRy,
      [PALETTE.water[0], PALETTE.water[1]], shimmerPhase);
  drawDitheredEllipse(ctx, cx, cy, innerRx * 0.78, innerRy * 0.78,
      [PALETTE.water[1], PALETTE.water[2]], shimmerPhase + 1);
  drawDitheredEllipse(ctx, cx, cy, innerRx * 0.5, innerRy * 0.5,
      [PALETTE.water[2], PALETTE.water[3]], shimmerPhase + 2);

  /* Glint highlights */
  ctx.fillStyle = PALETTE.water[3];
  for (let i = 0; i < 16; i++) {
    const angle = (i / 16) * Math.PI * 2 + shimmerPhase * 0.4;
    const dist = innerRx * (0.2 + (i % 4) * 0.12);
    const sx = Math.round(cx + Math.cos(angle) * dist);
    const sy = Math.round(cy + Math.sin(angle) * dist * 0.52);
    const blockSize = (i + shimmerPhase) % 3 === 0 ? 4 : 2;
    px(ctx, sx, sy, blockSize, PALETTE.water[3]);
  }

  /* Coins on water (4x4 pixel squares) */
  for (let i = 0; i < 10; i++) {
    const angle = (i / 10) * Math.PI * 2 + 0.3;
    const dist = innerRx * (0.1 + (i % 4) * 0.14);
    const coinX = Math.round(cx + Math.cos(angle) * dist);
    const coinY = Math.round(cy + Math.sin(angle) * dist * 0.52);
    drawCoin(ctx, coinX, coinY, 4);
  }
}

function drawCoin(ctx, x, y, size) {
  px(ctx, x, y, size, PALETTE.gold[2]);
  px(ctx, x + 1, y + 1, Math.max(1, size - 2), PALETTE.gold[3]);
  px(ctx, x + size - 1, y, 1, PALETTE.gold[0]);
  px(ctx, x, y + size - 1, 1, PALETTE.gold[0]);
}

/* ================================================================
   BOATS — Pixel art paper boats (many, visible)
   ================================================================ */
let boats = [];

function initBoats(canvas) {
  if (!canvas) return;
  const cw = canvas.width;
  const ch = canvas.height;
  if (cw < 1 || ch < 1) return;
  const W = scaledWell(canvas);
  const { cx, cy, rimRx, rimRy, shaftInset } = W;
  const innerRx = rimRx - shaftInset;
  const innerRy = rimRy - Math.floor(shaftInset * 0.5);
  const count = 12 + Math.floor(Math.random() * 5);
  boats = [];
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.5;
    const distRatio = 0.12 + Math.random() * 0.6;
    boats.push({
      angle,
      distRatio,
      size: (12 + Math.floor(Math.random() * 5)) * Math.max(1, Math.floor(cw / 420)),
      color: PALETTE.paper,
      phase: Math.floor(Math.random() * 4),
      x: 0,
      y: 0,
    });
  }
  updateBoats(0);
}

function updateBoats(t) {
  if (!waterCanvas || !boats.length) return;
  const W = scaledWell(waterCanvas);
  const { cx, cy, rimRx, rimRy, shaftInset } = W;
  const innerRx = rimRx - shaftInset;
  const innerRy = rimRy - Math.floor(shaftInset * 0.5);
  const step = 2;
  for (const b of boats) {
    const driftX = Math.round(Math.sin(t * 0.0003 + b.phase) * 6 / step) * step;
    const driftY = Math.round(Math.cos(t * 0.0004 + b.phase * 1.3) * 2 / step) * step;
    b.x = Math.round((cx + Math.cos(b.angle) * innerRx * b.distRatio + driftX) / step) * step;
    b.y = Math.round((cy + Math.sin(b.angle) * innerRy * b.distRatio + driftY) / step) * step;
  }
}

function drawBoats(ctx) {
  for (const b of boats) drawBoat(ctx, b);
}

/* Pixel art paper boat — origami style, hard edges */
function drawBoat(ctx, b) {
  const s = b.size;
  ctx.save();
  ctx.translate(b.x, b.y);

  /* Hull — wide trapezoid, pointed ends */
  ctx.fillStyle = b.color;
  ctx.fillRect(-s, 0, s * 2, Math.max(2, Math.floor(s * 0.3)));
  ctx.fillRect(-s + 2, Math.floor(s * 0.3), s * 2 - 4, 2);
  ctx.fillRect(-s + 4, Math.floor(s * 0.5), s * 2 - 8, 2);

  /* Hull shadow (bottom) */
  ctx.fillStyle = PALETTE.stone[4];
  ctx.fillRect(-s + 4, Math.floor(s * 0.5) + 2, s * 2 - 8, 1);

  /* Sail — triangle shape */
  ctx.fillStyle = PALETTE.paper;
  ctx.fillRect(0, -s + 2, Math.max(2, Math.floor(s * 0.2)), s - 2);
  /* Sail highlight */
  px(ctx, 2, -s + 4, 2, PALETTE.gold[3]);
  /* Sail shadow edge */
  ctx.fillStyle = PALETTE.stone[4];
  ctx.fillRect(Math.floor(s * 0.2) - 1, -s + 4, 1, s - 4);

  /* Mast */
  ctx.fillStyle = PALETTE.stone[2];
  ctx.fillRect(-1, -Math.floor(s * 1.1), 2, Math.floor(s * 1.3));

  ctx.restore();
}

/* ================================================================
   WOODEN BEAM — Two supports + horizontal beam + rope/pulley
   ================================================================ */
function drawWoodenBeam(ctx, cx, cy, rimRx, rimRy) {
  const beamY = cy - rimRy - WELL.beamHeight;
  const leftX = cx - rimRx * 0.7;
  const rightX = cx + rimRx * 0.7;
  const beamW = rightX - leftX;

  /* Left vertical support */
  drawWoodPost(ctx, leftX, beamY, 8, rimRy + WELL.beamHeight + 10);
  /* Right vertical support */
  drawWoodPost(ctx, rightX - 8, beamY, 8, rimRy + WELL.beamHeight + 10);

  /* Horizontal beam across top */
  drawWoodBeam(ctx, leftX - 4, beamY, beamW + 8, 10);

  /* Rope hanging from center of beam */
  const ropeX = cx;
  const ropeTop = beamY + 10;
  const ropeLen = 36;
  ctx.fillStyle = PALETTE.wood[1];
  ctx.fillRect(ropeX, ropeTop, 2, ropeLen);

  /* Pulley wheel at beam */
  ctx.fillStyle = PALETTE.stone[2];
  ctx.fillRect(ropeX - 4, ropeTop - 2, 10, 6);
  ctx.fillStyle = PALETTE.stone[3];
  ctx.fillRect(ropeX - 2, ropeTop, 6, 2);

  /* Small bucket at rope end */
  const bucketY = ropeTop + ropeLen;
  ctx.fillStyle = PALETTE.wood[2];
  ctx.fillRect(ropeX - 4, bucketY, 10, 8);
  ctx.fillStyle = PALETTE.wood[1];
  ctx.fillRect(ropeX - 4, bucketY, 10, 2);
  ctx.fillRect(ropeX - 4, bucketY, 2, 8);
  ctx.fillStyle = PALETTE.wood[0];
  ctx.fillRect(ropeX + 4, bucketY, 2, 8);
  ctx.fillRect(ropeX - 4, bucketY + 6, 10, 2);

  /* Bucket handle */
  ctx.fillStyle = PALETTE.stone[2];
  ctx.fillRect(ropeX - 2, bucketY - 4, 6, 4);
  ctx.fillRect(ropeX - 2, bucketY - 4, 2, 2);
  ctx.fillRect(ropeX + 2, bucketY - 4, 2, 2);
}

function drawWoodPost(ctx, x, y, w, h) {
  /* Main post body */
  ctx.fillStyle = PALETTE.wood[2];
  ctx.fillRect(x, y, w, h);

  /* Top-left highlight */
  ctx.fillStyle = PALETTE.wood[3];
  ctx.fillRect(x, y, w, 2);
  ctx.fillRect(x, y, 2, h);

  /* Bottom-right shadow */
  ctx.fillStyle = PALETTE.wood[1];
  ctx.fillRect(x, y + h - 2, w, 2);
  ctx.fillRect(x + w - 2, y, 2, h);

  /* Dark outline */
  ctx.fillStyle = PALETTE.wood[0];
  ctx.fillRect(x, y, w, 1);
  ctx.fillRect(x, y + h - 1, w, 1);
  ctx.fillRect(x, y, 1, h);
  ctx.fillRect(x + w - 1, y, 1, h);

  /* Wood grain lines */
  ctx.fillStyle = PALETTE.wood[1];
  for (let gy = y + 8; gy < y + h - 4; gy += 12) {
    ctx.fillRect(x + 2, gy, w - 4, 1);
  }
}

function drawWoodBeam(ctx, x, y, w, h) {
  /* Main beam */
  ctx.fillStyle = PALETTE.wood[2];
  ctx.fillRect(x, y, w, h);

  /* Top highlight */
  ctx.fillStyle = PALETTE.wood[3];
  ctx.fillRect(x, y, w, 2);

  /* Bottom shadow */
  ctx.fillStyle = PALETTE.wood[1];
  ctx.fillRect(x, y + h - 2, w, 2);

  /* Dark outline */
  ctx.fillStyle = PALETTE.wood[0];
  ctx.fillRect(x, y, w, 1);
  ctx.fillRect(x, y + h - 1, w, 1);
  ctx.fillRect(x, y, 1, h);
  ctx.fillRect(x + w - 1, y, 1, h);

  /* Wood grain */
  ctx.fillStyle = PALETTE.wood[1];
  for (let gx = x + 6; gx < x + w - 4; gx += 16) {
    ctx.fillRect(gx, y + 3, 1, h - 6);
  }
}

/* ================================================================
   MOSS — Organic irregular patches between stones
   ================================================================ */
function drawMoss(ctx, cx, cy, rimRx, rimRy) {
  const clusters = [
    { angle: 0.4,  count: 5, spread: 12, size: [3, 6] },
    { angle: 1.1,  count: 4, spread: 10, size: [2, 5] },
    { angle: 1.8,  count: 6, spread: 14, size: [3, 7] },
    { angle: 2.5,  count: 3, spread: 8,  size: [2, 4] },
    { angle: 3.3,  count: 5, spread: 11, size: [3, 6] },
    { angle: 4.0,  count: 4, spread: 9,  size: [2, 5] },
    { angle: 5.0,  count: 5, spread: 13, size: [3, 7] },
    { angle: 5.8,  count: 3, spread: 8,  size: [2, 4] },
  ];

  for (const cluster of clusters) {
    const baseX = cx + Math.cos(cluster.angle) * rimRx;
    const baseY = cy + Math.sin(cluster.angle) * rimRy;

    for (let i = 0; i < cluster.count; i++) {
      const ox = ((i * 7 + 3) % cluster.spread) - cluster.spread / 2;
      const oy = ((i * 11 + 5) % (cluster.spread * 0.5)) - cluster.spread * 0.25;
      const s = cluster.size[0] + (i % (cluster.size[1] - cluster.size[0] + 1));

      /* Moss body — irregular small patches */
      const c = PALETTE.moss[2 + (i % 2)];
      ctx.fillStyle = c;
      ctx.fillRect(baseX + ox, baseY + oy, s, Math.max(2, s - 2));

      /* Highlight pixel (top-left) */
      if (i % 2 === 0) {
        px(ctx, baseX + ox, baseY + oy, 2, PALETTE.moss[3]);
      }

      /* Shadow pixel (bottom) */
      ctx.fillStyle = PALETTE.moss[1];
      ctx.fillRect(baseX + ox, baseY + oy + s - 1, s, 1);
    }
  }
}

/* ================================================================
   DUST — Floating 2x2 pixel blocks
   ================================================================ */
function drawDust(ctx, t) {
  const { width, height } = ctx.canvas;
  const dustCx = width / 2;
  const dustCy = height * 0.55;
  ctx.fillStyle = PALETTE.stone[4];
  for (let i = 0; i < 20; i++) {
    const phase = t * 0.0003 + i * 0.8;
    const x = Math.round(((Math.sin(phase * 1.5) + 1) * 0.5 * width * 0.6 + width * 0.2) / 2) * 2;
    const y = Math.round(((Math.cos(phase * 1.1 + i) + 1) * 0.5 * height * 0.5 + height * 0.25) / 2) * 2;
    const size = (i % 3 === 0) ? 4 : 2;
    px(ctx, x, y, size, (i % 4 === 0) ? PALETTE.stone[3] : PALETTE.stone[4]);
  }
}

/* ================================================================
   SPARKLES — Magic sparkle pixels rising from water
   ================================================================ */
function drawSparkles(ctx, t) {
  const W = scaledWell(ctx.canvas);
  const sparkleCx = W.cx;
  const sparkleCy = W.cy - Math.round(10 * (ctx.canvas.width / 480));
  for (let i = 0; i < 10; i++) {
    const phase = (t * 0.001 + i * 1.2) % 4;
    const angle = (i / 10) * Math.PI * 2 + t * 0.0002;
    const dist = 60 * ((i % 3) + 1) / 3;
    const baseX = sparkleCx + Math.cos(angle) * dist;
    const baseY = sparkleCy;
    const y = baseY - phase * 12;
    if (y < baseY - 40) continue;
    const size = phase < 1 ? 4 : 2;
    const alpha = Math.max(0, 1 - phase * 0.3);
    ctx.globalAlpha = alpha;
    px(ctx, Math.round(baseX), Math.round(y), size, PALETTE.gold[3]);
    if (i % 2 === 0) {
      px(ctx, Math.round(baseX + 3), Math.round(y - 2), 2, PALETTE.gold[2]);
    }
    ctx.globalAlpha = 1;
  }
}

/* ================================================================
   WELL DRAWING — Wide shallow well with individual stones
   ================================================================ */
function drawWell(ctx, t) {
  const W = scaledWell(ctx.canvas);
  const { cx, cy, rimRx, rimRy, shaftInset } = W;

  /* ---- 1. Inner wall (thin, visible just inside rim) ---- */
  drawInnerWall(ctx, cx, cy, rimRx, rimRy, shaftInset);

  /* ---- 2. Back rim stones (behind beam, upper arc) ---- */
  drawStoneRim(ctx, cx, cy - WELL.rimHeight, rimRx, rimRy, -WELL.rimHeight);

  /* ---- 3. Wooden beam (above well, behind front rim) ---- */
  drawWoodenBeam(ctx, cx, cy, rimRx, rimRy);

  /* ---- 4. Front rim stones (in front of beam posts at bottom) ---- */
  drawStoneRim(ctx, cx, cy, rimRx, rimRy, 0);

  /* ---- 5. Moss between stones ---- */
  drawMoss(ctx, cx, cy, rimRx, rimRy);
}

/* ================================================================
   CLICK DETECTION — Find which boat was clicked
   ================================================================ */
function getCanvasCoords(event) {
  if (!waterCanvas) return { x: 0, y: 0 };
  const rect = waterCanvas.getBoundingClientRect();
  const dpr = waterCanvas.width / rect.width;
  return {
    x: (event.clientX - rect.left) * dpr,
    y: (event.clientY - rect.top) * dpr,
  };
}

function handleBoatClick(event) {
  const { x, y } = getCanvasCoords(event);
  const dpr = waterCanvas.width / waterCanvas.getBoundingClientRect().width;
  const minHitR = 16 * dpr;
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

function addBoatToWater(color) {
  if (!waterCanvas) return;
  const W = scaledWell(waterCanvas);
  const { cx, cy, rimRx, rimRy, shaftInset } = W;
  const innerRx = rimRx - shaftInset;
  const innerRy = rimRy - Math.floor(shaftInset * 0.5);
  const angle = Math.random() * Math.PI * 2;
  const distRatio = 0.12 + Math.random() * 0.6;
  boats.push({
    angle,
    distRatio,
    size: (12 + Math.floor(Math.random() * 5)) * Math.max(1, Math.floor(waterCanvas.width / 420)),
    color: color || PALETTE.paper,
    phase: Math.floor(Math.random() * 4),
    x: 0,
    y: 0,
  });
}

/* ================================================================
   ANIMATION LOOP
   ================================================================ */
function frame(t) {
  if (!state.running) return;

  if (t - state.lastFrame < state.frameInterval) {
    requestAnimationFrame(frame);
    return;
  }
  state.lastFrame = t;
  state.time = t;

  /* Well — main hero sprite */
  if (wellCanvas) {
    const ctx = wellCanvas.getContext('2d');
    if (ctx) {
      ctx.imageSmoothingEnabled = false;
      ctx.clearRect(0, 0, wellCanvas.width, wellCanvas.height);
      drawWell(ctx, t);
    }
  }

  /* Water + boats */
  if (waterCanvas) {
    const ctx = waterCanvas.getContext('2d');
    if (ctx) {
      ctx.imageSmoothingEnabled = false;
      ctx.clearRect(0, 0, waterCanvas.width, waterCanvas.height);
      updateBoats(t);
      drawWater(ctx, t);
      drawBoats(ctx);
    }
  }

  /* Dust particles */
  if (dustCanvas) {
    const ctx = dustCanvas.getContext('2d');
    if (ctx) {
      ctx.imageSmoothingEnabled = false;
      ctx.clearRect(0, 0, dustCanvas.width, dustCanvas.height);
      drawDust(ctx, t);
    }
  }

  /* Sparkle particles */
  if (sparkleCanvas) {
    const ctx = sparkleCanvas.getContext('2d');
    if (ctx) {
      ctx.imageSmoothingEnabled = false;
      ctx.clearRect(0, 0, sparkleCanvas.width, sparkleCanvas.height);
      drawSparkles(ctx, t);
    }
  }

  requestAnimationFrame(frame);
}

/* ================================================================
   PUBLIC API
   ================================================================ */
window.wishingWellScene = {
  addBoat(color) {
    addBoatToWater(color);
  },
};

/* ================================================================
   INITIALIZATION
   ================================================================ */
[wellCanvas, waterCanvas, dustCanvas, sparkleCanvas].forEach(setupCanvas);
[wellCanvas, waterCanvas, dustCanvas, sparkleCanvas].forEach(resizeCanvas);

window.addEventListener('resize', () => {
  [wellCanvas, waterCanvas, dustCanvas, sparkleCanvas].forEach(resizeCanvas);
  initBoats(waterCanvas);
});

initBoats(waterCanvas);

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

/* --- Visibility Observer (pause when offscreen) --- */
const canvasVisibility = {};
const allCanvases = [wellCanvas, waterCanvas, dustCanvas, sparkleCanvas].filter(Boolean);

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    canvasVisibility[entry.target.id] = entry.isIntersecting;
    if (entry.isIntersecting) {
      resizeCanvas(entry.target);
      setupCanvas(entry.target);
      if (entry.target.id === 'waterCanvas') initBoats(waterCanvas);
    }
  });
  state.running = Object.values(canvasVisibility).some(Boolean);
  if (state.running) requestAnimationFrame(frame);
}, { threshold: 0.05 });

allCanvases.forEach((canvas) => {
  observer.observe(canvas);
  canvasVisibility[canvas.id] = false;
});

requestAnimationFrame(frame);
