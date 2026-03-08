import React from 'react';
import { Code, TerminalWindow, BracketsCurly } from '@phosphor-icons/react';
import GridScan from './GridScan';

export default function CodingProfiles() {
  const profiles = [
    {
      platform: 'LeetCode',
      username: '@saravanan_k',
      stats: '500+ Problems',
      icon: Code,
      link: '#',
    },
    {
      platform: 'CodeForces',
      username: 'saravanan_cf',
      stats: 'Max Rating: 1400',
      icon: TerminalWindow,
      link: '#',
    },
    {
      platform: 'CodeChef',
      username: 'sara_chef',
      stats: '3 Star Coder',
      icon: BracketsCurly,
      link: '#',
    }
  ];

  return (
    <section id="coding-profiles" className="min-h-screen w-full relative overflow-hidden bg-black flex items-center justify-center py-20">
      {/* Background Interactive Scan Grid */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <GridScan
          sensitivity={0.55}
          lineThickness={1}
          linesColor="#00b4a6"
          gridScale={0.1}
          scanColor="#00e5cc"
          scanOpacity={0.4}
          enablePost
          bloomIntensity={0.6}
          chromaticAberration={0.002}
          noiseIntensity={0.01}
        />
      </div>

      <div className="container mx-auto px-4 md:px-8 max-w-[1200px] w-full relative z-10">
        <h2 
          className="text-[clamp(2rem,4vw,3.5rem)] font-extrabold mb-12 tracking-tight"
          data-aos="fade-up"
        >
          Coding <span className="text-[var(--color-brand-glow)]">Profiles.</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {profiles.map((profile, idx) => {
            const Icon = profile.icon;
            return (
              <a 
                key={idx}
                href={profile.link}
                target="_blank"
                rel="noreferrer"
                className="group flex flex-col p-8 rounded-2xl bg-[var(--glass-bg)] border border-[var(--glass-border)] backdrop-blur-[10px] transition-all duration-300 hover:-translate-y-2 hover:border-[rgba(216,236,248,0.3)] hover:shadow-[0_10px_30px_rgba(216,236,248,0.1)]"
                data-aos="fade-up"
                data-aos-delay={idx * 150}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-[rgba(216,236,248,0.1)] text-[var(--color-brand-glow)] group-hover:scale-110 transition-transform duration-300">
                    <Icon size={24} weight="duotone" />
                  </div>
                  <h3 className="text-xl font-bold m-0">{profile.platform}</h3>
                </div>
                <div className="mt-auto">
                  <p className="text-[var(--text-secondary)] mb-2 font-mono text-sm">{profile.username}</p>
                  <p className="text-lg font-semibold text-white">{profile.stats}</p>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
