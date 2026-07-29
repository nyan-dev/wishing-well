# **PixelWell Architecture Specification**

This document outlines the technical architecture, data flow pathways, directory organization, and cloud infrastructure integration rules for the **PixelWell** interactive wishing-well web application.

## **1\. System Topology Overview**

PixelWell uses a serverless, client-first architecture designed to operate entirely within the free-tier limits of modern cloud providers. There is no middleman backend application server; the client browser communicates directly with the database and realtime event layer.

|                   ┌───────────────────────────────────────────┐                  │          USER AGENT (Browser)             │                  │  ┌───────────────────┐ ┌───────────────┐  │                  │  │  Vite/HTML5 Canvas│ │ Supabase SDK  │  │                  │  └─────────┬─────────┘ └───────┬───────┘  │                  └────────────┼───────────────────┼──────────┘                               │ HTTPS / CDN       │ Websockets / HTTPS                               ▼                   ▼                  ┌──────────────────────┐ ┌──────────────────────────┐                  │     STATIC HOST      │ │      CLOUD BACKEND       │                  │  ┌────────────────┐  │ │  ┌─────────┐ ┌────────┐  │                  │  │  GitHub Pages  │  │ │  │Postgres │ │Realtime│  │                  │  └────────────────┘  │ │  │ Database│ │ Engine │  │                  │                      │ │  └─────────┘ └────────┘  │                  │    (Vite Build)      │ │      (Supabase Free)     │                  └──────────────────────┘ └──────────────────────────┘ |
| :---- |

### **1.1 Hardware & Cloud Infrastructure Stack**

1. **Static Content Delivery Network (CDN):** GitHub Pages. Serves pre-bundled static resources (index.html, bundled compiled JavaScript, CSS sheets, static retro pixel art, and audio assets).  
2. **Database Engine:** Postgres (running on Supabase Shared Instance, Free Tier).  
3. **Data Access Layer:** Supabase Client-side Auto-generated REST API (via PostgREST).  
4. **Subscription Broadcast System:** Supabase Realtime Engine (via WebSocket connection).

## **2\. Directory Structure**

To keep the development workspace tidy, organize the repository utilizing this lightweight standard Vite configuration structure:

| pixelwell/├── .github/│   └── workflows/│       └── deploy.yml          \# Automated deployment pipeline to GitHub Pages├── .claude/│   └── skills/│       ├── apply-retro-aesthetic/│       │   └── SKILL.md        \# CSS, typography, and pixel rendering playbook│       └── setup-supabase-realtime/│           └── SKILL.md        \# DB connection and reactive stream playbook├── public/                     \# Static media assets│   ├── favicon.ico│   ├── splash.wav              \# Light, 8-bit water splash sound effect│   └── sprites/                \# Optional custom drawn pixel sprite sheets├── src/│   ├── assets/│   │   └── main.css            \# Global CSS styling overrides, imports, and variables│   ├── db/│   │   └── supabaseClient.js   \# Supabase client initialize module│   ├── canvas/│   │   ├── Engine.js           \# Base canvas manager (render loops, resize hooks)│   │   ├── Water.js            \# Simulates wave oscillations and boat container logic│   │   └── Particles.js        \# Physics engine for 8-bit stone tosses and splash physics│   ├── ui/│   │   ├── scrollTracker.js    \# Binds window scroll positions to CSS 3D perspectives│   │   └── modalController.js  \# Overlay handling for writing wishes and voting│   ├── main.js                 \# Application entry point & core logic orchestrator│   └── index.html              \# Core layout structure containing HTML5 Canvas and UI overlays├── architecture.md             \# This document├── design\_system.md            \# The styling and physics design specifications├── features\_specification.md   \# The step-by-step user interaction specs├── package.json└── vite.config.js              \# Vite packaging config (with base repository routing paths) |
| :---- |

## **3\. Data Flow Models & Lifecycles**

### **3.1 Data Flow: Posting a Wish (Toss Mechanics)**

1. The user inputs text (![][image1] character limit) into the input form and clicks **Toss**.  
2. **Local Canvas Event:** The input element fades out, a particle simulation triggers, and a temporary placeholder boat is drawn drifting on the local canvas.  
3. **Network Insertion:** The client calls the client-side Supabase client payload:  
   const { data, error } \= await supabase  
     .from('wishes')  
     .insert(\[{ content: userText }\]);

4. **PostgreSQL Event Trigger:** Database stores the wish and broadcasts an INSERT payload event down the WebSockets pipe.

### **3.2 Data Flow: Realtime Broadcast Sink (Rendering New Peer Boats)**

| Any client connected to the application maintains a persistent socket subscription:const channel \= supabase  .channel('schema-db-changes')  .on(    'postgres\_changes',    { event: 'INSERT', schema: 'public', table: 'wishes' },    (payload) \=\> {      // Feed payload.new into the canvas engine      canvasEngine.spawnBoat(payload.new.id, payload.new.content);    }  )  .subscribe(); |
| :---- |

1. Once the payload arrives, a new 2D boat entity is spawned in the Canvas model. This keeps the experience highly collaborative and alive.

## **4\. Security & Access Control**

Because clients talk directly to Supabase with a public anonymity key (anon\_key), Postgres **Row Level Security (RLS)** is strictly configured to protect against unauthorized database tampering.

### **4.1 SQL RLS & Operations Map**

| \-- Disable database alteration operations globallyCREATE POLICY "Deny deletion rights" ON public.wishes FOR DELETE USING (false);CREATE POLICY "Deny update modification rights" ON public.wishes FOR UPDATE USING (false);\-- Define permissive policies for public interactionCREATE POLICY "Allow public insert queries"     ON public.wishes FOR INSERT     WITH CHECK (length(content) \<= 140 AND length(content) \> 0);CREATE POLICY "Allow public select queries"     ON public.wishes FOR SELECT     USING (is\_active \= true); |
| :---- |

### **4.2 Handling Reactions (Atomic Increments)**

Updating emoji counts securely without allowing users to modify arbitrary fields (such as text values) requires executing an isolated Database RPC (Remote Procedure Call).

| CREATE OR REPLACE FUNCTION increment\_reaction(wish\_id INT, reaction\_type VARCHAR)RETURNS VOID AS $$BEGIN    IF reaction\_type \= 'like' THEN        UPDATE public.wishes SET reaction\_like \= reaction\_like \+ 1 WHERE id \= wish\_id;    ELSIF reaction\_type \= 'love' THEN        UPDATE public.wishes SET reaction\_love \= reaction\_love \+ 1 WHERE id \= wish\_id;    ELSIF reaction\_type \= 'haha' THEN        UPDATE public.wishes SET reaction\_haha \= reaction\_haha \+ 1 WHERE id \= wish\_id;    ELSIF reaction\_type \= 'wow' THEN        UPDATE public.wishes SET reaction\_wow \= reaction\_wow \+ 1 WHERE id \= wish\_id;    ELSIF reaction\_type \= 'sad' THEN        UPDATE public.wishes SET reaction\_sad \= reaction\_sad \+ 1 WHERE id \= wish\_id;    END IF;END;$$ LANGUAGE plpgsql SECURITY DEFINER; |
| :---- |

This prevents exposing standard SQL UPDATE routines on the frontend, ensuring malicious scripts cannot alter existing notes or forge values.

[image1]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB8AAAAZCAYAAADJ9/UkAAABtElEQVR4Xu1UPUvDUBRNKIKgICi1SNukScVBHISATm6KLi5O/gOdHBVnJzdxFsTByUUHBUGouHR0dFFQ0aUgTl0U0XPsC9xcX22F1ikHLjf33PNy8j7yHCdFCsdxC4XCKHJGNzTCMBwoAZonQPcWi8WJbDbbr3s2uJ7njWPQie/794gRLVBwod3EmEjxGXBrGP+COGKGbjuKoh6la4ANfiFfBHEd8fCbOWeM/gXiTZuDu0GccuaC20W8ciWkNoE2zblC64gdGFxZzD9pJjloNshDvyL5BNoxD4JgCr0zZCT/0mZOM8mhXjTmB5JPoJU5lxuaYyzfDLfpr+bUNz2ArczBVcrl8jCfbeaG67y5OZBzstbmuVyuryvm2K9VJDeubeZEx82NUQX9xzhQPyE+EDXDzVJrMwe3ZMwPHTGBBJqZA24+nx8iFwdvQeQqVmSedfxfG5M9MZbv/f7V9EdJ8MZagOgdUcPzpBZImF/tmmMcMRtwW4g6+GnWyCXUdzDet95yZjb8Yh0/9kisTkLLfWWfh45G4J69xjV7i3yOlRqU7+kmXNwJY5j0MjNrLUiRIsW/4QuWkqwnD7tomwAAAABJRU5ErkJggg==>