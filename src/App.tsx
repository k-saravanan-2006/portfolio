import React, { useState, useEffect } from 'react';
import { ScrollTrigger } from './animation/gsapConfig';
import { ScrollProvider } from './animation/scroll/ScrollProvider';
import { ErrorBoundary } from './components/system/ErrorBoundary';
import { SystemBoot } from './components/system/SystemBoot';
import { GlowCursor } from './components/ui/GlowCursor';
import { CustomCursor } from './components/ui/CustomCursor';
import { Navbar } from './components/navigation/Navbar';
import { HUDTelemetry } from './components/navigation/HUDTelemetry';
import { ScrollFrameSequence } from './components/sections/ScrollFrameSequence';
import { CodingProfilesSection } from './components/sections/CodingProfilesSection';
import { ExperienceSection } from './components/sections/ExperienceSection';
import { ProjectsSection } from './components/sections/ProjectsSection';
import { SkillsSection } from './components/sections/SkillsSection';
import { AboutSection } from './components/sections/AboutSection';
import { ContactSection } from './components/sections/ContactSection';
import { FooterSection } from './components/sections/FooterSection';

export const App: React.FC = () => {
  const [booted, setBooted] = useState(false);

  useEffect(() => {
    if (booted) {
      const timer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [booted]);

  return (
    <ErrorBoundary>
      {!booted && <SystemBoot onComplete={() => setBooted(true)} />}

      <CustomCursor />

      <GlowCursor
        color="#20CFFF"
        secondaryColor="#176FE5"
        trailLength={40}
        trailWidth={8}
        trailTaper={0.8}
        followSpeed={0.16}
        glowIntensity={1.9}
        glowSpread={1.2}
        hotspot={0.65}
        brightness={1.25}
        opacity={1}
        pulseSpeed={1.1}
        noiseStrength={0.035}
        idleFade
        idleTimeout={700}
        fadeDuration={900}
        blendMode="screen"
      >
        <ScrollProvider>

          {/* Global Navigation & Minimal HUD Telemetry */}
          <Navbar />
          <HUDTelemetry />

          {/* Master Pinned Cinematic Chapter: 812-Frame Canvas + GSAP Master Timeline */}
          <ScrollFrameSequence />

          {/* Migrated Portfolio Content Spine Flowing in Authentic Order */}
          <main
            style={{
              position: 'relative',
              zIndex: 20,
              marginTop: '-100vh',
              backgroundColor: '#020611',
              opacity: booted ? 1 : 0,
              transition: 'opacity 0.6s ease-out'
            }}
          >
            {/* Stacking Chapter: Program Profile & Experience Cards (Sticky Stack Architecture) */}
            <style>{`
              @media (max-width: 899px) {
                #profile-experience-stack {
                  height: auto !important;
                }
                .profile-experience-buffer {
                  display: none !important;
                }
                .coding-profiles-section {
                  position: relative !important;
                  top: 0 !important;
                  height: auto !important;
                  min-height: auto !important;
                  overflow: visible !important;
                  padding-top: 60px !important;
                  padding-bottom: 50px !important;
                }
                .experience-section {
                  position: relative !important;
                  top: 0 !important;
                  height: auto !important;
                  min-height: auto !important;
                  overflow: visible !important;
                  padding-top: 50px !important;
                  padding-bottom: 60px !important;
                }
              }
            `}</style>
            <article
              id="profile-experience-stack"
              style={{
                position: 'relative',
                width: '100%',
                height: '290vh',
                backgroundColor: '#020611'
              }}
            >
              <CodingProfilesSection />

              {/* Tuned Viewing Buffer: provides a comfortable, reduced delay before Experience rises */}
              <div
                className="profile-experience-buffer pointer-events-none"
                style={{
                  height: '35vh'
                }}
              />

              <ExperienceSection />
            </article>

            <ProjectsSection />
            <SkillsSection />
            <AboutSection />
            <ContactSection />
          </main>

          <FooterSection />
        </ScrollProvider>
      </GlowCursor>
    </ErrorBoundary>
  );
};

export default App;
