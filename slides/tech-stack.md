---
marp: true
theme: default
paginate: true
transition: fade
---

# Tech Stack

Wishing Well is built with zero frameworks and zero build steps.

---

# Stack

- **HTML** — semantic app shell, layered canvas scene, ARIA labels
- **CSS** — custom properties for tokens, pixel-art shadows, stepped transitions
- **JavaScript** — vanilla ES6, no transpiler, no bundler
- **Canvas API** — pixel-art well rendering, water shimmer, boat animation
- **Firebase Firestore** — wish storage with local fallback
- **GitHub Pages** — static hosting, auto-deploy on push

---

# Agents

- **ui-reviewer** — inspects the well UI against DESIGN.md, finds layout and animation issues, applies small practical fixes
- **Trigger:** "review the well UI" or "check the well against design.md"
- **Output:** list of violations with concrete CSS/JS fixes

---

# Skills

- **ui-polish** — focused workflow for improving spacing, responsiveness, animation smoothness, and accessibility
- **Trigger:** "polish the UI" or "improve the well layout"
- **Workflow:** screenshot at viewport → identify top 5 issues → propose fixes → verify canvas/scroll still work → commit

---

# Methodology

1. **Build the flow first** — get the core wish experience working end to end
2. **Compare against design source** — DESIGN.md is the visual truth
3. **Fix in small slices** — one concern per commit
4. **Verify at viewports** — test mobile (< 700px) and desktop before finishing
5. **Document as you go** — slides, report, screenshots stay current

---

# Trigger + Commands

- **UI Review:** `"review the well against design.md"` → loads ui-reviewer agent
- **UI Polish:** `"polish the UI for mobile"` → loads ui-polish skill
- **Canvas check:** `"verify canvas and scroll still work after CSS changes"` → manual test
- **Deploy:** `git push origin main` → GitHub Pages auto-deploys
