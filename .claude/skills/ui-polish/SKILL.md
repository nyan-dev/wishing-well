---
name: ui-polish
description: Use when improving the wishing well app UI, spacing, clarity, responsiveness, and animation smoothness.
allowed-tools: Read, Edit, Bash
---

# UI Polish Skill — Wishing Well

Use this skill when the user wants to improve the wishing well web app's visual quality, user experience, or animation smoothness.

## Context

The wishing well is a single-page vanilla HTML/CSS/JS app. It uses:
- A scroll-driven layered journey (exterior → opening → shaft → water)
- Canvas animations (water shimmer, floating origami boats, dust particles)
- Modal system for writing wishes and discovering them
- Firebase Firestore for wish storage (with local fallback)

## Focus Areas

1. **Visual hierarchy and spacing** — clear heading sizes, readable text, balanced whitespace
2. **Mobile responsiveness** — touch-friendly FAB, proper layer sizing, scroll-space at all viewports
3. **Accessibility and contrast** — readable against the dark theme, proper focus indicators, keyboard navigation
4. **Animation smoothness** — avoid jank on scroll, canvas resize on layer visibility, requestAnimationFrame efficiency
5. **Micro-interactions** — wish toss feedback, boat hover effects, modal transitions

## When Used

- Review the current page at the relevant viewport
- Identify the top 5 UI problems
- Propose concrete CSS/JS fixes (small, high-impact first)
- Always verify the fix doesn't break existing canvas or scroll behavior
- Commit changes as small, focused commits
