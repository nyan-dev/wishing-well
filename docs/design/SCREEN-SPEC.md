# Screen specification: Wishing Well main experience

## Screen purpose

The main screen is a single, focused experience where a visitor:
1. Sees the pixel-art wishing well scene.
2. Is invited to make a wish.
3. Can toss a wish into the well.
4. Can discover a small number of anonymous wishes via paper boats.

## Layout zones

### Z1 — Scene frame

- Full-screen or main viewport area that contains the pixel-art scene.
- Includes the well, water, boats, and any surrounding courtyard or environment.
- Must remain readable at both desktop and mobile widths.

### Z2 — Primary call to action

- A clearly visible "Make a wish" action.
- Placed near the bottom or side of the scene where it does not cover the well.
- Visually stronger than any secondary actions (such as "Explore wishes").

### Z3 — Wish composer

- A text input panel or modal used to write a wish.
- Contains:
  - Label or short prompt (e.g., "Whisper your wish").
  - Single text field for the anonymous wish.
  - Optional short helper line reminding the user not to include personal information.
  - Primary button to toss the wish.
  - Secondary action to cancel and return to the scene.

### Z4 — Toss feedback

- A short visual sequence or state change showing that the wish has been tossed.
- May include:
  - A coin or note motion.
  - A boat appearing or moving on the water.
  - A subtle confirmation message.

### Z5 — Boat layer

- The visual layer where boats are visible on the water inside the well.
- Displays a limited number of boats at once (for readability).
- Boats are clickable / tappable targets.
- Each boat must be large enough on mobile to tap comfortably.

### Z6 — Wish viewer

- A simple panel or modal for reading a single anonymous wish from a selected boat.
- Contains:
  - The wish text.
  - A way to close the viewer and return to the scene.
- Does not show author identity or any personal information.

### Z7 — Status and helper text

- Small text areas that may show helper messages or status:
  - Validation messages if the wish input is empty.
  - Hints such as "Tap a boat to read a wish" when boats are visible.
- These messages must be readable and not overlap the boats or the main call to action.

## Visual and motion requirements

- The well must be wide, shallow, and open, with clearly visible water and thin stone walls.
- The scene should feel like 16-bit pseudo-isometric pixel-art, not like a flat infographic or abstract UI.
- Boats should be visually distinct and colorful enough to read as paper boats on the water.
- Motion should be gentle and readable:
  - Toss feedback is brief.
  - Boat movement is calm, not chaotic.
- The screen must avoid clutter: no unrelated floating shapes, charts, or generic SaaS-style cards.

## Responsiveness

- At mobile width:
  - Z1 scene frame remains visible and recognisable.
  - Z2 primary call to action is visible without horizontal scrolling.
  - Z3 wish composer and Z6 wish viewer are usable without zooming.
- At desktop width:
  - The scene can breathe with extra space.
  - Additional decorative details (courtyard, trees, etc.) may be visible but must not distract from the well.

## Accessibility notes

- Primary call to action and wish composer must be reachable via keyboard.
- Boat interactions must be usable with both pointer and keyboard focus.
- Text and buttons must meet contrast requirements on top of the pixel-art background.