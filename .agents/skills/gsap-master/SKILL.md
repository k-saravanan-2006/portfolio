---
name: gsap-master
description: Master GSAP skill for ScrollTrigger, timelines, scrub synchronization, pinning, and React lifecycle integration with useGSAP. Use when building or optimizing complex scroll-driven animations, canvas/video scrubbers, and smooth-scroll architectures.
license: MIT
---

# GSAP Master Skill

Comprehensive guide and best practices for Greensock Animation Platform (GSAP), ScrollTrigger, and React integration.

---

## 1. Core Principles

1. **Always Use `useGSAP()` Hook in React**:
   - Wrap animations in `useGSAP(() => { ... }, { scope: containerRef, dependencies: [...] })`.
   - Never use standard `useEffect` without proper `gsap.context()` cleanup. `useGSAP` handles reverting animations and killing ScrollTriggers automatically on component unmount.

2. **Single Source of Truth for Scroll**:
   - Connect smooth-scrolling engines (like Lenis) directly to GSAP's ticker:
     ```typescript
     lenis.on('scroll', ScrollTrigger.update);
     gsap.ticker.add((time) => {
       lenis.raf(time * 1000);
     });
     gsap.ticker.lagSmoothing(0);
     ```
   - Never run multiple independent scroll listeners on `window` that compete with the smooth-scroll engine.

3. **Performance First**:
   - Animate `x`, `y`, `xPercent`, `yPercent`, `scale`, `rotation`, and `opacity`.
   - Use `force3D: true` for GPU compositing layers.
   - Avoid animating layout triggers (`top`, `left`, `width`, `height`, `margin`).

---

## 2. ScrollTrigger Best Practices

### Clamping and Positioning
- Format: `"triggerPosition viewportPosition"` (e.g. `start: "top 85%"`, `end: "bottom top"`).
- Clamping (`clamp(top bottom)`) prevents triggers from firing prematurely outside page boundaries.

### Scrubbed Timelines vs. Play Actions
- **Scrubbed Timelines**: For continuous animations (like canvas frame scrubbing, line progress, parallax), use numeric scrub (e.g. `scrub: 0.5`) to smooth out discrete mouse-wheel ticks.
- **Triggered Entrances**: For cards, headings, and sections, use `once: true` or `toggleActions: "play none none none"` with a cinematic ease curve.

### Pinning
- When pinning, never animate the pinned element itself; animate its children.
- Account for fixed/sticky headers with proper offset or pinSpacing.

---

## 3. Responsive & Accessibility (`matchMedia` & Reduced Motion)

Always support `gsap.matchMedia()` for responsive animations:
```typescript
const mm = gsap.matchMedia();
mm.add({
  isDesktop: "(min-width: 900px)",
  isMobile: "(max-width: 899px)",
  reduceMotion: "(prefers-reduced-motion: reduce)"
}, (context) => {
  const { isDesktop, reduceMotion } = context.conditions!;
  // Adjust scrub, distances, and timeline targets accordingly
});
```
When `reduceMotion` is active, disable scrubbed parallax and replace with instantaneous transitions or simple opacity fades.
