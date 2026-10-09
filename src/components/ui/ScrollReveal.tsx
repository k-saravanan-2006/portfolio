import React, { useMemo, useRef, forwardRef, useImperativeHandle, type ReactNode, type CSSProperties } from 'react';
import { gsap } from 'gsap';

export interface ScrollRevealProps {
  children: ReactNode;
  containerClassName?: string;
  textClassName?: string;
  as?: 'h1' | 'h2' | 'h3' | 'div' | 'p' | 'span';
  style?: CSSProperties;
  enableBlur?: boolean;
  baseOpacity?: number;
  baseRotation?: number;
  blurStrength?: number;
  isWordAnimation?: boolean;
}

export interface CreateScrollRevealOptions {
  duration?: number;
  ease?: string;
  reduceMotion?: boolean;
}

/**
 * Creates a GSAP timeline for the ScrollReveal content sequence:
 * subtitle words -> description words -> stats/info box.
 * Returns a GSAP timeline that can be added directly to the master GSAP timeline.
 * NEVER creates its own ScrollTrigger.
 */
export function createScrollRevealTimeline(
  target: HTMLElement | string | null,
  options?: CreateScrollRevealOptions
): gsap.core.Timeline {
  const tl = gsap.timeline({ defaults: { ease: options?.ease || 'power2.out' } });
  if (!target) return tl;

  const element = typeof target === 'string' ? document.querySelector(target) : target;
  if (!element) return tl;

  const reduceMotion = options?.reduceMotion ?? false;
  const duration = options?.duration ?? 8;
  const ease = options?.ease ?? 'power2.out';

  // 1. Subtitle: check for scroll-character-char first, then scroll-reveal-word, then container
  const subContainer = element.querySelector('.story-subtitle') as HTMLElement;
  const subChars = element.querySelectorAll<HTMLElement>('.story-subtitle .scroll-character-char');
  const subWords = element.querySelectorAll('.story-subtitle .scroll-reveal-word');
  
  // 2. Paragraph/desc: check for scroll-character-char first, then scroll-reveal-word, then container
  const descContainer = element.querySelector('.story-desc') as HTMLElement;
  const descChars = element.querySelectorAll<HTMLElement>('.story-desc .scroll-character-char');
  const descWords = element.querySelectorAll('.story-desc .scroll-reveal-word');
  
  // 3. Stats / telemetry info box
  const box = element.querySelector('.scroll-reveal-box');

  const subDuration = duration * 0.4;
  const descDuration = duration * 0.45;
  const boxDuration = duration * 0.35;

  const width = typeof window !== 'undefined' ? window.innerWidth : 1200;

  if (subChars && subChars.length > 0) {
    const totalSub = subChars.length;
    const subSpread = reduceMotion ? 0 : (width < 640 ? 6 : (width < 1024 ? 10 : 16));
    const subRotate = reduceMotion ? 0 : (width < 640 ? 3 : 6);
    subChars.forEach((charEl, idx) => {
      const dist = idx - (totalSub - 1) / 2;
      tl.fromTo(
        charEl,
        {
          opacity: reduceMotion ? 0 : 0.15,
          x: dist * subSpread,
          rotateX: dist * subRotate,
          rotateY: dist * (subRotate * 0.4),
          z: -Math.abs(dist) * 4,
          scale: reduceMotion ? 1 : 0.95
        },
        {
          opacity: 1,
          x: 0,
          rotateX: 0,
          rotateY: 0,
          z: 0,
          scale: 1,
          duration: subDuration * 0.75,
          ease
        },
        0
      );
    });
  } else if (subWords && subWords.length > 0) {
    const subStagger = (subDuration * 0.5) / Math.max(1, subWords.length - 1);
    tl.fromTo(
      subWords,
      {
        opacity: 0,
        y: reduceMotion ? 0 : 8,
        filter: reduceMotion ? 'blur(0px)' : 'blur(4px)',
        rotation: reduceMotion ? 0 : 3,
        transformOrigin: '50% 50%'
      },
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        rotation: 0,
        stagger: subStagger,
        duration: subDuration * 0.6,
        ease
      },
      0
    );
  } else if (subContainer) {
    tl.fromTo(
      subContainer,
      {
        opacity: 0,
        y: reduceMotion ? 0 : 8,
        filter: reduceMotion ? 'blur(0px)' : 'blur(4px)'
      },
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: subDuration * 0.7,
        ease
      },
      0
    );
  }

  if (descChars && descChars.length > 0) {
    const descStart = duration * 0.2;
    const totalDesc = descChars.length;
    const descSpread = reduceMotion ? 0 : (width < 640 ? 3 : (width < 1024 ? 5 : 8));
    const descRotate = reduceMotion ? 0 : (width < 640 ? 2 : 4);
    descChars.forEach((charEl, idx) => {
      const dist = idx - (totalDesc - 1) / 2;
      tl.fromTo(
        charEl,
        {
          opacity: reduceMotion ? 0 : 0.15,
          x: dist * descSpread,
          rotateX: dist * descRotate,
          z: -Math.abs(dist) * 2,
          scale: reduceMotion ? 1 : 0.97
        },
        {
          opacity: 1,
          x: 0,
          rotateX: 0,
          z: 0,
          scale: 1,
          duration: descDuration * 0.75,
          ease
        },
        descStart
      );
    });
  } else if (descWords && descWords.length > 0) {
    const descStagger = (descDuration * 0.5) / Math.max(1, descWords.length - 1);
    const descStart = duration * 0.25;
    tl.fromTo(
      descWords,
      {
        opacity: 0,
        y: reduceMotion ? 0 : 8,
        filter: reduceMotion ? 'blur(0px)' : 'blur(4px)',
        rotation: reduceMotion ? 0 : 3,
        transformOrigin: '50% 50%'
      },
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        rotation: 0,
        stagger: descStagger,
        duration: descDuration * 0.6,
        ease
      },
      descStart
    );
  } else if (descContainer) {
    const descStart = duration * 0.25;
    tl.fromTo(
      descContainer,
      {
        opacity: 0,
        y: reduceMotion ? 0 : 8,
        filter: reduceMotion ? 'blur(0px)' : 'blur(4px)'
      },
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: descDuration * 0.7,
        ease
      },
      descStart
    );
  }

  if (box) {
    const boxStart = duration * 0.6;
    tl.fromTo(
      box,
      {
        opacity: 0,
        y: reduceMotion ? 0 : 8,
        filter: reduceMotion ? 'blur(0px)' : 'blur(4px)',
        rotation: reduceMotion ? 0 : 2,
        transformOrigin: '50% 50%'
      },
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        rotation: 0,
        duration: boxDuration,
        ease
      },
      boxStart
    );
  }

  return tl;
}

export const ScrollReveal = forwardRef<HTMLElement, ScrollRevealProps>(function ScrollReveal(
  {
    children,
    containerClassName = '',
    textClassName = '',
    as: Component = 'div',
    style,
    enableBlur = true,
    baseOpacity = 0,
    baseRotation = 3,
    blurStrength = 4,
    isWordAnimation = true
  },
  ref
) {
  const innerRef = useRef<HTMLElement>(null);
  useImperativeHandle(ref, () => innerRef.current as HTMLElement);

  const isStringChild = typeof children === 'string';

  const splitContent = useMemo(() => {
    if (!isWordAnimation || !isStringChild) {
      return children;
    }

    const words = (children as string).trim().split(/\s+/);
    return words.map((word, index) => (
      <span
        key={index}
        className={`scroll-reveal-word inline-block ${textClassName}`}
        style={{
          display: 'inline-block',
          willChange: 'opacity, filter, transform',
          marginRight: index < words.length - 1 ? '0.28em' : undefined,
          opacity: baseOpacity,
          filter: enableBlur ? `blur(${blurStrength}px)` : 'none',
          transform: `rotate(${baseRotation}deg)`,
          transformOrigin: '0% 50%'
        }}
      >
        {word}
      </span>
    ));
  }, [children, isWordAnimation, isStringChild, textClassName, baseOpacity, enableBlur, blurStrength, baseRotation]);

  return (
    <Component
      ref={innerRef as any}
      className={`scroll-reveal-container ${containerClassName}`}
      style={{
        ...style
      }}
    >
      {splitContent}
    </Component>
  );
});

export default ScrollReveal;
