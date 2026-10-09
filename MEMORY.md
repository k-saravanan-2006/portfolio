# PROJECT MEMORY & DECISION LOG

## Agent Identity
- **Name:** Jersey
- **Role:** AI Coding Assistant / Principal Creative Engineer & UI/UX Architect (operating under the ANTIGRAVITY Master Architecture).

---

## Workspace Assets & Context
- Directory: `c:\Users\Swetha K\Desktop\SAIRAM CLG\PROGRAMS\PROTFOLIO_`
- Detected Assets in `frame/`:
  - `video_section_1.zip` (~18.8 MB)
  - `Video_section_2.zip` (~24.4 MB)
  - `video_section_3.zip` (~29.7 MB)
  - `frames.zip` (~72.9 MB)
- Asset Interpretation: Dedicated scroll-driven image frame sequences for sticky canvas scrubbing (Apple-style storytelling).

---

## Established Decisions
1. **Operating Model:** Full adoption of the ANTIGRAVITY creative engineering specification.
2. **Design Language:** Dark luxury, cinematic, technical precision with custom cursor, magnetic elements, and buttery scroll triggers.
3. **Architecture Split:** Dual-brain system established with `ANTIGRAVITY.md` (Agent execution protocol) and `DESIGN_SYSTEM.md` (Aesthetic & interaction rules), accompanied by `EXPERIENCE_PLAN.md` and `ARCHITECTURE.md`.

---

## Failure Memory & Guardrails
- **Risk:** High memory consumption from hundreds of raw uncompressed full-HD image frames loaded into the DOM simultaneously.
  - **Mitigation:** Use a single `<canvas>` element with `drawImage`, pre-buffering frame sequences into an array of Image objects or ImageBitmaps, with dynamic garbage collection and resolution adaptation for smaller screen sizes.
- **Risk:** Stuttery scrolling when coupling frame rendering to native scroll events.
  - **Mitigation:** Employ smooth interpolation (Lerp / GSAP ScrollTrigger `scrub: 1` or Lenis smooth scroll ticker) so frame changes are smoothed across rAF frames.
