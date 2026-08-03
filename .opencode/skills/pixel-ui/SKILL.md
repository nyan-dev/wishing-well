---
name: pixel-ui
description: Apply Wishing Well's pseudo-isometric 16-bit pixel-art scene rules to UI and visual implementation tasks.
---

# Pixel UI Skill

Use this skill whenever a task involves:

- scene composition
- well visuals
- pixel-art UI styling
- boat readability
- title and call-to-action hierarchy
- motion and environmental polish
- avoiding generic or abstract visual drift

## Purpose

This skill translates the Wishing Well project’s visual intent into practical implementation guidance for agents working on UI and front-end tasks.

It should be used together with:
- `docs/design/SCREEN-SPEC.md`
- `docs/design/DESIGN-SYSTEM.md`
- `DESIGN.md`
- `docs/product/PRD.md`
- `docs/engineering/ARCHITECTURE.md`

## Core visual truths

Always preserve these truths:

- The experience is **create-first**.
- The screen is a **scene**, not a dashboard or generic app page.
- The well must be **wide, shallow, and open**, with visible water.
- Boats must be legible as paper boats, not random decorative shapes.
- The perspective is **pseudo-isometric / three-quarter top-down**, not flat top-down and not front-facing.
- The environment should feel calm, magical, and handcrafted.

## Composition rules

When editing layout or visuals:

- Keep the well as the dominant focal object.
- Let supporting UI frame the scene rather than overpower it.
- Keep the primary “make a wish” action visible and clearly stronger than secondary actions.
- Avoid large empty dead zones unless they intentionally improve focus.
- Add density through meaningful environment detail, not random decoration.

## Pixel-art rules

When styling pixel-art-like UI:

- Prefer clear silhouettes over excessive detail noise.
- Use restrained color groups with readable contrast.
- Keep interactive objects distinct from the environment.
- Preserve clean edges and retro-inspired proportions.
- Do not mix smooth modern vector aesthetics with the core scene unless done very lightly for readability.

## Motion rules

When editing animation or transitions:

- Motion should support ritual and atmosphere.
- Toss animation should be short, readable, and satisfying.
- Boat movement should be gentle and buoyant, not jittery.
- Avoid chaotic particle motion and overly busy floating effects.
- Scroll interactions should reveal the well and water more clearly, not distort them into abstraction.

## UI integration rules

When editing UI elements over the scene:

- Inputs, buttons, and modal/panel surfaces must remain readable.
- The UI should feel integrated with the world, not pasted on top like a generic app shell.
- The title can be stylized, but helper text and interaction text must prioritize readability.
- Mobile readability is mandatory.

## Anti-patterns

Reject or warn against:

- flat oval ponds,
- infographic rings,
- giant disconnected dark backgrounds,
- floating rectangles with no environmental logic,
- generic SaaS cards dominating the page,
- neon retro-wave palettes,
- overdecorated particles,
- visual changes that reduce the clarity of the create-first flow.

## Recommended response style

When using this skill, produce outputs in this structure:

### Visual objective
- ...

### Relevant design docs
- ...

### Affected zones or elements
- ...

### Recommended changes
- ...

### Anti-patterns to avoid
- ...

### Expected visual result
- ...