import React from 'react';
import { Monitor, HardDrives, Palette, Wrench } from '@phosphor-icons/react';

export default function Skills() {
  const skillCategories = [
    {
      title: 'Frontend',
      icon: Monitor,
      skills: ['React', 'JavaScript (ES6+)', 'Tailwind CSS', 'HTML5', 'CSS3', 'Framer Motion']
    },
    {
      title: 'Backend & ML',
      icon: HardDrives,
      skills: ['Python', 'Node.js', 'Express', 'Flask', 'OpenCV', 'RESTful APIs']
    },
    {
      title: 'Creative',
      icon: Palette,
      skills: ['Spline 3D', 'UI/UX Design', 'Figma', 'Responsive Layouts']
    },
    {
      title: 'Tools & DevOps',
      icon: Wrench,
      skills: ['Git', 'GitHub', 'AWS', 'Vite', 'Postman']
    }
  ];

  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-8 max-w-[1200px]">
        <h2 
          className="text-[clamp(2rem,4vw,3.5rem)] font-extrabold mb-12 tracking-tight text-center"
          data-aos="fade-up"
        >
          My <span className="text-[var(--color-brand-glow)]">Expertise.</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <div 
                key={idx}
                className="group flex flex-col p-8 rounded-2xl bg-[var(--glass-bg)] border border-[var(--glass-border)] backdrop-blur-[10px] transition-all duration-300 hover:-translate-y-2 hover:border-[rgba(216,236,248,0.3)] hover:shadow-[0_10px_30px_rgba(216,236,248,0.1)]"
                data-aos="fade-up"
                data-aos-delay={idx * 100}
              >
                <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-[rgba(216,236,248,0.05)] border border-[rgba(216,236,248,0.1)] text-[var(--color-brand-glow)] mb-6 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_15px_rgba(216,236,248,0.05)]">
                  <Icon size={30} weight="duotone" />
                </div>
                <h3 className="text-xl font-bold text-white mb-6">{cat.title}</h3>
                <ul className="flex flex-col gap-3 m-0 p-0 list-none text-[var(--text-secondary)]">
                  {cat.skills.map((skill, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-brand-glow)] opacity-50 block"></span>
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
