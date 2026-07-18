---
marp: true
paginate: true
transition: fade
# PechaKucha: 6 slides, 20s auto-advance. Do not change the count.
auto-advance: 20
---

<!-- slide 1 -->

# Who's my person?

People who want a small, magical moment online — write a wish, toss it into a well, and discover wishes from around the world.

<!-- 20s -->

---

<!-- slide 2 -->

# Their problem

Most wishing experiences are boring text forms or fake magic. There's no visual, interactive journey that makes writing a wish feel like an event.

---

<!-- slide 3 -->

# What I built

A single-page wishing well with a scroll-driven journey: descend from the well exterior into the shaft, find the water at the bottom, toss origami boats with wishes, and discover others' wishes by tapping them.

---

<!-- slide 4 -->

# How I built it

- Methodology: build the core flow first, then polish what users actually touch
- Scroll-driven CSS transitions for the four depth layers
- Canvas animations for water shimmer, floating boats, and dust particles
- Firebase Firestore for wish persistence, with local fallback
- Used filesystem + fetch MCPs, ui-polish skill, and ui-reviewer agent

---

<!-- slide 5 -->

# Why it matters

The experience turns a simple "make a wish" action into a moment of wonder. Users scroll down into the well, see their boat float alongside others, and feel connected through shared wishes.

---

<!-- slide 6 -->

# Done checklist

- [x] repo public
- [x] MCP + skill + agent used
- [x] slides = Marp, 6x20
- [x] report.md in repo
