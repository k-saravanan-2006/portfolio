import React from 'react';
import ShinyText from '../ui/ShinyText';
import DecryptedText from '../ui/DecryptedText';
import LightRays from '../ui/LightRays';

export default function Hero() {
  return (
    <section id="home" className="h-[100vh] w-full relative overflow-hidden bg-black flex items-center justify-center pt-0 pb-[5px]">
      {/* Background Grid Pattern */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
          backgroundSize: '80px 80px'
        }}
      ></div>

      {/* Volumetric Light Rays Overlay */}
      <div className="absolute inset-0 z-0 pointer-events-auto">
        <LightRays
          raysOrigin="top-center"
          raysColor="#00b4a6"
          raysSpeed={1.3}
          lightSpread={1.2}
          rayLength={3}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0}
          distortion={0}
          className="custom-rays opacity-40 mix-blend-screen"
          pulsating={false}
          fadeDistance={1.5}
          saturation={1}
        />
      </div>

      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(216,236,248,0.08)_0%,transparent_60%)] z-10 pointer-events-none"></div>

      {/* 
        Spline model (particleaibrain-2V2uFSB5r3CXu6mhn4sJ8Ych)
        Positioned 200px from the top and 150px from the right edge.
      */}
      <div className="absolute top-[190px] right-[70px] w-[1000px] max-w-[800vw] h-[800px] z-10 pointer-events-auto">
        <iframe
          src='https://my.spline.design/reactiveorb-dYEXkppxxqllmByQpA3d3t71/'
          frameBorder='0'
          width='100%'
          height='100%'
          style={{ background: 'transparent' }}
        >
        </iframe>
      </div>

      {/* 
        New Bottom Spline model (reactiveorb-omExcszM75CdlaZsz6BIOmJW)
        Positioned at the absolute bottom of the container.
      */}
      <div className="absolute bottom-[-150px] left-0 w-full h-[50vh] z-20 pointer-events-auto overflow-hidden">
        <iframe
          src='https://my.spline.design/reactiveorb-omExcszM75CdlaZsz6BIOmJW/'
          frameBorder='0'
          width='100%'
          height='100%'
          style={{ background: 'transparent' }}
          title="Bottom Spline Animation"
        ></iframe>
      </div>
      {/* 
        Hero Text Content (Left-aligned)
      */}
      <div
        className="absolute left-[5%] md:left-[8%] top-1/2 -translate-y-1/2 z-30 flex flex-col items-start justify-center max-w-[800px] pointer-events-none"
        data-aos="fade-right"
        data-aos-duration="1500"
      >
        <h1
          className="text-[clamp(3rem,6vw,5.5rem)] font-light tracking-[0.05em] text-white leading-tight mb-2 uppercase"
          style={{
            fontFamily: 'Montserrat, sans-serif',
            textShadow: '0 0 15px rgba(255, 255, 255, 0.7), 0 0 30px rgba(255, 255, 255, 0.3)'
          }}
        >
          <DecryptedText
            text="SARAVANAN K"
            animateOn="view"
            revealDirection="start"
            speed={60}
            maxIterations={95}
            sequential={true}
          />
        </h1>
        <h2
          className="text-[clamp(1.5rem,3vw,2.5rem)] font-light leading-[1.2] mb-6"
          style={{
            fontFamily: 'Montserrat, sans-serif',
            background: 'linear-gradient(90deg, #ffffff 0%, #00b4a6 50%, #00e5cc 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            display: 'inline-block',
          }}
        >
          B.Tech Artificial Intelligence<br />
          & Data Science
        </h2>
        <p className="text-[clamp(0.9rem,1.2vw,1rem)] font-light text-[#888888] max-w-[500px] mb-10 leading-relaxed tracking-wide" style={{ fontFamily: 'Montserrat, sans-serif' }}>
          <ShinyText
            text={'Passionate AI & Data Science student who loves building smart, data-driven solutions.'}
            speed={2}
            delay={0}
            color="#888888"
            shineColor="#ffffff"
            spread={120}
            direction="left"
            yoyo={false}
            pauseOnHover={false}
            disabled={false}
          />
        </p>
        <div className="glow-border-container pointer-events-auto mt-4">
          <a
            href="#contact"
            className="flex items-center justify-center px-[37px] py-[17px] bg-[#000] !text-white text-sm font-semibold rounded-[0.5em] transition-all duration-300 shadow-[2px_2px_3px_#000000b4]"
            style={{ fontFamily: 'Montserrat, sans-serif', textDecoration: 'none' }}
          >
            Contact Me
          </a>
        </div>
      </div>
    </section>
  );
}
