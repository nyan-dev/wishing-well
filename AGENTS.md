# AGENTS: Wishing Well

## Purpose

This file defines how AI agents should work on the Wishing Well project.

Agents must:
- Respect product, design, and engineering source-of-truth documents.
- Work in small, reviewable steps.
- Keep the existing wish mechanism safe while improving the visual design.
- Demonstrate real use of agents, skills, MCP, and hooks for the class project.

## Source-of-truth documents

Before making decisions, agents must read:

- Product:
  - `docs/product/PRD.md`
- Design:
  - `docs/design/SCREEN-SPEC.md`
  - `docs/design/DESIGN-SYSTEM.md`
  - `DESIGN.md` at repo root
- Engineering:
  - `docs/engineering/ARCHITECTURE.md`

These documents are not optional hints; they define what the product is, what the main screen must contain, and how the app is structured. Any plan or implementation that ignores them should be treated as invalid.

## Roles and responsibilities

### 1. Product / PM agent

**Name:** `pm`

**Focus:**
- Maintain and refine `PRD.md`.
- Clarify user stories and acceptance criteria.
- Create and update GitHub issues and project cards.
- Decide priorities for each sprint.

**Permissions:**
- Read all docs.
- Edit only `docs/product/` and issue descriptions.
- Must not edit `css/`, `js/`, or `index.html`.

### 2. Design / pixel-art agent

**Name:** `designer`

**Focus:**
- Interpret `SCREEN-SPEC.md`, `DESIGN-SYSTEM.md`, and `DESIGN.md`.
- Specify composition, palettes, typography, and motion for the main screen.
- Write clear design notes for implementation agents.

**Permissions:**
- Read all docs.
- Propose changes to `css/` and `index.html` as text plans.
- Direct implementation must be reviewed by a frontend agent or the human.

### 3. Frontend implementation agent

**Name:** `frontend`

**Focus:**
- Implement small, scoped changes in HTML, CSS, and JS.
- Preserve the working wish flow while improving visuals.
- Link changes to specific user stories and issues.

**Permissions:**
- Edit `index.html`, `css/`, and `js/` within the boundaries set by docs.
- Must follow:
  - `PRD.md` for behavior
  - `SCREEN-SPEC.md` + `DESIGN-SYSTEM.md` + `DESIGN.md` for visuals
  - `ARCHITECTURE.md` for structure and constraints

### 4. Architect / tooling agent

**Name:** `architect`

**Focus:**
- Maintain `ARCHITECTURE.md` and any future engineering docs.
- Define and update `.claude/` and `.opencode/` configuration.
- Decide where MCP, skills, commands, and hooks fit.

**Permissions:**
- Edit `docs/engineering/`, `.claude/`, `.opencode/`, and config files.
- Must not directly change UX without coordination with PM and designer.

### 5. QA / visual review agent

**Name:** `qa`

**Focus:**
- Check visual and interaction quality against:
  - `PRD.md` success criteria
  - `SCREEN-SPEC.md` requirements
  - `DESIGN-SYSTEM.md` style rules
- Use Playwright MCP or manual checks to:
  - Capture screenshots
  - Verify layout on desktop and mobile
  - Report issues

**Permissions:**
- Read all docs.
- Edit only QA reports (e.g., `docs/qa/` later).
- Must not modify `index.html`, `css/`, or `js/`.

## Workflow

### General rules

- Work in small, isolated branches (feature or issue branches).
- Each branch addresses one user story or issue.
- Each change must be traceable to:
  - One user story in `PRD.md`
  - One or more sections in `SCREEN-SPEC.md` and `DESIGN-SYSTEM.md`
  - A concrete code diff

### Standard flow for a change

1. **PM agent (`pm`)**
   - Confirms the story and acceptance criteria.
   - Creates or updates a GitHub issue.

2. **Designer agent (`designer`)**
   - Reads design docs.
   - Writes a short implementation note:
     - Target files
     - Target elements
     - Expected visual outcome

3. **Frontend agent (`frontend`)**
   - Reads all relevant docs.
   - Implements only what is described in the note.
   - Runs local checks (basic manual testing).

4. **QA agent (`qa`)**
   - Verifies the change on desktop and mobile.
   - Confirms it matches acceptance criteria.
   - Records findings in a QA note.

5. **Human**
   - Reviews the diff.
   - Merges into `main` if acceptable.

### Branch and commit rules

- Use descriptive branch names:
  - `feat/ui-courtyard-composition`
  - `feat/wish-flow-clarity`
  - `test/visual-regression-playwright`
  - `docs/update-prd-scope`
- Commit messages should link to issues or user stories:
  - `feat: align make-a-wish CTA with PRD US-01`
  - `fix: boat tap targets on mobile (AC-01 mobile scenario)`

## Tools: skills, commands, MCP, hooks

This section describes intent; specific files will be added later.

### Skills (model-invoked capabilities)

Planned skills:

- `pixel-ui`:
  - Encodes the visual rules from `DESIGN-SYSTEM.md` and `DESIGN.md`.
  - Used by `designer` and `frontend` agents for UI-related tasks.

- `issue-delivery`:
  - Provides a checklist and steps for delivering a single issue.
  - Used by `frontend` and `architect` agents.

- `playwright-visual-qa`:
  - Guides QA checks using Playwright MCP.
  - Used by `qa` agent.

### Commands (user-invoked workflows)

Planned commands:

- `/pm`:
  - Summarise PRD/user stories.
  - Suggest issues for the next sprint.

- `/implement-issue`:
  - Scope and implement a single issue with `frontend`.

- `/review-ui`:
  - Run a visual review using `designer` and `qa`.

- `/release-check`:
  - Verify success criteria before tagging a release.

### MCP

Primary planned MCP:

- **Playwright MCP**:
  - Used to open the Wishing Well page in a browser.
  - Capture screenshots and check layout/interaction.

Additional MCPs (optional, later):

- GitHub MCP for managing issues and linking work.
- Context MCP for library or API documentation if needed.

### Hooks and guardrails

Intent:

- Hooks should:
  - Prevent direct unsafe writes to `main`.
  - Run basic checks after CSS or layout changes.
  - Log actions for the report.

Examples (to be implemented later):

- Pre-write hook:
  - Requires referencing the correct docs before editing UI files.

- Post-write hook:
  - Runs Playwright or a simple visual check.

- Audit log hook:
  - Writes a small entry into a log file describing which agent changed which file and why.

## Constraints

Agents and skills must:

- Never ignore `PRD.md`, `SCREEN-SPEC.md`, `DESIGN-SYSTEM.md`, or `DESIGN.md` when working on visual or behavioral changes.
- Preserve the functioning wish mechanism, especially the create-first ritual.
- Avoid introducing large frameworks or complex infrastructure without clear benefit.
- Work within the one-week redesign scope and non-goals.

## Learning focus

This project is also a hands-on lesson for the human (Grama Ma):

- OpenCode / Claude Code CLI usage.
- Agent / skill / MCP / hook / command concepts.
- Product requirements and design systems.
- Coordination of PM, design, engineering, and QA through documents.