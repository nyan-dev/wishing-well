---
description: Implement one scoped Wishing Well issue or UI task in small, reviewable steps using the frontend agent.
agent: frontend
subtask: true
---

Implement one small, clearly scoped issue for the Wishing Well project.

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

Use the `pixel-ui` skill for visual or UI-related changes.

## Task

Given the currently requested issue or task, do the following:

### 1. Scope the task
- Restate the requested change in 1 to 3 bullets.
- Name the relevant user story or acceptance criteria if available.
- Refuse or narrow the task if it is too broad.

### 2. Plan the implementation
- Name the exact files to inspect.
- Name the exact files to edit.
- Explain the smallest viable implementation approach.

### 3. Implement
- Make only the changes required for this issue.
- Preserve the existing working behavior unless the task explicitly replaces it.
- Avoid unrelated refactors.

### 4. Report
Return a short implementation report with:

#### Task summary
- ...

#### Relevant docs
- ...

#### Files inspected
- ...

#### Files changed
- ...

#### Changes made
- ...

#### Remaining risks
- ...

## Constraints

- Do not perform a broad rewrite.
- Do not invent new product scope.
- Prefer issue-sized changes that can be reviewed easily.
- If the data/storage layer is unclear, preserve the current behavior and note the limitation explicitly.
- If the requested task conflicts with the product or design docs, say so and propose the smallest compliant alternative.