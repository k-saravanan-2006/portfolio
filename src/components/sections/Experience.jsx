import React from 'react';
import { Briefcase, CalendarBlank } from '@phosphor-icons/react';
import Antigravity from '../ui/Antigravity';

export default function Experience() {
  const experiences = [
    {
      role: 'Coming Soon',
      company: 'Future opportunity',
      duration: 'Stay tuned',
      description: [],
      stack: []
    }
  ];

  return (
    <section id="experience" className="min-h-screen w-full relative overflow-hidden bg-black flex items-center justify-center py-20">
      {/* Background Interactive 3D Particles */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Antigravity
          count={300}
          magnetRadius={10}
          ringRadius={6}
          waveSpeed={0.4}
          waveAmplitude={1}
          particleSize={1.5}
          lerpSpeed={0.05}
          color="#00b4a6"
          autoAnimate
          particleVariance={1}
          rotationSpeed={0}
          depthFactor={1}
          pulseSpeed={3}
          particleShape="capsule"
          fieldStrength={10}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-8 max-w-[1200px] w-full relative z-10">
        <h2
          className="text-[clamp(2rem,4vw,3.5rem)] font-extrabold mb-16 tracking-tight"
          data-aos="fade-right"
        >
          My <span className="text-[var(--color-brand-glow)]">Experience.</span>
        </h2>

        <div className="relative border-l border-[rgba(216,236,248,0.2)] ml-4 md:ml-0">
          {experiences.map((exp, idx) => (
            <div
              key={idx}
              className="mb-16 pl-10 relative"
              data-aos="fade-up"
              data-aos-delay={idx * 150}
            >
              {/* Timeline dot */}
              <div className="absolute left-[-21px] top-1 flex items-center justify-center w-10 h-10 rounded-full bg-[#000000] border-2 border-[var(--color-brand-glow)] shadow-[0_0_15px_rgba(216,236,248,0.4)]">
                <Briefcase size={20} weight="fill" className="text-[var(--color-brand-glow)]" />
              </div>

              <div className="bg-[var(--glass-bg)] border border-[var(--glass-border)] backdrop-blur-[10px] p-8 rounded-2xl transition-all duration-300 hover:border-[rgba(216,236,248,0.3)] hover:shadow-[0_10px_30px_rgba(216,236,248,0.1)]">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                  <h3 className="text-2xl font-bold m-0 text-white">{exp.role}</h3>
                  <div className="flex items-center gap-2 text-sm text-[var(--color-brand-glow)] bg-[rgba(216,236,248,0.05)] px-4 py-1.5 rounded-full border border-[rgba(216,236,248,0.1)]">
                    <CalendarBlank size={16} />
                    {exp.duration}
                  </div>
                </div>

                <h4 className="text-lg text-gray-400 font-medium mb-6">{exp.company}</h4>

                <ul className="list-disc list-inside text-[var(--text-secondary)] mb-8 space-y-2">
                  {exp.description.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-3">
                  {exp.stack.map((tech, i) => (
                    <span
                      key={i}
                      className="text-xs font-semibold px-4 py-1.5 rounded-full bg-black/40 border border-gray-700 text-gray-300"
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
    </section>
  );
}
