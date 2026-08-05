# Wishing Well — Redesign Sprint Issue Plan

## Epic overview

| # | Epic | Priority | Area |
|---|------|----------|------|
| E1 | Hero well rendering | P0 | Frontend |
| E2 | Scene composition and environment | P0 | Design / Frontend |
| E3 | Wish flow and interaction UI | P0 | Frontend |
| E4 | Discover wishes and boat interaction | P1 | Frontend |
| E5 | Polish, responsiveness, and accessibility | P1 | Frontend / QA |

---

## E1 — Hero well rendering

**Type:** Epic
**Area:** Frontend
**Priority:** P0
**Size:** XL

**Description:**
The well is the visual centerpiece of the entire product. Per DESIGN.md, it must read as a handcrafted isometric 16-bit fantasy stone wishing well — not a flat ring, not a geometric cutaway, not a generic retro UI element. This epic covers rendering the well itself: its stone silhouette, wide opening, thin walls, visible water surface, stone segmentation with directional lighting, and the wooden beam/rope detail. The implementation must use CSS/HTML segmented stone pieces or canvas pixel drawing to achieve the chunky, hand-built look. Smooth ellipses and single-band rings are explicitly banned.

**Success criteria:**
- Well reads immediately as a fantasy stone wishing well, not a geometric shape
- Wide circular opening with relatively thin stone walls
- Stone rim built from many uneven segmented pieces, not one smooth band
- Top-left directional lighting with clear highlight/shadow distinction
- Inner wall visible and shallow enough that water remains prominent
- Wooden beam and rope/pulley detail present
- Water surface is large and clearly visible from the main viewing angle

---

### Story: Render the stone rim from segmented pieces

**Type:** Story
**Area:** Frontend
**Priority:** P0
**Size:** L

**Description:**
Replace or rebuild the current well rim rendering so it is constructed from many individual stone segments rather than a single smooth ring. Each stone should have slightly different size, edge irregularity, and lighting based on its position relative to the top-left light source. The rim must follow 2:1 isometric logic (2px horizontal : 1px vertical rhythm) while remaining stylised for readability.

**Success criteria:**
- Rim is composed of 20+ distinct stone segments
- No single smooth ellipse or uniform band is visible
- Upper-left stones receive lighter highlights, lower-right stones receive deeper shadows
- Stone edges are hard-edged and pixel-crisp, not anti-aliased smooth
- The overall shape reads as a circular isometric rim

---

### Story: Render the inner wall and depth

**Type:** Story
**Area:** Frontend
**Priority:** P0
**Size:** M

**Description:**
Add a visible inner wall just inside the rim that suggests shallow depth without creating a deep dark shaft. The inner wall should use smaller stones or shading bands and be clearly distinct from the outer wall. The interior must remain bright enough that the water surface is the dominant visual feature inside the well.

**Success criteria:**
- Inner wall is visually distinct from the outer rim
- Interior suggests depth but does not disappear into darkness
- Water surface occupies most of the visible opening
- Shadow under the rim is subtle, not oppressive

---

### Story: Render the water surface

**Type:** Story
**Area:** Frontend
**Priority:** P0
**Size:** M

**Description:**
Implement the water surface as a large, clearly visible central feature inside the well. Water must use the defined water colour ramp (dark blue-teal through turquoise to pale sparkle) and feel calm and magical. It must be wide enough to display multiple paper boats and should not be treated as a tiny hidden detail. The rendering should use stepped pixel-art shading, not smooth CSS gradients.

**Success criteria:**
- Water occupies the majority of the visible well interior
- Water uses the 5-tone water ramp from DESIGN.md
- Water edges meet the inner wall cleanly
- Water reads as a calm, flat surface — not a deep pit
- At a glance, the water is one of the first things noticed

---

### Story: Add wooden beam and rope detail

**Type:** Story
**Area:** Frontend
**Priority:** P0
**Size:** S

**Description:**
Add the wooden beam support structure above the well: two vertical supports and one horizontal beam with a visible rope or pulley element. Wood should feel hand-hewn with chunky fantasy-RPG proportions, using the 4-tone wood ramp. The beam helps the object read as a wishing well rather than a generic stone ring.

**Success criteria:**
- Two supports and one horizontal beam are visible
- Rope or pulley detail is present
- Wood uses the defined 4-tone wood colour ramp
- Beam proportions feel chunky and hand-hewn, not thin or polished
- Beam sits naturally on or above the rim

---

## E2 — Scene composition and environment

**Type:** Epic
**Area:** Design / Frontend
**Priority:** P0
**Size:** L

**Description:**
The well must sit within a believable scene, not float in isolation. This epic covers the surrounding courtyard composition, moss and grass breakup on the stones, the dark atmospheric background, the ground plane, and any environmental props (lantern, sign, grass tufts). Per SCREEN-SPEC.md, the scene must remain readable at both desktop and mobile widths. Per DESIGN.md, the environment should feel dense and crafted, not sparse and abstract.

**Success criteria:**
- Well sits within a recognisable courtyard/ground context
- Moss and grass appear organically between and around stones
- Dark atmospheric background is present (deep navy / indigo / muted twilight)
- Scene remains readable and focused on the well at all viewport sizes
- No unrelated floating shapes, charts, or generic SaaS-style cards

---

### Story: Add moss and grass breakup to the well

**Type:** Story
**Area:** Frontend
**Priority:** P0
**Size:** S

**Description:**
Add small clumps of moss and grass tucked between stones on the rim and around the base. Moss should use the 4-tone moss ramp and feel organic and irregular — not rectangular, not patterned, not floating as separate stickers. Moss helps the well feel old and hand-built.

**Success criteria:**
- Moss appears in gaps between rim stones and at the base
- Moss uses the 4-tone moss colour ramp
- Placement is irregular and organic
- No neat repeated patterns or rectangular patches
- Moss does not obscure the water or boats

---

### Story: Build the atmospheric background

**Type:** Story
**Area:** Frontend
**Priority:** P0
**Size:** S

**Description:**
Create a dark atmospheric background that frames the well scene. Use deep navy, indigo, or muted twilight blue tones. The background should feel moody and game-like, not like a flat CSS colour or a modern gradient. It must recede behind the well without competing for attention.

**Success criteria:**
- Background uses deep navy / indigo / muted twilight tones
- No bright or saturated background colours
- Background recedes behind the well
- No distracting patterns or competing elements

---

### Story: Position and scale the scene for desktop and mobile

**Type:** Story
**Area:** Frontend
**Priority:** P0
**Size:** M

**Description:**
Ensure the diorama scene is properly positioned and scaled for both desktop and mobile viewports. On desktop, the scene can breathe with extra space and show more environmental detail. On mobile, the well should remain centred and prominent, the scene simplified, and the primary action visible without horizontal scrolling. The well should dominate the composition at all sizes.

**Success criteria:**
- Well is centred and prominent at all viewport widths
- No horizontal scrolling on mobile (360px+)
- Scene does not overflow or clip awkwardly
- Desktop layout uses space for environmental detail
- Mobile layout simplifies and prioritises the well

---

## E3 — Wish flow and interaction UI

**Type:** Epic
**Area:** Frontend
**Priority:** P0
**Size:** L

**Description:**
The create-first ritual is the core product loop: open wish composer, write wish, toss, see boat appear. This epic covers the RPG-dialog modal styling, the wish text input, the toss animation, the boat appearance confirmation, and the toast notification. Per PRD.md, the primary action must be visually more prominent than any secondary action, and the toss must feel like a meaningful ritual rather than a form submission. The modals should feel like RPG dialog boxes, not generic SaaS modals.

**Success criteria:**
- "Make a Wish" FAB is clearly visible and the primary call to action
- Wish composer opens in an RPG-dialog styled modal
- Wish text input is usable and accessible (keyboard focusable, labelled)
- Toss animation is brief and satisfying
- A new boat appears on the water after toss
- Toast confirms the wish was tossed
- Empty wishes cannot be submitted
- Composer can be cancelled without submitting

---

### Story: Style the wish composer as an RPG dialog

**Type:** Story
**Area:** Frontend
**Priority:** P0
**Size:** M

**Description:**
Restyle the wish input modal to feel like a retro RPG dialog box rather than a modern web modal. The dialog should use the pixel-art typography (Press Start 2P for titles, VT323 for body text), have a chunky bordered frame, and feel integrated with the scene. The textarea should have clear placeholder text ("Whisper your wish..."), a character counter, and a prominent "Toss Coin" submit button. A close button must allow cancelling.

**Success criteria:**
- Modal frame looks like an RPG dialog box with pixel-art borders
- Title uses Press Start 2P or similar pixel font
- Body text uses VT323 or similar readable pixel-compatible font
- Textarea is clearly labelled and keyboard accessible
- Character counter is visible
- Submit button is prominent and styled as a pixel-art button
- Close button is visible and functional

---

### Story: Implement the toss animation

**Type:** Story
**Area:** Frontend
**Priority:** P0
**Size:** M

**Description:**
After the user submits a wish, a brief toss animation must play to confirm the action. This could involve a coin or note motion toward the well, a sparkle burst, and a ripple on the water. The animation should feel satisfying and ritualistic, not like a generic loading spinner. Per DESIGN.md, motion should be subtle, readable, and deliberate. After the animation, a new boat must appear on the water.

**Success criteria:**
- Toss animation plays immediately on submit
- Animation involves motion toward the well (coin/note trajectory)
- Sparkle or light burst effect is present
- Water ripple effect is present
- Animation completes in under 2 seconds
- A new boat appears on the water after animation ends
- Toast notification confirms "Your wish has been tossed!"

---

### Story: Style the make-a-wish FAB

**Type:** Story
**Area:** Frontend
**Priority:** P0
**Size:** S

**Description:**
The "Make a Wish" floating action button must be visually prominent and clearly the primary call to action on the screen. It should be styled with pixel-art aesthetics, positioned where it does not cover the well, and be large enough to tap on mobile. Per SCREEN-SPEC.md, it must be more prominent than any secondary actions.

**Success criteria:**
- FAB is visually the most prominent interactive element on screen
- FAB uses pixel-art styling consistent with the scene
- FAB is positioned outside the well's center area
- FAB is large enough to tap comfortably on mobile (minimum 44px tap target)
- FAB is keyboard accessible

---

### Story: Wire up wish storage and boat generation

**Type:** Story
**Area:** Frontend
**Priority:** P0
**Size:** M

**Description:**
Connect the toss action to the existing Firebase storage so the wish is persisted. After storage, generate a new boat object on the water canvas. Per ARCHITECTURE.md, the storage layer is flexible for this sprint — local-only or simple demo data is acceptable. The key requirement is that the boat appears after toss and that subsequent visitors can discover wishes via boats.

**Success criteria:**
- Wish text is stored (locally or via Firebase) after toss
- A new boat appears on the water linked to the stored wish
- Boat position is randomised on the water surface
- Maximum visible boat count is enforced for readability
- No console errors on submit

---

## E4 — Discover wishes and boat interaction

**Type:** Epic
**Area:** Frontend
**Priority:** P1
**Size:** M

**Description:**
Visitors should be able to tap or click a paper boat on the water to discover a random anonymous wish. This epic covers boat rendering on the water canvas, click/tap detection, the wish discovery modal, and the reading experience. Per PRD US-05, the goal is to create a small feeling of connection with another person. Per SCREEN-SPEC.md Z5 and Z6, boats must be tappable targets and the wish viewer must be simple and low-distraction.

**Success criteria:**
- Multiple paper boats are visible on the water
- Boats are clickable/tappable targets
- Tapping a boat opens a modal with a random anonymous wish
- Wish viewer is simple, readable, and low-distraction
- Close button returns to the main scene
- No author identity or personal information is shown
- Boat interactions work on both desktop and mobile

---

### Story: Render paper boats on the water

**Type:** Story
**Area:** Frontend
**Priority:** P0
**Size:** M

**Description:**
Draw multiple paper boats on the water canvas. Boats should use the defined boat colour ramp (off-white folded paper base, warm shadow, tiny highlight). They must read as small paper boats, not random rectangles. Boats should be distributed naturally on the water surface, with gentle drift motion. Per DESIGN.md, boat movement should feel calm and buoyant.

**Success criteria:**
- At least 3–5 boats are visible on the water
- Boats are drawn as recognisable paper boat shapes
- Boats use the off-white/warm shadow palette
- Boats drift gently on the water (calm motion)
- Boats are distributed across the water surface, not clustered
- Boats are large enough to tap on mobile

---

### Story: Add boat click/tap detection

**Type:** Story
**Area:** Frontend
**Priority:** P1
**Size:** S

**Description:**
Implement hit detection on the water canvas so that clicking or tapping a boat triggers the wish discovery flow. The detection must work with both mouse clicks and touch events. The target area must be generous enough for comfortable mobile tapping.

**Success criteria:**
- Clicking a boat opens the wish discovery modal
- Touch-tapping a boat opens the wish discovery modal
- Tap target is at least 44px on mobile
- Non-boat clicks on the water do nothing (no false triggers)
- Keyboard focus can reach boats for accessibility

---

### Story: Style and wire the wish discovery modal

**Type:** Story
**Area:** Frontend
**Priority:** P1
**Size:** S

**Description:**
Style the wish discovery modal as an RPG dialog box matching the wish composer aesthetic. On boat tap, fetch a random wish from storage and display it. The modal should show only the wish text and a close button — no author identity, no profile signals, no social features.

**Success criteria:**
- Discovery modal matches the RPG dialog aesthetic
- Random wish text is displayed on boat tap
- Close button returns to the main scene
- No author identity or personal information is shown
- Modal is keyboard accessible

---

## E5 — Polish, responsiveness, and accessibility

**Type:** Epic
**Area:** Frontend / QA
**Priority:** P1
**Size:** L

**Description:**
Final pass to ensure the experience works well on all devices, meets accessibility requirements, and feels polished. This epic covers responsive layout testing, keyboard navigation, contrast checks, console error cleanup, scroll behaviour refinement, and overall visual QA against the DESIGN.md validation checklist.

**Success criteria:**
- Core flow works on 360px mobile and 1440px desktop
- All interactive elements are keyboard accessible
- Text meets contrast requirements on pixel-art backgrounds
- No console errors or broken interactions
- Scroll behaviour reveals water and boats more clearly
- Scene passes the DESIGN.md validation checklist

---

### Story: Responsive layout audit and fixes

**Type:** Story
**Area:** QA
**Priority:** P1
**Size:** M

**Description:**
Test the full experience at mobile (360px), tablet (768px), and desktop (1440px) widths. Verify that the well, FAB, wish composer, wish viewer, and boats are all visible and usable. Fix any overflow, clipping, or layout issues. Ensure no horizontal scrolling on any viewport.

**Success criteria:**
- No horizontal scrolling at 360px, 768px, or 1440px
- Well is centred and prominent at all sizes
- FAB is tappable at all sizes
- Modals are usable without zooming on mobile
- Boats are tappable at all sizes
- Environmental detail is visible on desktop

---

### Story: Keyboard and accessibility audit

**Type:** Story
**Area:** QA
**Priority:** P1
**Size:** S

**Description:**
Verify that all interactive elements (FAB, modal close buttons, textarea, submit button, boats) are reachable and operable via keyboard. Check focus indicators are visible. Verify ARIA attributes are correct on modals and interactive elements. Ensure text contrast meets WCAG AA against pixel-art backgrounds.

**Success criteria:**
- All interactive elements are focusable via Tab
- Focus indicator is visible on all focusable elements
- Modals trap focus correctly
- Escape key closes modals
- ARIA roles and labels are correct
- Text contrast meets WCAG AA (4.5:1 for body, 3:1 for large text)

---

### Story: Scroll behaviour refinement

**Type:** Story
**Area:** Frontend
**Priority:** P1
**Size:** S

**Description:**
Refine the scroll-based perspective reveal so that scrolling slightly rotates the well to show more water and boats. Per DESIGN.md, motion should be subtle, reveal more of the water surface, and preserve the retro fantasy feeling. Large camera spins or dramatic rotations are banned.

**Success criteria:**
- Scrolling reveals slightly more water surface
- Motion is subtle and readable
- Isometric illusion is preserved during scroll
- No dramatic 3D spinning or large camera swings
- Boat visibility increases as user scrolls

---

### Story: Console error cleanup and final QA

**Type:** Story
**Area:** QA
**Priority:** P1
**Size:** S

**Description:**
Open the app in Chrome, Firefox, and Safari. Complete the full wish flow (write, toss, see boat, discover wish). Check the browser console for any errors, warnings, or broken resource loads. Fix any issues found. Run through the DESIGN.md 13-point validation checklist and confirm each item.

**Success criteria:**
- Zero console errors in Chrome, Firefox, Safari
- Full wish flow completes without errors
- All 13 DESIGN.md validation checklist items pass
- No broken resource loads (fonts, scripts, images)

---

## Summary by priority

| Priority | Issues |
|----------|--------|
| P0 | E1 (4 stories), E2 (4 stories), E3 (4 stories) = **12 stories + 3 epics** |
| P1 | E4 (3 stories), E5 (4 stories) = **7 stories + 2 epics** |
| **Total** | **5 epics, 19 stories** |

## Size breakdown

| Size | Count |
|------|-------|
| XS | 0 |
| S | 7 |
| M | 8 |
| L | 3 |
| XL | 1 (epic E1, summed) |
