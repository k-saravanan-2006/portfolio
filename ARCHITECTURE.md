# ARCHITECTURE & TECHNICAL SPECIFICATIONS

## 1. Core Stack
- **Framework:** React / Vite (or Next.js) with TypeScript for lightning-fast HMR and rock-solid typing.
- **Styling:** Vanilla CSS / CSS Modules or Tailwind with tailored design tokens for absolute performance control.
- **Smooth Scrolling Engine:** `@studio-freight/lenis` (or GSAP ScrollSmoother) for buttery 60fps decoupled scroll physics.
- **Animation & Choreography:** `gsap` + `ScrollTrigger` for timeline scrub control, text morphs, and pinned canvas triggers.
- **3D / Canvas Pipeline:** HTML5 Canvas 2D (high-speed frame sequencing with `requestAnimationFrame` and `ImageBitmap` prebuffering) + Three.js / WebGL for procedural shaders and 3D objects.
- **Micro-Interactions:** Custom Pointer API physics for magnetic targets, trailing cursor reticle, and spring transitions.

---

## 2. Directory Hierarchy
```text
PROTFOLIO_/
├── ANTIGRAVITY.md             # Master Agent Operating System
├── DESIGN_SYSTEM.md           # Tokens, typography, colors, interactions
├── EXPERIENCE_PLAN.md         # Visitor journey & scroll choreography
├── ARCHITECTURE.md            # Technical specifications & render pipelines
├── MEMORY.md                  # Project decisions & failure lessons
├── frame/                     # Frame sequence zip archives (sections 1, 2, 3)
└── src/
    ├── assets/                # Audio, textures, optimized frame buffers
    ├── components/
    │   ├── canvas/            # Canvas frame sequence scrapper & Three.js canvas
    │   ├── cursor/            # Custom magnetic reticle & cursor provider
    │   ├── ui/                # MagneticButton, PillTag, SectionHeader
    │   ├── sections/          # Hero, CanvasScrubSection, Projects, Skills, Contact
    │   └── layout/            # Navbar, HUD, Footer, SmoothScrollWrapper
    ├── hooks/                 # useLenis, useMousePosition, useFramePreloader
    ├── styles/                # tokens.css, globals.css
    └── App.tsx
```

---

## 3. High-Performance Frame Preloading Strategy
- Canvas frame scrubbing demands zero drop in frame rate.
- Preload images via `ImageBitmap` off the main thread or progressive chunk preloading.
- Dynamic canvas DPR scaling (`Math.min(window.devicePixelRatio, 2)`) to protect battery and GPU memory.
