import React, { useMemo, useRef, forwardRef, useImperativeHandle, type ReactNode, type CSSProperties } from 'react';
import { gsap } from 'gsap';
import { motion, type MotionValue, useTransform } from 'motion/react';

export interface ScrollCharacterTextProps {
  children?: ReactNode;
  text?: string;
  containerClassName?: string;
  textClassName?: string;
  style?: CSSProperties;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'span' | 'div' | 'p';
  perspective?: number;
  spread?: number;
  rotateSpread?: number;
  progress?: MotionValue<number>;
}

export interface CreateScrollCharacterOptions {
  duration?: number;
  ease?: string;
  reduceMotion?: boolean;
  spread?: number;
  rotateSpread?: number;
  stagger?: number;
}

/**
 * Creates a GSAP timeline for the Skiper31 character scroll convergence effect.
 * Characters start separated and rotated based on distance from center,
 * then converge smoothly into their normal typography position as the user scrolls.
 * Seamlessly integrates into master GSAP timelines without competing scroll listeners.
 */
export function createScrollCharacterTimeline(
  target: HTMLElement | string | null,
  options?: CreateScrollCharacterOptions
): gsap.core.Timeline {
  const tl = gsap.timeline();
  if (!target) return tl;

  const element = typeof target === 'string' ? document.querySelector(target) : target;
  if (!element) return tl;

  const chars = element.querySelectorAll<HTMLElement>('.scroll-character-char');
  if (!chars.length) return tl;

  const reduceMotion = options?.reduceMotion ?? false;
  const duration = options?.duration ?? 5.5;
  const ease = options?.ease ?? 'power2.out';

  // Responsive spread configuration: prevents horizontal overflow on tablet/mobile
  const width = typeof window !== 'undefined' ? window.innerWidth : 1200;
  const userSpread = options?.spread;
  const userRotate = options?.rotateSpread;

  let baseSpread = 44;
  let baseRotate = 14;

  if (userSpread !== undefined) {
    baseSpread = userSpread;
    baseRotate = userRotate ?? 10;
    if (width < 640) {
      baseSpread = userSpread * 0.4;
      baseRotate = baseRotate * 0.5;
    } else if (width < 1024) {
      baseSpread = userSpread * 0.7;
      baseRotate = baseRotate * 0.75;
    }
  } else {
    if (width < 640) {
      baseSpread = 12;
      baseRotate = 6;
    } else if (width < 1024) {
      baseSpread = 24;
      baseRotate = 9;
    }
  }

  const spread = reduceMotion ? 0 : baseSpread;
  const rotateSpread = reduceMotion ? 0 : baseRotate;
  const total = chars.length;
  const stagger = options?.stagger ?? 0;

  // Animate each character converging from its center-relative offset
  chars.forEach((charEl, idx) => {
    const dist = idx - (total - 1) / 2;
    const initialX = dist * spread;
    const initialRotateX = dist * rotateSpread;
    const initialRotateY = dist * (rotateSpread * 0.45);
    const initialZ = -Math.abs(dist) * Math.min(12, spread * 0.3);

    tl.fromTo(
      charEl,
      {
        opacity: reduceMotion ? 0 : 0.15,
        x: initialX,
        rotateX: initialRotateX,
        rotateY: initialRotateY,
        z: initialZ,
        scale: reduceMotion ? 1 : 0.92,
        transformOrigin: '50% 50%'
      },
      {
        opacity: 1,
        x: 0,
        rotateX: 0,
        rotateY: 0,
        z: 0,
        scale: 1,
        duration,
        ease
      },
      stagger > 0 ? idx * stagger : 0
    );
  });

  return tl;
}

/**
 * Individual character component with optional Framer Motion MotionValue support
 */
const AnimatedCharacterItem: React.FC<{
  char: string;
  index: number;
  total: number;
  progress?: MotionValue<number>;
  spread: number;
  rotateSpread: number;
}> = ({ char, index, total, progress, spread, rotateSpread }) => {
  const dist = index - (total - 1) / 2;
  const isPeriod = char === '.';

  // If a Framer Motion progress MotionValue is provided, bind transforms
  const x = progress ? useTransform(progress, [0, 0.7], [dist * spread, 0]) : undefined;
  const rotateX = progress ? useTransform(progress, [0, 0.7], [dist * rotateSpread, 0]) : undefined;
  const rotateY = progress ? useTransform(progress, [0, 0.7], [dist * (rotateSpread * 0.45), 0]) : undefined;
  const opacity = progress ? useTransform(progress, [0, 0.5], [0.15, 1]) : undefined;

  const motionStyle = progress
    ? {
        x,
        rotateX,
        rotateY,
        opacity,
        display: 'inline-block' as const
      }
    : undefined;

  return (
    <motion.span
      className="scroll-character-char inline-block"
      data-index={index}
      data-distance={dist}
      style={{
        display: 'inline-block',
        willChange: 'transform, opacity',
        transformStyle: 'preserve-3d',
        color: isPeriod ? '#20CFFF' : undefined,
        filter: isPeriod ? 'drop-shadow(0 0 6px rgba(32, 207, 255, 0.45))' : undefined,
        ...motionStyle
      }}
    >
      {char === ' ' ? '\u00A0' : char}
    </motion.span>
  );
};

/**
 * ScrollCharacterText Component
 * Splits text into individual characters and renders them inside a 3D perspective stage.
 * Supports multi-word wrapping cleanly via word groupings.
 */
export const ScrollCharacterText = forwardRef<HTMLElement, ScrollCharacterTextProps>(
  function ScrollCharacterText(
    {
      children,
      text: textProp,
      containerClassName = '',
      textClassName = '',
      style,
      as: Component = 'h2',
      perspective = 500,
      spread = 44,
      rotateSpread = 14,
      progress
    },
    ref
  ) {
    const innerRef = useRef<HTMLElement>(null);
    useImperativeHandle(ref, () => innerRef.current as HTMLElement);

    const raw = textProp ?? (typeof children === 'string' ? children : (children != null ? String(children) : ''));
    const cleanText = raw.trim();

    const charList = useMemo(() => {
      // Split by words so words wrap naturally to new lines without breaking awkwardly
      const words = cleanText.split(/\s+/);
      const totalChars = cleanText.replace(/\s+/g, '').length;
      let globalCharIndex = 0;

      return words.map((word, wordIdx) => {
        const wordChars = word.split('').map((char) => {
          const currentIndex = globalCharIndex++;
          return (
            <AnimatedCharacterItem
              key={currentIndex}
              char={char}
              index={currentIndex}
              total={totalChars}
              progress={progress}
              spread={spread}
              rotateSpread={rotateSpread}
            />
          );
        });

        return (
          <span
            key={wordIdx}
            className="inline-block whitespace-nowrap"
            style={{
              display: 'inline-block',
              whiteSpace: 'nowrap',
              marginRight: wordIdx < words.length - 1 ? '0.3em' : undefined,
              transformStyle: 'preserve-3d'
            }}
          >
            {wordChars}
          </span>
        );
      });
    }, [cleanText, progress, spread, rotateSpread]);

    const isParagraph = Component === 'p';

    return (
      <Component
        ref={innerRef as any}
        className={`scroll-character-container ${isParagraph ? 'leading-relaxed' : 'leading-tight'} ${containerClassName}`}
        style={{
          perspective: `${perspective}px`,
          perspectiveOrigin: 'center center',
          transformStyle: 'preserve-3d',
          lineHeight: isParagraph ? 1.7 : 1.15,
          paddingBottom: '0.12em',
          paddingTop: '0.04em',
          ...style
        }}
      >
        <span
          className={`scroll-character-text ${textClassName}`}
          style={{
            display: isParagraph ? 'block' : 'inline-block',
            width: isParagraph ? '100%' : undefined,
            transformStyle: 'preserve-3d'
          }}
        >
          {charList}
        </span>
      </Component>
    );
  }
);

export default ScrollCharacterText;
