/**
 * Global Scroll Configuration for the Premium Portfolio Scroll System
 * Defines authoritative timings, eases, responsive breakpoints, and scrub constants.
 */

export const SCROLL_CONFIG = {
  // Smooth scroll settings (Lenis)
  lenis: {
    duration: 1.15,
    wheelMultiplier: 0.95,
    touchMultiplier: 1.4,
    smoothWheel: true,
    smoothTouch: false, // native touch for zero-friction mobile feel
    autoResize: true
  },

  // Breakpoints matching the project architecture
  breakpoints: {
    desktop: '(min-width: 900px)',
    mobile: '(max-width: 899px)'
  },

  // Eases
  eases: {
    cinematic: '0.22, 1, 0.36, 1',
    editorial: '0.16, 1, 0.3, 1',
    smooth: 'power2.out',
    scrubSmooth: 'power1.inOut'
  },

  // Header offset for sticky / pinned sections
  headerHeight: 60,

  // Scrub rate for desktop vs reduced motion
  scrub: {
    desktop: 0.5,
    reduced: true
  }
} as const;
