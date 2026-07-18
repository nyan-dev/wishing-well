# Wishing Well — Project Context

A single-page interactive wishing well experience built with vanilla HTML, CSS, and JavaScript for GitHub Pages.

## Tech Stack

- **HTML/CSS/JS** — no framework, no build step
- **Canvas API** — water shimmer, floating origami boats, dust particles
- **Firebase Firestore** — wish persistence (with local fallback)
- **GitHub Pages** — deployment target

## Architecture

- `index.html` — semantic app shell, layered well scene, canvas overlays, modals
- `css/well.css` — midnight theme, isometric well exterior, scroll journey layers, modal UI
- `js/scroll.js` — scroll-driven `--scroll-progress` property for layer transitions
- `js/canvas.js` — water shimmer, boat animation, dust particles, boat click detection
- `js/firebase.js` — Firestore init, submit/fetch wish helpers
- `js/app.js` — modal flow, wish form events, boat-click discovery

## Key Concepts

### Scroll Journey
The page uses a sticky viewport + tall scroll space. A CSS custom property `--scroll-progress` (0–1) drives opacity and transform on four layered sections: exterior, opening, shaft, water.

### Canvas Overlays
Two `<canvas>` elements — one for dust particles (in the shaft), one for water shimmer + boats (at the bottom). Both resize on window resize and reinit boats.

### Wish Flow
1. User taps "Make a Wish" FAB
2. Modal opens, user types wish, taps "Toss Coin"
3. Wish saved to Firestore (or local store), boat added to water
4. User scrolls to water, taps a boat to discover a wish

## Working Conventions

- Commit small, frequent changes — this is your git methodology
- CSS: use CSS custom properties for tokens, `clamp()` for fluid sizing
- JS: vanilla ES modules, no build step
- Accessibility: semantic HTML, aria labels, keyboard navigation
- Responsive: test at mobile (< 700px) and desktop viewports
