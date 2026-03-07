import React from 'react';
import { FileHtml, FileCss, FileCode, Atom, Cube } from '@phosphor-icons/react';

export default function About() {
  const skills = [
    { icon: <FileHtml weight="light" />, name: 'HTML5' },
    { icon: <FileCss weight="light" />, name: 'CSS3' },
    { icon: <FileCode weight="light" />, name: 'JavaScript' },
    { icon: <Atom weight="light" />, name: 'React' },
    { icon: <Cube weight="light" />, name: 'Spline 3D' },
  ];

  return (
    <section id="about" className="py-32 relative z-[4]">
      <div className="container mx-auto px-8 max-w-[1200px]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="flex justify-center" data-aos="fade-right" data-aos-duration="1000">
            <div className="w-[350px] h-[350px] max-w-full rounded-full p-[8px] bg-gradient-to-br from-[var(--color-brand-glow)] via-transparent to-[var(--color-brand-glow)] relative transition-transform duration-500 ease-in-out hover:-translate-y-[15px] shadow-[0_0_50px_rgba(216,236,248,0.1)] hover:shadow-[0_15px_60px_rgba(216,236,248,0.2)]">
              <img 
                src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
                alt="Milad" 
                className="w-full h-full rounded-full object-cover grayscale-[20%] contrast-[1.1]"
              />
            </div>
          </div>
          <div data-aos="fade-left" data-aos-duration="1000" data-aos-delay="200">
            <h2 className="text-[clamp(2.5rem,5vw,4rem)] font-extrabold leading-[1.1] mb-6 tracking-tight">
              Crafting immersive <br />web experiences.
            </h2>
            <p className="text-[1.1rem] text-[var(--text-secondary)] mb-10 max-w-[600px]">
              Hi, I'm Milad. I blend high-end cinematic design with futuristic web technologies to build interactive, performant, and visually stunning digital products. My passion lies in pushing the boundaries of what's possible on the web.
            </p>
            
            <div className="mt-10">
              <h3 className="text-[1.2rem] mb-4 text-[var(--color-brand-glow)] font-semibold" data-aos="fade-up" data-aos-delay="300">
                Core Technologies
              </h3>
              <div className="flex gap-6 flex-wrap">
                {skills.map((skill, index) => (
                  <div 
                    key={skill.name}
                    className="flex flex-col items-center gap-2 p-4 bg-[var(--color-brand-glass)] border border-[var(--color-brand-border)] rounded-xl backdrop-blur-[5px] transition-all duration-300 ease-in-out hover:bg-[var(--color-brand-dark-glow)] hover:border-[var(--color-brand-glow)] hover:-translate-y-[5px] hover:shadow-[0_5px_20px_rgba(216,236,248,0.15)]"
                    data-aos="fade-up" 
                    data-aos-delay={400 + index * 50}
                  >
                    <div className="text-3xl text-white">
                      {skill.icon}
                    </div>
                    <span className="text-[0.8rem] opacity-80">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
