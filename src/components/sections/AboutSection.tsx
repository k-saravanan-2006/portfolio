import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '../../animation/gsapConfig';
import { useMotionValue, useTransform } from 'framer-motion';
import { TextGradientScroll } from '../ui/text-gradient-scroll';
import { GraduationCap, Award, CheckCircle2, Code2 } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyViewportRef = useRef<HTMLDivElement>(null);
  const portalRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  // Progressive scroll-driven text gradient illumination motion values
  const textScrollProgress = useMotionValue(0);
  const p1Progress = useTransform(textScrollProgress, [0, 0.35], [0, 1]);
  const p2Progress = useTransform(textScrollProgress, [0.32, 0.68], [0, 1]);
  const p3Progress = useTransform(textScrollProgress, [0.65, 0.95], [0, 1]);

  const stats = [
    {
      value: '3000+',
      label: 'Problems Solved Across All Platforms',
      icon: <Code2 size={22} color="#38bdf8" />
    },
    {
      value: '10+',
      label: 'Projects Completed',
      icon: <CheckCircle2 size={22} color="#38bdf8" />
    },
    {
      value: '8.63',
      label: 'College CGPA',
      icon: <Award size={22} color="#38bdf8" />
    }
  ];

  useGSAP(() => {
    if (!sectionRef.current || !stickyViewportRef.current) return;

    const mm = gsap.matchMedia();

    // Desktop & Tablet Animation Sequence
    mm.add('(min-width: 768px)', () => {
      const initialR = 170;
      const maxR = Math.ceil(Math.hypot(window.innerWidth || 1920, window.innerHeight || 1080) * 0.75);
      const portalState = { r: initialR, opacity: 1 };

      // Ensure exact initial alignment
      if (portalRef.current) {
        portalRef.current.style.clipPath = `circle(${initialR}px at 50% 50%)`;
        (portalRef.current.style as any).webkitClipPath = `circle(${initialR}px at 50% 50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.width = `${initialR * 2}px`;
        ringRef.current.style.height = `${initialR * 2}px`;
        ringRef.current.style.opacity = '1';
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom-=100vh bottom',
          scrub: 0.8,
          invalidateOnRefresh: true
        }
      });

      // 1. Circle Portal & Ring expand together in 100% lockstep
      tl.to(
        portalState,
        {
          r: maxR,
          opacity: 0,
          ease: 'power2.inOut',
          duration: 0.35,
          onUpdate: () => {
            const curR = portalState.r;
            if (portalRef.current) {
              portalRef.current.style.clipPath = `circle(${curR}px at 50% 50%)`;
              (portalRef.current.style as any).webkitClipPath = `circle(${curR}px at 50% 50%)`;
            }
            if (ringRef.current) {
              const d = Math.round(curR * 2);
              ringRef.current.style.width = `${d}px`;
              ringRef.current.style.height = `${d}px`;
              ringRef.current.style.opacity = `${portalState.opacity}`;
            }
          }
        },
        0
      );

      // 2. Header starts in center, then smoothly travels to the top as shown in older design
      tl.fromTo(
        headerRef.current,
        { y: '24vh', scale: 1.08 },
        { y: '0vh', scale: 1, ease: 'power2.out', duration: 0.25 },
        0.20
      );

      // 3. Narrative & Stats slide in from both corners to their resting places
      tl.fromTo(
        leftColRef.current,
        { x: -160, opacity: 0 },
        { x: 0, opacity: 1, ease: 'power3.out', duration: 0.25 },
        0.35
      );

      tl.fromTo(
        rightColRef.current,
        { x: 160, opacity: 0 },
        { x: 0, opacity: 1, ease: 'power3.out', duration: 0.25 },
        0.35
      );

      // 4. Text Gradient Scroll - slowed down for comfortable, cinematic reading
      const progressTracker = { p: 0 };
      tl.to(
        progressTracker,
        {
          p: 1,
          ease: 'none',
          duration: 0.95,
          onUpdate: () => {
            textScrollProgress.set(progressTracker.p);
          }
        },
        0.60
      );

      // 5. Extended Reading Hold - gives ample tranquil time to see the paragraphs fully illuminated
      tl.to({}, { duration: 0.50 });
    });

    // Mobile Animation Sequence
    mm.add('(max-width: 767px)', () => {
      const initialR = 130;
      const maxR = Math.ceil(Math.hypot(window.innerWidth || 375, window.innerHeight || 812) * 0.75);
      const portalState = { r: initialR, opacity: 1 };

      // Ensure exact initial alignment for mobile
      if (portalRef.current) {
        portalRef.current.style.clipPath = `circle(${initialR}px at 50% 50%)`;
        (portalRef.current.style as any).webkitClipPath = `circle(${initialR}px at 50% 50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.width = `${initialR * 2}px`;
        ringRef.current.style.height = `${initialR * 2}px`;
        ringRef.current.style.opacity = '1';
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom-=100vh bottom',
          scrub: 0.8,
          invalidateOnRefresh: true
        }
      });

      // 1. Circle Portal & Ring expand together in 100% lockstep
      tl.to(
        portalState,
        {
          r: maxR,
          opacity: 0,
          ease: 'power2.inOut',
          duration: 0.35,
          onUpdate: () => {
            const curR = portalState.r;
            if (portalRef.current) {
              portalRef.current.style.clipPath = `circle(${curR}px at 50% 50%)`;
              (portalRef.current.style as any).webkitClipPath = `circle(${curR}px at 50% 50%)`;
            }
            if (ringRef.current) {
              const d = Math.round(curR * 2);
              ringRef.current.style.width = `${d}px`;
              ringRef.current.style.height = `${d}px`;
              ringRef.current.style.opacity = `${portalState.opacity}`;
            }
          }
        },
        0
      );

      tl.fromTo(
        headerRef.current,
        { y: '18vh', scale: 1.04 },
        { y: '0vh', scale: 1, ease: 'power2.out', duration: 0.25 },
        0.20
      );

      tl.fromTo(
        leftColRef.current,
        { x: -70, opacity: 0 },
        { x: 0, opacity: 1, ease: 'power3.out', duration: 0.25 },
        0.35
      );

      tl.fromTo(
        rightColRef.current,
        { x: 70, opacity: 0 },
        { x: 0, opacity: 1, ease: 'power3.out', duration: 0.25 },
        0.35
      );

      // 4. Text Gradient Scroll - slowed down for comfortable, cinematic reading
      const progressTracker = { p: 0 };
      tl.to(
        progressTracker,
        {
          p: 1,
          ease: 'none',
          duration: 0.95,
          onUpdate: () => {
            textScrollProgress.set(progressTracker.p);
          }
        },
        0.60
      );

      // 5. Extended Reading Hold - gives ample tranquil time to see the paragraphs fully illuminated
      tl.to({}, { duration: 0.50 });
    });
  }, { scope: sectionRef });

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative z-10 w-full"
      style={{
        height: '560vh',
        backgroundColor: '#020611'
      }}
    >
      {/* Pinned Sticky Viewport */}
      <div
        ref={stickyViewportRef}
        className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center items-center bg-[#020611]"
      >
        {/* Base #020611 background - exact match to Experience section */}
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundColor: '#020611', zIndex: 0 }} />

        {/* Subtle ambient cyan radial tint centered */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(56, 189, 248, 0.08) 0%, rgba(2, 6, 17, 0) 55%)',
          zIndex: 0
        }} />

        {/* Smooth Scroll Grid Texture - visible with softened shadow */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: 'linear-gradient(to right, rgba(79, 79, 79, 0.18) 1px, transparent 1px), linear-gradient(to bottom, rgba(79, 79, 79, 0.18) 1px, transparent 1px)',
          backgroundSize: '54px 54px',
          maskImage: 'radial-gradient(circle at 50% 50%, black 0%, rgba(0, 0, 0, 0.9) 35%, rgba(0, 0, 0, 0.4) 55%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(circle at 50% 50%, black 0%, rgba(0, 0, 0, 0.9) 35%, rgba(0, 0, 0, 0.4) 55%, transparent 70%)',
          zIndex: 0
        }} />

        {/* Inner circle dark shadow vignette - softened dark shadow */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(circle at 50% 50%, transparent 35%, rgba(2, 6, 17, 0.45) 60%, #020611 85%)',
          zIndex: 0
        }} />

        {/* Expanding Circle Portal Layer: reveals /assets/AI.png to full screen */}
        <div
          ref={portalRef}
          aria-hidden="true"
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{
            clipPath: 'circle(170px at 50% 50%)',
            WebkitClipPath: 'circle(170px at 50% 50%)',
            willChange: 'clip-path'
          }}
        >
          {/* Authentic Cybernetic AI Head Image */}
          <div
            className="w-full h-full"
            style={{
              backgroundImage: 'url(/assets/AI.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          />

          {/* Readability Overlay Layer */}
          <div
            className="absolute inset-0"
            style={{
              background: `
                linear-gradient(180deg, rgba(2, 6, 17, 0.65) 0%, rgba(2, 6, 17, 0.32) 50%, rgba(2, 6, 17, 0.8) 100%),
                radial-gradient(circle at 65% 50%, rgba(2, 6, 17, 0.15) 0%, rgba(2, 6, 17, 0.68) 100%)
              `
            }}
          />
        </div>

        {/* Glowing Portal Ring at Initial State */}
        <div
          ref={ringRef}
          aria-hidden="true"
          className="absolute rounded-full pointer-events-none z-10"
          style={{
            width: '340px',
            height: '340px',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            border: '2px solid rgba(56, 189, 248, 0.75)',
            boxShadow: '0 0 50px rgba(56, 189, 248, 0.45), inset 0 0 35px rgba(56, 189, 248, 0.25)',
            willChange: 'width, height, opacity'
          }}
        />

        {/* Interactive Content Container */}
        <div className="relative z-20 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-2 sm:py-6 flex flex-col justify-center">
          {/* Centered at first → Travels to top on scroll */}
          <div
            ref={headerRef}
            className="text-center will-change-transform z-30 mb-4 sm:mb-6 lg:mb-8"
          >
            <h2
              className="font-display font-black tracking-tight text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]"
              style={{
                fontSize: 'clamp(2rem, 5vw, 3.8rem)',
                letterSpacing: '-0.02em',
                lineHeight: 1.1
              }}
            >
              Who I <span className="text-gradient-blue">Am.</span>
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-slate-300 max-w-2xl mx-auto mt-2 leading-relaxed font-normal drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
              Engineering intelligent systems with algorithmic precision and production-grade software craft.
            </p>
          </div>

          {/* 2-Column Content Grid: Slides in from left & right corners */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-8 lg:gap-12 items-center w-full">
            {/* Left Column: Narrative paragraphs & education badge */}
            <div
              ref={leftColRef}
              className="flex flex-col gap-3 sm:gap-4 will-change-transform"
            >
              <TextGradientScroll
                text="I am an AI and Software Developer specializing in machine learning, computer vision, and intelligent automation systems. I have built practical, production-focused solutions such as stock prediction engines, real-time vision pipelines, and AI-powered collaboration bots."
                progress={p1Progress}
                type="letter"
                textOpacity="soft"
                className="text-[13.5px] sm:text-[15px] leading-[1.65] sm:leading-[1.75] font-body text-slate-100"
              />

              <TextGradientScroll
                text="My expertise spans Python, OpenCV, Flask, AWS, and modern JavaScript frameworks, enabling me to work across the full stack—from model development and API integration to frontend implementation and deployment. I enjoy creating scalable, user-centric applications that solve real-world problems."
                progress={p2Progress}
                type="letter"
                textOpacity="soft"
                className="text-[13px] sm:text-[14.5px] leading-[1.6] sm:leading-[1.7] font-body text-slate-200"
              />

              <TextGradientScroll
                text="I actively compete on LeetCode, CodeForces, and CodeChef while developing real-world projects. My approach combines algorithmic thinking with modern web technologies to create impactful digital solutions."
                progress={p3Progress}
                type="letter"
                textOpacity="soft"
                className="text-[13px] sm:text-[14.5px] leading-[1.6] sm:leading-[1.7] font-body text-slate-200"
              />

              {/* Institutional badge */}
              <div
                className="glass-panel"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  padding: 'clamp(10px, 2vw, 14px) clamp(14px, 3vw, 20px)',
                  borderRadius: '14px',
                  marginTop: '4px',
                  border: '1px solid rgba(56, 189, 248, 0.25)',
                  backgroundColor: 'rgba(7, 20, 38, 0.55)',
                  backdropFilter: 'blur(16px)'
                }}
              >
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    backgroundColor: 'rgba(56, 189, 248, 0.1)',
                    border: '1px solid rgba(56, 189, 248, 0.25)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <GraduationCap size={22} color="#38bdf8" />
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '14px', color: '#f8fafc' }}>
                    Sri Sairam Engineering College
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11.5px', color: 'var(--text-secondary)' }}>
                    B.Tech Artificial Intelligence &amp; Data Science
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: 3 Stat Cards from attached image */}
            <div
              ref={rightColRef}
              className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-3 sm:gap-4 lg:gap-5 will-change-transform"
            >
              {stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="glass-panel"
                  style={{
                    padding: 'clamp(12px, 2.5vw, 20px) clamp(14px, 3vw, 26px)',
                    borderRadius: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'clamp(12px, 2.5vw, 20px)',
                    backgroundColor: 'rgba(7, 20, 38, 0.6)',
                    backdropFilter: 'blur(16px)',
                    border: '1px solid rgba(56, 189, 248, 0.22)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-3px)';
                    e.currentTarget.style.borderColor = 'rgba(56, 189, 248, 0.45)';
                    e.currentTarget.style.boxShadow =
                      '0 12px 32px rgba(0, 0, 0, 0.55), 0 0 24px rgba(56, 189, 248, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.borderColor = 'rgba(56, 189, 248, 0.22)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div
                    style={{
                      width: 'clamp(42px, 5vw, 54px)',
                      height: 'clamp(42px, 5vw, 54px)',
                      borderRadius: '12px',
                      backgroundColor: 'rgba(56, 189, 248, 0.1)',
                      border: '1px solid rgba(56, 189, 248, 0.28)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}
                  >
                    {stat.icon}
                  </div>

                  <div>
                    <div
                      className="font-display"
                      style={{
                        fontSize: 'clamp(1.5rem, 3vw, 2.4rem)',
                        fontWeight: 800,
                        color: '#f8fafc',
                        lineHeight: 1.1,
                        marginBottom: '3px'
                      }}
                    >
                      {stat.value}
                    </div>
                    <div
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 'clamp(11px, 2vw, 12.5px)',
                        color: 'var(--text-secondary)',
                        letterSpacing: '0.02em'
                      }}
                    >
                      {stat.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
