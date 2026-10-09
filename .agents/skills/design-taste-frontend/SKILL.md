---
name: design-taste-frontend
description: Anti-slop frontend skill for landing pages, portfolios, and redesigns. The agent reads the brief, infers the right design direction, and ships interfaces that do not look templated. Enforces concrete typography, spacing, hierarchy, and tasteful motion.
---

# tasteskill: Anti-Slop Frontend Skill

> Landing pages, portfolios, and redesigns. Not dashboards, not data tables, not multi-step product UI.
> Every rule below is contextual. First read the brief, then pull only what fits.

---

## 0. BRIEF INFERENCE (Read the Room Before Anything Else)

Before touching code or tweaking dials, infer what the user actually wants. Most LLM design output is bad because the model jumps to a default aesthetic instead of reading the room.

### 0.A Read these signals first
1. **Page kind** - landing, portfolio, redesign, editorial.
2. **Vibe words** the user used - "minimalist", "calm", "Linear-style", "Awwwards", "brutalist", "premium consumer", "Apple-y", "playful", "glassy", "dark tech".
3. **Reference signals** - URLs linked, screenshots pasted, products named.
4. **Audience** - Recruiter scanning a portfolio, technical buyer, or creative director.
5. **Brand assets that already exist** - logo, color, type, photography. For redesigns, these are starting material.
6. **Quiet constraints** - accessibility, reduced motion.

### 0.B Anti-Default Discipline
Do not default to: AI-purple gradients, centered hero over dark mesh, three equal feature cards, generic glassmorphism on everything, infinite-loop micro-animations everywhere, Inter + slate-900. Reach past them deliberately based on the design read.

---

## 1. THE THREE DIALS (Core Configuration)

Set three dials for layout, motion, and density:

* **`DESIGN_VARIANCE: 8`** - 1 = Perfect Symmetry, 10 = Artsy Chaos
* **`MOTION_INTENSITY: 6`** - 1 = Static, 10 = Cinematic / Physics
* **`VISUAL_DENSITY: 4`** - 1 = Art Gallery / Airy, 10 = Cockpit / Packed Data

**Baseline for Portfolio (Developer / Creative AI):** `8 / 6 / 4`.

---

## 2. AESTHETIC INTEGRATION & MOTION TASTE

1. **Motion with Intent**: Every scroll animation must have purpose (revealing information hierarchy or depth). Avoid random animations that trigger disconnectedly.
2. **Coordinated Timing**: When elements animate on scroll, stagger them with deliberate rhythm (e.g., 0.1s - 0.15s stagger, 0.7s - 0.9s duration).
3. **Typography & Contrast**: High-contrast headings with subdued, readable body text. Never sacrifice legibility for decorative effects.
4. **Restraint Over Excess**: Parallax should feel organic (e.g. ±8% to ±15% shift), not disorienting.
5. **GPU Acceleration**: Always animate `transform` and `opacity`, never layout properties like `height`, `top`, or `padding`.
