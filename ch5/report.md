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
- **Interview notes:** [feedback/interview-notes.md](../feedback/interview-notes.md)

## Issues to Fix in Ch-6

1. Add first-load glow/pulse to "Make a Wish" button
2. Increase textarea height on mobile viewports
3. Add confirmation message after wish submission
