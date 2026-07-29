---
marp: true
theme: default
paginate: true
transition: fade
---

# Wishing Well

A handcrafted pixel-art wishing well — write a wish, watch it drift as an origami boat, and discover wishes from around the world.

---

# Who is it for?

Anyone who wants a small, magical moment online. Write a wish on a paper boat, toss it into a stone well, and feel connected through shared wishes from strangers.

---

# What does it see?

A wide, shallow stone wishing well built from individual pixel-art blocks — thin walls, visible water surface filled with floating origami boats, moss between stones, and a wooden beam with rope and pulley above. The water is the star.

---

# What does it do?

- **Make a wish** — tap the button, write your wish, watch the coin toss animation
- **Boat discovery** — click any floating boat to reveal a wish from someone else
- **Canvas animations** — dithered water shimmer, drifting boats, rising sparkles
- **Firebase persistence** — wishes stored in Firestore, shared across users
- **Pixel-art rendering** — 16-bit isometric style, stepped animation, restricted palette

---

# How it works

1. Open the page — see the pixel-art stone well with water and boats
2. Make a wish — write, submit, watch the coin drop and a new boat appear
3. Discover — click any boat to read a hidden wish from another person
4. Scroll — the well shifts slightly, revealing more water and boats

---

# Built with

- Vanilla HTML, CSS, JavaScript — zero frameworks, zero build step
- Canvas API for well rendering, water, boats, dust, and sparkles
- CSS custom properties for tokens, stepped transitions, and pixel-art shadows
- Firebase Firestore for wish storage with local fallback
- Deploys to GitHub Pages
