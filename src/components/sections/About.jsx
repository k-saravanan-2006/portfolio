import React from 'react';
import ElectricBorder from '../ui/ElectricBorder';
import PixelBlast from '../ui/PixelBlast';

export default function About() {
  const stats = [
    { value: '3000+', label: 'Problems Solved Across All Platforms' },
    { value: '10+', label: 'Projects Completed' },
    { value: '8.63', label: 'College CGPA' }
  ];

  return (
    <section id="about" className="min-h-screen w-full relative overflow-hidden bg-black flex items-center justify-center pt-20 pb-10">
      <div className="absolute inset-0 z-0 pointer-events-auto">
        {/* Top Fade Mask */}
        <div className="absolute top-0 left-0 right-0 h-[40vh] bg-gradient-to-b from-black via-black/80 to-transparent z-[1] pointer-events-none" />

        <PixelBlast
          variant="square"
          pixelSize={2}
          color="#00b4a6"
          patternScale={2.25}
          patternDensity={0.1}
          pixelSizeJitter={0}
          enableRipples={true}
          rippleSpeed={0.4}
          rippleThickness={0.12}
          rippleIntensityScale={1.5}
          liquid={false}
          liquidStrength={0.12}
          liquidRadius={1.2}
          liquidWobbleSpeed={5}
          speed={0.3}
          edgeFade={0.25}
          transparent={true}
        />

        {/* Bottom Fade Mask */}
        <div className="absolute bottom-0 left-0 right-0 h-[40vh] bg-gradient-to-t from-black via-black/80 to-transparent z-[1] pointer-events-none" />
      </div>

      <div className="container mx-auto px-4 sm:px-8 max-w-[1200px] w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Narrative Content */}
          <div className="flex flex-col items-center md:items-center text-center" data-aos="fade-right" data-aos-duration="1000">
            <h2 className="text-[clamp(2.2rem,5vw,3.5rem)] font-extrabold mb-8 tracking-tight text-center">
              Who I <span className="text-[var(--color-brand-glow)]">Am.</span>
            </h2>
            <div className="text-[1rem] md:text-[1.1rem] text-[var(--text-secondary)] space-y-6 leading-relaxed max-w-[600px] md:max-w-none">
              <p>
                I am an AI and Software Developer specializing in machine learning,
                computer vision, and intelligent automation systems. I have built practical,
                production-focused solutions such as stock prediction engines, real-time vision pipelines,
                and AI-powered collaboration bots.
              </p>
              <p>
                My expertise spans Python, OpenCV, Flask, AWS, and modern JavaScript frameworks,
                enabling me to work across the full stack—from model development and API integration
                to frontend implementation and deployment. I enjoy creating scalable, user-centric
                applications that solve real-world problems.
              </p>
              <p>
                I actively compete on LeetCode, CodeForces, and CodeChef while developing
                real-world projects. My approach combines algorithmic thinking with modern web
                technologies to create impactful digital solutions.
              </p>
            </div>
          </div>

          {/* Stat Cards */}
          <div
            className="grid grid-cols-3 gap-3 lg:grid-cols-1 lg:flex lg:flex-col lg:gap-4"
            data-aos="fade-left"
            data-aos-duration="1000"
            data-aos-delay="200"
          >
            {stats.map((stat, idx) => (
              <ElectricBorder
                key={idx}
                color="#00b4a6"
                speed={0.5}
                chaos={0.12}
                thickness={2}
                style={{ borderRadius: 16 }}
                className="w-full h-full text-center"
              >
                <div className="flex flex-col items-center justify-center p-3 lg:gap-4 lg:py-7 lg:px-10 h-full min-h-[0px] lg:min-h-[150px] lg:max-h-[155px] rounded-2xl bg-[var(--glass-bg)] border border-[var(--glass-border)] backdrop-blur-[10px] transition-all duration-300 hover:-translate-y-2 hover:border-[rgba(216,236,248,0.3)] hover:shadow-[0_10px_30px_rgba(216,236,248,0.1)] text-center relative z-10">
                  <h3 className="text-xl sm:text-2xl lg:text-5xl font-extrabold text-white mb-1 lg:mb-4 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                    {stat.value}
                  </h3>
                  <p className="text-[var(--text-secondary)] text-[9px] sm:text-[10px] lg:text-sm font-medium tracking-wide uppercase leading-tight">
                    {stat.label}
                  </p>
                </div>
              </ElectricBorder>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}