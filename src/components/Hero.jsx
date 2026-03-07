import React from 'react';

export default function Hero() {
  return (
    <section id="home" className="h-screen p-0 flex items-center justify-center relative overflow-hidden">
      <div 
        className="absolute inset-0 z-10"
        data-aos="zoom-in" 
        data-aos-duration="2000"
      >
        <iframe 
          src='https://my.spline.design/boxeshover-pfogxPANVMb36nDNDIZokiEZ/' 
          frameBorder='0' 
          width='100%' 
          height='100%'
          className="w-full h-full"
          title="Spline 3D Model"
        ></iframe>
      </div>
      
      {/* Overlay to dim around center */}
      <div className="absolute inset-0 z-20 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,var(--color-brand-bg)_100%)]"></div>
      
      <div 
        className="relative z-30 text-center mt-[10vh] pointer-events-none"
        data-aos="fade-up" 
        data-aos-duration="1500" 
        data-aos-delay="500"
      >
        <h2 className="text-[clamp(3rem,7vw,6rem)] font-extrabold mb-2 leading-tight tracking-tight pointer-events-auto">
          I build the <span className="text-[var(--color-brand-glow)] drop-shadow-[0_0_20px_rgba(216,236,248,0.5)]">digital future</span>.
        </h2>
        <p className="text-[1.2rem] max-w-[600px] mx-auto mb-10 opacity-80 pointer-events-auto text-[var(--text-secondary)]">
          Creative Developer & UI/UX Engineer
        </p>
        <a href="#projects" className="glow-btn pointer-events-auto inline-block">Explore My Work</a>
      </div>
    </section>
  );
}
