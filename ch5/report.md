# ch-5 Personal Project — Report

## Project

- **GitHub username:** @nyan-dev
- **Repo URL:** https://github.com/nyan-dev/wishing-well
- **Live / download URL:** https://nyan-dev.github.io/wishing-well/

## AI Tools Used

- **Claude Code (opencode)** — general coding assistant for writing canvas rendering, CSS, and JavaScript
- **Chrome DevTools MCP** — browser automation for screenshots (blocked by WSL)

### Skill (required)

- **path:** `.claude/skills/ui-polish/SKILL.md`
- **what:** workflow for improving spacing, responsiveness, animation smoothness, and accessibility

### Subagent (required)

- **path:** `.claude/agents/ui-reviewer.md`
- **what:** inspects well UI against DESIGN.md, finds layout and animation issues, proposes concrete CSS/JS fixes

## Trigger / Command

- `"review the well against design.md"` → ui-reviewer agent
- `"polish the UI for mobile"` → ui-polish skill

## Tech-Stack Slides

- **Slides path:** slides/tech-stack.md

## User Feedback

- **Feedback file:** feedback.md

### Interview Notes — Wishing Well Product Feedback

**Interviewer:** nyan-dev
**Date:** July 2026
**Product:** Wishing Well — https://nyan-dev.github.io/wishing-well/

---

#### Interview 1: Casual User

**Q: Does this app appeal to you?**
> Yeah, it looks cool. The pixel art style is nice — it feels like a little game, not a boring website. I liked seeing the boats float on the water.

**Q: What specifically appealed to you?**
> The well looks like something from an old RPG. The water shimmer and the boats drifting around made me want to click things. Writing a wish and watching the coin drop was satisfying.

**Q: Anything that put you off?**
> I didn't notice the "Make a Wish" button right away. It's tucked in the corner. I had to look for it.

**Q: Was the wish writing simple enough?**
> Yes. Type, hit submit, done. The modal looks like a game dialog box which fits the theme.

**Q: Did you try clicking boats?**
> I did. It's a nice surprise when you click a boat and someone else's wish pops up. Made me curious about what other people wished for.

**Q: What would you improve?**
> Two things — make the wish button more obvious, and show a quick "wish sent!" message before the modal closes. Right now it just closes and you're not sure if it worked.

---

#### Interview 2: Developer Friend

**Q: Does this app appeal to you?**
> Visually yes. The pixel art is well done. The dithered water is a nice touch — proper retro feel.

**Q: What specifically appealed to you?**
> The wooden beam and rope detail sells it. The stone blocks look individually placed, not like a smooth ring. Good execution on the design.

**Q: Anything that put you off?**
> On mobile the textarea in the wish modal felt cramped. I had to scroll to see what I was typing.

**Q: Was the interaction flow clear?**
> Mostly. See well → make wish → see boat appear → click boats to discover. The flow makes sense. Just needed to find the button first.

**Q: What would you improve?**
> Make the textarea taller on mobile. And maybe add a small animation when a new boat appears — like a splash or ripple — so you know your wish became a boat.

---

#### Summary of Findings

| Question | Verdict |
|---|---|
| 1. Does the app appeal? | **Yes** — pixel art style, dithered water, and floating boats create a charming retro experience |
| 2. Simple enough? | **Yes** — wish writing is intuitive, boat discovery is fun. Button visibility is the main UX gap |
| 3. Improvements | **(1)** Make "Make a Wish" button more prominent. **(2)** Add confirmation after wish submission. **(3)** Taller textarea on mobile |

## Issues to Fix in Ch-6

1. Add first-load glow/pulse to "Make a Wish" button
2. Increase textarea height on mobile viewports
3. Add confirmation message after wish submission
