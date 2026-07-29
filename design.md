# design.md — Wishing Well Art Direction

> This file is the visual source of truth for Wishing Well.
> Read this before editing HTML, CSS, SVG, canvas drawing, motion, or visual assets.
> `AGENTS.md` defines workflow and constraints.
> This file defines exactly what the project should look like.

---

## 1. Core goal

Wishing Well must look like a **handcrafted isometric 16-bit fantasy game prop**.

The center of the page is not a diagram, not an icon, not a generic retro-themed UI element, and not a clean vector cutaway.

It must feel like a **single environment asset from a retro fantasy RPG**, shown as a beautiful hero object:
- old stone wishing well
- wide circular opening
- relatively thin stone walls
- shallow enough interior that the water is clearly visible
- many visible paper boats floating on the water
- moss and grass between stones
- wooden beam and rope detail
- dramatic top-left lighting
- dark atmospheric background

The visual target is **pixel-art diorama first, interface second**.

If a screenshot looks like a modern website, infographic, minimal vector illustration, or abstract isometric object, it has failed.

If a screenshot looks like a fantasy game asset from a retro RPG, it has succeeded.

---

## 2. Critical visual target

The well must look like:
- a wide circular stone wishing well
- built from many small uneven stone blocks
- relatively thin walls instead of a thick heavy ring
- a shallow inner wall so the water surface is easy to see
- a large visible water surface inside the well
- many visible paper boats floating on the water
- moss and grass tucked between stones
- a wooden beam / rope / pulley / hanging detail above
- a hand-built, aged, weighty fantasy object

The well must **not** look like:
- a smooth ring
- a flat donut
- a geometric cutaway disc
- a simplified vector illustration
- a modern infographic
- a polished 3D mockup
- a decorative UI logo
- a deep dark pit where the water is barely visible

The interior should not disappear into darkness.

The water should be one of the main visual features.

Every visible edge should feel assembled from clustered stones, not drawn as one perfect mathematical curve.

---

## 3. Perspective and grid rules

Use a **2:1 isometric pixel-art projection**.

This means:
- every isometric diagonal should visually follow a 2px horizontal to 1px vertical rhythm
- do not use freehand perspective lines
- do not use true perspective vanishing points
- do not use random smooth ellipses that ignore the isometric grid

### Tile logic

Use one underlying isometric tile logic for the hero object:
- preferred conceptual tile size: **64x32**
- acceptable smaller planning tile: **32x16**
- vertical edges remain vertical
- left and right receding edges follow the 2:1 rule

### Circular well interpretation

Because the well is round, it will not be a literal diamond tile. But its construction must still respect isometric logic:
- the rim should read as an isometric ellipse built from chunky segmented stones
- the front and back arcs should still feel anchored to the 2:1 projection
- any rotation during scroll must preserve the isometric illusion rather than becoming a free 3D orbit

### Readability rule

The geometry should be stylized for readability, not mathematical purity.

It is acceptable to cheat the shape slightly if doing so:
- keeps the water more visible
- keeps paper boats more readable
- preserves the fantasy prop look

---

## 4. Camera position and viewing angle

The camera should feel like:
- fixed above the well
- slightly elevated
- angled enough to show both outer rim and water
- closer to a showcase prop camera than a top-down game map

### Camera goals

The camera must allow the viewer to see:
- the stone rim
- the shallow inner wall
- the water surface
- several paper boats at once

### Camera constraints

Do not aim the camera so high that the well becomes a flat top view.

Do not aim the camera so low that the water disappears behind the front wall.

The intended feel is:
- isometric
- slightly elevated
- object-focused
- readable first, dramatic second

---

## 5. Scroll movement and perspective reveal

As the user scrolls, the well may rotate slightly or shift perspective so the water becomes even more visible.

This motion should:
- reveal more of the water surface
- make more paper boats visible
- preserve the retro fantasy game feeling
- remain subtle and readable

### Movement limits

Allowed:
- a small rotation
- a slight perspective reveal
- a subtle lowering of the front rim relative to the viewer
- gentle drift or shimmer on the water

Not allowed:
- dramatic full 3D spinning
- large camera swings
- motion that breaks the isometric illusion
- motion that hides the water
- motion that turns the well into a flat disc

### Movement purpose

Scrolling should **showcase the water and boats more clearly**.

It should not exist for spectacle alone.

---

## 6. Material rules

### Stone

Stone is the most important material.

Stone must be rendered as:
- uneven block segments
- different stone sizes
- chipped and imperfect edges
- clustered highlights and shadow pockets
- visible cracks or separations between stones
- believable masonry around a circular well shape

Stone must not be rendered as:
- one smooth band
- one flat ring
- one uniform surface
- one perfect ellipse with a border

The rim stones should look individually placed.

The walls should be relatively thin so the interior water remains visible.

### Moss and grass

Moss and grass should:
- appear in gaps between stones
- break up the outline
- soften the rim in small patches
- feel organic and irregular

Moss and grass must not:
- appear as simple rectangles
- float as separate stickers
- form neat repeated patterns

### Wood

The top beam and supports should:
- feel hand-hewn and slightly rough
- use chunky fantasy-RPG proportions
- include visible rope or pulley detail
- look functional, not decorative

Wood should not:
- look too thin
- look too polished
- look like a clean geometric bar

### Water

The water is one of the main visual features.

Water must be rendered as:
- clearly visible from the main viewing angle
- wide enough to display multiple paper boats
- calm, readable, and magical
- softly reflective, but not glossy modern UI water
- part of the storytelling, not a tiny hidden detail

Water must not be:
- buried in darkness
- too small to read
- hidden by thick walls
- treated like a deep pit at the bottom of a shaft

### Depth

The inside of the well should suggest some depth, but not a deep dungeon shaft.

Depth cues should come from:
- a thin inner ring of stone
- slight shadow just under the rim
- visible water occupying much of the opening
- perspective and shading that still preserve readability of the boats

The water should remain visible and important.

Do not bury it in darkness.

---

## 7. Color system

Use a restrained fantasy pixel-art palette with **small controlled ramps per material**.

Do not rely on broad CSS gradients for the well itself.

### Stone ramp
Use 5 tones:
- `stone-1` deepest cool shadow
- `stone-2` dark shadow
- `stone-3` base stone
- `stone-4` light face
- `stone-5` edge highlight

Suggested character:
- indigo-violet shadow
- plum-gray shadow
- dusty mauve-brown midtone
- pale beige-lilac light tone
- warm off-white highlight

### Moss ramp
Use 4 tones:
- `moss-1` deep forest green
- `moss-2` moss green
- `moss-3` yellow-green light
- `moss-4` tiny warm highlight

### Wood ramp
Use 4 tones:
- `wood-1` dark brown shadow
- `wood-2` warm brown
- `wood-3` orange-brown lit face
- `wood-4` pale warm edge highlight

### Water ramp
Use 5 tones:
- `water-1` dark blue-teal
- `water-2` medium teal-blue
- `water-3` blue-green midlight
- `water-4` turquoise highlight
- `water-5` pale sparkle accent

### Boat ramp
Use 3–4 tones:
- off-white folded paper base
- slightly warm shadow
- tiny highlight edge
- optional accent trim if needed

### Background ramp
Use a dark atmospheric background:
- deep navy
- indigo
- muted twilight blue

### Color rules

Allowed:
- hue-shifted shadows
- warm highlights against cooler shadows
- restrained palette
- selective sparkle accents

Not allowed:
- modern glossy gradients across the object
- rainbow effects
- bright UI-saturated colors
- flat purple ring look
- neon cyan sci-fi water

---

## 8. Lighting rules

Use a **top-left light source** consistently across everything.

This means:
- upper-left stone edges get the lightest highlights
- lower-right edges get deeper shadows
- the inner wall has some shadow, but not enough to hide the water
- the wooden beam has a lit top plane and darker side plane
- moss and grass catch selective highlights
- boats should remain readable against the water

Lighting should feel:
- moody
- directional
- game-like
- warm in highlights
- cool in shadows

Lighting should not feel:
- flat
- neon
- glossy
- plastic
- over-darkened in the center

---

## 9. Rendering rules

The final result should feel like **pixel environment art**, even if implemented in HTML/CSS/SVG/canvas.

### If using CSS/HTML
- build the rim from many hard-edged segmented pieces
- use layered stone segments instead of one ring
- use stepped shadows
- use hard edges instead of smooth curves
- ensure the water opening is large and visible
- ensure paper boats can be clearly seen
- avoid large clean elliptical surfaces unless broken up heavily

### If using SVG
- break the rim and wall into many separate stone shapes
- preserve crisp clustered lighting
- avoid polished flat vector cleanliness
- make the water area large enough to read clearly

### If using canvas
- use pixel-safe drawing logic
- disable image smoothing where relevant
- keep edges crisp
- prioritize boat visibility and water readability

### General rendering bans
- no minimalist geometric simplification
- no abstract icon treatment
- no giant smooth surfaces pretending to be pixel art
- no decorative fake-retro styling without environmental texture

---

## 10. The hero well: required anatomy

The well hero should include these parts:

### 1. Outer stone rim
- circular overall
- irregular per-stone silhouette
- wide opening
- relatively thin walls
- brighter on upper-left, darker on lower-right

### 2. Inner wall
- visible just inside the rim
- shallow enough that the water remains easy to see
- lined with smaller interior stones or shading bands
- clearly distinct from the outer wall

### 3. Water surface
- large visible central feature
- easy to read immediately
- supports many visible paper boats
- attractive enough to be a focal point

### 4. Paper boats
- multiple boats visible at once
- distributed naturally on the water
- readable from the main viewing angle
- become even more visible when the well rotates slightly on scroll

### 5. Moss and grass breakup
- small clumps on rim and edges
- irregular placement
- helps the well feel old and organic

### 6. Wooden beam support
- two supports or equivalent structure
- one horizontal beam
- visible rope / pulley / hanging element

### 7. Grounding detail
- stone irregularity
- optional tiny debris
- enough texture to avoid icon-like flatness

---

## 11. Interface relationship

The interface must not overpower the well.

UI rules:
- the well is the star
- UI should support the scene, not compete with it
- text and controls can be pixel themed, but secondary
- redesign the well artwork first before redesigning the rest of the page

This project should feel like:
- an interactive retro game scene with UI attached

Not:
- a webpage with a decorative retro illustration

---

## 12. Motion rules

Motion should support the illusion of a game prop.

Allowed:
- subtle shimmer on water
- tiny stepped sparkle
- small boat drift
- slight rotation or perspective reveal on scroll
- restrained atmospheric movement

Not allowed:
- smooth floaty Dribbble motion
- glossy easing on the prop itself
- large dramatic spins
- liquid modern transitions
- excessive motion that distracts from the water and boats

If animation is used, it should feel:
- subtle
- readable
- retro-inspired
- deliberate

---

## 13. Implementation priority

When redesigning, the order of importance is:

1. get the **well silhouette** right
2. get the **wide opening** right
3. get the **thin wall / shallow interior** right
4. make the **water clearly visible**
5. make **multiple paper boats clearly visible**
6. get the **stone segmentation** right
7. add **moss / overgrowth**
8. add **beam and rope detail**
9. only then refine surrounding UI

If the water and boats are not visible enough, the redesign is wrong.

---

## 14. Validation checklist

A redesign is only acceptable if all are true:

- the well immediately reads as a fantasy stone wishing well
- it does not read as an abstract geometric object
- the opening is wide
- the walls are relatively thin
- the water is clearly visible at a glance
- multiple paper boats are visible
- the interior is shallow enough to showcase the water
- the stone lighting is directional from top-left
- the moss/grass feels organic and irregular
- the beam/rope detail helps the fantasy read
- scroll behavior increases visibility of the water and boats
- the scene feels like pixel-art environment art
- the result does not resemble a SaaS illustration or infographic

---

## 15. Final test

Ask:

> If I showed this to someone without context, would they say:
> "that looks like a retro fantasy wishing well with visible water and paper boats"?

If the answer is not clearly yes, keep iterating.