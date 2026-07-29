---
marp: true
theme: default
paginate: true
transition: fade
---

# Wishing Well

An interactive wishing well experience — write a wish, toss it into a magical well, and discover wishes from around the world.

---

# Who is it for?

Anyone who wants a small, magical moment online. Write a wish, watch it drift as an origami boat, and feel connected through shared wishes from strangers.

---

# What does it do?

- **Scroll-driven journey** — descend from the well exterior into the shaft, reaching the water at the bottom
- **Canvas animations** — water shimmer, floating origami boats, and dust particles
- **Wish writing** — tap "Make a Wish", write your wish, toss a coin
- **Boat discovery** — click floating boats to reveal wishes from others
- **Firebase persistence** — wishes are stored in Firestore and shared across users

---

# How it works

1. Open the page — see the isometric stone well
2. Scroll down — journey through the shaft layers
3. Reach the water — see origami boats floating
4. Make a wish — write, submit, watch the toss animation
5. Discover — click any boat to read a hidden wish

---

# Built with

- Vanilla HTML, CSS, JavaScript — no frameworks, no build step
- CSS custom properties and `clamp()` for fluid responsive design
- Canvas API for water, boat, and dust animations
- Firebase Firestore for wish storage with local fallback
- Deploys to GitHub Pages
