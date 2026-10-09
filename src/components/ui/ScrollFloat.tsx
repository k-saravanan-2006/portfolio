import React, { useMemo, useRef, forwardRef, useImperativeHandle, type ReactNode, type CSSProperties } from 'react';
import { gsap } from 'gsap';

export interface ScrollFloatProps {
  children: ReactNode;
  containerClassName?: string;
  textClassName?: string;
  style?: CSSProperties;
  as?: 'h1' | 'h2' | 'h3' | 'span' | 'div';
}

export interface CreateScrollFloatOptions {
  duration?: number;
  stagger?: number;
  ease?: string;
  reduceMotion?: boolean;
}

/**
 * Creates a GSAP timeline for the ScrollFloat character entrance.
 * Returns a GSAP timeline that can be added directly to the master GSAP timeline.
 * NEVER creates its own ScrollTrigger.
 */
export function createScrollFloatTimeline(
  target: HTMLElement | string | null,
  options?: CreateScrollFloatOptions
): gsap.core.Timeline {
  const tl = gsap.timeline();
  if (!target) return tl;

  const element = typeof target === 'string' ? document.querySelector(target) : target;
  if (!element) return tl;

  const chars = element.querySelectorAll('.scroll-float-char');
  if (!chars.length) return tl;

  const reduceMotion = options?.reduceMotion ?? false;
  const duration = options?.duration ?? 6.5;
  const ease = options?.ease ?? 'back.out(2)';
  const stagger =
    options?.stagger ??
    (chars.length > 1 ? (duration * 0.45) / (chars.length - 1) : 0);
  const charDuration = duration * 0.55;

  tl.fromTo(
    chars,
    {
      opacity: 0,
      yPercent: reduceMotion ? 0 : 120,
      scaleY: reduceMotion ? 1 : 2.3,
      scaleX: reduceMotion ? 1 : 0.7,
      transformOrigin: '50% 0%'
    },
    {
      opacity: 1,
      yPercent: 0,
      scaleY: 1,
      scaleX: 1,
      stagger,
      duration: charDuration,
      ease
    },
    0
  );

  return tl;
}

export const ScrollFloat = forwardRef<HTMLElement, ScrollFloatProps>(function ScrollFloat(
  {
    children,
    containerClassName = '',
    textClassName = '',
    style,
    as: Component = 'h2'
  },
  ref
) {
  const innerRef = useRef<HTMLElement>(null);
  useImperativeHandle(ref, () => innerRef.current as HTMLElement);

  const splitText = useMemo(() => {
    const rawText = typeof children === 'string' ? children : (children != null ? String(children) : '');
    const text = rawText.trim();
    return text.split('').map((char, index) => {
      const isPeriod = char === '.';
      return (
        <span
          className="scroll-float-char inline-block"
          key={index}
          style={{
            display: 'inline-block',
            willChange: 'opacity, transform',
            color: isPeriod ? '#20CFFF' : '#F8FAFC',
            filter: isPeriod ? 'drop-shadow(0 0 6px rgba(32, 207, 255, 0.45))' : undefined
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      );
    });
  }, [children]);

  return (
    <Component
      ref={innerRef as any}
      className={`scroll-float-container overflow-hidden leading-tight ${containerClassName}`}
      style={{
        overflow: 'hidden',
        lineHeight: 1.12,
        paddingBottom: '0.12em',
        paddingTop: '0.04em',
        ...style
      }}
    >
      <span className={`scroll-float-text inline-block ${textClassName}`} style={{ display: 'inline-block' }}>
        {splitText}
      </span>
    </Component>
  );
});

export default ScrollFloat;
