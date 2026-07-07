const journey = document.querySelector('.scroll-journey');
const scrollFrame = document.querySelector('.scroll-frame');

if (journey && scrollFrame && window.gsap && window.ScrollTrigger) {
  const { gsap } = window;
  gsap.registerPlugin(window.ScrollTrigger);

  const anticipate = 0.2;
  const exteriorLayer = document.querySelector('.layer-exterior');
  const openingLayer = document.querySelector('.layer-opening');
  const shaftLayer = document.querySelector('.layer-shaft');
  const waterLayer = document.querySelector('.layer-water');
  const shaftWalls = document.querySelector('.shaft-walls');
  const dustCanvas = document.getElementById('dustCanvas');
  const waterCanvas = document.getElementById('waterCanvas');

  const layers = [exteriorLayer, openingLayer, shaftLayer, waterLayer].filter(Boolean);
  gsap.set(layers, {
    willChange: 'transform, opacity',
    transformOrigin: '50% 50%',
  });
  gsap.set([shaftWalls, dustCanvas, waterCanvas].filter(Boolean), {
    willChange: 'transform, opacity',
    transformOrigin: '50% 50%',
  });

  gsap.set(exteriorLayer, { opacity: 1, yPercent: 0, scale: 1 });
  gsap.set(openingLayer, { opacity: 0, yPercent: 10, scale: 1.06 });
  gsap.set(shaftLayer, { opacity: 0, yPercent: 14, scale: 1.1 });
  gsap.set(waterLayer, { opacity: 0, yPercent: 18, scale: 1.13 });
  gsap.set(shaftWalls, { yPercent: 12, scale: 1.08 });
  gsap.set(dustCanvas, { opacity: 0.2, yPercent: 8 });
  gsap.set(waterCanvas, { opacity: 0.45, yPercent: 4, scale: 1.04 });

  const revealOffset = 1 - anticipate;
  const shaftOffset = (revealOffset * 2) - anticipate;

  const timeline = gsap.timeline({
    defaults: { ease: 'none' },
    scrollTrigger: {
      trigger: journey,
      start: 'top top',
      end: '+=300%',
      scrub: true,
      pin: scrollFrame,
      anticipatePin: 0.2,
      invalidateOnRefresh: true,
    },
  });

  timeline
    .to(exteriorLayer, { opacity: 0, yPercent: -10, scale: 0.93, duration: 1.15 }, 0)
    .to(openingLayer, { opacity: 1, yPercent: 0, scale: 1, duration: 1.2 }, 0.35)
    .to(openingLayer, { opacity: 0.1, yPercent: -12, scale: 0.96, duration: 1.2 }, revealOffset)
    .to(shaftLayer, { opacity: 1, yPercent: 0, scale: 1, duration: 1.4 }, revealOffset - 0.15)
    .to(shaftWalls, { yPercent: -20, scale: 1.02, duration: 2.2 }, revealOffset - 0.08)
    .to(dustCanvas, { opacity: 0.58, yPercent: -4, duration: 1.7 }, revealOffset + 0.08)
    .to(shaftLayer, { opacity: 0.2, yPercent: -24, scale: 0.95, duration: 1.3 }, shaftOffset)
    .to(waterLayer, { opacity: 1, yPercent: 0, scale: 1, duration: 1.5 }, shaftOffset - 0.12)
    .to(waterCanvas, { opacity: 1, yPercent: 0, scale: 1, duration: 1.5 }, shaftOffset - 0.05);
}
