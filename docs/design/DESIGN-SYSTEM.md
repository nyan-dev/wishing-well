# Design system: Wishing Well

## Purpose

This file translates the Wishing Well art direction into practical visual rules for design and implementation. It works with:
- `docs/product/PRD.md` for product goals and scope
- `docs/design/SCREEN-SPEC.md` for screen structure and behavior
- `DESIGN.md` for detailed art direction of the well and scene

## Design principles

- Scene first: the well and water are the visual center of the product.
- Create first: the main action is writing and tossing a wish.
- Calm magic: the experience should feel gentle, reflective, and slightly whimsical.
- Pixel credibility: the interface should feel like retro pixel-art environment design, not generic modern SaaS UI.
- Readability over decoration: text and controls must remain clear on top of pixel-art backgrounds.

## Visual style

### Style keywords

- 16-bit retro
- pseudo-isometric / three-quarter top-down
- fantasy village prop
- warm, cozy, handmade
- shallow stone well with visible water
- floating paper boats
- calm atmospheric motion

### Avoid

- Abstract geometric pond shapes
- Flat infographic-style rings
- Generic neon retro-wave aesthetics
- Smooth vector gradients as the main visual style
- Large empty dark areas with disconnected UI
- Excessive decorative particles or chaotic motion
- Modern SaaS cards that compete with the scene

## Color system

### Core palette roles

- Background night / shadow: deep navy or muted dusk blue
- Stone / structure: desaturated gray-brown and cool slate
- Water: muted teal to blue-green
- Moss / foliage: low-saturation natural greens
- Warm accents: restrained gold, lantern-amber, or parchment-beige
- Boat accents: small pops of readable color, but still within a retro palette

### Color rules

- Use a restrained palette with a strong dark-vs-light readability structure.
- Interactive highlights should be warm and intentional, not highly saturated neon.
- The water must visually separate from the stone rim and surrounding ground.
- The boats must stand out enough to be identifiable at a glance.

## Typography

### Typography direction

- Title: pixel-style display font or retro display type with strong readability
- UI text: simple readable font or pixel-compatible font for labels, buttons, and modal text
- Body text must remain easy to read on both mobile and desktop

### Typography rules

- The title can be expressive, but helper text and interaction labels must be simpler.
- Avoid overly tiny text in the main interaction flow.
- Use clear contrast between title, helper text, and body copy.
- The modal/panel text must prioritize readability over strict retro styling.

## Layout and spacing

### Layout rules

- The well scene is the main visual block and should dominate the composition.
- The primary action must not obscure the center of the well.
- Supporting UI should frame the scene, not overpower it.
- Desktop can show more environmental detail; mobile should simplify and prioritize function.

### Spacing rules

- Use consistent spacing between title, subtitle, action area, and scene.
- Avoid large unused empty regions unless they intentionally improve focus.
- Keep modal/panel spacing generous enough for readability, even if the scene itself is dense.

## Motion

### Motion principles

- Motion should communicate ritual, not spectacle.
- The toss action should feel satisfying and intentional.
- Boat movement should feel calm and buoyant.
- Ambient motion should be subtle and never distract from the main action.

### Motion rules

- Prefer short, readable animations over long decorative sequences.
- Avoid jittery or overly busy floating effects.
- Scroll-based movement should reveal the well and water more clearly, not distort the scene.
- Any animation must preserve the illusion of a physical scene.

## Components

### Primary action

Purpose:
- Start the make-a-wish flow.

Rules:
- Must be visually prominent.
- Must be readable over the background.
- Must clearly read as the main action.

### Wish composer

Purpose:
- Let the visitor write one anonymous wish.

Rules:
- Should feel integrated with the scene, not like an unrelated app form.
- Must be readable and accessible.
- Should include only the minimum required controls.

### Boat element

Purpose:
- Represent anonymous wishes visually on the water.

Rules:
- Must read clearly as a small paper boat, not a random rectangle.
- Must be tappable/clickable.
- Must remain visible against the water surface.

### Wish viewer

Purpose:
- Show a discovered anonymous wish.

Rules:
- Simple, readable, low-distraction presentation.
- Must return the visitor easily to the main scene.
- No author identity or profile signals.

## Accessibility and implementation notes

- Contrast and readability take priority over strict visual purity.
- Keyboard focus must be visible for primary interactions.
- Boats and action controls must be usable on small screens.
- The visual system should support implementation in HTML/CSS/JS without requiring heavy graphics frameworks.

## Current design problems to solve

- The current generated composition reads more like a flat oval pool than a believable wishing well.
- The environment lacks the dense, crafted scene feeling of the target reference.
- The visual hierarchy between title, action, scene, and interactive objects is not yet strong enough.
- The screen needs clearer integration between interaction UI and environment art.