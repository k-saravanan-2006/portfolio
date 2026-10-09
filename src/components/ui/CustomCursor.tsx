import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { isMobileDevice } from '../../utils/performance';

interface SunBurst {
  id: number;
  x: number;
  y: number;
}

export const CustomCursor: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const [bursts, setBursts] = useState<SunBurst[]>([]);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Direct position coordinates for 60fps RAF loop
  const mousePos = useRef({ x: -100, y: -100 });
  const headPos = useRef({ x: -100, y: -100 });
  const trailPositions = useRef([
    { x: -100, y: -100 },
    { x: -100, y: -100 },
    { x: -100, y: -100 }
  ]);
  const isMoving = useRef(false);
  const lastMoveTime = useRef(0);

  const triggerSunBurst = useCallback((x: number, y: number) => {
    const id = Date.now() + Math.random();
    setBursts((prev) => [...prev, { id, x, y }]);

    // Automatically remove after 750ms duration
    setTimeout(() => {
      setBursts((prev) => prev.filter((b) => b.id !== id));
    }, 760);
  }, []);

  useEffect(() => {
    // Disable on touch / mobile devices
    const isTouch =
      typeof window !== 'undefined' &&
      ('ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia('(pointer: coarse)').matches ||
        isMobileDevice());

    if (prefersReducedMotion || isTouch) return;

    const handlePointerMove = (e: PointerEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      lastMoveTime.current = performance.now();
      isMoving.current = true;
      if (!isVisible) setIsVisible(true);
    };

    const handlePointerDown = (e: PointerEvent) => {
      triggerSunBurst(e.clientX, e.clientY);
    };

    const handlePointerLeave = () => {
      setIsVisible(false);
    };

    const handlePointerEnter = () => {
      setIsVisible(true);
    };

    // Detect hover on interactive elements to subtly increase cyan glow
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;
      const interactive = target.closest(
        'button, a, [role="button"], input, textarea, select, label, .clickable, [data-cursor-hover]'
      );
      setIsHovered(!!interactive);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerdown', handlePointerDown, { passive: true });
    document.addEventListener('pointerleave', handlePointerLeave);
    document.addEventListener('pointerenter', handlePointerEnter);
    window.addEventListener('mouseover', handleMouseOver, { passive: true });

    // Snappy 60 FPS RAF loop
    let rafId: number;

    const animate = (now: number) => {
      const target = mousePos.current;
      const head = headPos.current;

      // Snappy, responsive interpolation (0.50) so cursor stays tight with zero lag
      head.x += (target.x - head.x) * 0.50;
      head.y += (target.y - head.y) * 0.50;

      if (cursorRef.current) {
        // Upper-left tip is at (12, 4); offset by -12px, -4px so the tip is EXACTLY at the hotspot
        cursorRef.current.style.transform = `translate3d(${head.x - 12}px, ${head.y - 4}px, 0)`;
      }

      const timeSinceMove = now - lastMoveTime.current;
      if (timeSinceMove > 90) {
        isMoving.current = false;
      }

      // Very subtle 3-5px micro-trail
      let prevX = head.x;
      let prevY = head.y;

      trailPositions.current.forEach((t, i) => {
        const ease = 0.42 - i * 0.08;
        t.x += (prevX - t.x) * ease;
        t.y += (prevY - t.y) * ease;

        const dotEl = trailRefs.current[i];
        if (dotEl) {
          const distToHead = Math.hypot(t.x - head.x, t.y - head.y);
          const motionAlpha = Math.min(distToHead / 8, 1);
          dotEl.style.transform = `translate3d(${t.x}px, ${t.y}px, 0)`;
          dotEl.style.opacity = `${(1 - i * 0.28) * (isMoving.current ? 0.65 : motionAlpha * 0.4)}`;
        }

        prevX = t.x;
        prevY = t.y;
      });

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('pointerleave', handlePointerLeave);
      document.removeEventListener('pointerenter', handlePointerEnter);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [isVisible, prefersReducedMotion, triggerSunBurst]);

  if (
    prefersReducedMotion ||
    (typeof window !== 'undefined' &&
      ('ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia('(pointer: coarse)').matches ||
        isMobileDevice()))
  ) {
    return null;
  }

  return (
    <div
      className="custom-cursor-container"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 99999,
        overflow: 'hidden',
        userSelect: 'none',
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.2s ease-out'
      }}
      aria-hidden="true"
    >
      {/* 1. Temporary Glowing Sun / Energy Burst (Rendered BEHIND cursor at click hotspot) */}
      {bursts.map((burst) => (
        <div
          key={burst.id}
          className="cyber-sun-burst-wrap"
          style={{
            position: 'absolute',
            left: `${burst.x}px`,
            top: `${burst.y}px`,
            pointerEvents: 'none',
            zIndex: 99998
          }}
        >
          <svg
            width="56"
            height="56"
            viewBox="0 0 56 56"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="cyber-sun-burst-svg"
            style={{ overflow: 'visible' }}
          >
            <defs>
              <radialGradient id={`sunHaloGrad_${burst.id}`} cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="35%" stopColor="#20CFFF" stopOpacity="0.95" />
                <stop offset="70%" stopColor="#176FE5" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#102F63" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Radiant Sun Rays (8 primary radial rays + 8 subtle intermediate rays) */}
            <g
              className="cyber-sun-rays"
              stroke="#20CFFF"
              strokeWidth="2.0"
              strokeLinecap="round"
            >
              {/* Primary 8 Rays (\ | / --- ☀ --- / | \) */}
              <line x1="28" y1="19" x2="28" y2="7" />
              <line x1="34.4" y1="21.6" x2="43.5" y2="12.5" />
              <line x1="37" y1="28" x2="49" y2="28" />
              <line x1="34.4" y1="34.4" x2="43.5" y2="43.5" />
              <line x1="28" y1="37" x2="28" y2="49" />
              <line x1="21.6" y1="34.4" x2="12.5" y2="43.5" />
              <line x1="19" y1="28" x2="7" y2="28" />
              <line x1="21.6" y1="21.6" x2="12.5" y2="12.5" />

              {/* Secondary short accent rays */}
              <line x1="32" y1="18.5" x2="36" y2="12" stroke="#176FE5" strokeWidth="1.3" />
              <line x1="37.5" y1="24" x2="44" y2="20" stroke="#176FE5" strokeWidth="1.3" />
              <line x1="37.5" y1="32" x2="44" y2="36" stroke="#176FE5" strokeWidth="1.3" />
              <line x1="32" y1="37.5" x2="36" y2="44" stroke="#176FE5" strokeWidth="1.3" />
              <line x1="24" y1="37.5" x2="20" y2="44" stroke="#176FE5" strokeWidth="1.3" />
              <line x1="18.5" y1="32" x2="12" y2="36" stroke="#176FE5" strokeWidth="1.3" />
              <line x1="18.5" y1="24" x2="12" y2="20" stroke="#176FE5" strokeWidth="1.3" />
              <line x1="24" y1="18.5" x2="20" y2="12" stroke="#176FE5" strokeWidth="1.3" />
            </g>

            {/* Glowing Sun Core */}
            <circle cx="28" cy="28" r="10" fill={`url(#sunHaloGrad_${burst.id})`} opacity="0.8" />
            <circle cx="28" cy="28" r="4.5" fill="#20CFFF" />
            <circle cx="28" cy="28" r="2.2" fill="#FFFFFF" />
          </svg>
        </div>
      ))}

      {/* 2. Very Subtle 3-5px Micro-Trail */}
      {[
        { size: 2.8, color: '#20CFFF', glow: '0 0 5px #20CFFF' },
        { size: 2.0, color: '#176FE5', glow: '0 0 4px #176FE5' },
        { size: 1.4, color: '#102F63', glow: '0 0 3px #102F63' }
      ].map((dot, index) => (
        <div
          key={index}
          ref={(el) => {
            trailRefs.current[index] = el;
          }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: `${dot.size}px`,
            height: `${dot.size}px`,
            marginLeft: `-${dot.size / 2}px`,
            marginTop: `-${dot.size / 2}px`,
            borderRadius: '50%',
            backgroundColor: dot.color,
            boxShadow: dot.glow,
            pointerEvents: 'none',
            willChange: 'transform, opacity',
            transition: 'opacity 0.15s ease-out'
          }}
        />
      ))}

      {/* 3. NORMAL REFERENCE CURSOR (DIAGONAL ↖ ORIENTED TOWARD UPPER-LEFT) */}
      <div
        ref={cursorRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          zIndex: 99999,
          willChange: 'transform'
        }}
      >
        <div
          style={{
            position: 'relative',
            transform: `scale(${isHovered ? 1.08 : 1})`,
            transition: 'transform 0.16s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          <svg
            width="36"
            height="36"
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              display: 'block',
              overflow: 'visible',
              filter: isHovered
                ? 'drop-shadow(0 0 5px #20CFFF) drop-shadow(0 0 12px #176FE5)'
                : 'drop-shadow(0 0 3px #20CFFF) drop-shadow(0 0 7px rgba(23, 111, 229, 0.75))'
            }}
          >
            <defs>
              {/* Outer Stroke Gradient: Cyan -> Electric Blue -> Violet/Deep Blue */}
              <linearGradient id="refCursorOuterGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#20CFFF" />
                <stop offset="45%" stopColor="#176FE5" />
                <stop offset="100%" stopColor="#7928CA" />
              </linearGradient>

              {/* Inner Triangle Core Gradient */}
              <linearGradient id="refCursorInnerGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#20CFFF" stopOpacity="0.95" />
                <stop offset="60%" stopColor="#176FE5" stopOpacity="0.65" />
                <stop offset="100%" stopColor="#102F63" stopOpacity="0.3" />
              </linearGradient>
            </defs>

            {/* Rotated -40° counter-clockwise around the apex tip (12, 4) -> points UPPER-LEFT (↖), body extends LOWER-RIGHT (↘) */}
            <g transform="rotate(-40 12 4)">
              {/* Backing Silhouette for needle-sharp contrast on any bright background */}
              <path
                d="M 12 4 L 21.5 18 L 15 18 L 15 27 Q 15 29 13.5 29 L 10.5 29 Q 9 29 9 27 L 9 18 L 2.5 18 Z"
                fill="#07152C"
                stroke="#040D1A"
                strokeWidth="3.6"
                strokeLinejoin="round"
                strokeLinecap="round"
              />

              {/* Reference Pointer Body */}
              <path
                d="M 12 4 L 21.5 18 L 15 18 L 15 27 Q 15 29 13.5 29 L 10.5 29 Q 9 29 9 27 L 9 18 L 2.5 18 Z"
                fill="#07152C"
                stroke="url(#refCursorOuterGrad)"
                strokeWidth="2.0"
                strokeLinejoin="round"
                strokeLinecap="round"
              />

              {/* Inner Geometric Cut / Triangle */}
              <polygon
                points="12,9 16.8,15.5 7.2,15.5"
                fill="url(#refCursorInnerGrad)"
                stroke="#20CFFF"
                strokeWidth="0.8"
                strokeLinejoin="round"
              />

              {/* Needle-Sharp Apex Energy Node */}
              <circle cx="12" cy="4.2" r="1.3" fill="#FFFFFF" />
              <circle cx="12" cy="4.2" r="2.2" fill="#20CFFF" opacity="0.6" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default CustomCursor;
