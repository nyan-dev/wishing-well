# Chapter 5 — How to Submit (Personal Project)

> 🇲🇲 မြန်မာဘာသာ — [HOW-TO-SUBMIT-my.md](./HOW-TO-SUBMIT-my.md)

Chapter 5 is about **workflow + capability**. You use real AI tools (skills, subagents,
methodology), show how you fire them, make a tech-stack deck, and get feedback from one real user.

Follow the steps in order.

> **Two repos:** Steps 1–5 are in **your own repo**; Step 6 (the report) is in the **team repo** (`team-NN`). Don't mix them up.

---

## What you need to finish (the checklist)

1. ✅ Your project repo + live/download URL (from Chapter 4, kept working)
2. ✅ Used at least **1 Skill** and **1 Subagent** on your project (files in your repo)
3. ✅ A short list of the **AI tools** you used
4. ✅ A **tech-stack slide deck** (stack · agents · skills · methodology · trigger · commands)
5. ✅ **One** feedback file — pick interview **or** feedback **or** open-issues
6. ✅ A filled-in `report.md` in your team repo
7. ✅ `doctor.sh ch-5` shows all green

---

## Step 1 — Use Skills + Subagents on your project

- Install or build at least **one Skill** and **one Subagent**, and actually use them.
- Keep the proof in your repo:
  - `.claude/skills/<name>/SKILL.md`
  - `.claude/agents/<name>.md`

## Step 2 — List your AI tools

- Write a short list of the AI tools / workflow pieces you used this chapter
  (skills, subagents, multi-agent, Superpowers, GSD, PAL MCP, Context7, claude-mem…).
- One line each: what it did for you. (Goes in `report.md`.)

## Step 3 — Show trigger + commands

- If you built your own skill / agent, show **how to fire it**:
  - **Trigger** — when/how it activates.
  - **Command** — the exact command or phrase you run.

## Step 4 — Make the tech-stack slide deck

- A deck that explains how your project is built. Cover, one idea per page:
  - tech stack · agents · skills · methodology · trigger · commands
- Use the slide template. Put the file inside your repo, e.g. `slides/tech-stack.md`.

## Step 5 — Get feedback (pick ONE)

Real users used your Chapter-4 live link. Now collect what they think. **Pick one** template
in this folder, copy it into your repo, fill it, and link it in the report:

| If you… | Use this template |
|---|---|
| talked to a real user | `interview-template.md` |
| collected written feedback | `feedback-template.md` |
| filed GitHub issues from feedback | `issues-template.md` |

> Whatever you collect becomes the **open issues you fix in Chapter 6**.

> **Step 6 happens in the TEAM repo** (`team-NN`) — not your own repo.

## Step 6 — Fill in the report (in your TEAM repo)

- The team repo is private — **don't fork**. Sync, branch, push, open a PR.
- Copy `_TEMPLATE.md` to `ch-5/<your-github-username>/report.md` in your **team** repo, fill it in, then:

```bash
# 1. sync the latest main
git checkout main
git pull

# 2. make your own branch — naming:  <yourname>/ch-5
git checkout -b yourname/ch-5

# 3. stage + commit your report
git add ch-5/yourname/report.md
git commit -m "ch-5: yourname report"

# 4. push your branch
git push -u origin yourname/ch-5

# 5. open a Pull Request on GitHub → review → merge
```

> If a teammate merged before you, sync again: `git checkout main && git pull`,
> then `git merge main` into your branch (or `git rebase main`) and push.

## Step 7 — Check yourself with doctor.sh

Before you submit, run the self-check:

```bash
bash doctor.sh ch-5
```

Fix any red ❌ lines, then run it again until everything is green ✅.

## Step 8 — Submit in Discord

- Post in your `#ch-5` channel that you're done.
- An instructor reacts ✅ → you unlock the next chapter.

---

### Common mistakes

- **No real Skill/Subagent used** → add the files and actually run them; don't fake it.
- **Slides as a full URL** → use the file path inside your repo (`slides/tech-stack.md`).
- **Used more than one feedback template** → one is enough. Pick the one that fits.
- **No issues to carry to Ch-6** → turn at least the top feedback into something fixable.

Stuck? Ask in your team channel.