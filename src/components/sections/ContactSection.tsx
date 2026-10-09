import React, { useState, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '../../animation/gsapConfig';
import { Mail, Github, Linkedin, CheckCircle2, AlertCircle } from 'lucide-react';
import { AnimatedInput } from '../ui/AnimatedInput';
import { AnimatedContactButton } from '../ui/AnimatedContactButton';
import Velaris from '../ui/velaris';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [btnState, setBtnState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const formColRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current || !cardRef.current) return;

    // Check prefers-reduced-motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      gsap.set(cardRef.current, { rotation: 0 });
      return;
    }

    const mm = gsap.matchMedia();

    // Desktop: 30deg story-scroll card rotation pivoting over the fixed About section
    mm.add('(min-width: 768px)', () => {
      gsap.set(cardRef.current, {
        rotation: 30,
        transformOrigin: 'bottom left',
        willChange: 'transform'
      });

      gsap.to(cardRef.current, {
        rotation: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'top top',
          scrub: true,
          invalidateOnRefresh: true
        }
      });
    });

    // Mobile: 20deg smooth card story-scroll rotation
    mm.add('(max-width: 767px)', () => {
      gsap.set(cardRef.current, {
        rotation: 20,
        transformOrigin: 'bottom left',
        willChange: 'transform'
      });

      gsap.to(cardRef.current, {
        rotation: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'top top',
          scrub: true,
          invalidateOnRefresh: true
        }
      });
    });

    if (leftColRef.current) {
      gsap.fromTo(
        leftColRef.current,
        { opacity: 0, x: -35 },
        {
          opacity: 1,
          x: 0,
          duration: 0.85,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            once: true
          }
        }
      );
    }

    if (formColRef.current) {
      gsap.fromTo(
        formColRef.current,
        { opacity: 0, x: 35, scale: 0.98 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.85,
          delay: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            once: true
          }
        }
      );
    }
  }, { scope: sectionRef });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setBtnState('sending');

    try {
      const response = await fetch('https://formsubmit.co/ajax/saravanankumar8285@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: `Portfolio Contact from ${formData.name}`
        })
      });

      if (response.ok) {
        setBtnState('sent');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setBtnState('idle'), 4000);
      } else {
        setBtnState('error');
        setTimeout(() => setBtnState('idle'), 4000);
      }
    } catch {
      setBtnState('error');
      setTimeout(() => setBtnState('idle'), 4000);
    }
  };

  return (
    <section
      id="contact"
      data-flow-section
      ref={sectionRef}
      className="relative w-full min-h-screen overflow-hidden -mt-[100vh]"
      style={{
        position: 'relative',
        zIndex: 20,
        marginTop: '-100vh',
        overflow: 'hidden',
        backgroundColor: 'transparent'
      }}
    >
      {/* WHOLE CONTACT SECTION CARD: Contains Velaris WebGL background, borders, glowing accent and content */}
      <div
        ref={cardRef}
        data-flow-inner
        className="flow-art-container relative w-full min-h-screen min-h-[100dvh] overflow-hidden flex flex-col justify-center will-change-transform rounded-t-[32px] sm:rounded-t-[48px] border-t border-sky-400/30 bg-[#000611]"
        style={{
          transformOrigin: 'bottom left',
          padding: 'clamp(115px, 15vh, 160px) 0 clamp(60px, 8vh, 90px)'
        }}
      >
        {/* Velaris WebGL & Atmospheric Shader Background inside the card */}
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 0,
            pointerEvents: 'none'
          }}
        >
          <Velaris
            bg="#000611"
            colors={[
              "#003060",
              "#006BFF",
              "#00CFFF",
              "#382070"
            ]}
            speed={1.15}
            grain={0.16}
            height="100%"
            className="h-full w-full pointer-events-none"
          />

          {/* Subtle dark overlay for optimal text contrast and soft atmospheric energy */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 1,
              pointerEvents: 'none',
              background: 'radial-gradient(ellipse at center, rgba(0, 6, 17, 0.25) 0%, rgba(0, 6, 17, 0.7) 100%)'
            }}
          />
        </div>

        {/* Card subtle top glow accent indicator */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-[2px] bg-gradient-to-r from-transparent via-sky-400 to-transparent opacity-90 pointer-events-none z-10"
        />

        {/* Complete Contact Content inside the card */}
        <div
          className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8"
          style={{
            position: 'relative',
            zIndex: 10,
            paddingTop: 'clamp(16px, 3vh, 32px)'
          }}
        >
          {/* 2-Column Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 290px), 1fr))',
              gap: 'clamp(28px, 5vw, 50px)',
              alignItems: 'center',
              maxWidth: '1200px',
              margin: '0 auto'
            }}
          >
          {/* Left Column: Heading, Subtitle & Social Links */}
          <div ref={leftColRef}>

            {/* Matches old portfolio heading */}
            <h2
              className="font-display"
              style={{
                fontSize: 'clamp(2.1rem, 5vw, 4rem)',
                fontWeight: 900,
                lineHeight: 1.1,
                letterSpacing: '-0.03em',
                marginBottom: '20px',
                color: '#f8fafc'
              }}
            >
              Let's build something <br />
              <span className="text-gradient-blue">
                extraordinary.
              </span>
            </h2>

            {/* Matches old portfolio description */}
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '16px',
                color: 'var(--text-secondary)',
                lineHeight: 1.6,
                maxWidth: '500px',
                marginBottom: '36px'
              }}
            >
              Available for freelance opportunities and exciting projects.
            </p>

            {/* Social round buttons from old portfolio */}
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <a
                href="https://github.com/k-saravanan-2006"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#f8fafc',
                  transition: 'all 0.3s ease',
                  textDecoration: 'none'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(56, 189, 248, 0.15)';
                  e.currentTarget.style.borderColor = '#38bdf8';
                  e.currentTarget.style.boxShadow = '0 0 15px rgba(56, 189, 248, 0.4)';
                  e.currentTarget.style.transform = 'translateY(-3px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.04)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <Github size={20} />
              </a>

              <a
                href="https://www.linkedin.com/in/k-saravanan-14b03132a/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#f8fafc',
                  transition: 'all 0.3s ease',
                  textDecoration: 'none'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(56, 189, 248, 0.15)';
                  e.currentTarget.style.borderColor = '#38bdf8';
                  e.currentTarget.style.boxShadow = '0 0 15px rgba(56, 189, 248, 0.4)';
                  e.currentTarget.style.transform = 'translateY(-3px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.04)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <Linkedin size={20} />
              </a>

              <a
                href="mailto:saravanankumar8285@gmail.com"
                aria-label="Direct Email"
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#f8fafc',
                  transition: 'all 0.3s ease',
                  textDecoration: 'none'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(56, 189, 248, 0.15)';
                  e.currentTarget.style.borderColor = '#38bdf8';
                  e.currentTarget.style.boxShadow = '0 0 15px rgba(56, 189, 248, 0.4)';
                  e.currentTarget.style.transform = 'translateY(-3px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.04)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <Mail size={20} />
              </a>
            </div>

            <div style={{ marginTop: '24px' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--text-muted)' }}>
                Direct Email: <a href="mailto:saravanankumar8285@gmail.com" className="text-gradient-blue" style={{ textDecoration: 'none' }}>saravanankumar8285@gmail.com</a>
              </span>
            </div>
          </div>

          {/* Right Column: Complete Interactive Contact Form */}
          <div
            ref={formColRef}
            className="glass-panel"
            style={{
              padding: 'clamp(20px, 4vw, 40px)',
              borderRadius: '24px',
              position: 'relative',
              marginTop: 'clamp(16px, 3.5vh, 40px)'
            }}
          >
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div>
                <label
                  className="text-gradient-blue"
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    letterSpacing: '0.08em',
                    marginBottom: '8px'
                  }}
                >
                  NAME
                </label>
                <AnimatedInput
                  type="text"
                  name="name"
                  required
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div>
                <label
                  className="text-gradient-blue"
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    letterSpacing: '0.08em',
                    marginBottom: '8px'
                  }}
                >
                  EMAIL
                </label>
                <AnimatedInput
                  type="email"
                  name="email"
                  required
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div>
                <label
                  className="text-gradient-blue"
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    letterSpacing: '0.08em',
                    marginBottom: '8px'
                  }}
                >
                  MESSAGE
                </label>
                <AnimatedInput
                  as="textarea"
                  name="message"
                  rows={4}
                  required
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>

              {btnState === 'error' && (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: '#f87171',
                    fontSize: '13px'
                  }}
                >
                  <AlertCircle size={16} />
                  <span>Failed to send message. Please contact directly via email.</span>
                </div>
              )}

              {btnState === 'sent' && (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: '#00E5FF',
                    fontSize: '13px',
                    justifyContent: 'center'
                  }}
                >
                  <CheckCircle2 size={16} color="#00E5FF" />
                  <span>Message sent successfully! I will reply shortly.</span>
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: '6px' }}>
                <AnimatedContactButton btnState={btnState} />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
);
};
