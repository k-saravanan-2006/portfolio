import React, { useRef, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '../../animation/gsapConfig';
import { DestinationCard } from '@/components/ui/card-21';
import { AIGradientBorder } from '@/components/ui/AIGradientBorder';

interface CodingProfileCardData {
  platform: string;
  flag: string;
  username: string;
  stats: string;
  link: string;
  themeColor: string;
  imageUrl: string;
}

export const CodingProfilesSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentWrapperRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => {});
    }
  }, []);

  const profiles: CodingProfileCardData[] = [
    {
      platform: 'LeetCode',
      flag: '⚡',
      username: 'K_SARAVANAN',
      stats: '350+ Problems Solved',
      link: 'https://leetcode.com/u/K_SARAVANAN/',
      themeColor: '38 92% 50%', // LeetCode vibrant gold/amber
      imageUrl: '/cards/leetcode.png'
    },
    {
      platform: 'SkillRack',
      flag: '🏆',
      username: 'SARAVANAN K',
      stats: '2500+ Programs Solved',
      link: 'https://www.skillrack.com/faces/resume.xhtml?id=494274&key=c6656285d433d6f25b8b37f07312a1b086e8525f',
      themeColor: '199 89% 48%', // SkillRack cyber cyan
      imageUrl: '/cards/skillrack.png'
    },
    {
      platform: 'CodeChef',
      flag: '⭐',
      username: '@sara_chef',
      stats: '1500+ Rating',
      link: 'https://www.codechef.com/users/k_saravanan',
      themeColor: '271 76% 53%', // CodeChef electric violet
      imageUrl: '/cards/codechef.png'
    }
  ];

  // GSAP Synchronized Scroll Animation Architecture
  useGSAP(() => {
    // 1. Synchronized Header Entrance
    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'cinematic',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            once: true
          }
        }
      );
    }

    // 2. Video Background Scale (Anchored strictly to inset-0 to prevent top gap)
    if (videoRef.current) {
      gsap.fromTo(
        videoRef.current,
        { scale: 1.04, force3D: true },
        {
          scale: 1,
          ease: 'none',
          force3D: true,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.5
          }
        }
      );
    }

    // 3. Staggered Cards Entrance
    if (cardsRef.current) {
      gsap.fromTo(
        cardsRef.current.children,
        { opacity: 0, y: 40, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.12,
          ease: 'cinematic',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 80%',
            once: true
          }
        }
      );
    }
  }, { scope: sectionRef });

  return (
    <section
      id="coding-profiles"
      ref={sectionRef}
      className="coding-profiles-section sticky top-0 min-h-screen min-h-[100vh] min-h-[100dvh] w-full rounded-none border-t border-sky-400/50 overflow-hidden flex flex-col justify-center py-16 sm:py-24"
      style={{
        zIndex: 10,
        backgroundColor: '#020611',
        borderRadius: 0
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

      {/* Background Video Layer */}
      <video
        ref={videoRef}
        className="coding-profiles-video"
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 0,
          pointerEvents: 'none'
        }}
      >
        <source src="/video.mp4" type="video/mp4" />
        <source src="/assets/competitive-programming.mp4" type="video/mp4" />
      </video>

      {/* Subtle overlay to preserve readability of coding profile cards */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(2, 6, 17, 0.90) 0%, rgba(2, 6, 17, 0.75) 50%, rgba(2, 6, 17, 0.92) 100%)',
          zIndex: 0,
          pointerEvents: 'none'
        }}
      />

      {/* Smooth Scroll Grid Texture from smooth-scroll component */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(79, 79, 79, 0.18) 1px, transparent 1px), linear-gradient(to bottom, rgba(79, 79, 79, 0.18) 1px, transparent 1px)',
          backgroundSize: '54px 54px',
          maskImage: 'radial-gradient(ellipse 75% 65% at 50% 50%, #000 60%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 75% 65% at 50% 50%, #000 60%, transparent 100%)',
          zIndex: 0
        }}
      />

      {/* Foreground Coding Profiles Content Layer - 100% Vibrant Clarity */}
      <div
        ref={contentWrapperRef}
        className="container coding-profiles-content"
        style={{
          position: 'relative',
          zIndex: 1
        }}
      >
        {/* Section Header: Matches old portfolio wording 'Competitive Programming' */}
        <div ref={headerRef} style={{ textAlign: 'center', marginBottom: 'clamp(28px, 5vh, 50px)' }}>
          <h2
            className="font-display"
            style={{
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              color: '#f8fafc'
            }}
          >
            Competitive <span className="text-gradient-blue">Programming</span>
          </h2>
          <p
            style={{
              color: 'var(--text-secondary)',
              fontSize: 'clamp(13.5px, 2.2vw, 15px)',
              maxWidth: '600px',
              margin: '12px auto 0',
              lineHeight: 1.6
            }}
          >
            Consistent practice across competitive platforms, solving algorithmic challenges and architecting data structures.
          </p>
        </div>

        {/* Profiles Grid - Full Grand Size with Fluid Scaling */}
        <div
          ref={cardsRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
            gap: 'clamp(20px, 3vw, 28px)',
            maxWidth: '1100px',
            margin: '0 auto',
            width: '100%'
          }}
        >
          {profiles.map((prof, idx) => (
            <div
              key={idx}
              style={{
                width: '100%',
                height: 'clamp(400px, 52vh, 460px)'
              }}
            >
              <AIGradientBorder themeColor={prof.themeColor}>
                <DestinationCard
                  imageUrl={prof.imageUrl}
                  location={prof.platform}
                  flag={prof.flag}
                  stats={`${prof.username} • ${prof.stats}`}
                  href={prof.link}
                  themeColor={prof.themeColor}
                />
              </AIGradientBorder>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
