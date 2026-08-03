# Architecture: Wishing Well

## Purpose

This document explains how the Wishing Well app is structured technically and how changes should be made safely. It connects:
- `docs/product/PRD.md` (what the product does and why)
- `docs/design/SCREEN-SPEC.md` and `docs/design/DESIGN-SYSTEM.md` (how the main screen should look and behave)
- Source files (`index.html`, `css/`, `js/`) that implement the experience today

## Current structure (high-level)

- `index.html`
  - Main HTML entry point for the single-page experience
  - Contains the root layout and references to CSS and JavaScript files

- `css/`
  - CSS files that define layout, typography, colors, and visual styling
  - Contains styles for the scene frame, well, boats, and UI overlay elements

- `js/`
  - JavaScript files that handle:
    - Canvas or DOM-based rendering
    - Wish submission form logic
    - Animation and motion (e.g., water shimmer, toss feedback)
    - Any storage or data integration that currently exists

- `.claude/` (existing)
  - Contains Claude-related agent and hook configuration used in earlier assignments
  - This project will gradually align with `.opencode/` and `AGENTS.md` while respecting the existing files

## Data layer and storage considerations

The product experience implies that wishes can be stored and later discovered, but the current MVP behavior is limited:

- A new visitor currently does not reliably see previous wishes represented as boats.
- Storage may rely on:
  - Local in-memory state only, or
  - Partially configured backend integration, or
  - A placeholder/demo dataset.

For this sprint:

- The primary goal is to make the **create-first ritual** complete and visually credible.
- Storage is treated as a flexible layer:
  - MVP accepts local-only or simple demo data.
  - A future iteration can formalize persistent storage (e.g., Firestore, Supabase) with minimal surface changes.

All agent and skill work must respect this:
- Do not assume a full backend unless explicitly configured.
- Do not introduce heavy infrastructure during the visual redesign phase.

## Ownership boundaries (future agents)

These boundaries prepare the agent team for later:

- **Product & design docs**
  - Owned by: product/design roles
  - Files:
    - `docs/product/PRD.md`
    - `docs/design/SCREEN-SPEC.md`
    - `docs/design/DESIGN-SYSTEM.md`
    - `DESIGN.md` (root, detailed art direction)

- **Scene and layout implementation**
  - Owned by: frontend / art-director roles
  - Files:
    - `index.html`
    - Scene-related CSS (e.g., `css/scene.css` or equivalent)
    - Scene-related JS (e.g., canvas or DOM rendering)

- **Wish flow and data integration**
  - Owned by: frontend / data roles
  - Files:
    - Form and wish submission logic in `js/`
    - Any storage integration helpers

- **Automation and tools**
  - Owned by: engineering / tooling roles
  - Files:
    - `.claude/` agent and hook definitions
    - Future `.opencode/` agents, skills, commands, and MCP configuration
    - Playwright scripts or tests if present

## Redesign constraints

To protect the working mechanism (tagged baseline):

- Do not remove or break the existing wish submission flow without an equivalent replacement.
- Do not introduce new global frameworks without clear benefit (e.g., no sudden switch to a heavy SPA framework).
- Changes to `index.html`, `css/`, and `js/` should be:
  - Scoped to specific issues or tasks.
  - Linked to PRD, screen spec, and design system requirements.
  - Reviewed before being merged to `main`.

## Definition of done (engineering)

A change is technically complete when:

- It satisfies the relevant user story and acceptance criteria from `PRD.md`.
- It respects the design requirements in `SCREEN-SPEC.md` and `DESIGN-SYSTEM.md`.
- It keeps the wish flow working for new visitors.
- It passes basic manual QA on both desktop and mobile layouts.
- It does not introduce obvious console errors or broken interactions.
- It is committed with a clear message and linked to a specific issue.

## Next steps (for the agent team)

This architecture doc will guide:

- The project-level `AGENTS.md` rules.
- The definition of:
  - Product/PM agent
  - Design/pixel-art agent
  - Frontend implementation agent
  - QA/visual review agent
- The creation of skills and commands that operate on this file structure rather than guessing.

Future updates:

- When the data layer is formalized, this document will be extended with:
  - Specific storage mechanism and schema
  - Data flow diagrams
  - Test strategy for wish creation and retrieval