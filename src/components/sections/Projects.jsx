import React from 'react';
import HoverProjectCard from '../ui/HoverProjectCard';
import FloatingLines from '../ui/FloatingLines';

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
    <section id="projects" className="min-h-screen w-full relative overflow-hidden bg-black flex items-center justify-center pt-28 pb-20">
      <div className="absolute inset-0 z-0 opacity-40">
        <FloatingLines
          enabledWaves={["bottom", "middle"]}
          lineCount={2}
          lineDistance={4.0}
          bendRadius={4.5}
          bendStrength={5.5}
          interactive={true}
          parallax={true}
        />
      </div>
      <div className="container mx-auto px-6 sm:px-8 max-w-[960px] w-full relative z-10">
        <h2
          className="text-[clamp(2.2rem,6vw,3.5rem)] font-extrabold mb-12 tracking-tight text-center"
          data-aos="fade-up"
        >
          Featured <span className="text-[var(--color-brand-glow)]">Projects.</span>
        </h2>

        <div className="grid grid-cols-2 gap-4 md:gap-12 justify-items-center">
          {projects.map((project, idx) => (
            <HoverProjectCard key={idx} project={project} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
