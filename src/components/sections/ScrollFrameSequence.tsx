import React, { useEffect, useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger, CustomEase } from '../../animation/gsapConfig';
import { FrameSequenceManager, TOTAL_FRAMES } from '../../utils/frameLoader';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { getOptimizedDpr, isMobileDevice } from '../../utils/performance';
import { MagneticButton } from '../ui/MagneticButton';
import SpecularButton from '../ui/SpecularButton';
import { createScrollRevealTimeline } from '../ui/ScrollReveal';
import { ScrollCharacterText, createScrollCharacterTimeline } from '../ui/scroll-character-text';
import { TextRotate } from '../ui/text-rotate';
import { AnimatePresence, motion } from 'motion/react';
import { cn } from '../../lib/utils';
import { PORTFOLIO_DATA } from '../../data/portfolioData';
import { Code2, Cpu, Layers, Sparkles, ChevronRight } from 'lucide-react';
import { scrollManager } from '../../animation/scroll/scrollManager';

// 4 Cinematic Story Beats corresponding to user scroll stages
const STAGES = [
  {
    id: 'think',
    align: 'left' as const,
    heading: 'THINK',
    subtitle: 'Algorithmic Foundations & Competitive Rigor',
    description: 'Over 3,000 algorithmic problems solved across LeetCode, SkillRack, and CodeChef. Engineering optimal time complexities and robust data structures for scalable digital intelligence.',
    boxIcon: <Code2 size={16} color="#38bdf8" />,
    boxText: '100+ LeetCode • 2000+ SkillRack • 1500+ CodeChef',
  },
  {
    id: 'engineer',
    align: 'center' as const,
    heading: 'ENGINEER',
    subtitle: 'Autonomous Computer Vision & Dynamic Pipelines',
    description: 'Building production-focused real-time vision pipelines with Python, OpenCV, and deep learning. Real-time lane density arbitration, dynamic signal cycles, and emergency vehicle preemption.',
    boxIcon: <Cpu size={16} color="#38bdf8" />,
    boxText: 'Sub-Second Latency • Dynamic Vision Arbitration',
  },
  {
    id: 'build',
    align: 'left' as const,
    heading: 'BUILD',
    subtitle: 'Scalable Web Ecosystems & Distributed Platforms',
    description: 'Developing responsive dashboards, WebSocket-synchronized collaborative workspaces, and full-stack commerce platforms with React, Node.js, and cloud backends.',
    boxIcon: <Layers size={16} color="#38bdf8" />,
    boxText: 'Neon Dash • TaskFlow • Aura E-Commerce',
  },
  {
    id: 'optimize',
    align: 'center' as const,
    heading: 'OPTIMIZE',
    subtitle: 'Sri Sairam Engineering College — AI & DS',
    description: 'Combining deep academic foundational research with real-world engineering discipline. Bridging intelligent algorithms with production software.',
    boxIcon: <Sparkles size={16} color="#38bdf8" />,
    boxText: 'College CGPA: 8.63 • 10+ Completed Projects',
  },
];

export const ScrollFrameSequence: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const managerRef = useRef<FrameSequenceManager | null>(null);

  // Story Beat element ref for Hero
  const beat0Ref = useRef<HTMLDivElement>(null);

  // Synchronized scroll-driven TextRotate stage states
  const [activeStage, setActiveStage] = useState<number>(0);
  const [showStages, setShowStages] = useState<boolean>(false);
  const activeStageRef = useRef<number>(0);
  const showStagesRef = useRef<boolean>(false);

  // Direct DOM references for high-performance updates without React re-render penalties
  const frameNumEl = useRef<HTMLSpanElement>(null);
  const scrubPercentEl = useRef<HTMLSpanElement>(null);
  const progressFillEl = useRef<HTMLDivElement>(null);

  const [bufferCount, setBufferCount] = useState<number>(0);

  const prefersReducedMotion = useReducedMotion();
  const isMobile = isMobileDevice();

  // Target frame tracker for requestAnimationFrame loop
  let targetFrameRef = useRef<number>(1);


  // Canvas Frame Rendering Engine
  useEffect(() => {
    const manager = new FrameSequenceManager((loaded) => {
      setBufferCount(loaded);
    });
    managerRef.current = manager;
    manager.startPreloading();

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let animId: number;
    let lastDrawnFrame = -1;

    // High-performance canvas resize (cover mode)
    const handleResize = () => {
      if (!canvas) return;
      const dpr = getOptimizedDpr();
      const width = window.innerWidth;
      const height = window.innerHeight;
      const targetW = Math.floor(width * dpr);
      const targetH = Math.floor(height * dpr);

      if (canvas.width !== targetW || canvas.height !== targetH) {
        canvas.width = targetW;
        canvas.height = targetH;
        lastDrawnFrame = -1;
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });

    // RequestAnimationFrame render loop: only paints when frame changes
    const renderLoop = () => {
      const target = targetFrameRef.current;
      if (lastDrawnFrame !== target && canvas && ctx) {
        const frameImg = manager.getFrame(target);

        if (frameImg && frameImg.complete && frameImg.naturalWidth > 0) {
          const cw = canvas.width;
          const ch = canvas.height;
          const iw = frameImg.naturalWidth;
          const ih = frameImg.naturalHeight;

          // Aspect ratio cover calculation
          const hRatio = cw / iw;
          const vRatio = ch / ih;
          const ratio = Math.max(hRatio, vRatio);

          const nw = iw * ratio;
          const nh = ih * ratio;
          const offsetX = (cw - nw) / 2;
          const offsetY = (ch - nh) / 2;

          ctx.drawImage(frameImg, 0, 0, iw, ih, offsetX, offsetY, nw, nh);
          lastDrawnFrame = target;
        }
      }

      animId = requestAnimationFrame(renderLoop);
    };

    animId = requestAnimationFrame(renderLoop);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      manager.destroy();
    };
  }, []);

  // GSAP Master Scroll Timeline Setup
  useGSAP(() => {
    if (!containerRef.current || !stageRef.current) return;

    const mm = gsap.matchMedia();

    mm.add(
      {
        isDesktop: '(min-width: 900px)',
        isMobile: '(max-width: 899px)',
        reduceMotion: '(prefers-reduced-motion: reduce)'
      },
      (context) => {
        const { reduceMotion } = context.conditions as { reduceMotion: boolean };
        const scrubRate = reduceMotion ? true : 0.5;
        const yEntry = reduceMotion ? 0 : '110vh';
        const yExit = reduceMotion ? 0 : '-110vh';

        // Initialize element states (THINK and BUILD left-aligned; ENGINEER and OPTIMIZE centered)
        // All states remain autoAlpha: 1 (NO opacity fading between states).
        // States queue below the viewport and scroll vertically into/out of view.
        gsap.set(beat0Ref.current, {
          autoAlpha: 1,
          y: 0,
          xPercent: 0
        });

        // Beat 0: Hero character convergence entrance on page load
        const heroChars = beat0Ref.current?.querySelectorAll<HTMLElement>('.scroll-character-char');
        if (heroChars && heroChars.length > 0) {
          const totalHero = heroChars.length;
          heroChars.forEach((charEl, idx) => {
            const dist = idx - (totalHero - 1) / 2;
            const isHeading = charEl.closest('h1');
            const spreadVal = isHeading ? 28 : 10;
            const rotVal = isHeading ? 8 : 4;
            gsap.fromTo(
              charEl,
              {
                opacity: reduceMotion ? 0 : 0.15,
                x: dist * spreadVal,
                rotateX: dist * rotVal,
                rotateY: dist * (rotVal * 0.4),
                z: -Math.abs(dist) * 4,
                scale: reduceMotion ? 1 : 0.94
              },
              {
                opacity: 1,
                x: 0,
                rotateX: 0,
                rotateY: 0,
                z: 0,
                scale: 1,
                duration: 1.1,
                delay: 0.1,
                ease: 'power2.out'
              }
            );
          });
        }

        // ========================================================
        // THE SINGLE MASTER GSAP SCROLL TIMELINE
        // Controls:
        // A. Existing 812-frame background animation (continuous 1 -> 812)
        // B. Hero smooth in-place fade out (no vertical fly away)
        // C. Scroll-driven synchronization with TextRotate stages
        // ========================================================
        const masterTimeline = gsap.timeline({
          defaults: {
            ease: 'none'
          }
        });

        // 1. Existing Frame Animation — Continuous 1 -> 812 across 68 duration
        const frameState = { frame: 1 };
        masterTimeline.to(
          frameState,
          {
            frame: TOTAL_FRAMES,
            duration: 68,
            ease: 'none',
            onUpdate: () => {
              const frameIndex = Math.min(
                TOTAL_FRAMES,
                Math.max(1, Math.round(frameState.frame))
              );
              targetFrameRef.current = frameIndex;

              // High-performance direct DOM telemetry updates
              if (frameNumEl.current) {
                frameNumEl.current.textContent = frameIndex.toString().padStart(4, '0');
              }
              const p = (frameIndex - 1) / (TOTAL_FRAMES - 1);
              if (scrubPercentEl.current) {
                scrubPercentEl.current.textContent = `${Math.round(p * 100)}%`;
              }
              if (progressFillEl.current) {
                progressFillEl.current.style.width = `${p * 100}%`;
              }

              // Synchronized scroll-driven TextRotate stage calculation
              const t = masterTimeline.time();
              const shouldShow = t >= 2.0;
              if (shouldShow !== showStagesRef.current) {
                showStagesRef.current = shouldShow;
                setShowStages(shouldShow);
              }

              let nextStage = 0;
              if (t < 20) {
                nextStage = 0; // THINK (~frame 30 - 200)
              } else if (t < 39) {
                nextStage = 1; // ENGINEER (~frame 200 - 420)
              } else if (t < 57) {
                nextStage = 2; // BUILD (~frame 420 - 620)
              } else {
                nextStage = 3; // OPTIMIZE (~frame 620 - 812)
              }

              if (nextStage !== activeStageRef.current) {
                activeStageRef.current = nextStage;
                setActiveStage(nextStage);
              }
            }
          },
          0
        );

        // BEAT 0: HERO & IDENTITY (0.1 -> 1.6)
        // Fully fades out before Stage 0 appears at 2.0 (zero text overwrite)
        masterTimeline.to(
          beat0Ref.current,
          {
            autoAlpha: 0,
            y: -18,
            scale: 0.96,
            duration: 1.5,
            ease: 'power1.out'
          },
          0.1
        );

        // Resting buffer at the end so the final state stays permanently in full clarity
        masterTimeline.to({}, { duration: 10 }, 68);

        // ========================================================
        // ATTACH THE SINGLE MASTER SCROLLTRIGGER
        // Smooth 0.5s scrub for buttery momentum on slow or fast scroll
        // ========================================================
        const st = ScrollTrigger.create({
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom-=100vh bottom',
          scrub: reduceMotion ? true : 0.5,
          animation: masterTimeline
        });

        return () => {
          st.kill();
          masterTimeline.kill();
        };
      }
    );
  }, { scope: containerRef });

  const handleContactClick = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    scrollManager.scrollTo('#contact', { offset: -60 });
  };

  return (
    <section
      id="home"
      ref={containerRef}
      className="cinematic-home"
      style={{
        position: 'relative',
        width: '100%',
        height: '700vh',
        backgroundColor: '#050608'
      }}
    >
      {/* 
        ============================================================
        PINNED CINEMATIC STAGE (Fixed in Viewport for 600vh duration)
        ============================================================
      */}
      <div
        ref={stageRef}
        className="cinematic-stage"
        style={{
          position: 'sticky',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#050608'
        }}
      >
        {/* Layer 0: The 812-Frame Canvas Scrubber */}
        <canvas
          ref={canvasRef}
          className="frame-canvas"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'block',
            zIndex: 0
          }}
        />

        {/* Layer 1: Directional Vignette & Subtle Parallax Gradient */}
        <div
          className="cinematic-vignette"
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            zIndex: 1,
            background: `
              radial-gradient(circle at 65% center, rgba(5, 6, 8, 0.1) 25%, rgba(5, 6, 8, 0.85) 90%),
              linear-gradient(to right, rgba(5, 6, 8, 0.8) 0%, rgba(5, 6, 8, 0.35) 45%, transparent 75%),
              linear-gradient(to bottom, rgba(5, 6, 8, 0.85) 0%, transparent 20%, transparent 80%, rgba(5, 6, 8, 0.95) 100%)
            `
          }}
        />




        {/* 
          ============================================================
          Layer 4: SYNCHRONIZED CINEMATIC STORY OVERLAYS
          ============================================================
        */}
        <div
          className="cinematic-overlay container"
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 2,
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            maxWidth: 'var(--container-max)',
            margin: '0 auto',
            padding: '0 24px'
          }}
        >
          {/* 
            BEAT 0: HERO & IDENTITY (OLD PORTFOLIO CONTENT & LEFT ALIGNMENT)
          */}
          <div
            ref={beat0Ref}
            className="story-beat beat-hero"
            style={{
              position: 'absolute',
              maxWidth: '640px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              textAlign: 'left'
            }}
          >
            <ScrollCharacterText
              as="h1"
              containerClassName="font-display scroll-character-heading"
              textClassName="font-display"
              spread={32}
              rotateSpread={10}
              style={{
                fontSize: 'clamp(2.2rem, 4.8vw, 3.8rem)',
                color: '#f8fafc',
                fontWeight: 900,
                letterSpacing: '-0.03em',
                lineHeight: 1.05,
                marginBottom: '14px',
                textTransform: 'uppercase'
              }}
            >
              SARAVANAN K
            </ScrollCharacterText>

            <ScrollCharacterText
              as="h2"
              containerClassName="story-subtitle"
              spread={14}
              rotateSpread={6}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.2rem, 2.5vw, 1.75rem)',
                fontWeight: 600,
                lineHeight: 1.3,
                marginBottom: '20px',
                letterSpacing: '-0.01em'
              }}
            >
              B.Tech Artificial Intelligence &amp; Data Science
            </ScrollCharacterText>

            <ScrollCharacterText
              as="p"
              containerClassName="story-desc"
              spread={6}
              rotateSpread={3}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(0.95rem, 1.5vw, 1.15rem)',
                color: 'var(--text-secondary)',
                lineHeight: 1.6,
                maxWidth: '520px',
                marginBottom: '32px'
              }}
            >
              Passionate AI &amp; Data Science student who loves building smart, data-driven solutions.
            </ScrollCharacterText>

            <div style={{ pointerEvents: 'auto' }}>
              <SpecularButton
                size="lg"
                radius={18}
                tint="#071525"
                tintOpacity={0.35}
                blur={8}
                textColor="#F5FAFF"
                lineColor="#7DD3FF"
                baseColor="#0B2A4A"
                intensity={1.15}
                shineSize={10}
                shineFade={40}
                thickness={1.2}
                speed={0.35}
                followMouse
                proximity={250}
                autoAnimate={false}
                onClick={handleContactClick}
              >
                Contact Me
              </SpecularButton>
            </div>
          </div>

          {/* 
            SYNCHRONIZED SCROLL-DRIVEN ZOOM-IN-DOWN STORY OVERLAY
            Applies zoom-in-down animation for all phases on scroll.
            ENGINEER and OPTIMIZE are placed at center. THINK and BUILD are at left.
            Zero text overwriting, buttery smooth on fast or slow scroll, no container sliding.
          */}
          <AnimatePresence mode="wait">
            {showStages && (
              <div
                key={activeStage}
                data-aos="zoom-in-down"
                className={`story-beat beat-${STAGES[activeStage].id}`}
                style={{
                  position: 'absolute',
                  left: STAGES[activeStage].align === 'center' ? '50%' : 'clamp(16px, 3.5vw, 24px)',
                  transform: STAGES[activeStage].align === 'center' ? 'translateX(-50%)' : 'none',
                  maxWidth: STAGES[activeStage].align === 'center' ? '680px' : '640px',
                  width: STAGES[activeStage].align === 'center' ? 'calc(100% - 32px)' : 'calc(100% - clamp(32px, 7vw, 48px))',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: STAGES[activeStage].align === 'center' ? 'center' : 'flex-start',
                  textAlign: STAGES[activeStage].align === 'center' ? 'center' : 'left',
                  pointerEvents: 'auto',
                  zIndex: 10
                }}
              >
                <motion.div
                  initial={{ opacity: 0, y: -70, scale: 0.65 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 25, scale: 0.85, transition: { duration: 0.22, ease: 'easeOut' } }}
                  transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: STAGES[activeStage].align === 'center' ? 'center' : 'flex-start',
                    textAlign: STAGES[activeStage].align === 'center' ? 'center' : 'left',
                  }}
                >
                  {/* 1. Main Heading with Zoom-in-Down */}
                  <motion.h2
                    initial={{ opacity: 0, y: -48, scale: 0.7 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.04 }}
                    className="font-display font-black"
                    style={{
                      fontSize: 'clamp(2.35rem, 6.5vw, 5.5rem)',
                      color: '#F8FAFC',
                      letterSpacing: '-0.04em',
                      lineHeight: 1.05,
                      marginBottom: 'clamp(12px, 2vh, 16px)',
                      textAlign: STAGES[activeStage].align === 'center' ? 'center' : 'left',
                      filter: 'drop-shadow(0 0 10px rgba(248, 250, 252, 0.55)) drop-shadow(0 0 24px rgba(248, 250, 252, 0.3))'
                    }}
                  >
                    {STAGES[activeStage].heading}
                  </motion.h2>

                  {/* 2. Subheading with Zoom-in-Down */}
                  <motion.div
                    initial={{ opacity: 0, y: -34, scale: 0.75 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                    className="story-subtitle font-display font-semibold"
                    style={{
                      fontSize: 'clamp(1rem, 2.2vw, 1.45rem)',
                      marginBottom: 'clamp(12px, 2vh, 16px)',
                      color: '#38bdf8',
                      textAlign: STAGES[activeStage].align === 'center' ? 'center' : 'left'
                    }}
                  >
                    {STAGES[activeStage].subtitle}
                  </motion.div>

                  {/* 3. Description Paragraph with Zoom-in-Down */}
                  <motion.p
                    initial={{ opacity: 0, y: -24, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.16 }}
                    className="story-desc font-body leading-relaxed"
                    style={{
                      fontSize: 'clamp(13.5px, 2.2vw, 15px)',
                      color: 'var(--text-secondary, #94a3b8)',
                      lineHeight: 1.7,
                      maxWidth: '540px',
                      marginBottom: 'clamp(16px, 3vh, 24px)',
                      textAlign: STAGES[activeStage].align === 'center' ? 'center' : 'left'
                    }}
                  >
                    {STAGES[activeStage].description}
                  </motion.p>

                  {/* 4. Stat Box Badge with Zoom-in-Down */}
                  <motion.div
                    initial={{ opacity: 0, y: -18, scale: 0.85 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.22 }}
                    className="glass-panel scroll-reveal-box"
                    style={{
                      padding: 'clamp(8px, 1.8vw, 10px) clamp(12px, 2.5vw, 18px)',
                      borderRadius: '8px',
                      fontFamily: 'var(--font-mono)',
                      fontSize: 'clamp(10.5px, 2.4vw, 12px)',
                      color: '#f8fafc',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: STAGES[activeStage].align === 'center' ? 'center' : 'flex-start',
                      gap: '8px',
                      border: '1px solid rgba(56, 189, 248, 0.3)',
                      backgroundColor: 'rgba(5, 15, 28, 0.7)',
                      backdropFilter: 'blur(12px)',
                      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4), 0 0 15px rgba(56, 189, 248, 0.15)',
                      maxWidth: '100%',
                      flexWrap: 'wrap'
                    }}
                  >
                    <span className="inline-flex items-center shrink-0">
                      {STAGES[activeStage].boxIcon}
                    </span>
                    <span>{STAGES[activeStage].boxText}</span>
                  </motion.div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* 
          Layer 5: Automotive Scrubber Progress Bar (Pinned at Bottom)
        */}
        <div
          className="cinematic-scrubber"
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: '4px',
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
            zIndex: 10
          }}
        >
          <div
            ref={progressFillEl}
            style={{
              height: '100%',
              width: '0%',
              backgroundColor: '#38bdf8',
              boxShadow: '0 0 12px #38bdf8',
              transition: 'width 0.05s linear'
            }}
          />
        </div>
      </div>
    </section>
  );
};
