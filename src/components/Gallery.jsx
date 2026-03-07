import React, { useState } from 'react';
import { ArrowsOut, X } from '@phosphor-icons/react';

export default function Gallery() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImgSrc, setModalImgSrc] = useState('');

  const images = [
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
  ];

  const openModal = (src) => {
    setModalImgSrc(src);
    setModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setModalOpen(false);
    setTimeout(() => setModalImgSrc(''), 300); // Wait for transition
    document.body.style.overflow = 'auto';
  };

  return (
    <section id="gallery" className="py-32 relative">
      <div className="container mx-auto px-8 max-w-[1200px]">
        <h2 className="text-center mb-16 text-[clamp(2.5rem,5vw,4rem)] font-extrabold tracking-tight" data-aos="fade-up">
          Design Explorations
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {images.map((src, idx) => (
            <div 
              key={idx}
              className="relative rounded-2xl overflow-hidden border border-[var(--color-brand-border)] aspect-4/3 cursor-pointer group"
              data-aos="fade-up" 
              data-aos-duration="800" 
              data-aos-delay={100 + idx * 100}
              onClick={() => openModal(src)}
            >
              <img 
                src={src} 
                alt={`Design ${idx + 1}`} 
                className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-[#05060f]/70 backdrop-blur-[3px] flex items-center justify-center opacity-0 transition-all duration-300 ease-in-out group-hover:opacity-100">
                <ArrowsOut className="text-[3rem] text-[var(--color-brand-glow)] scale-50 transition-transform duration-300 group-hover:scale-100" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fullscreen Modal */}
      <div 
        className={`fixed inset-0 bg-[#05060f]/95 backdrop-blur-md z-[2000] flex items-center justify-center transition-opacity duration-400 pointer-events-none ${modalOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0'}`}
        onClick={(e) => {
          if (e.target === e.currentTarget) closeModal();
        }}
      >
        <button onClick={closeModal} className="absolute top-8 right-8 text-4xl text-white hover:text-[var(--color-brand-glow)] transition-colors duration-300">
          <X />
        </button>
        {modalImgSrc && (
          <img 
            src={modalImgSrc} 
            alt="Fullscreen View" 
            className={`max-w-[90%] max-h-[90vh] rounded-lg shadow-[0_0_50px_rgba(216,236,248,0.1)] transition-transform duration-400 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] ${modalOpen ? 'scale-100' : 'scale-90'}`}
          />
        )}
      </div>
    </section>
  );
}
