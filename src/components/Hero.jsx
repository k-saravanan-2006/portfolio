import React from 'react';

export default function Hero() {
  return (
    <section id="home" className="h-[100vh] w-full relative overflow-hidden bg-black flex items-center justify-center">
      {/* Background Grid Pattern */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
          backgroundSize: '80px 80px'
        }}
      ></div>

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
    </section>
  );
}
