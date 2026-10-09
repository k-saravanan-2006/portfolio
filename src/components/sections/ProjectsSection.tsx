import React, { useRef, useState, useCallback } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '../../animation/gsapConfig';
import { MorphSlider, MorphSliderHandle } from '../ui/MorphSlider';
import { MagneticButton } from '../ui/MagneticButton';
import { ChevronLeft, ChevronRight, Github, ShieldCheck } from 'lucide-react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface Project {
  id: string;
  number: string;
  title: string;
  category: string;
  description: string;
  stack: string[];
  image: string;
  githubUrl: string;
  liveUrl?: string;
  isFlagship?: boolean;
}

const PROJECTS: Project[] = [
  {
    id: 'ai-traffic-signal',
    number: '01',
    title: 'AI Traffic Signal Automation',
    category: 'Computer Vision / Autonomous Systems',
    description:
      'Autonomous computer vision system analyzing real-time lane density, distinguishing pedestrians from vehicles, and dynamically optimizing signal cycles with emergency vehicle priority.',
    stack: ['Python', 'OpenCV', 'Deep Learning', 'Flask'],
    image:
      'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    githubUrl: 'https://github.com/k-saravanan-2006',
    isFlagship: true
  },
  {
    id: 'neon-dash',
    number: '02',
    title: 'Neon Dash',
    category: 'Frontend Engineering / Analytics',
    description:
      'A responsive dashboard built with React and Tailwind CSS featuring advanced data tables, virtualized datasets, and interactive charting telemetry.',
    stack: ['React', 'Tailwind CSS', 'Chart.js', 'TypeScript'],
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    githubUrl: 'https://github.com/k-saravanan-2006'
  },
  {
    id: 'aura-ecommerce',
    number: '03',
    title: 'Aura E-Commerce',
    category: 'Full Stack Web / Commerce',
    description:
      'Full-stack e-commerce platform with Node.js backend, Stripe payment gateway orchestration, and complex persistent shopping cart state management.',
    stack: ['Next.js', 'Node.js', 'Stripe', 'MongoDB'],
    image:
      'https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    githubUrl: 'https://github.com/k-saravanan-2006'
  },
  {
    id: 'vision-ai-tools',
    number: '04',
    title: 'Vision AI Tools',
    category: 'Computer Vision / Python',
    description:
      'A suite of modular computer vision tools built in Python utilizing OpenCV for low-latency video stream analysis, landmark tracking, and gesture telemetry.',
    stack: ['Python', 'OpenCV', 'Flask', 'NumPy'],
    image:
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    githubUrl: 'https://github.com/k-saravanan-2006'
  },
  {
    id: 'taskflow',
    number: '05',
    title: 'TaskFlow',
    category: 'Full Stack / Collaboration',
    description:
      'AI-powered collaborative task management system with real-time updates and synchronization using WebSockets, dynamic boards, and intelligent triage.',
    stack: ['React', 'Socket.io', 'MongoDB', 'Node.js'],
    image:
      'https://images.unsplash.com/photo-1611162617474-5b21e879e113?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    githubUrl: 'https://github.com/k-saravanan-2006'
  }
];

const PROJECT_ITEMS = PROJECTS.map((p) => ({
  image: p.image,
  title: p.title,
  category: p.category
}));

export const ProjectsSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<MorphSliderHandle>(null);
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const activeIdxRef = useRef<number>(0);
  const prefersReducedMotion = useReducedMotion();

  // ONE SHARED TRANSITION FUNCTION across Arrows, Scroll, and Dots
  const changeProject = useCallback((nextIdx: number) => {
    const len = PROJECTS.length;
    const target = ((nextIdx % len) + len) % len;
    if (target === activeIdxRef.current) return;
    activeIdxRef.current = target;
    setActiveIdx(target);
    sliderRef.current?.goTo(target);
  }, []);

  const handleNext = useCallback(() => {
    changeProject(activeIdxRef.current + 1);
  }, [changeProject]);

  const handlePrev = useCallback(() => {
    changeProject(activeIdxRef.current - 1);
  }, [changeProject]);

  const handleSelectDot = useCallback(
    (idx: number) => {
      changeProject(idx);
    },
    [changeProject]
  );

  const handleSliderIndexChange = useCallback((newIdx: number) => {
    activeIdxRef.current = newIdx;
    setActiveIdx(newIdx);
  }, []);

  // Natural scroll-driven navigation using GSAP ScrollTrigger
  useGSAP(
    () => {
      if (!containerRef.current || prefersReducedMotion) return;

      const mm = gsap.matchMedia();

      mm.add('(min-width: 900px)', () => {
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          onUpdate: (self) => {
            const p = self.progress;
            const count = PROJECTS.length;
            // Map 0 -> 1 progress into index 0 to 4
            const targetIdx = Math.min(count - 1, Math.max(0, Math.floor(p * count)));
            if (targetIdx !== activeIdxRef.current) {
              changeProject(targetIdx);
            }
          }
        });
      });
    },
    { scope: containerRef, dependencies: [changeProject, prefersReducedMotion] }
  );

  const currentProject = PROJECTS[activeIdx] || PROJECTS[0];

  return (
    <section
      id="projects"
      ref={containerRef}
      style={{
        position: 'relative',
        backgroundColor: '#020611',
        zIndex: 30
      }}
    >
      {/* Background Layer: Clean solid #020611 */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundColor: '#020611',
          zIndex: 0
        }}
      />
      <style>{`
        /* Desktop Pinned Scroll Canvas */
        @media (min-width: 900px) {
          #projects {
            height: 280vh;
          }
          .projects-sticky-viewport {
            position: sticky;
            top: var(--header-height, 60px);
            height: calc(100vh - var(--header-height, 60px));
            display: flex;
            flex-direction: column;
            justifyContent: center;
            padding: 8px 0 12px;
          }
        }
        /* Mobile / Tablet Flowing Section */
        @media (max-width: 899px) {
          #projects {
            height: auto;
            padding: 70px 0 45px;
          }
          .projects-sticky-viewport {
            position: relative;
            top: 0;
            height: auto;
            min-height: auto;
          }
        }

        /* Fluid Mobile & Tablet Scaling Rules */
        @media (max-width: 640px) {
          .project-card-container {
            height: clamp(520px, 78vh, 640px) !important;
            border-radius: 18px !important;
          }
          .project-nav-btn-prev {
            left: 8px !important;
            width: 38px !important;
            height: 38px !important;
          }
          .project-nav-btn-next {
            right: 8px !important;
            width: 38px !important;
            height: 38px !important;
          }
          .project-info-container {
            padding: 16px 14px 16px !important;
          }
          .project-flagship-badge {
            top: 12px !important;
            right: 12px !important;
            font-size: 10px !important;
            padding: 4px 10px !important;
          }
        }

        /* View Repository Button - Transparent Blur Glassmorphism with Theme Cyan Glow */
        .uiverse-glow-btn {
          --glow-color: rgba(32, 207, 255, 0.6);
          --glow-spread-color: rgba(23, 111, 229, 0.35);
          --btn-bg: rgba(7, 20, 38, 0.42);
          border: 1.5px solid rgba(32, 207, 255, 0.45);
          padding: 0.75em 2.2em;
          color: #e2f7ff;
          font-size: 14.5px;
          font-weight: 600;
          font-family: var(--font-display);
          background-color: var(--btn-bg);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border-radius: 9999px;
          outline: none;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.35),
                      0 0 18px rgba(32, 207, 255, 0.22),
                      inset 0 0 14px rgba(32, 207, 255, 0.12);
          text-shadow: 0 0 8px rgba(32, 207, 255, 0.5);
          position: relative;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          text-decoration: none;
          cursor: pointer;
        }

        .uiverse-glow-btn svg {
          color: #20CFFF;
          transition: transform 0.3s ease, color 0.3s ease;
        }

        .uiverse-glow-btn::after {
          pointer-events: none;
          content: "";
          position: absolute;
          top: 110%;
          left: 10%;
          right: 10%;
          height: 60%;
          background-color: var(--glow-spread-color);
          filter: blur(16px);
          opacity: 0.4;
          transform: perspective(1.5em) rotateX(35deg) scale(1, 0.6);
          transition: opacity 0.3s ease;
        }

        .uiverse-glow-btn:hover {
          color: #ffffff;
          background-color: rgba(32, 207, 255, 0.18);
          border-color: rgba(32, 207, 255, 0.85);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          box-shadow: 0 6px 24px rgba(0, 0, 0, 0.45),
                      0 0 26px rgba(32, 207, 255, 0.5),
                      inset 0 0 18px rgba(32, 207, 255, 0.25);
          text-shadow: 0 0 12px rgba(32, 207, 255, 0.8);
          transform: translateY(-2px);
        }

        .uiverse-glow-btn:hover svg {
          color: #ffffff;
          transform: scale(1.08);
        }

        .uiverse-glow-btn:hover::after {
          opacity: 0.65;
        }

        .uiverse-glow-btn:active {
          transform: translateY(0);
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.4),
                      0 0 14px rgba(32, 207, 255, 0.35),
                      inset 0 0 8px rgba(32, 207, 255, 0.2);
        }
      `}</style>

      <div className="projects-sticky-viewport">
        <div
          style={{
            width: '100%',
            maxWidth: '1580px',
            margin: '0 auto',
            padding: '0 20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          {/* 1. "FEATURED PROJECTS" HEADING - STATIC, NO SCROLL/ENTRANCE ANIMATION */}
          <div
            style={{
              textAlign: 'center',
              marginBottom: '10px'
            }}
          >
            <h2
              className="font-display"
              style={{
                fontSize: 'clamp(2rem, 3.4vw, 2.75rem)',
                fontWeight: 800,
                letterSpacing: '-0.02em',
                color: '#f8fafc',
                margin: 0
              }}
            >
              Featured <span className="text-gradient-blue">Projects</span>
            </h2>
          </div>

          {/* 2. SINGLE FULL PROJECT CARD: Completely invisible edge, blending seamlessly into #050607 */}
          <div
            className="project-card-container"
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '1520px',
              height: 'clamp(520px, 75vh, 780px)',
              margin: '0 auto',
              borderRadius: '26px',
              overflow: 'hidden',
              backgroundColor: 'transparent',
              border: 'none',
              outline: 'none',
              boxShadow: 'none',
              maskImage:
                'radial-gradient(ellipse 97% 93% at 50% 50%, black 65%, rgba(0, 0, 0, 0.85) 85%, transparent 100%)',
              WebkitMaskImage:
                'radial-gradient(ellipse 97% 93% at 50% 50%, black 65%, rgba(0, 0, 0, 0.85) 85%, transparent 100%)',
              transition: 'none'
            }}
          >
            {/* Morph Slider WebGL Canvas covering the complete card */}
            <MorphSlider
              ref={sliderRef}
              items={PROJECT_ITEMS}
              startIndex={0}
              transition="melt"
              duration={0.8}
              ease="power2.inOut"
              intensity={0.6}
              scale={2.2}
              aberration={0.2}
              drift={0.15}
              loop={true}
              overlayColor="#020611"
              onIndexChange={handleSliderIndexChange}
            />

            {/* Heavy soft edge blur: Image -> Dark transparent blur -> Page background */}
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                inset: 0,
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                maskImage: 'radial-gradient(ellipse 92% 88% at 50% 50%, transparent 68%, black 96%)',
                WebkitMaskImage: 'radial-gradient(ellipse 92% 88% at 50% 50%, transparent 68%, black 96%)',
                pointerEvents: 'none',
                zIndex: 2
              }}
            />

            {/* Deep dark perimeter fade dissolving seamlessly into #020611 */}
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                inset: 0,
                pointerEvents: 'none',
                zIndex: 3,
                background: `
                  radial-gradient(ellipse 92% 88% at 50% 50%, transparent 62%, rgba(2, 6, 17, 0.4) 80%, rgba(2, 6, 17, 0.92) 94%, #020611 100%),
                  linear-gradient(to bottom, #020611 0%, rgba(2, 6, 17, 0.85) 4%, transparent 14%),
                  linear-gradient(to top, #020611 0%, rgba(2, 6, 17, 0.85) 6%, transparent 16%),
                  linear-gradient(to right, #020611 0%, rgba(2, 6, 17, 0.85) 3%, transparent 10%),
                  linear-gradient(to left, #020611 0%, rgba(2, 6, 17, 0.85) 3%, transparent 10%)
                `
              }}
            />

            {/* Soft transparent dark blurred fade on lower portion so image continues visibly behind text */}
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                inset: 0,
                pointerEvents: 'none',
                zIndex: 4,
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                maskImage: 'linear-gradient(to bottom, transparent 0%, transparent 48%, black 82%)',
                WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, transparent 48%, black 82%)',
                background:
                  'linear-gradient(to bottom, transparent 0%, transparent 42%, rgba(2, 6, 17, 0.35) 62%, rgba(2, 6, 17, 0.75) 82%, rgba(2, 6, 17, 0.92) 100%)'
              }}
            />

            {/* Flagship Architecture Badge in top-right */}
            {currentProject.isFlagship && (
              <div
                className="project-flagship-badge"
                style={{
                  position: 'absolute',
                  top: '20px',
                  right: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 14px',
                  borderRadius: '9999px',
                  backgroundColor: 'rgba(7, 20, 38, 0.42)',
                  border: '1.5px solid rgba(32, 207, 255, 0.45)',
                  boxShadow:
                    '0 4px 16px rgba(0, 0, 0, 0.35), 0 0 16px rgba(32, 207, 255, 0.22), inset 0 0 12px rgba(32, 207, 255, 0.1)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  fontWeight: 600,
                  backdropFilter: 'blur(14px)',
                  WebkitBackdropFilter: 'blur(14px)',
                  zIndex: 10
                }}
              >
                <ShieldCheck size={14} color="#20CFFF" />
                <span className="text-gradient-blue">FLAGSHIP ARCHITECTURE</span>
              </div>
            )}

            {/* Left Navigation Arrow - vertically centered on the image card */}
            <button
              onClick={handlePrev}
              aria-label="Previous project"
              className="project-nav-btn-prev"
              style={{
                position: 'absolute',
                left: '24px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                backgroundColor: 'rgba(5, 15, 30, 0.75)',
                border: '1px solid rgba(32, 207, 255, 0.35)',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.6)',
                backdropFilter: 'blur(12px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#20CFFF',
                cursor: 'pointer',
                zIndex: 10,
                transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(23, 111, 229, 0.35)';
                e.currentTarget.style.borderColor = '#20CFFF';
                e.currentTarget.style.boxShadow = '0 0 22px rgba(32, 207, 255, 0.7)';
                e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(5, 15, 30, 0.75)';
                e.currentTarget.style.borderColor = 'rgba(32, 207, 255, 0.35)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.6)';
                e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
              }}
            >
              <ChevronLeft size={24} color="#20CFFF" />
            </button>

            {/* Right Navigation Arrow - vertically centered on the image card */}
            <button
              onClick={handleNext}
              aria-label="Next project"
              className="project-nav-btn-next"
              style={{
                position: 'absolute',
                right: '24px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                backgroundColor: 'rgba(5, 15, 30, 0.75)',
                border: '1px solid rgba(32, 207, 255, 0.35)',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.6)',
                backdropFilter: 'blur(12px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#20CFFF',
                cursor: 'pointer',
                zIndex: 10,
                transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(23, 111, 229, 0.35)';
                e.currentTarget.style.borderColor = '#20CFFF';
                e.currentTarget.style.boxShadow = '0 0 22px rgba(32, 207, 255, 0.7)';
                e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(5, 15, 30, 0.75)';
                e.currentTarget.style.borderColor = 'rgba(32, 207, 255, 0.35)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.6)';
                e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
              }}
            >
              <ChevronRight size={24} color="#20CFFF" />
            </button>

            {/* PROJECT INFORMATION LAYERED ON TOP OF THE IMAGE NEAR LOWER PORTION */}
            <div
              className="project-info-container"
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 10,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                padding: '24px 24px 20px',
                background: 'transparent'
              }}
            >
              {/* Category */}
              <div
                className="text-gradient-blue"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  letterSpacing: '0.12em',
                  fontWeight: 600,
                  marginBottom: '6px',
                  textTransform: 'uppercase',
                  textShadow: '0 2px 10px rgba(0, 0, 0, 0.9), 0 0 15px rgba(32, 207, 255, 0.5)'
                }}
              >
                {currentProject.category}
              </div>

              {/* Project Title (Visual Focal Point with high contrast and subtle shadow) */}
              <h3
                className="font-display"
                style={{
                  fontSize: 'clamp(1.5rem, 3.4vw, 2.5rem)',
                  fontWeight: 800,
                  color: '#ffffff',
                  margin: '0 0 8px 0',
                  lineHeight: 1.15,
                  textShadow:
                    '0 2px 16px rgba(0, 0, 0, 0.95), 0 0 30px rgba(0, 0, 0, 0.85), 0 0 10px rgba(0, 0, 0, 0.9)'
                }}
              >
                {currentProject.title}
              </h3>

              {/* Description */}
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'clamp(12.5px, 2.2vw, 14.5px)',
                  color: 'rgba(248, 250, 252, 0.9)',
                  lineHeight: 1.6,
                  margin: '0 auto 12px',
                  maxWidth: '740px',
                  textShadow: '0 1px 10px rgba(0, 0, 0, 0.9)'
                }}
              >
                {currentProject.description}
              </p>

              {/* Technology Tags */}
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                  gap: '8px',
                  marginBottom: '14px'
                }}
              >
                {currentProject.stack.map((item, sIdx) => (
                  <span
                    key={sIdx}
                    style={{
                      padding: '4px 12px',
                      borderRadius: '8px',
                      backgroundColor: 'transparent',
                      border: '1px solid rgba(32, 207, 255, 0.45)',
                      color: '#20CFFF',
                      fontFamily: 'var(--font-mono)',
                      fontSize: 'clamp(10.5px, 2vw, 12px)',
                      fontWeight: 600,
                      boxShadow: '0 0 12px rgba(32, 207, 255, 0.15)',
                      textShadow: '0 0 8px rgba(32, 207, 255, 0.5)',
                      transition: 'all 0.25s ease'
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>

              {/* View Repository Button (Centered) - Uiverse.io Glow Button */}
              <div>
                <a
                  href={currentProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="uiverse-glow-btn"
                >
                  <Github size={16} />
                  <span>View Repository</span>
                  <ChevronRight size={15} />
                </a>
              </div>
            </div>
          </div>

          {/* 3. PROJECT INDICATOR DOTS - BELOW THE CARD */}
          <div
            style={{
              marginTop: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px'
            }}
          >
            {PROJECTS.map((_, idx) => {
              const isActive = idx === activeIdx;
              return (
                <button
                  key={idx}
                  onClick={() => handleSelectDot(idx)}
                  aria-label={`Go to project ${idx + 1}`}
                  style={{
                    width: isActive ? '32px' : '10px',
                    height: '10px',
                    borderRadius: '9999px',
                    backgroundColor: isActive ? '#20CFFF' : 'rgba(255, 255, 255, 0.22)',
                    border: 'none',
                    padding: 0,
                    cursor: 'pointer',
                    boxShadow: isActive
                      ? '0 0 14px #20CFFF, 0 0 26px rgba(32, 207, 255, 0.85)'
                      : 'none',
                    transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
