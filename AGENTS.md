# Wishing Well — Architecture Rules

## Role and Tech Stack

You are working on a vanilla HTML/CSS/JS single-page app. No frameworks, no build step. The app deploys to GitHub Pages.

## Project Structure

- `index.html` — semantic app shell, layered well scene, canvas overlays, modals
- `css/well.css` — all styles: tokens, theme, layout, components
- `js/scroll.js` — scroll-driven `--scroll-progress` updates
- `js/canvas.js` — canvas animations (water, boats, dust)
- `js/firebase.js` — Firestore init and wish helpers
- `js/app.js` — modal flow, wish form, boat-click discovery
- `slides/pitch.md` — Marp presentation (6 slides, 20s auto-advance)
- `ch3-report.md` — project report for team repo

## Execution Directives

When asked to create a feature:

1. First, check the existing files for patterns and conventions.
2. Keep changes small and focused — one concern per commit.
3. Use CSS custom properties for tokens and `clamp()` for fluid sizing.
4. Use semantic HTML and aria attributes for accessibility.
5. Verify canvas and scroll behavior still work after CSS changes.
6. Test at mobile (< 700px) and desktop viewports before finishing.

## Key Constraints

- No framework dependencies — vanilla HTML/CSS/JS only
- No build step — files load directly in the browser
- Firebase config is injected via `window.__WISHING_WELL_FIREBASE_CONFIG__` in index.html
- Canvas must be resized when the containing layer becomes visible
- Scroll progress drives all layer transitions — keep it performant (passive listener, requestAnimationFrame)
