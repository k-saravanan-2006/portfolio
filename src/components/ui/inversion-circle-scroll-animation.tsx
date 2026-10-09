"use client";

/**
 * InversionCircleScrollAnimation
 *
 * Scroll-driven animation merged from:
 *   +page.svelte                  → hero circle animation
 *   ContentSection.svelte         → scroll-reveal section
 *   Button.svelte                 → CTA button
 *
 * How it works:
 *   The wrapper div is the scroll container (overflow-y:scroll, height:100vh)
 *   or tracks page window scroll when useWindowScroll is true.
 *   Inside it lives a scroll track. The hero section is sticky inside
 *   that track, so it stays pinned while the track scrolls past.
 *
 *   Phase 1 (scroll 0→viewH):
 *     A circle rises from below the screen to dead-centre.
 *     Easing: Power4 InOut (slow → fast → slow).
 *
 *   Phase 2 (scroll viewH→2×viewH):
 *     The circle expands from BALL_SIZE diameter until it fills the screen.
 *     Easing: ease-in² (accelerates as it grows).
 *
 *   A CSS clip-path mirrors the circle position exactly, revealing
 *   content inside the circle → colour/visual inversion effect.
 *
 *   Below the hero a ContentSection fades in when entering the viewport.
 */

import React, { useEffect, useRef, useState } from "react";

// ─── types & props ────────────────────────────────────────────────────────────
export interface InversionCircleScrollAnimationProps {
  backgroundImage?: string;
  heroTitle?: React.ReactNode;
  heroSubtitle?: React.ReactNode;
  invertedTitle?: React.ReactNode;
  invertedSubtitle?: React.ReactNode;
  children?: React.ReactNode;
  useWindowScroll?: boolean;
  className?: string;
  id?: string;
}

type WRef = React.RefObject<HTMLDivElement | null>;

// ─── root export ──────────────────────────────────────────────────────────────
export default function InversionCircleScrollAnimation({
  backgroundImage,
  heroTitle,
  heroSubtitle,
  invertedTitle,
  invertedSubtitle,
  children,
  useWindowScroll = false,
  className = "",
  id
}: InversionCircleScrollAnimationProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  if (useWindowScroll) {
    return (
      <div id={id} className={`icsa-page-container ${className}`}>
        <Styles isWindowScroll={true} hasImage={Boolean(backgroundImage)} />
        <div ref={trackRef} className="icsa-track">
          <HeroSection
            trackRef={trackRef}
            useWindowScroll={true}
            backgroundImage={backgroundImage}
            heroTitle={heroTitle}
            heroSubtitle={heroSubtitle}
            invertedTitle={invertedTitle}
            invertedSubtitle={invertedSubtitle}
          />
        </div>
        <ContentSection
          useWindowScroll={true}
          backgroundImage={backgroundImage}
        >
          {children}
        </ContentSection>
      </div>
    );
  }

  return (
    <>
      <Styles isWindowScroll={false} hasImage={Boolean(backgroundImage)} />
      <div ref={wrapperRef} id={id} className={`icsa-wrap ${className}`}>
        <div ref={trackRef} className="icsa-track">
          <HeroSection
            wrapperRef={wrapperRef}
            trackRef={trackRef}
            useWindowScroll={false}
            backgroundImage={backgroundImage}
            heroTitle={heroTitle}
            heroSubtitle={heroSubtitle}
            invertedTitle={invertedTitle}
            invertedSubtitle={invertedSubtitle}
          />
        </div>
        <ContentSection
          wrapperRef={wrapperRef}
          useWindowScroll={false}
          backgroundImage={backgroundImage}
        >
          {children}
        </ContentSection>
      </div>
    </>
  );
}

// ─── HeroSection ──────────────────────────────────────────────────────────────
interface HeroSectionProps {
  wrapperRef?: WRef;
  trackRef: React.RefObject<HTMLDivElement | null>;
  useWindowScroll: boolean;
  backgroundImage?: string;
  heroTitle?: React.ReactNode;
  heroSubtitle?: React.ReactNode;
  invertedTitle?: React.ReactNode;
  invertedSubtitle?: React.ReactNode;
}

function HeroSection({
  wrapperRef,
  trackRef,
  useWindowScroll,
  backgroundImage,
  heroTitle,
  heroSubtitle,
  invertedTitle,
  invertedSubtitle
}: HeroSectionProps) {
  const [scrollY, setScrollY] = useState(0);
  const [viewH, setViewH] = useState(800);
  const [viewW, setViewW] = useState(1200);

  useEffect(() => {
    if (useWindowScroll) {
      const track = trackRef.current;
      const measure = () => {
        setViewH(window.innerHeight);
        setViewW(window.innerWidth);
      };
      measure();
      window.addEventListener("resize", measure);

      const onScroll = () => {
        if (!track) return;
        const rect = track.getBoundingClientRect();
        const currentScroll = Math.max(0, -rect.top);
        setScrollY(currentScroll);
      };

      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();

      return () => {
        window.removeEventListener("resize", measure);
        window.removeEventListener("scroll", onScroll);
      };
    } else {
      const el = wrapperRef?.current;
      if (!el) return;

      const measure = () => {
        setViewH(el.clientHeight);
        setViewW(el.clientWidth);
      };
      measure();

      const ro = new ResizeObserver(measure);
      ro.observe(el);

      const onScroll = () => setScrollY(el.scrollTop);
      el.addEventListener("scroll", onScroll, { passive: true });

      return () => {
        ro.disconnect();
        el.removeEventListener("scroll", onScroll);
      };
    }
  }, [useWindowScroll, wrapperRef, trackRef]);

  // Responsive base ball size
  const ballInitialSize = Math.min(380, Math.max(260, Math.floor(viewW * 0.45)));

  // phase progress 0 → 1
  const effectiveH = Math.max(viewH, 400);
  const p1 = clamp(scrollY / effectiveH);
  const p2 = clamp((scrollY - effectiveH) / effectiveH);

  // Power4 InOut
  const p1e = p1 < 0.5 ? 8 * p1 ** 4 : 1 - (-2 * p1 + 2) ** 4 / 2;
  // ease-in²
  const p2e = p2 * p2;

  // geometry
  const yOff = (1 - p1e) * (effectiveH / 2 + ballInitialSize / 2);
  const coverSize = Math.max(viewW, effectiveH) * 2.8;
  const ballSize = ballInitialSize + p2e * (coverSize - ballInitialSize);
  const clipX = viewW / 2;
  const clipY = effectiveH / 2 + yOff;
  const clipR = ballSize / 2;

  return (
    <section className="icsa-hero">
      {/* expanding circle (portal image or black ball) */}
      <div
        className="icsa-ball"
        style={{
          width: ballSize,
          height: ballSize,
          transform: `translate(-50%, calc(-50% + ${yOff}px))`,
          ...(backgroundImage
            ? {
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                boxShadow:
                  "0 0 60px rgba(56, 189, 248, 0.45), inset 0 0 40px rgba(2, 6, 17, 0.7)",
                border: "2px solid rgba(56, 189, 248, 0.4)"
              }
            : {
                background: "#000"
              })
        }}
      />

      {/* base layer — visible outside circle */}
      <div className="icsa-layer icsa-dark">
        {heroTitle || <h1>Design that moves.</h1>}
        {heroSubtitle || <p>Scroll to reveal the future.</p>}
      </div>

      {/* inverted layer — clipped to the circle */}
      <div
        className="icsa-layer icsa-light"
        style={{ clipPath: `circle(${clipR}px at ${clipX}px ${clipY}px)` }}
      >
        {invertedTitle || heroTitle || <h1>Design that moves.</h1>}
        {invertedSubtitle || heroSubtitle || <p>Scroll to reveal the future.</p>}
      </div>
    </section>
  );
}

// ─── ContentSection ───────────────────────────────────────────────────────────
interface ContentSectionProps {
  wrapperRef?: WRef;
  useWindowScroll: boolean;
  backgroundImage?: string;
  children?: React.ReactNode;
}

function ContentSection({
  wrapperRef,
  useWindowScroll,
  backgroundImage,
  children
}: ContentSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (useWindowScroll) {
      const io = new IntersectionObserver(
        ([e]) => {
          if (e.isIntersecting) setOn(true);
        },
        { threshold: 0.15 }
      );
      io.observe(el);
      return () => io.disconnect();
    } else {
      const root = wrapperRef?.current;
      if (!root) return;

      const io = new IntersectionObserver(
        ([e]) => {
          if (e.isIntersecting) setOn(true);
        },
        { root, threshold: 0.35 }
      );
      io.observe(el);
      return () => io.disconnect();
    }
  }, [useWindowScroll, wrapperRef]);

  if (children) {
    return (
      <section
        ref={ref}
        className={`icsa-cs custom-content ${on ? "on" : ""}`}
        style={
          backgroundImage
            ? {
                backgroundImage: `linear-gradient(180deg, rgba(5, 6, 8, 0.75) 0%, rgba(5, 6, 8, 0.5) 50%, rgba(5, 6, 8, 0.8) 100%), url(${backgroundImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat"
              }
            : undefined
        }
      >
        <div className="w-full h-full">{children}</div>
      </section>
    );
  }

  return (
    <section ref={ref} className={`icsa-cs ${on ? "on" : ""}`}>
      <div className="icsa-inner">
        <span className="icsa-label">What comes next</span>
        <h2>
          Build with intention.
          <br />
          Ship with confidence.
        </h2>
        <p>
          Every great product starts with a clear vision and a simple idea. From
          a blank canvas to something remarkable — the only thing between you
          and it is the work.
        </p>
        <CTAButton />
      </div>
    </section>
  );
}

// ─── Button (from Button.svelte) ──────────────────────────────────────────────
function CTAButton() {
  return <button className="icsa-btn">Get started</button>;
}

// ─── helpers ──────────────────────────────────────────────────────────────────
const clamp = (v: number) => Math.min(1, Math.max(0, v));

// ─── styles ───────────────────────────────────────────────────────────────────
function Styles({
  isWindowScroll,
  hasImage
}: {
  isWindowScroll: boolean;
  hasImage: boolean;
}) {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;900&display=swap');

      .icsa-wrap *, .icsa-wrap *::before, .icsa-wrap *::after,
      .icsa-page-container *, .icsa-page-container *::before, .icsa-page-container *::after {
        box-sizing: border-box;
      }

      /* ── standalone scroll container ────────────────────────────────── */
      .icsa-wrap {
        width: 100%; height: 100vh;
        overflow-y: scroll; overflow-x: clip;
        font-family: Inter, sans-serif;
        background: #fff;
      }

      /* ── in-page container ──────────────────────────────────────────── */
      .icsa-page-container {
        width: 100%; position: relative;
        font-family: Inter, sans-serif;
        background: ${hasImage ? "#050608" : "#fff"};
      }

      /* 250vh - 300vh scroll room; hero sticks inside */
      .icsa-track {
        height: 260vh;
        position: relative;
      }

      /* pinned hero */
      .icsa-hero {
        position: sticky; top: 0;
        height: 100vh; overflow: hidden;
        display: flex; align-items: center; justify-content: center;
        background: ${hasImage ? "#020611" : "#fff"};
      }

      /* ball */
      .icsa-ball {
        position: absolute; top: 50%; left: 50%;
        border-radius: 50%;
        will-change: transform, width, height;
      }

      /* text layers */
      .icsa-layer {
        position: absolute; inset: 0;
        display: flex; flex-direction: column;
        align-items: center; justify-content: center;
        text-align: center; padding: 0 2rem;
        pointer-events: none;
      }
      .icsa-dark  { color: ${hasImage ? "#94a3b8" : "#000"}; z-index: 2; }
      .icsa-light { color: #fff; z-index: 3; will-change: clip-path; }

      .icsa-layer h1, .icsa-layer h2 {
        font-size: clamp(2.5rem, 7vw, 5.5rem);
        font-weight: 900; letter-spacing: -0.03em; line-height: 1.05;
      }
      .icsa-layer p {
        font-size: clamp(1rem, 2.5vw, 1.4rem);
        font-weight: 400; margin-top: 1.25rem; opacity: .85;
      }

      /* ── content section ── */
      .icsa-cs {
        min-height: 100vh;
        display: flex; align-items: center; justify-content: center;
        padding: 5rem 2rem;
        background: ${hasImage ? "#050608" : "#000"};
        color: #fff;
        transition: background 1.8s cubic-bezier(.25,0,.1,1),
                    color 1.8s cubic-bezier(.25,0,.1,1);
      }
      .icsa-cs.on:not(.custom-content) {
        background: #fff; color: #000;
      }

      .icsa-inner {
        max-width: 720px; text-align: center;
        display: flex; flex-direction: column;
        align-items: center; gap: 1.75rem;
      }

      .icsa-inner > * {
        opacity: 0; transform: translateY(24px);
        transition: opacity .7s ease, transform .7s ease;
      }
      .icsa-cs.on .icsa-inner > * { opacity: 1; transform: translateY(0); }

      .icsa-cs.on .icsa-label { transition-delay: .10s; }
      .icsa-cs.on h2          { transition-delay: .24s; }
      .icsa-cs.on p           { transition-delay: .38s; }
      .icsa-cs.on .icsa-btn   { transition-delay: .52s; }

      .icsa-label {
        font-size: .75rem; font-weight: 600;
        letter-spacing: .18em; text-transform: uppercase; opacity: .45;
      }
      .icsa-inner h2 {
        font-size: clamp(2rem, 6vw, 4rem);
        font-weight: 900; letter-spacing: -.03em; line-height: 1.08;
      }
      .icsa-inner p {
        font-size: clamp(1rem, 2vw, 1.2rem);
        line-height: 1.75; opacity: .6; max-width: 560px;
      }

      /* button */
      .icsa-btn {
        background: #0284c7; color: #fff;
        padding: 10px 28px; border-radius: 8px; border: none;
        cursor: pointer; font-family: Inter, sans-serif;
        font-size: 1rem; font-weight: 600; letter-spacing: .01em;
        transition: opacity .2s ease, transform .2s ease;
      }
      .icsa-btn:hover  { opacity: .85; transform: translateY(-1px); }
      .icsa-btn:active { opacity: 1;   transform: translateY(0);    }
    `}</style>
  );
}
