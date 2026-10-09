import React from 'react';
import { Marquee } from '@/components/ui/3d-testimonails';

export interface SkillItem {
  id: string;
  title: string;
  description: string;
  accentColor: string;
  accentRgb: string;
}

interface Skills3DMarqueeProps {
  skills: SkillItem[];
  className?: string;
}

export const Skills3DMarquee: React.FC<Skills3DMarqueeProps> = ({ skills, className = '' }) => {
  // Distribute all 25 skills across 5 vertical columns
  const col1 = skills.slice(0, 5);   // C, Python, JavaScript, Java, HTML
  const col2 = skills.slice(5, 10);  // CSS, NumPy, Matplotlib, Seaborn, Flutter
  const col3 = skills.slice(10, 15); // React, Node, Flask, FastAPI, MongoDB
  const col4 = skills.slice(15, 20); // MySQL, Tailwind, PyTorch, OpenCV, LangChain
  const col5 = skills.slice(20, 25); // Git, GitHub, Docker, Jupyter, VS Code

  const renderSkillCard = (skill: SkillItem) => (
    <div
      key={skill.id}
      className="group/card relative w-[320px] sm:w-[360px] md:w-[390px] lg:w-[420px] xl:w-[440px] h-[94px] sm:h-[122px] md:h-[132px] lg:h-[140px] overflow-hidden rounded-[20px] sm:rounded-[22px] transition-all duration-300 ease-out cursor-default select-none shrink-0 opacity-100"
      style={{
        backgroundColor: '#020611',
        boxShadow: `0 6px 26px -3px rgba(${skill.accentRgb}, 0.24)`
      }}
      onMouseEnter={(e) => {
        const target = e.currentTarget;
        target.style.transform = 'translateZ(24px) scale(1.04)';
        target.style.boxShadow = `0 18px 42px -2px rgba(${skill.accentRgb}, 0.65)`;
        target.style.zIndex = '30';
      }}
      onMouseLeave={(e) => {
        const target = e.currentTarget;
        target.style.transform = 'translateZ(0) scale(1)';
        target.style.boxShadow = `0 6px 26px -3px rgba(${skill.accentRgb}, 0.24)`;
        target.style.zIndex = '1';
      }}
    >
      {/* Authentic Background Card Image */}
      <img
        src={`/assets/skills/backgrounds/${skill.id}.png`}
        alt=""
        loading="lazy"
        className="absolute inset-0 w-full h-full object-fill pointer-events-none rounded-[20px] sm:rounded-[22px] transition-transform duration-300 group-hover/card:scale-[1.02]"
      />

      {/* Subtle Hover Glow Overlay */}
      <div
        className="absolute inset-0 pointer-events-none rounded-[20px] sm:rounded-[22px] opacity-0 group-hover/card:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at 18% 50%, rgba(${skill.accentRgb}, 0.35) 0%, transparent 70%)`
        }}
      />

      {/* Content Layout */}
      <div className="relative z-10 px-3.5 py-2.5 sm:px-4 sm:py-3 flex items-center gap-3.5 sm:gap-4.5 h-full">
        {/* Large 3D Glowing Brand Logo */}
        <div className="w-14 h-14 sm:w-16 sm:h-16 lg:w-[68px] lg:h-[68px] shrink-0 flex items-center justify-center transition-transform duration-300 ease-out group-hover/card:scale-110">
          <img
            src={`/assets/skills/logos/${skill.id}.png`}
            alt={skill.title}
            loading="lazy"
            className="max-w-full max-h-full object-contain filter drop-shadow-[0_4px_14px_rgba(0,0,0,0.85)]"
          />
        </div>

        {/* Text Details with Restored Full Typography */}
        <div className="flex-1 min-w-0 flex flex-col justify-center">
          <h4 className="font-display text-[16.5px] sm:text-[18.5px] lg:text-[20px] font-bold text-white tracking-tight leading-snug truncate drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)]">
            {skill.title}
          </h4>
          <p className="text-[12px] sm:text-[13px] lg:text-[14px] text-slate-200/90 leading-snug line-clamp-2 mt-1 font-normal drop-shadow-[0_1px_4px_rgba(0,0,0,0.95)]">
            {skill.description}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div
      className={`relative w-full flex items-center justify-center overflow-hidden select-none ${className}`}
      style={{
        height: 'clamp(740px, 86vh, 980px)',
        minHeight: '700px',
        perspective: '850px',
        background: '#020611',
        WebkitMaskImage:
          'linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.5) 3%, black 8%, black 90%, rgba(0, 0, 0, 0.5) 96%, transparent 100%)',
        maskImage:
          'linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.5) 3%, black 8%, black 90%, rgba(0, 0, 0, 0.5) 96%, transparent 100%)',
      }}
    >
      {/* 3D Angled Rotating Rig Shifted Up Directly Below Subtitle */}
      <div
        className="flex flex-row items-center gap-3.5 sm:gap-4.5 md:gap-5.5 lg:gap-7 shrink-0 transition-transform duration-700 ease-out origin-center scale-[0.82] xs:scale-[0.9] sm:scale-[0.98] md:scale-[1.05] lg:scale-[1.12] xl:scale-[1.2]"
        style={{
          transform:
            'translateX(0px) translateY(-36px) translateZ(-35px) rotateX(24deg) rotateY(-13deg) rotateZ(23deg)',
          transformStyle: 'preserve-3d'
        }}
      >
        {/* Column 1 - Downwards (Full visibility: C, Python, JavaScript, Java, HTML) */}
        <div className="transform scale-100">
          <Marquee vertical pauseOnHover repeat={3} className="p-0 [--duration:38s]">
            {col1.map(renderSkillCard)}
          </Marquee>
        </div>

        {/* Column 2 - Upwards (Reverse: CSS, NumPy, Matplotlib, Seaborn, Flutter) */}
        <div className="transform scale-100">
          <Marquee vertical pauseOnHover reverse repeat={3} className="p-0 [--duration:35s]">
            {col2.map(renderSkillCard)}
          </Marquee>
        </div>

        {/* Column 3 - Downwards (Center: React, Node, Flask, FastAPI, MongoDB) */}
        <div className="transform scale-[1.02] z-10">
          <Marquee vertical pauseOnHover repeat={3} className="p-0 [--duration:33s]">
            {col3.map(renderSkillCard)}
          </Marquee>
        </div>

        {/* Column 4 - Upwards (Reverse: MySQL, Tailwind, PyTorch, OpenCV, LangChain) */}
        <div className="transform scale-100">
          <Marquee vertical pauseOnHover reverse repeat={3} className="p-0 [--duration:36s]">
            {col4.map(renderSkillCard)}
          </Marquee>
        </div>

        {/* Column 5 - Downwards (Full visibility: Git, GitHub, Docker, Jupyter, VS Code) */}
        <div className="transform scale-100">
          <Marquee vertical pauseOnHover repeat={3} className="p-0 [--duration:39s]">
            {col5.map(renderSkillCard)}
          </Marquee>
        </div>
      </div>

      {/* Inward Edge Shadows Matching #020611 Background Perfectly */}
      {/* Top Edge Inward Shadow */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-14 sm:h-18 lg:h-22 z-30"
        style={{
          background:
            'linear-gradient(to bottom, #020611 0%, rgba(2, 6, 17, 0.85) 40%, transparent 100%)'
        }}
      />

      {/* Bottom Edge Inward Shadow */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-16 sm:h-20 lg:h-24 z-30"
        style={{
          background:
            'linear-gradient(to top, #020611 0%, rgba(2, 6, 17, 0.85) 45%, transparent 100%)'
        }}
      />

      {/* Left Edge Inward Shadow */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-16 lg:w-24 z-30"
        style={{
          background:
            'linear-gradient(to right, #020611 0%, rgba(2, 6, 17, 0.85) 45%, transparent 100%)'
        }}
      />

      {/* Right Edge Inward Shadow */}
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-16 lg:w-24 z-30"
        style={{
          background:
            'linear-gradient(to left, #020611 0%, rgba(2, 6, 17, 0.85) 45%, transparent 100%)'
        }}
      />
    </div>
  );
};

export default Skills3DMarquee;
