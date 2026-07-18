# ch-3 Personal Project — Report

github_username: nyan-dev
personal_repo_url: https://github.com/nyan-dev/wishing-well
project_summary: An interactive wishing well with a scroll-driven journey, canvas animations, and shared wishes via Firebase.
slides_url: slides/pitch.md

## Methodology

My methodology was build the core flow first, then polish what users actually touch. I started with the customer journey: see the well exterior, scroll down into the shaft, reach the water at the bottom, write a wish, toss it as an origami boat, and discover wishes from others by clicking boats. Once that flow worked end to end, I improved the parts users would notice most.

I worked in small slices. First I built the static well scene with CSS transforms for the isometric exterior. Then I added the scroll-driven layer transitions using CSS custom properties updated on scroll. Next came the canvas animations — water shimmer, floating origami boats, and dust particles in the shaft. After that I implemented the wish form, Firebase Firestore integration with local fallback, and boat click detection for discovering wishes.

After each slice, I compared the screen against the reference design, tested at different viewports, and verified the canvas and scroll behavior still worked. This loop was: build the useful thing, look at it honestly, fix the weird parts, then commit. That kept the project moving while still protecting quality.

The final result is a single-page wishing well with scroll-driven depth transitions, canvas water and dust animations, floating origami boats, a wish writing modal, Firebase-powered wish storage, boat click discovery, and responsive layout. My superpower for this project was fast iteration with practical cleanup: ship the flow first, fix the visual details, and verify the app before documenting the work.

## Evidence — Claude Code usage

### MCP

- path: .mcp.json
- what: filesystem MCP was used for reading and writing project files, and fetch MCP was used for pulling API data and references.

### Skill

- path: .claude/skills/ui-polish/SKILL.md
- what: Documents the UI improvement workflow for the wishing well, including canvas sizing, scroll transitions, mobile responsiveness, accessibility, and animation smoothness.

### Agent

- path: .claude/agents/ui-reviewer.md
- what: Defines the UI reviewer role for inspecting the well UI, finding layout and animation issues, and applying small practical fixes.
