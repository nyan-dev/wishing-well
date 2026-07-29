# 📝 Product Requirements Document (PRD)

## Project Name: PixelWell — An Interactive 8-Bit Wishing Well

## 1\. Project Overview & Architecture Blueprint

PixelWell is an interactive, lightweight single-page web experience designed with a 2D 8-bit retro aesthetic. Users write short textual wishes, "toss" them into a vertical well, and watch them smoothly transition into pixelated floating boats on the well water's surface. Users can tap floating boats to reveal random anonymous wishes left by others and interact using five unique retro emoji reactions.

To keep this project **100% free, hyper-lightweight, and zero-maintenance** for a class project, it utilizes a decentralized serverless architecture:

| ┌────────────────────────────────────────────────────────────────────────┐│                        FRONTEND (Hosted Free)                          ││                                                                        ││   ┌──────────────────────────────┐    ┌────────────────────────────┐   ││   │   GitHub Pages Static Host   │ ── │   HTML5 Canvas / PixiJS    │   ││   └──────────────────────────────┘    └────────────────────────────┘   │└───────────────────────────────────┬────────────────────────────────────┘                                    │ Secure Client\-Side API                                    ▼┌────────────────────────────────────────────────────────────────────────┐│                        BACKEND (Free Cloud Tier)                       ││                                                                        ││   ┌──────────────────────────────┐    ┌────────────────────────────┐   ││   │     Supabase PostgREST       │ ── │ Supabase Realtime Engine   │   ││   └──────────────────────────────┘    └────────────────────────────┘   │└────────────────────────────────────────────────────────────────────────┘ |
| :---- |

* **Frontend Deployment:** GitHub Pages (strictly serves static pre-bundled `HTML/CSS/JS`).  
* **Build Pipeline:** Vite (for fast hot-reloading and modular file structural organization).  
* **Database & Live Events:** Supabase Free Tier (PostgreSQL client-side REST client).  
* **Graphics Mechanics:** Native HTML5 Canvas \+ `image-rendering: pixelated;` or lightweight PixiJS for rigid retro sprite handling.

---

## 2\. Core Feature & Animation Specification

### F1: The Camera Pitch Scroll Animation

* **State 1 (Landing/Hero View):** A direct, straight-on **Front View (2D Profile)** of the stone wishing well sits centered on the page. The water inside is hidden from view. A centered retro text input box invites the user to type a short note.  
* **The Transition (Scroll Interactivity):** As the user scrolls down, an implicit camera track arcs upwards. The 2D asset is manipulated via CSS 3D transforms (`transform: rotateX(60deg) rotateZ(45deg);` or orchestrated via a lightweight custom canvas matrix loop) synced precisely with the document scrolling progression.  
* **State 2 (Active Canvas View):** The well rotates downward into a perfect **Isometric (3/4 Top-Down)** perspective, exposing the dark rim opening and rendering the pixelated water surface fully visible within the viewport.

### F2: Toss & Transform Interaction

* **Trigger:** User clicks a pixelated "Toss" button.  
* **Animation Lifecycle:**  
1. The input textbox dissolves into a small glowing pixel note asset.  
2. The asset scales downward and changes its Y-coordinates, moving "into" the opening of the well.  
3. Upon hitting the water plane coordinates, a small 8-bit splash particle system triggers.  
4. The note asset swaps its sprite sheet reference to transform into a tiny, drifting retro **pixel boat**.

### F3: Boat Discovery & The 5-Emoji Reaction Matrix

* **Floating Simulation:** Boats move across the water boundaries utilizing a simple continuous pseudo-random Brownian motion or 2D noise loop.  
* **Tapping Interactions:** Clicking any floating boat queries a random row from the database and reveals an overlay popup showing another user's hidden note.  
* **Reaction Protocol:** The popup renders five distinct pixelated reaction choices. Clicking a reaction mutates the database tally via an atomic increment operation (`+1`).

---

## 3\. Database Schema Mapping (Supabase/PostgreSQL)

The database consists of a single relational core table containing the following fields:

| CREATE TABLE public.wishes (    id BIGSERIAL PRIMARY KEY,    created\_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,    content VARCHAR(140) NOT NULL,    reaction\_like INT DEFAULT 0 NOT NULL,    reaction\_love INT DEFAULT 0 NOT NULL,    reaction\_haha INT DEFAULT 0 NOT NULL,    reaction\_wow  INT DEFAULT 0 NOT NULL,    reaction\_sad  INT DEFAULT 0 NOT NULL,    is\_active BOOLEAN DEFAULT TRUE NOT NULL);\-- Enable Row Level Security (RLS) so clients cannot malicious delete rowsALTER TABLE public.wishes ENABLE ROW LEVEL SECURITY;CREATE POLICY "Allow public read and insert access" ON public.wishes     FOR ALL USING (true) WITH CHECK (true); |
| :---- |

---

## 4\. Claude Code Tool Stack Configuration

This block is explicitly configured to be parsed and read by the Claude Code terminal agent. It instructs the orchestrator exactly what tools, environments, commands, and skills must be initialized.

| {  "claudeCodeConfig": {    "targetEnvironment": "Node.js \>= 18, Vite, Supabase CLI",    "mcpServers": \[      {        "name": "supabase-mcp",        "command": "npx",        "args": \["-y", "@supabase/mcp-server"\],        "scope": "project",        "justification": "Allows Claude Code to introspect, setup schemas, verify connection configurations, and test Postgres functions directly inside the workspace without requiring user SQL copy-pasting."      },      {        "name": "playwright",        "command": "npx",        "args": \["-y", "@playwright/mcp@latest"\],        "scope": "local",        "justification": "Allows Claude to run background automated user interactions to verify that scrolling rotates the well, clicking spawns boats, and emoji tallies update inside the database correctly."      }    \],    "customSkills": \[      {        "commandName": "/apply-retro-aesthetic",        "filePath": ".claude/skills/apply-retro-aesthetic/SKILL.md",        "prompt": "--- \\ndescription: Enforces pixel-perfect 8-bit aesthetic rules on all styles.\\n--- \\n\#\# Rules:\\n1. All colors must map strictly to a classic 8-bit retro palette (e.g., NES or GameBoy Color style palettes).\\n2. Force typography to import and consume the 'Press Start 2P' or closely related pixel web-fonts.\\n3. Apply \`image-rendering: pixelated;\` and \`image-rendering: crisp-edges;\` to every generated canvas or sprite element.\\n4. Borders must be blocky, utilizing explicit step-like borders rather than smooth radius or anti-aliased styling properties."      },      {        "commandName": "/setup-supabase-realtime",        "filePath": ".claude/skills/setup-supabase-realtime/SKILL.md",        "prompt": "--- \\ndescription: Playbook for mounting the live listener interface.\\n--- \\n\#\# Instructions:\\n1. Initialize the \`@supabase/supabase-js\` client.\\n2. Mount a channel listener tracking \`postgres\_changes\` on the \`wishes\` table.\\n3. Wrap the incoming broadcast payload to fire the frontend canvas event handler that instantiates a new boat object whenever an \`INSERT\` operation occurs globally."      }    \],    "subagentDelegation": {      "assetPipelineAgent": "Spawns a specialized subagent tasked with handling 8-bit asset loading and setting up audio splash context triggers using the Web Audio API to prevent blocking the main developer terminal UI.",      "e2eTestingAgent": "Spawns a background subagent utilizing Playwright to execute synthetic user workflows (scrolling tracking, message inputs, clicking actions) to continuously check code updates for layout or connection breaks."    },    "workflowCommands": {      "initialization": "Use \`/init\` to prepare the project base memory layer, followed by running \`/plan\` to layout the asset files and setup paths before generating frontend scripts.",      "debugging": "If animations glitch or canvas scales incorrectly, execute \`/debug\` followed by the error trace or descriptive layout issue."    }  }} |
| :---- |

---

## 5\. Development Milestones & Task Breakdown

### Phase 1: Environment & Schema Provisioning

1. Scaffold a vanilla frontend project structure using Vite.  
2. Initialize the project with Claude Code via `/init` and append this PRD to the root directory.  
3. Spin up a free Supabase instance and use the `supabase-mcp` connection to execute the `wishes` schema tracking setup.

### Phase 2: Graphic Engine & Dynamic Animation

1. Build out the canvas container rendering the two critical isometric/front asset orientations.  
2. Use Claude's custom `/apply-retro-aesthetic` command to build and verify crisp, aliased 8-bit styling rules.  
3. Hook up the scroll tracking layout, mapping scroll delta vectors directly to the CSS transform properties changing the well profile view into an open isometric view.

### Phase 3: Interactive Data Pipeline

1. Integrate the database client layer and leverage `/setup-supabase-realtime` to configure immediate peer updates.  
2. Build the particle splash generator and float movement equations for spawned boats.  
3. Wire up the tap-to-read overlay modal complete with the 5 atomic mutation event handlers updating emoji reaction logs.

### Phase 4: CI/CD Pipeline & GitHub Pages Shipping

1. Configure automated Playwright validation via subagents to run synthetic click tests across components.  
2. Set up a simple build automation rule mapping compilation outputs directly to your GitHub Pages branch.

---

