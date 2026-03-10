import React, { useState } from 'react';

export default function Testimonials() {
  const [activeIdx, setActiveIdx] = useState(1);

  const testimonials = [
    {
      review: `"Milad's work is simply from the future. The 3D animations and cinematic design elevated our brand entirely."`,
      name: 'Sarah J.',
      title: 'Creative Director',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
    },
    {
      review: `"Incredible attention to detail. The glow effects and smooth scrolling make our platform feel like a high-end application."`,
      name: 'David M.',
      title: 'CEO at TechNova',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
    },
    {
      review: `"Fast, responsive, and breathtakingly beautiful. Highly recommended for any ambitious digital project."`,
      name: 'Elena R.',
      title: 'Product Manager',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
    }
  ];

  return (
    <section id="testimonials" className="py-32 overflow-hidden relative">
      <div className="container mx-auto px-8 max-w-[1200px]">
        <h2 className="text-center mb-16 text-[clamp(2.5rem,5vw,4rem)] font-extrabold tracking-tight" data-aos="fade-up">
          Client Feedback
        </h2>
        <div className="relative py-8" data-aos="fade-up" data-aos-duration="1200">
          <div className="flex gap-8 overflow-x-auto snap-x snap-mandatory pb-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {testimonials.map((t, idx) => (
              <div 
                key={idx}
                onMouseEnter={() => setActiveIdx(idx)}
                className={`min-w-[350px] max-w-[450px] flex-none snap-center bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-[20px] p-10 backdrop-blur-[10px] transition-all duration-400 ease-in-out ${
                  activeIdx === idx 
                    ? 'opacity-100 scale-100 border-[rgba(216,236,248,0.3)] shadow-[0_10px_40px_rgba(216,236,248,0.08)]' 
                    : 'opacity-60 scale-95'
                }`}
              >
                <p className="text-[1.1rem] italic mb-8 text-white">
                  {t.review}
                </p>
                <div className="flex items-center gap-4">
                  <img 
                    src={t.image} 
                    alt={t.name} 
                    className="w-[50px] h-[50px] rounded-full object-cover"
                  />
                  <div>
                    <h4 className="text-[1rem] m-0 font-extrabold">{t.name}</h4>
                    <span className="text-[0.85rem] text-[var(--text-secondary)]">{t.title}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
