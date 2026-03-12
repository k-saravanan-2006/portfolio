import React from 'react';
import GridScan from '../ui/GridScan';

const Icons = {
  LeetCode: () => (
    <img src="/image/extras/leetcode.png" alt="LeetCode" className="w-10 h-10 object-contain" />
  ),
  SkillRack: () => (
    <img src="/image/extras/skillrack.png" alt="SkillRack" className="w-10 h-10 object-contain" />
  ),
  CodeChef: () => (
    <svg viewBox="0 0 24 24" fill="none" className="w-10 h-10" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C9.5 2 7.5 4 7.5 6.5C7.5 7.8 8.1 8.9 9 9.7V11H15V9.7C15.9 8.9 16.5 7.8 16.5 6.5C16.5 4 14.5 2 12 2Z" fill="#D2B48C" />
      <path d="M11 11V22L12 21L13 22V11H11Z" fill="#D2B48C" />
      <rect x="8.5" y="10" width="7" height="2" rx="1" fill="#8B4513" />
    </svg>
  )
};

export default function CodingProfiles() {
  const profiles = [
    {
      platform: 'LeetCode',
      username: 'K_SARAVANAN',
      stats: '100+ Program Solved',
      icon: Icons.LeetCode,
      link: 'https://leetcode.com/u/K_SARAVANAN/',
    },
    {
      platform: 'SkillRack',
      username: 'SARAVANAN K',
      stats: '2000+ Program Solved',
      icon: Icons.SkillRack,
      link: 'https://www.skillrack.com/faces/resume.xhtml?id=494274&key=c6656285d433d6f25b8b37f07312a1b086e8525f',
    },
    {
      platform: 'CodeChef',
      username: '@sara_chef',
      stats: '1500+ Rating (2 Star)',
      icon: Icons.CodeChef,
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

      <div className="container mx-auto px-4 md:px-8 max-w-[1200px] w-full relative z-10 flex flex-col items-center">
        <h2
          className="text-[clamp(2.2rem,6vw,3.5rem)] font-extrabold mb-16 md:mb-24 tracking-tight text-center text-white"
          data-aos="fade-up"
        >
          Competitive <span className="text-[var(--color-brand-glow)]">Programming.</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full justify-items-center">
          {profiles.map((profile, idx) => {
            const Icon = profile.icon;
            return (
              <a
                key={idx}
                href={profile.link}
                target="_blank"
                rel="noreferrer"
                className="group flex flex-row md:flex-col items-center p-5 md:p-10 rounded-2xl md:rounded-3xl bg-[var(--glass-bg)] border border-[var(--glass-border)] backdrop-blur-[10px] transition-all duration-500 hover:border-[#444] hover:shadow-[0_20px_40px_rgba(0,0,0,0.6)] hover:-translate-y-1 md:hover:-translate-y-3 w-full md:max-w-[340px] no-underline gap-5 md:gap-0"
                style={{ textDecoration: 'none', color: 'inherit' }}
                data-aos="fade-up"
                data-aos-delay={idx * 150}
              >
                {/* Icon Container */}
                <div className="w-14 h-14 md:w-20 md:h-20 flex-shrink-0 flex items-center justify-center rounded-xl md:rounded-2xl bg-[#1a1a1a] border border-[#333] md:mb-8 group-hover:scale-110 group-hover:border-[#555] transition-all duration-300">
                  <Icon />
                </div>

                {/* Text Content */}
                <div className="flex flex-col flex-1 md:items-center md:text-center text-left min-w-0">
                  <h3 className="text-lg md:text-2xl font-bold mb-0.5 md:mb-2 text-white truncate w-full">{profile.platform}</h3>
                  <p className="text-gray-500 mb-1 md:mb-4 font-mono text-[10px] md:text-sm tracking-wide truncate w-full">{profile.username}</p>
                  <p className="text-sm md:text-lg font-semibold text-white truncate w-full">{profile.stats}</p>
                </div>

                {/* Arrow - Hidden or repositioned for small mobile */}
                <div className="hidden sm:block text-white/30 group-hover:text-white transition-colors duration-300 text-xl font-light md:mt-8">
                  →
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
