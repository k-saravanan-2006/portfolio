import { gsap, ScrollTrigger } from '../gsapConfig';
import { SCROLL_CONFIG } from './scrollConfig';

export interface SectionEntranceOptions {
  trigger?: HTMLElement | string;
  start?: string;
  duration?: number;
  stagger?: number;
  yOffset?: number;
  ease?: string;
  once?: boolean;
}

export interface ParallaxOptions {
  trigger?: HTMLElement | string;
  start?: string;
  end?: string;
  yPercent?: number;
  scale?: number;
  scrub?: boolean | number;
}

/**
 * Creates a synchronized GPU-accelerated entrance animation for section elements.
 * Replaces un-synced scroll listeners with native GSAP ScrollTrigger.
 */
export function createSectionEntrance(
  targets: gsap.DOMTarget,
  options: SectionEntranceOptions = {}
): gsap.core.Tween | null {
  if (typeof window === 'undefined' || !targets) return null;

  const {
    trigger,
    start = 'top 85%',
    duration = 0.8,
    stagger = 0.1,
    yOffset = 36,
    ease = 'cinematic',
    once = true
  } = options;

  return gsap.fromTo(
    targets,
    {
      opacity: 0,
      y: yOffset,
      scale: 0.98
    },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration,
      stagger,
      ease,
      scrollTrigger: {
        trigger: trigger || (targets as HTMLElement),
        start,
        once
      }
    }
  );
}

/**
 * Creates a subtle, high-performance parallax background effect driven by ScrollTrigger scrub.
 */
export function createParallaxEffect(
  target: HTMLElement | string,
  options: ParallaxOptions = {}
): gsap.core.Tween | null {
  if (typeof window === 'undefined' || !target) return null;

  const {
    trigger,
    start = 'top bottom',
    end = 'bottom top',
    yPercent = 15,
    scale = 1.05,
    scrub = SCROLL_CONFIG.scrub.desktop
  } = options;

  return gsap.fromTo(
    target,
    {
      yPercent: -yPercent,
      scale,
      force3D: true
    },
    {
      yPercent,
      scale: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: trigger || target,
        start,
        end,
        scrub
      }
    }
  );
}
