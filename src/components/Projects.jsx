import React from 'react';

export default function Projects() {
  const projects = [
    {
      title: 'Nebula Core',
      stack: 'React • Three.js • Node.js',
      description: 'A high-performance dashboard with real-time 3D data visualization and a glassmorphic interface.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      reverse: false,
    },
    {
      title: 'Aura UI Kit',
      stack: 'HTML • Tailwind CSS • React',
      description: 'A premium cinematic UI framework designed for creators, featuring fluid animations and deep dark mode.',
      image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      reverse: true,
    }
  ];

  return (
    <section id="projects" className="py-32 relative">
      <div className="container mx-auto px-8 max-w-[1200px]">
        <h2 className="text-center mb-16 text-[clamp(2.5rem,5vw,4rem)] font-extrabold tracking-tight" data-aos="fade-up">
          Featured Work
        </h2>
        
        {projects.map((project, index) => (
          <div 
            key={project.title} 
            className={`grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center mb-24 ${project.reverse ? 'lg:grid-cols-[1fr_1.2fr]' : 'lg:grid-cols-[1.2fr_1fr]'}`}
          >
            <div 
              className={`rounded-2xl overflow-hidden relative border border-[var(--color-brand-border)] shadow-[0_20px_50px_rgba(0,0,0,0.5)] group ${project.reverse ? 'md:order-last lg:order-last' : ''}`}
              data-aos={project.reverse ? "fade-left" : "fade-right"} 
              data-aos-duration="1000"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-[rgba(216,236,248,0.1)] to-transparent pointer-events-none z-10"></div>
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-auto block transition-transform duration-700 ease-in-out group-hover:scale-105"
              />
            </div>
            <div 
              data-aos={project.reverse ? "fade-right" : "fade-left"} 
              data-aos-duration="1000"
            >
              <h3 className="text-4xl lg:text-5xl font-extrabold mb-2">{project.title}</h3>
              <p className="text-[var(--color-brand-glow)] text-[0.9rem] font-semibold tracking-wider mb-6 uppercase">
                {project.stack}
              </p>
              <p className="text-[1.1rem] text-[var(--text-secondary)] mb-8">
                {project.description}
              </p>
              <a href="#" className="glow-btn small">View Project</a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
