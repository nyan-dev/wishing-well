# ch-5 Personal Project — Report

## Project

- **GitHub username:** @nyan-dev
- **Repo URL:** https://github.com/nyan-dev/wishing-well
- **Live / download URL:** https://nyan-dev.github.io/wishing-well/
- **License:** MIT
- **One-line summary:** An interactive pixel-art wishing well where you write a wish, toss it as an origami boat, and discover wishes from others by clicking floating boats.

## Product-Intro Slides

- **Slides path:** slides/intro.md

## Tech-Stack Slides

- **Slides path:** slides/tech-stack.md

## AI Tools Used

- **ui-reviewer agent** — inspects well UI against DESIGN.md, finds layout and animation issues, proposes concrete CSS/JS fixes
- **ui-polish skill** — focused workflow for improving spacing, responsiveness, animation smoothness, and accessibility
- **Claude Code (opencode)** — general coding assistant for writing canvas rendering, CSS, and JavaScript
- **Chrome DevTools MCP** — attempted for screenshots (blocked by WSL/Windows boundary)

## Methodology

1. Build the core flow first — get the wish experience working end to end
2. Compare against DESIGN.md — the visual source of truth
3. Fix in small slices — one concern per commit
4. Verify at viewports — test mobile and desktop before finishing
5. Document as you go — slides, report, screenshots stay current

## Trigger + Commands

- **UI Review:** `"review the well against design.md"` → loads ui-reviewer agent
- **UI Polish:** `"polish the UI for mobile"` → loads ui-polish skill
- **Deploy:** `git push origin main` → GitHub Pages auto-deploys

## Feedback

- **Feedback file:** feedback.md
- **Method:** Written feedback from 3 users
- **Key findings:**
  1. "Make a Wish" button needs better visibility on first load
  2. Textarea too small on mobile
  3. No confirmation after wish submission

## Issues to Fix in Ch-6

1. Add first-load glow/pulse to "Make a Wish" button
2. Increase textarea height on mobile viewports
3. Add confirmation message after wish submission
