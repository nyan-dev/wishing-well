---
description: Run a structured QA review of the current Wishing Well UI and interaction flow using the QA agent.
agent: qa
subtask: true
---

Run a focused QA review for the current Wishing Well implementation.

## Required context

Read and follow:

- `AGENTS.md`
- `docs/product/PRD.md`
- `docs/design/SCREEN-SPEC.md`
- `docs/design/DESIGN-SYSTEM.md`
- `DESIGN.md`
- `docs/engineering/ARCHITECTURE.md`

If relevant, inspect:
- `index.html`
- `css/`
- `js/`

Use the `playwright-visual-qa` skill.

## Task

Review the current implementation and produce a structured QA result.

## Required checks

### Product clarity
- Is the create-first flow still clear?
- Is the primary action obvious?

### Interaction continuity
- Does the wish flow still make sense?
- Do boats still function as discoverable interaction points?

### Scene readability
- Does the well still read as wide, shallow, and water-visible?
- Does the screen still feel like a pseudo-isometric pixel-art scene?

### Responsive behavior
- Is the main interaction usable on mobile and desktop?
- Are key UI elements readable and tappable?

### Anti-pattern detection
Flag any of the following if present:
- flat oval pool reading
- abstract scene geometry
- giant dead dark space
- generic app-card UI dominating the scene
- overly chaotic motion
- reduced clarity of the core ritual

## Output format

### Review target
- ...

### What passed
- ...

### Issues found
- ...

### Severity
- high / medium / low

### Suggested next fixes
- ...