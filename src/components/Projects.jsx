import React from 'react';
import HoverProjectCard from './HoverProjectCard';

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
    <section id="projects" className="py-[5px] relative overflow-hidden">
      <div className="container mx-auto px-0 max-w-[1200px]">
        <h2
          className="text-[clamp(2rem,4vw,3.5rem)] font-extrabold mb-12 tracking-tight text-center"
          data-aos="fade-up"
        >
          Featured <span className="text-[var(--color-brand-glow)]">Projects.</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, idx) => (
            <HoverProjectCard key={idx} project={project} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
