import React from 'react';

export default function About() {
  const stats = [
    { value: '500+', label: 'Problems Solved Across All Platforms' },
    { value: '5+', label: 'Projects Completed' },
    { value: '9.02', label: 'College CGPA' }
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-8 max-w-[1200px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Narrative Content */}
          <div data-aos="fade-right" data-aos-duration="1000">
            <h2 className="text-[clamp(2.5rem,4vw,3.5rem)] font-extrabold mb-8 tracking-tight">
              Who I <span className="text-[var(--color-brand-glow)]">Am.</span>
            </h2>
            <div className="text-[1.1rem] text-[var(--text-secondary)] space-y-6 leading-relaxed">
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
          <div className="flex flex-col gap-6" data-aos="fade-left" data-aos-duration="1000" data-aos-delay="200">
            {stats.map((stat, idx) => (
              <div 
                key={idx}
                className="flex flex-col items-center justify-center p-10 rounded-2xl bg-[var(--glass-bg)] border border-[var(--glass-border)] backdrop-blur-[10px] transition-all duration-300 hover:-translate-y-2 hover:border-[rgba(216,236,248,0.3)] hover:shadow-[0_10px_30px_rgba(216,236,248,0.1)] text-center"
              >
                <h3 className="text-5xl font-extrabold text-white mb-4 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                  {stat.value}
                </h3>
                <p className="text-[var(--text-secondary)] text-sm font-medium tracking-wide uppercase">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
