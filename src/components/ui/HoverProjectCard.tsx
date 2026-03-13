import React from 'react';
import { ArrowUpRight } from '@phosphor-icons/react';

interface Project {
  title: string;
  description: string;
  stack: string[];
  link: string;
  image: string;
}

interface HoverProjectCardProps {
  project: Project;
  idx: number;
}

const HoverProjectCard: React.FC<HoverProjectCardProps> = ({ project, idx }) => {
  return (
    <div 
      className="relative w-full max-w-[420px] md:max-w-[550px] h-[250px] md:h-[340px] transition-all duration-200 mx-auto group"
      style={{ perspective: '800px' }}
      data-aos="fade-up"
      data-aos-delay={idx * 100}
    >
      <div className="absolute inset-0 z-[200] hidden md:grid grid-cols-5 grid-rows-5 hover-canvas">
        {Array.from({ length: 25 }).map((_, i) => (
          <div key={i} className={`tracker tr-${i + 1} w-full h-full z-[200]`} />
        ))}
      </div>
        
      <a 
        href={project.link}
        target="_blank"
        rel="noreferrer"
        className="card-element relative h-full md:absolute md:inset-0 z-0 flex flex-col rounded-xl md:rounded-3xl transition-all duration-[400ms] ml-auto mr-auto overflow-hidden bg-gradient-to-br from-[#00b4a6] via-[#00e5cc] to-white p-[1.5px] md:p-[2px] !no-underline"
      >
        {/* Card inner content wrapped in black bg */}
        <div className="rounded-[10px] md:rounded-[22px] bg-[#000000] z-0 overflow-hidden flex flex-col transition-all duration-300 h-full w-full">
          {/* Image Container */}
          <div className="w-full h-[80px] md:h-[150px] overflow-hidden relative border-b border-[rgba(0,229,204,0.2)] flex-shrink-0">
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10 duration-500"></div>
            <img 
              src={project.image} 
              alt={project.title} 
              className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
            />
          </div>
          
          {/* Content Body */}
          <div className="p-3 md:p-6 flex flex-col flex-1 z-10 bg-[#000000] min-w-0">
            <div className="flex justify-between items-start mb-1 md:mb-2">
              <h3 className="text-sm md:text-xl font-bold text-white leading-tight md:leading-normal !no-underline">{project.title}</h3>
              <div className="text-[#00e5cc] p-1.5 md:p-2 rounded-full bg-[rgba(0,229,204,0.1)] opacity-0 group-hover:opacity-100 transition-all -translate-y-2 group-hover:translate-y-0 hidden md:flex items-center justify-center">
                <ArrowUpRight size={18} weight="bold" />
              </div>
            </div>
            <p className="text-[var(--text-secondary)] mb-2 md:mb-4 text-[10px] md:text-sm leading-tight md:leading-relaxed font-light !no-underline">
              {project.description}
            </p>
            
            {/* Tech Stack Pills */}
            <div className="flex flex-wrap gap-1 md:gap-2 mt-auto">
              {project.stack.map((tech, i) => (
                <span 
                  key={i} 
                  className={`text-[8px] md:text-[10px] font-semibold px-1.5 md:px-2 py-0.5 md:py-1 rounded-full bg-[#000000] border border-[rgba(0,229,204,0.15)] text-[#00e5cc] ${i >= 2 ? 'hidden md:inline-block' : ''}`}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
          
          {/* Subtle overlay gradient on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#00b4a6]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        </div>
      </a>
      
      {/* Background glow shadow effect (using the gradient colors requested) */}
      <div 
        className="absolute inset-0 -z-10 rounded-3xl opacity-30 transition-all duration-300 pointer-events-none card-glow scale-95"
        style={{
          background: 'linear-gradient(43deg, #00b4a6 0%, #00e5cc 46%, #ffffff 100%)',
          filter: 'blur(2rem)'
        }}
      />
      
      <style>{`
        .hover-canvas:hover ~ .card-glow {
          opacity: 0.85;
          transform: scale(1.05);
          filter: blur(2.5rem);
        }
        .hover-canvas:hover .card-element {
          filter: brightness(1.1);
          box-shadow: 0 0 30px rgba(0, 229, 204, 0.4), 0 0 60px rgba(0, 180, 166, 0.2);
        }
        ${Array.from({ length: 25 }).map((_, i) => {
          const row = Math.floor(i / 5);
          const col = i % 5;
          const rotateX = 20 - row * 10;
          const rotateY = -10 + col * 5;
          return `
          .tr-${i + 1}:hover ~ .card-element {
            transition: 125ms ease-in-out;
            transform: rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(0deg);
            z-index: 10;
          }
          `;
        }).join('\n')}
      `}</style>
    </div>
  );
}

export default HoverProjectCard;
