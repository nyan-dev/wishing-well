# Product Requirements Document: Wishing Well

## Document control

| Field | Value |
|---|---|
| Product | Wishing Well |
| Owner | Grama Ma |
| Status | Draft |
| Version | 0.1 |
| Last updated | 2026-08-03 |
| Target release | One-week redesign sprint |

## Problem statement

Many people want a small, private moment to express a hope or intention, but most online writing products are complex, social, or permanent. Wishing Well provides a short, anonymous, playful ritual: write a wish, toss it into a magical well, and briefly connect with wishes left by others.

## Target users

### Primary user: reflective casual visitor

A visitor who wants a calming and low-pressure micro-experience. They may be browsing on desktop or mobile, do not need an account, and want to write one private anonymous wish in less than a minute.

### Secondary user: curious visitor

A visitor who wants to explore a small number of anonymous wishes through the paper boats on the well water. They may choose to write their own wish after exploring.

## Product vision

Wishing Well is a small, calming pixel-art web experience where visitors anonymously write a wish, toss it into a magical well, watch it become a floating paper boat, and discover wishes left by others.

## Core experience

1. The visitor writes a private, anonymous wish.
2. The visitor tosses the wish into the well through a satisfying visual action.
3. The wish becomes a visible floating paper boat on the water.
4. The visitor can select a boat to discover a random anonymous wish.

## Product principles

- Create first: writing and tossing a wish is the primary call to action.
- Anonymous by default: no account, public profile, or personally identifying information is requested.
- Brief and calm: the main experience should take less than one minute.
- Playful but readable: the 16-bit pixel-art presentation must not reduce usability.
- Intentional discovery: visitors see only a limited, random selection of wishes rather than an endless feed.
## MVP scope

The MVP delivers one complete anonymous wishing ritual in a single-page web experience.

### In scope

- A clear primary action that lets a visitor open the wish-writing experience.
- A text input where a visitor can write one anonymous wish.
- Basic input validation: empty wishes cannot be submitted.
- A visible toss interaction that confirms the visitor submitted the wish.
- A new visible paper boat representing the submitted wish on the well water.
- A limited number of visible paper boats on the water.
- Selecting a boat opens one random anonymous wish in a readable modal or panel.
- A responsive experience for mobile and desktop browsers.
- A coherent 16-bit pixel-art, three-quarter top-down or pseudo-isometric well scene.
- Local persistence or the project’s existing configured storage mechanism, if available.

### Out of scope / non-goals

- User accounts, login, profiles, passwords, or identity verification.
- Social following, likes, comments, reactions, direct messages, or public user profiles.
- An endless public feed or a searchable archive of all wishes.
- Moderation dashboard, reporting system, or administrator portal.
- Payments, subscriptions, advertising, or analytics dashboards.
- Multiplayer or real-time collaboration.
- A full explorable village, combat, inventory, quests, or other game systems.
- Native mobile applications.
- Complex backend infrastructure beyond what is needed to support the core loop.
- Perfectly mathematical isometric rendering; the visual target is a readable pseudo-isometric pixel-art scene.

## Success criteria

The MVP is ready for release when:

1. A new visitor can write and toss an anonymous non-empty wish without creating an account.
2. The toss action visibly results in a paper boat appearing or being represented on the water.
3. A visitor can select a visible boat and read an anonymous wish.
4. The core flow works at desktop and mobile viewport sizes.
5. The page preserves the intended 16-bit pixel-art, wide shallow-well visual direction.
6. The primary flow is understandable without documentation or a tutorial.

## User stories

### US-01: Begin a wish

As a reflective casual visitor, I want a clear invitation to make a wish so that I immediately understand the main action of the experience.

### US-02: Write anonymously

As a reflective casual visitor, I want to write a wish without creating an account so that I can express myself privately and quickly.

### US-03: Toss a wish

As a reflective casual visitor, I want to toss my completed wish into the well so that submitting it feels like a meaningful ritual rather than a standard form submission.

### US-04: See my wish represented

As a reflective casual visitor, I want to see a paper boat appear on the water after I toss my wish so that I receive clear visual confirmation that my wish was accepted.

### US-05: Discover another wish

As a curious visitor, I want to select a visible paper boat and read one anonymous wish so that I can feel a small connection with another person.

### US-06: Use the experience on mobile

As a mobile visitor, I want the well, wish flow, and boat interaction to remain clear on a small screen so that I can complete the experience without zooming or struggling to tap controls.

## Story priority

| Priority | Stories | Rationale |
|---|---|---|
| P0 — required for MVP | US-01, US-02, US-03, US-04 | These stories form the create-first core loop. |
| P1 — required for a complete public demo | US-05, US-06 | Discovery and mobile quality make the experience demonstrable and usable. |
| P2 — future enhancement | None in this sprint | New ideas go to backlog instead of expanding MVP scope. |

## Acceptance criteria

### AC-01: Begin a wish

**Related story:** US-01

#### Scenario: Primary call to action is visible

- Given a first-time visitor opens the Wishing Well page
- When the initial screen finishes loading
- Then the visitor can identify a clearly labelled primary action for making a wish
- And the primary action is visually more prominent than the boat-discovery action
- And the primary action is usable with both mouse/touch and keyboard

#### Scenario: Opening the wish-writing experience

- Given the visitor is viewing the initial well scene
- When the visitor activates the primary make-a-wish action
- Then a wish-writing input area becomes visible
- And the input receives keyboard focus or is clearly ready for text entry
- And the visitor can return to the well scene without submitting a wish

#### Scenario: Mobile presentation

- Given the visitor opens the page at a viewport width of 360 pixels
- When the initial screen finishes loading
- Then the primary make-a-wish action is visible without horizontal scrolling
- And the action is large enough to tap without accidentally selecting nearby content

## Release criteria

This sprint release is acceptable only if all of the following are true:

- The create-first flow is visually obvious on first load.
- A visitor can write, submit, and visually confirm one anonymous wish.
- A visitor can open at least one visible paper boat and read a wish.
- The main interaction works on desktop and mobile layouts.
- The interface feels coherent with the intended 16-bit pseudo-isometric pixel-art direction.
- No account creation or identity step blocks the core flow.
- The demo is stable enough to be shown publicly in the repository and report.

## Open questions and risks

| Type | Item | Current status |
|---|---|---|
| Open question | What storage mechanism is the final MVP using: local-only, existing configured backend, or fallback demo data? | To confirm during engineering planning |
| Open question | How many paper boats should be visible at once for readability and performance? | To confirm during design planning |
| Open question | What exact UI pattern should open the wish composer: inline panel, modal, or integrated scene panel? | To confirm during design planning |
| Risk | The visual redesign may break existing working mechanics. | Mitigated by baseline tag and branch workflow |
| Risk | The art direction may remain too abstract if the design system is not specific enough. | Mitigated by upcoming design docs |
| Risk | Tooling setup may become the project instead of supporting the project. | Mitigated by limiting agents/MCPs to real use cases |
