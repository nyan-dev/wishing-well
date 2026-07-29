# DESIGN.md — Wishing Well Visual System

> Art direction contract for Wishing Well. Read this before writing or editing any
> CSS, SVG, canvas drawing code, or visual asset. This file defines *how it should look
> and feel*. `AGENTS.md` defines *how to work*. Follow both.

## 1. Concept Statement

Wishing Well is reimagined as a **16-bit isometric pixel art diorama** — the kind of
single, lovingly-detailed scene you'd find in a SNES-era RPG town (Secret of Mana,
Chrono Trigger, Zelda: A Link to the Past). The well sits in an isometric tile world so
players can see the stone rim, the shaft walls curving down, and the shimmering water
or coin-bed at the bottom, all in one frame. It should feel like discovering a tiny
hand-crafted diorama inside an old cartridge game — nostalgic, warm, a little magical,
never sterile or "app-like."

**One sentence test**: if a screenshot could be mistaken for a modern SaaS site, it has
failed. If it could be mistaken for a screenshot from a beloved 16-bit RPG, it has
succeeded.

## 2. Reference Points

- Secret of Mana / Trials of Mana — soft color ramps, glowing particle effects
- Chrono Trigger — isometric town scenes, warm lantern lighting
- Stardew Valley — cozy isometric-adjacent tile logic, seasonal palettes
- Octopath Traveler ("HD-2D") — isometric depth with atmospheric lighting, for inspiration only, not literal 3D
- Classic RPG well/fountain tiles — stone ring, dark shaft, glinting coins at the bottom

## 3. Perspective & Grid Rules

- **Projection**: 2:1 isometric (for every 2px horizontal movement, 1px vertical) — the standard pixel-art-safe isometric ratio, not true 30° CAD isometric, to avoid anti-aliased diagonal jaggies [web:39].
- **Base tile unit**: 32x16px (width x height) for ground tiles; well structure scales from this unit.
- **Layering order (back to front)**: sky/background → distant ground tiles → well outer wall (back half) → well interior shaft (visible cutaway) → water/coin bed → well outer wall (front half) → foreground props (grass, lanterns, moss) → floating UI (modal, coin counter).
- **The cutaway rule**: the well must always be rendered as a "dollhouse cutaway" — front-facing wall segment removed or rendered translucent so the interior shaft and water are always visible, never hidden behind solid stone.
- **Camera**: fixed, no rotation. Slight parallax only (background layer moves slower than well layer on scroll/mouse-move) to sell depth without breaking the sprite grid.

## 4. Color System

16-bit era games used constrained palettes (typically 16–64 visible colors on screen) with careful ramps rather than gradients [web:30][web:32]. Define explicit ramps, never CSS gradients.

```css
:root {
  /* Stone — well walls, rim */
  --stone-1: #2b2440; /* deepest shadow, interior shaft */
  --stone-2: #4a3f6b;
  --stone-3: #6f6291;
  --stone-4: #9b8fb8; /* lit stone highlight */
  --stone-5: #c7bfe0; /* rim edge highlight */

  /* Water — well interior */
  --water-1: #0c2d48; /* deep water shadow */
  --water-2: #17587a;
  --water-3: #2f9bb5;
  --water-4: #6fd6d6; /* glint highlight */

  /* Gold — coins, magic sparkle */
  --gold-1: #6b4a1a;
  --gold-2: #b3811f;
  --gold-3: #e8b33d;
  --gold-4: #ffe27a; /* sparkle highlight */

  /* Foliage — moss, grass, vines */
  --moss-1: #1e3b24;
  --moss-2: #356b3a;
  --moss-3: #5c9c4f;
  --moss-4: #a3d66b;

  /* Sky / atmosphere */
  --sky-1: #1a1a3a;   /* night */
  --sky-2: #3a3a6b;
  --sky-3: #7a5a9b;
  --sky-4: #e8a87c;   /* dusk glow near horizon */

  /* UI ink */
  --ink-1: #1a1428;
  --ink-2: #4a3f6b;
  --paper: #f4ecd8;   /* parchment UI panels, not white */
}
```

Rules:
- **5-step ramps only.** Every material (stone, water, gold, moss) gets exactly one 4–5 color ramp, shadow to highlight. Never blend with CSS `linear-gradient` for pixel surfaces — use dithering patterns or hard color bands instead.
- **No pure black, no pure white.** Shadows use `--stone-1`/`--water-1`/`--ink-1`. Highlights use warm near-whites like `--paper` or `--gold-4`.
- **Time-of-day palette swap** (optional feature): swap `--sky-*` and lighting ramps between dusk/night/dawn variants — classic RPG day-night tinting.
- **Restraint check**: no more than 4 material ramps visible in a single frame (stone, water, gold, moss). Adding a 5th competing hue dilutes the diorama read.

## 5. Typography

- **Pixel font mandatory** for all UI text — this is non-negotiable for the aesthetic.
- Primary: **"Press Start 2P"** (Google Fonts) for headings, coin counters, buttons — authentic 8/16-bit arcade feel.
- Secondary/body: **"VT323"** or **"Silkscreen"** (Google Fonts) for longer wish text, more readable at small sizes while staying retro.
- Never use a standard web sans-serif (Inter, Helvetica, system-ui) anywhere in the visible UI — it will instantly break the illusion.
- Render text with `image-rendering: pixelated` disabled for fonts (fonts are vector, only sprites get pixelation) but keep letter-spacing slightly widened (`0.05em`) to match pixel-font rhythm.
- Sizes: use fixed steps that are multiples of the base pixel grid — 8px, 16px, 24px, 32px — never fluid `clamp()` for pixel-art UI text, since non-integer scaling blurs pixel fonts.

```css
--font-pixel-display: 'Press Start 2P', monospace; /* headings, buttons, coin count */
--font-pixel-body: 'VT323', monospace;              /* wish text, descriptions */
```

## 6. Sprite & Asset Rules

- **`image-rendering: pixelated;`** on every sprite/canvas image element — mandatory, prevents browser smoothing from blurring pixel art.
- **Integer scaling only.** Sprites must be scaled by whole numbers (1x, 2x, 3x, 4x) via CSS `transform: scale()` or canvas `imageSmoothingEnabled = false`. Never scale pixel art by non-integer factors.
- **Consistent light source**: top-left, always. Every sprite (well, coins, props) shades as if lit from the same upper-left angle — this is what makes hand-painted pixel scenes feel cohesive.
- **Outline style**: 1px dark outline (`--stone-1` or `--ink-1` tone) around major silhouettes (well, characters, coins) — classic SNES sprite technique, helps readability against busy backgrounds.
- **Dithering over gradients**: for soft transitions (water shimmer, sky fade), use a checkerboard/bayer dither pattern at the pixel-grid resolution, not smooth CSS gradients.

## 7. The Well — Component Anatomy

This is the hero object. Break it into explicit visual layers so the agent implements it correctly:

| Layer | Description | Palette |
|---|---|---|
| Outer rim (back) | Raised circular stone lip, back half, sits behind everything | `--stone-3` to `--stone-5` |
| Interior shaft walls | Curved stone going down, visible in cutaway, darkens with depth | `--stone-1` to `--stone-3`, darkest at bottom |
| Water/coin bed | Bottom of shaft — animated shimmer, scattered coin sprites, ripple rings on interaction | `--water-1` to `--water-4`, `--gold-2` to `--gold-4` |
| Outer rim (front) | Raised stone lip, front half, lower height than back so interior stays visible | `--stone-3` to `--stone-5` |
| Roof/frame (optional) | Small A-frame wood-and-rope structure with bucket, classic fairytale well topper | `--moss` wood tones + rope tan |
| Moss & vines | Growing on rim and shaft edges, breaks up hard stone lines | `--moss-1` to `--moss-4` |
| Sparkle/magic particles | Small 2-4px glowing pixels rising from water when a wish is made | `--gold-4`, additive blend |

Interaction states:
- **Idle**: gentle water shimmer loop (2–4 frame animation, slow), occasional single sparkle particle.
- **Hover/focus** (coin or wish trigger): rim highlights brighten one ramp-step, subtle bob animation (2px, stepped not eased).
- **Wish cast**: coin sprite arcs into shaft (stepped parabola, not smooth easing — respect the 16-bit frame-by-frame feel), ripple ring sprite expands on water, particle burst (6–10 sparkle pixels), short screen-shake option (1-2px, optional/toggleable for accessibility).

## 8. UI Components (Modals, Buttons, Panels)

All floating UI should look like **in-game dialog boxes**, not modern web modals.

- **Panels**: parchment-colored background (`--paper`), thick pixel border (4px, drawn as a 9-slice sprite with corner notches — think classic RPG dialog box border), drop shadow as a hard-edged offset silhouette (not blurred CSS `box-shadow`), e.g. `box-shadow: 4px 4px 0 var(--ink-1);` with zero blur.
- **Buttons**: chunky pixel-bordered rectangles, 2-state press animation (button sprite shifts down 2px + border simplifies on `:active`, mimicking a physically pressed button), no rounded corners beyond a stepped pixel notch, no CSS `border-radius` smoothness — use clipped corner pixels instead if a non-rectangular shape is needed.
- **Coin/wish counter**: pixel numeral font, coin icon sprite that "ticks" up frame by frame rather than animating smoothly.
- **Input fields** (wish text entry): parchment inset panel, blinking block cursor (not thin line) to match retro terminal feel.
- **Modals open/close**: hard-cut scale-step transitions (e.g., 3-4 discrete scale frames) rather than smooth eased transforms — motion should feel like a game menu, not a modern web app.

## 9. Motion Principles (16-bit specific)

This overrides the generic smooth-easing motion guidance for this project:

- **Stepped animation over eased animation.** Use `steps(n)` timing functions or explicit sprite-frame swapping instead of `cubic-bezier` smoothness for anything meant to feel "in-game" (coin bob, button press, particle rise).
- **Frame rate feel**: target a deliberate 8–12fps look for sprite animations (water shimmer, sparkle, coin spin) even though the browser renders at 60fps — achieved via `steps()` or timed `requestAnimationFrame` throttling.
- **Continuous/UI-chrome motion** (page scroll, modal fade backdrop) can stay smooth/eased — the "steppiness" rule applies to in-world sprite elements, not browser-chrome transitions.
- **Respect `prefers-reduced-motion`**: fall back to static frame, no shimmer loop, no particle bursts.

## 10. Layout & Composition

- **Single hero diorama, centered**, generous negative space around it using the dusk/night sky ramp — do not crowd the well with UI chrome.
- **Foreground props** (lanterns, grass tufts, small signpost) scattered asymmetrically at the base to avoid a stiff, perfectly symmetrical "icon on a pedestal" look.
- **Vertical rhythm**: sky → well diorama → grounded UI (wish input, coin count) stacked top to bottom, mimicking a game's title/overworld screen layout.
- **Responsive strategy**: the diorama scales as a whole unit (integer steps) rather than reflowing; on narrow viewports, crop the sky/background first, never crop the well itself.

## 11. Anti-Patterns (Never Do These)

- No CSS gradients on any pixel-art surface (stone, water) — use ramps/dithering instead.
- No `border-radius` softness on game-object sprites or dialog panels — pixel-notch corners only.
- No smooth `cubic-bezier` easing on sprite-level interactions — stepped motion only.
- No modern sans-serif UI font anywhere visible.
- No blurred `box-shadow` — hard-offset pixel shadows only.
- No true 3D/WebGL — this stays 2D isometric pixel art, canvas or CSS/SVG based.
- No anti-aliased/smoothed sprite scaling — always `image-rendering: pixelated` + integer scale.
- No hiding the well's interior — the cutaway view showing walls + water is the entire point of the concept.

## 12. Definition of Done (Visual QA)

- [ ] Well shows visible outer rim AND interior shaft AND water/coins simultaneously
- [ ] All sprites use `image-rendering: pixelated` and integer scaling
- [ ] Color ramps used, no smooth gradients on game objects
- [ ] Pixel font used for all visible text, sizes are grid-aligned (8/16/24/32px)
- [ ] Light source consistent (top-left) across all sprites
- [ ] Motion is stepped for in-world elements, smooth only for UI chrome
- [ ] `prefers-reduced-motion` disables shimmer/particle loops
- [ ] No modern web UI patterns (soft shadows, rounded modals, sans-serif) present anywhere