---
description: Review the current UI against Wishing Well product and design docs, then produce a concrete design-action checklist.
agent: designer
subtask: true
---

Review the current Wishing Well UI and produce a focused design review.

## Required context

Read and follow:

- `AGENTS.md`
- `docs/product/PRD.md`
- `docs/design/SCREEN-SPEC.md`
- `docs/design/DESIGN-SYSTEM.md`
- `DESIGN.md`
- `docs/engineering/ARCHITECTURE.md`

If relevant, also inspect the main implementation files:
- `index.html`
- `css/`
- `js/`

Use the `pixel-ui` skill.

## Task

Produce a concise review with these sections:

### Current strengths
- What already supports the intended create-first ritual?

### Current problems
- What currently breaks or weakens the intended visual direction?

### Mismatches vs docs
- Which parts conflict with `SCREEN-SPEC.md`, `DESIGN-SYSTEM.md`, or `DESIGN.md`?

### Priority fixes
- List the top 3 to 5 visual or UI problems in priority order.

### Suggested implementation slices
- Propose small, isolated tasks that a frontend agent can implement one by one.

## Constraints

- Do not propose a full rewrite unless absolutely necessary.
- Prefer issue-sized changes.
- Keep recommendations grounded in the project docs.
- Reject generic SaaS-like solutions or abstract scene simplifications.