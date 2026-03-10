import React from 'react';
import GridScan from '../ui/GridScan';

const Icons = {
  LeetCode: () => (
    <svg viewBox="0 0 24 24" fill="none" className="w-10 h-10" xmlns="http://www.w3.org/2000/svg">
      <path d="M13.483 0a1.374 1.374 0 0 0-.961.406l-2.057 2.057a1.361 1.361 0 0 0 0 1.926l2.057 2.057a1.361 1.361 0 0 0 1.926 0l2.057-2.057a1.361 1.361 0 0 0 0-1.926L14.444.406A1.374 1.374 0 0 0 13.483 0zm-5.071 7.234a1.361 1.361 0 0 0-1.926 0L1.724 12.001l4.762 4.767a1.361 1.361 0 0 0 1.926 0l2.057-2.057a1.361 1.361 0 0 0 0-1.926L8.412 10.73a1.361 1.361 0 0 0 0-1.926l2.057-2.057a1.361 1.361 0 0 0 0-1.926L8.412 7.234z" fill="#FFA116"/>
      <path d="M13.483 24a1.374 1.374 0 0 0 .961-.406l2.057-2.057a1.361 1.361 0 0 0 0-1.926l-2.057-2.057a1.361 1.361 0 0 0-1.926 0l-2.057 2.057a1.361 1.361 0 0 0 0 1.926l2.057 2.057c.25.25.592.406.965.406z" fill="#FFA116"/>
      <path d="M22.276 11.594l-4.762-4.762a1.361 1.361 0 0 0-1.926 0l-2.057 2.057a1.361 1.361 0 0 0 0 1.926l2.057 2.057a1.361 1.361 0 0 0 0 1.926l-2.057 2.057a1.361 1.361 0 0 0 0 1.926l4.762 4.762a1.361 1.361 0 0 0 1.926 0l4.762-4.762a1.361 1.361 0 0 0 0-1.926l-4.762-4.762a1.361 1.361 0 0 0 0-1.926l4.762-4.762c.531-.531.531-1.395 0-1.926z" fill="#FFA116"/>
    </svg>
  ),
  CodeForces: () => (
    <svg viewBox="0 0 24 24" fill="none" className="w-10 h-10" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="10" width="5" height="12" rx="1.5" fill="#EEEEEE"/>
      <rect x="9.5" y="4" width="5" height="18" rx="1.5" fill="#4B89DC"/>
      <rect x="17" y="7" width="5" height="15" rx="1.5" fill="#E53935"/>
    </svg>
  ),
  CodeChef: () => (
    <svg viewBox="0 0 24 24" fill="none" className="w-10 h-10" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C9.5 2 7.5 4 7.5 6.5C7.5 7.8 8.1 8.9 9 9.7V11H15V9.7C15.9 8.9 16.5 7.8 16.5 6.5C16.5 4 14.5 2 12 2Z" fill="#D2B48C"/>
      <path d="M11 11V22L12 21L13 22V11H11Z" fill="#D2B48C"/>
      <rect x="8.5" y="10" width="7" height="2" rx="1" fill="#8B4513"/>
    </svg>
  )
};

export default function CodingProfiles() {
  const profiles = [
    {
      platform: 'LeetCode',
      username: '@saravanan_k',
      stats: '1650+ Rating',
      icon: Icons.LeetCode,
      link: '#',
    },
    {
      platform: 'CodeForces',
      username: '@saravanan_cf',
      stats: 'Pupil (1200+) Rating',
      icon: Icons.CodeForces,
      link: '#',
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
          className="text-[clamp(2rem,4vw,3.5rem)] font-extrabold mb-16 tracking-tight text-center text-white"
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
                className="group flex flex-col items-center p-10 rounded-3xl bg-[var(--glass-bg)] border border-[var(--glass-border)] backdrop-blur-[10px] transition-all duration-500 hover:border-[#444] hover:shadow-[0_20px_40px_rgba(0,0,0,0.6)] hover:-translate-y-3 w-full max-w-[340px]"
                data-aos="fade-up"
                data-aos-delay={idx * 150}
              >
                <div className="w-20 h-20 flex items-center justify-center rounded-2xl bg-[#1a1a1a] border border-[#333] mb-8 group-hover:scale-110 group-hover:border-[#555] transition-all duration-300">
                  <Icon />
                </div>
                
                <h3 className="text-2xl font-bold mb-2 text-white">{profile.platform}</h3>
                <p className="text-gray-500 mb-4 font-mono text-sm tracking-wide">{profile.username}</p>
                <p className="text-lg font-semibold text-white mb-8">{profile.stats}</p>
                
                <div className="text-white/30 group-hover:text-white transition-colors duration-300 text-xl font-light">
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
