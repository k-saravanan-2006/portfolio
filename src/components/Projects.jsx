import React from 'react';
import { ArrowUpRight } from '@phosphor-icons/react';

export default function Projects() {
  const projects = [
    {
      title: 'Neon Dash',
      description: 'A responsive dashboard built with React and Tailwind CSS featuring advanced data tables and charting.',
      stack: ['React', 'Tailwind CSS', 'Chart.js'],
      link: '#',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
    },
    {
      title: 'Aura E-Commerce',
      description: 'Full-stack e-commerce platform with Node.js backend, Stripe integration, and complex state management.',
      stack: ['Next.js', 'Node.js', 'Stripe'],
      link: '#',
      image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
    },
    {
      title: 'Vision AI Tools',
      description: 'A suite of computer vision tools built in Python utilizing OpenCV for real-time video stream analysis.',
      stack: ['Python', 'OpenCV', 'Flask'],
      link: '#',
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
    },
    {
      title: 'TaskFlow',
      description: 'AI-powered collaborative task management system with real-time updates using WebSockets.',
      stack: ['React', 'Socket.io', 'MongoDB'],
      link: '#',
      image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
    }
  ];

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-8 max-w-[1200px]">
        <h2 
          className="text-[clamp(2rem,4vw,3.5rem)] font-extrabold mb-12 tracking-tight text-center"
          data-aos="fade-up"
        >
          Featured <span className="text-[var(--color-brand-glow)]">Projects.</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, idx) => (
            <a 
              key={idx}
              href={project.link}
              target="_blank"
              rel="noreferrer"
              className="group flex flex-col rounded-3xl bg-[var(--glass-bg)] border border-[var(--glass-border)] backdrop-blur-[10px] overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:border-[rgba(216,236,248,0.3)] hover:shadow-[0_10px_30px_rgba(216,236,248,0.1)]"
              data-aos="fade-up"
              data-aos-delay={idx * 100}
            >
              {/* Image Header */}
              <div className="w-full h-[220px] overflow-hidden relative border-b border-[var(--glass-border)]">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10 duration-500"></div>
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                />
              </div>

              {/* Content Body */}
              <div className="p-8 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                  <div className="text-[var(--color-brand-glow)] p-2 rounded-full bg-[rgba(216,236,248,0.05)] opacity-0 group-hover:opacity-100 transition-all -translate-y-2 group-hover:translate-y-0">
                    <ArrowUpRight size={20} weight="bold" />
                  </div>
                </div>
                <p className="text-[var(--text-secondary)] mb-6 text-sm leading-relaxed flex-1">
                  {project.description}
                </p>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.stack.map((tech, i) => (
                    <span 
                      key={i} 
                      className="text-xs font-semibold px-3 py-1 rounded-full bg-[#05060f] border border-[rgba(216,236,248,0.1)] text-[var(--color-brand-glow)]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
