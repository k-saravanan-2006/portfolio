# DESIGN SYSTEM

## 1. Creative Direction
- **Atmosphere:** Dark luxury, cinematic, technical precision, editorial weight.
- **Visual Tone:** Deep monochromatic bedrock (`#08080a`, `#0d0e12`) punctuated by subtle luminescent accents, frosted glass textures, razor-sharp borders (`rgba(255, 255, 255, 0.08)`), and high-contrast typography.
- **Depth:** Multi-layered z-index choreography: background canvas/WebGL frame sequences, ambient glow orbs, content planes, floating HUD indicators, top-level custom cursor.

---

## 2. Typography
- **Display / Headers:** Modern geometric grotesk or high-impact editorial display (e.g. *Syne*, *Clash Display*, *Cabinet Grotesk*, or *Outfit*).
- **Body & Technical Specs:** Clean humanist grotesque or monospace pairing (e.g. *Inter*, *Plus Jakarta Sans*, *JetBrains Mono* for coordinates/labels).
- **Scale Hierarchy:**
  - `Display / Hero Title`: 5rem - 9rem (clamp responsive, tracking -0.04em, line-height 0.95)
  - `Section Title`: 3rem - 5rem (tracking -0.03em)
  - `Subheading`: 1.25rem - 1.75rem (tracking -0.01em)
  - `Body`: 1rem - 1.125rem (line-height 1.6, color `rgba(255, 255, 255, 0.7)`)
  - `Overline / Tag / Metadata`: 0.75rem - 0.85rem (uppercase, tracking 0.15em, monospace accent)

---

## 3. Color Palette & Tokens
- **Background Deep:** `#060709` (Void Black)
- **Background Surface:** `#0e1015` (Deep Graphite)
- **Surface Elevated:** `rgba(255, 255, 255, 0.03)` with backdrop blur `16px` and border `1px solid rgba(255, 255, 255, 0.08)`
- **Accent Primary:** Electric Cyan / Ice Blue (`#4ee1a0` or `#38bdf8`) or Pure White highlight
- **Accent Secondary:** Subtle Violet / Indigo glow (`#6366f1`)
- **Text Primary:** `#f8fafc` (98% white)
- **Text Secondary:** `rgba(248, 250, 252, 0.65)`
- **Border / Divider:** `rgba(255, 255, 255, 0.08)`

---

## 4. Motion & Animation Tokens
- **Micro-Interactions (Buttons, Links, Tags):**
  - Duration: `0.2s - 0.35s`
  - Easing: `cubic-bezier(0.16, 1, 0.3, 1)` (Power4.out equivalent)
- **Section Reveals & Transitions:**
  - Duration: `0.8s - 1.2s`
  - Easing: `cubic-bezier(0.22, 1, 0.36, 1)` (Quint.out)
- **Scroll Synchronization:**
  - Lenis smooth scroll damping: `0.85 - 1.1`
  - Canvas frame scrub: lerped interpolation (`alpha = 0.08 - 0.12`) to eliminate stutter.

---

## 5. Custom Cursor System
- **Dot Core:** Small 6px-8px dot tracking mouse instantaneously.
- **Ring / Reticle:** 36px-48px outer follower with soft spring physics (`mass: 0.2, damping: 20`).
- **States:**
  - `DEFAULT`: Neutral ring and center dot.
  - `HOVER_LINK / BUTTON`: Reticle expands to 64px, magnetic pull towards target center, opacity increase.
  - `VIEW_PROJECT`: Reticle expands to 90px with embedded "VIEW" micro-text label.
  - `DRAG / SCRUB`: Reticle morphs with horizontal drag arrows.
  - `HIDDEN`: Automatically suppressed on touch devices and outside viewport.

---

## 6. Premium Button & UI System
- **Magnetic Buttons:** Target tracks mouse position within a 40px threshold using `transform: translate3d(x, y, 0)`.
- **Pill / Capsule Architecture:** Smooth rounded contours (`rounded-full` or `border-radius: 9999px`), subtle gradient border stroke, glassmorphic backdrop.
- **Hover Micro-Effect:** Inward radial glow, text shift, arrow angle rotation (45deg to 0deg).

---

## 7. Responsive Strategy
- **Desktop (1280px+):** Full cinematic scroll, canvas frame sequence scrubbing, magnetic physics, custom cursor, 3D viewport.
- **Tablet (768px - 1279px):** Optimized canvas rendering, standard cursor, maintained scroll choreography.
- **Mobile (< 768px):** Lightweight canvas step-scrub, native touch scrolling, stacked editorial cards, simplified shaders/particles, 60fps locked.

---

## 8. Accessibility & Quality Rules
- Support `prefers-reduced-motion`: disable canvas frame scrub scrubbing or substitute with clean crossfading keyframes.
- Full keyboard focus rings (`outline: 2px solid #38bdf8`) with high contrast.
- Semantic HTML tags (`<main>`, `<header>`, `<section>`, `<article>`, `<nav>`).
