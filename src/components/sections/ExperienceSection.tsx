import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '../../animation/gsapConfig';
import { Calendar } from 'lucide-react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface ExperienceEntry {
  role: string;
  company: string;
  duration: string;
  description: string[];
  stack: string[];
  isFuture?: boolean;
}

export const ExperienceSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const lineProgressRef = useRef<HTMLDivElement>(null);
  const node1RingRef = useRef<HTMLDivElement>(null);
  const node1FillRef = useRef<HTMLDivElement>(null);
  const node2RingRef = useRef<HTMLDivElement>(null);
  const node2FillRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // The two authentic experience cards requested by the user
  const experiences: ExperienceEntry[] = [
    {
      role: 'B.Tech in Artificial Intelligence & Data Science',
      company: 'Sri Sairam Engineering College',
      duration: '2024 — Present',
      description: [
        'Specializing in deep learning architectures, computer vision pipelines, and intelligent automated systems.',
        'Actively competing in competitive programming contests across LeetCode, SkillRack, and CodeChef.',
        'Architecting real-world autonomous systems including AI Traffic Signal and Vision AI Tools.'
      ],
      stack: ['Python', 'OpenCV', 'PyTorch', 'Java', 'React', 'TypeScript', 'Node.js']
    },
    {
      role: 'Coming Soon',
      company: 'Future opportunity',
      duration: 'Stay tuned',
      description: [
        'Actively seeking software engineering, machine learning, and AI developer internship and full-time opportunities.'
      ],
      stack: ['AI / ML Systems', 'Full Stack Development', 'Computer Vision'],
      isFuture: true
    }
  ];

  // GSAP ScrollTrigger: Header entrance, animated concentric circles fill, and smooth downward blue line scrub
  useGSAP(() => {
    if (!sectionRef.current) return;

    // 1. Header Entrance
    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            once: true
          }
        }
      );
    }

    // 2. Synchronized Timeline Scrub: Both concentric circles fill & blue line moves DOWN smoothly on scroll
    // Starts strictly when Experience locks at top: 0, spanning 90vh with scrub: 0.6 for buttery smoothness
    if (!prefersReducedMotion) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=50vh',
          scrub: 0.5
        }
      });

      // Step A: Node 1 fills with vibrant solid blue as user scrolls down (0 -> 0.15)
      if (node1FillRef.current) {
        tl.fromTo(
          node1FillRef.current,
          { scale: 0 },
          { scale: 1, duration: 0.15, ease: 'power1.out' },
          0
        );
      }
      if (node1RingRef.current) {
        tl.to(
          node1RingRef.current,
          {
            borderColor: '#0084ff',
            boxShadow: '0 0 20px rgba(0, 132, 255, 0.85), 0 0 35px rgba(0, 132, 255, 0.4)',
            duration: 0.15
          },
          0
        );
      }

      // Step B: Glowing blue line travels DOWN smoothly from Node 1 to Node 2 (0.1 -> 0.85)
      if (lineProgressRef.current) {
        tl.fromTo(
          lineProgressRef.current,
          { scaleY: 0 },
          { scaleY: 1, duration: 0.75, ease: 'none' },
          0.1
        );
      }

      // Step C: When the blue line arrives at Node 2, Node 2 fills with vibrant solid blue (0.8 -> 1.0)
      if (node2FillRef.current) {
        tl.fromTo(
          node2FillRef.current,
          { scale: 0 },
          { scale: 1, duration: 0.2, ease: 'power1.out' },
          0.8
        );
      }

      // Step D: Node 2 outer ring elevates with glowing neon bloom
      if (node2RingRef.current) {
        tl.to(
          node2RingRef.current,
          {
            borderColor: '#0084ff',
            boxShadow: '0 0 20px rgba(0, 132, 255, 0.85), 0 0 35px rgba(0, 132, 255, 0.4)',
            duration: 0.2
          },
          0.8
        );
      }
    }

    // 3. Staggered Experience Cards Entrance
    if (cardsContainerRef.current) {
      gsap.fromTo(
        cardsContainerRef.current.children,
        { opacity: 0, y: 30, x: -10 },
        {
          opacity: 1,
          y: 0,
          x: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            once: true
          }
        }
      );
    }
  }, { scope: sectionRef });

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="experience-section sticky top-0 min-h-screen h-auto md:h-screen w-full rounded-t-[36px] sm:rounded-t-[48px] border-t border-sky-400/40 overflow-hidden flex flex-col justify-center py-8 sm:py-12"
      style={{
        backgroundColor: '#020611',
        zIndex: 20
      }}
    >
      {/* Stacking Card Top Glowing Blue Edge (Prominent Horizon Line) */}
      <div
        className="pointer-events-none"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: 'linear-gradient(90deg, transparent 0%, #38bdf8 15%, #00e5cc 50%, #38bdf8 85%, transparent 100%)',
          boxShadow: '0 0 16px #38bdf8, 0 0 32px rgba(56, 189, 248, 0.8)',
          zIndex: 30
        }}
      />

      {/* Background Layer: Exact match to Skills & About sections */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundColor: '#020611',
          zIndex: 0
        }}
      />

      {/* Subtle ambient cyan radial tint centered */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(56, 189, 248, 0.08) 0%, rgba(2, 6, 17, 0) 55%)',
          zIndex: 0
        }}
      />

      {/* Smooth Scroll Grid Texture - visible with softened shadow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(79, 79, 79, 0.18) 1px, transparent 1px), linear-gradient(to bottom, rgba(79, 79, 79, 0.18) 1px, transparent 1px)',
          backgroundSize: '54px 54px',
          maskImage: 'radial-gradient(circle at 50% 50%, black 0%, rgba(0, 0, 0, 0.9) 35%, rgba(0, 0, 0, 0.4) 55%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(circle at 50% 50%, black 0%, rgba(0, 0, 0, 0.9) 35%, rgba(0, 0, 0, 0.4) 55%, transparent 70%)',
          zIndex: 0
        }}
      />

      {/* Inner circle dark shadow vignette - softened dark shadow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, transparent 35%, rgba(2, 6, 17, 0.45) 60%, #020611 85%)',
          zIndex: 0
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1, maxWidth: '960px', margin: '0 auto', padding: '0 20px' }}>
        {/* Stacking Card Top Handle */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-1.5 rounded-full bg-sky-400/40 shadow-[0_0_12px_rgba(56,189,248,0.6)]" />
        </div>

        {/* Section Header */}
        <div ref={headerRef} style={{ textAlign: 'center', marginBottom: '28px' }}>
          <h2
            className="font-display"
            style={{
              fontSize: 'clamp(2rem, 4.2vw, 3rem)',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              color: '#f8fafc',
              marginBottom: '4px'
            }}
          >
            My <span className="text-gradient-blue">Experience</span>
          </h2>
          <p
            style={{
              color: 'var(--text-secondary)',
              fontSize: '14px',
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: 1.5
            }}
          >
            Academic grounding in AI &amp; Data Science alongside proactive software engineering, system architecture, and real-world project builds.
          </p>
        </div>

        {/* Timeline Stack Container with 2 Cards and Scrolling Blue Line */}
        <div
          style={{
            maxWidth: '900px',
            margin: '0 auto',
            position: 'relative',
            paddingLeft: '48px'
          }}
        >
          {/* Base timeline dark track line connecting Node 1 to Node 2 */}
          <div
            style={{
              position: 'absolute',
              top: '28px',
              bottom: '28px',
              left: '16px',
              width: '2px',
              transform: 'translateX(-50%)',
              backgroundColor: '#262a33',
              zIndex: 1
            }}
          />

          {/* Animated Glowing Blue Line: Scrubs DOWN smoothly as the user scrolls */}
          <div
            ref={lineProgressRef}
            style={{
              position: 'absolute',
              top: '28px',
              bottom: '28px',
              left: '16px',
              width: '2px',
              transform: 'translateX(-50%)',
              backgroundColor: '#0084ff',
              boxShadow: '0 0 12px rgba(0, 132, 255, 0.85), 0 0 4px #0084ff',
              transformOrigin: 'top center',
              zIndex: 2
            }}
          />

          {/* The 2 Cards */}
          <div
            ref={cardsContainerRef}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '24px'
            }}
          >
            {experiences.map((exp, idx) => (
              <div
                key={idx}
                style={{
                  position: 'relative'
                }}
              >
                {/* Timeline Geometric Node: Exact same concentric format for BOTH Node 1 and Node 2 */}
                <div
                  style={{
                    position: 'absolute',
                    top: '28px',
                    left: '-32px',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 3,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {idx === 0 ? (
                    /* Node 1: Concentric Target Ring (Same format as Node 2) */
                    <div
                      ref={node1RingRef}
                      style={{
                        width: '26px',
                        height: '26px',
                        borderRadius: '50%',
                        backgroundColor: '#020611',
                        border: '1.5px solid rgba(0, 140, 255, 0.45)',
                        boxShadow: '0 0 14px rgba(0, 132, 255, 0.35)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative',
                        transition: 'border-color 0.3s ease, box-shadow 0.3s ease'
                      }}
                    >
                      <div
                        style={{
                          width: '16px',
                          height: '16px',
                          borderRadius: '50%',
                          backgroundColor: '#020611',
                          border: '2px solid #0084ff',
                          boxShadow: '0 0 10px rgba(0, 132, 255, 0.75)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          overflow: 'hidden'
                        }}
                      >
                        <div
                          ref={node1FillRef}
                          style={{
                            width: '100%',
                            height: '100%',
                            borderRadius: '50%',
                            backgroundColor: '#0084ff',
                            boxShadow: '0 0 14px rgba(0, 132, 255, 0.95)',
                            transform: 'scale(0)'
                          }}
                        />
                      </div>
                    </div>
                  ) : (
                    /* Node 2: Concentric Target Ring (Same format as Node 1) */
                    <div
                      ref={node2RingRef}
                      style={{
                        width: '26px',
                        height: '26px',
                        borderRadius: '50%',
                        backgroundColor: '#020611',
                        border: '1.5px solid rgba(0, 140, 255, 0.45)',
                        boxShadow: '0 0 14px rgba(0, 132, 255, 0.35)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative',
                        transition: 'border-color 0.3s ease, box-shadow 0.3s ease'
                      }}
                    >
                      <div
                        style={{
                          width: '16px',
                          height: '16px',
                          borderRadius: '50%',
                          backgroundColor: '#020611',
                          border: '2px solid #0084ff',
                          boxShadow: '0 0 10px rgba(0, 132, 255, 0.75)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          overflow: 'hidden'
                        }}
                      >
                        <div
                          ref={node2FillRef}
                          style={{
                            width: '100%',
                            height: '100%',
                            borderRadius: '50%',
                            backgroundColor: '#0084ff',
                            boxShadow: '0 0 14px rgba(0, 132, 255, 0.95)',
                            transform: 'scale(0)'
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Experience Glass Panel Card */}
                <div
                  className="glass-panel"
                  style={{
                    padding: 'clamp(16px, 3.5vw, 22px) clamp(16px, 4vw, 26px)',
                    borderRadius: '16px',
                    position: 'relative',
                    border: exp.isFuture ? '1px dashed rgba(56, 189, 248, 0.35)' : '1px solid var(--border-subtle)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(56, 189, 248, 0.45)';
                    e.currentTarget.style.boxShadow = '0 12px 30px rgba(0, 0, 0, 0.5), 0 0 20px rgba(56, 189, 248, 0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = exp.isFuture ? '1px dashed rgba(56, 189, 248, 0.35)' : 'var(--border-subtle)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      flexWrap: 'wrap',
                      gap: '10px',
                      marginBottom: '8px'
                    }}
                  >
                    <div>
                      <h3
                        className="font-display"
                        style={{
                          fontSize: '1.25rem',
                          fontWeight: 700,
                          color: '#f8fafc',
                          marginBottom: '2px'
                        }}
                      >
                        {exp.role}
                      </h3>
                      <div
                        style={{
                          fontSize: '14px',
                          color: 'var(--text-secondary)',
                          fontWeight: 500
                        }}
                      >
                        {exp.company}
                      </div>
                    </div>

                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '4px 12px',
                        borderRadius: '9999px',
                        backgroundColor: 'rgba(56, 189, 248, 0.08)',
                        border: '1px solid rgba(56, 189, 248, 0.25)',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '11px'
                      }}
                    >
                      <Calendar size={12} color="#38bdf8" />
                      <span className="text-gradient-blue">{exp.duration}</span>
                    </div>
                  </div>

                  {/* Bullet points */}
                  <ul
                    style={{
                      listStyle: 'none',
                      padding: 0,
                      margin: '10px 0',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '6px'
                    }}
                  >
                    {exp.description.map((item, dIdx) => (
                      <li
                        key={dIdx}
                        style={{
                          fontSize: '14px',
                          color: 'var(--text-secondary)',
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '10px',
                          lineHeight: 1.55
                        }}
                      >
                        <span className="text-gradient-blue" style={{ marginTop: '2px' }}>▹</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tech stack badges */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {exp.stack.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-gradient-blue"
                        style={{
                          padding: '4px 10px',
                          borderRadius: '6px',
                          backgroundColor: 'rgba(255, 255, 255, 0.04)',
                          border: '1px solid rgba(255, 255, 255, 0.08)',
                          fontFamily: 'var(--font-mono)',
                          fontSize: '11px'
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
