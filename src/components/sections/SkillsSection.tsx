import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '../../animation/gsapConfig';
import { Skills3DMarquee, SkillItem } from '../ui/Skills3DMarquee';

const ALL_SKILLS: SkillItem[] = [
  // Programming & Core
  {
    id: 'c',
    title: 'C',
    description: 'Fundamental system-level programming language.',
    accentColor: '#38bdf8',
    accentRgb: '56, 189, 248'
  },
  {
    id: 'python',
    title: 'Python',
    description: 'Versatile general-purpose programming language.',
    accentColor: '#ffd43b',
    accentRgb: '255, 212, 59'
  },
  {
    id: 'javascript',
    title: 'JavaScript',
    description: 'Core web interactivity & scripting language.',
    accentColor: '#f7df1e',
    accentRgb: '247, 223, 30'
  },
  {
    id: 'java',
    title: 'Java',
    description: 'Object-oriented application language.',
    accentColor: '#f97316',
    accentRgb: '249, 115, 22'
  },
  {
    id: 'html',
    title: 'HTML',
    description: 'Structure of the World Wide Web.',
    accentColor: '#ef4444',
    accentRgb: '239, 68, 68'
  },
  {
    id: 'css',
    title: 'CSS',
    description: 'Styling and layout of web pages.',
    accentColor: '#0284c7',
    accentRgb: '2, 132, 199'
  },
  {
    id: 'numpy',
    title: 'NumPy',
    description: 'Numerical computing with Python arrays.',
    accentColor: '#00CFFF',
    accentRgb: '0, 207, 255'
  },
  {
    id: 'matplotlib',
    title: 'Matplotlib',
    description: 'Create static, animated & interactive charts.',
    accentColor: '#14b8a6',
    accentRgb: '20, 184, 166'
  },
  {
    id: 'seaborn',
    title: 'Seaborn',
    description: 'Statistical data visualization in Python.',
    accentColor: '#60a5fa',
    accentRgb: '96, 165, 250'
  },
  {
    id: 'flutter',
    title: 'Flutter',
    description: 'Cross-platform mobile UI framework by Google.',
    accentColor: '#0284c7',
    accentRgb: '2, 132, 199'
  },
  // Frameworks
  {
    id: 'react',
    title: 'React.js',
    description: 'Building dynamic user interfaces.',
    accentColor: '#00CFFF',
    accentRgb: '0, 207, 255'
  },
  {
    id: 'node',
    title: 'Node.js',
    description: 'JavaScript runtime for the backend.',
    accentColor: '#22c55e',
    accentRgb: '34, 197, 94'
  },
  {
    id: 'flask',
    title: 'Flask',
    description: 'Lightweight Python web framework.',
    accentColor: '#cbd5e1',
    accentRgb: '203, 213, 225'
  },
  {
    id: 'fastapi',
    title: 'FastAPI',
    description: 'High-performance async Python APIs.',
    accentColor: '#14b8a6',
    accentRgb: '20, 184, 166'
  },
  {
    id: 'mongodb',
    title: 'MongoDB',
    description: 'NoSQL document database.',
    accentColor: '#22c55e',
    accentRgb: '34, 197, 94'
  },
  {
    id: 'mysql',
    title: 'MySQL',
    description: 'Relational database management.',
    accentColor: '#0284c7',
    accentRgb: '2, 132, 199'
  },
  {
    id: 'tailwind',
    title: 'Tailwind',
    description: 'Utility-first CSS framework.',
    accentColor: '#06b6d4',
    accentRgb: '6, 182, 212'
  },
  {
    id: 'pytorch',
    title: 'PyTorch',
    description: 'Deep learning research framework.',
    accentColor: '#ee4c2c',
    accentRgb: '238, 76, 44'
  },
  {
    id: 'opencv',
    title: 'OpenCV',
    description: 'Real-time computer vision library.',
    accentColor: '#6366f1',
    accentRgb: '99, 102, 241'
  },
  {
    id: 'langchain',
    title: 'LangChain',
    description: 'Building LLM-powered AI applications.',
    accentColor: '#a855f7',
    accentRgb: '168, 85, 247'
  },
  // Tools
  {
    id: 'git',
    title: 'Git',
    description: 'Distributed version control system.',
    accentColor: '#f05032',
    accentRgb: '240, 80, 50'
  },
  {
    id: 'github',
    title: 'GitHub',
    description: 'Cloud-hosted Git repository platform.',
    accentColor: '#cbd5e1',
    accentRgb: '203, 213, 225'
  },
  {
    id: 'docker',
    title: 'Docker',
    description: 'Containerize and ship applications anywhere.',
    accentColor: '#2496ed',
    accentRgb: '36, 150, 237'
  },
  {
    id: 'jupyter',
    title: 'Jupyter',
    description: 'Interactive Python notebooks for data science.',
    accentColor: '#f37626',
    accentRgb: '243, 118, 38'
  },
  {
    id: 'vscode',
    title: 'VS Code',
    description: 'Fast, extensible source code editor by Microsoft.',
    accentColor: '#007acc',
    accentRgb: '0, 122, 204'
  }
];

export const SkillsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const showcaseRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 85%',
            once: true
          }
        }
      );
    }

    if (showcaseRef.current) {
      gsap.fromTo(
        showcaseRef.current,
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: showcaseRef.current,
            start: 'top 85%',
            once: true
          }
        }
      );
    }
  }, { scope: sectionRef });

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative z-10 min-h-screen min-h-[100vh] min-h-[100dvh] flex flex-col justify-start pt-[80px] sm:pt-[96px] pb-[10px] overflow-hidden bg-[#020611] w-full"
      style={{
        backgroundColor: '#020611',
        paddingBottom: '10px'
      }}
    >
      {/* Background Layer: Exact match to Experience section */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundColor: '#020611',
          zIndex: 0
        }}
      />

      {/* Subtle ambient cyan radial tint centered */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(56, 189, 248, 0.08) 0%, rgba(2, 6, 17, 0) 55%)',
          zIndex: 0
        }}
      />

      {/* Smooth Scroll Grid Texture - visible with softened shadow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(79, 79, 79, 0.18) 1px, transparent 1px), linear-gradient(to bottom, rgba(79, 79, 79, 0.18) 1px, transparent 1px)',
          backgroundSize: '54px 54px',
          maskImage: 'radial-gradient(circle at 50% 50%, black 0%, rgba(0, 0, 0, 0.9) 35%, rgba(0, 0, 0, 0.4) 55%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(circle at 50% 50%, black 0%, rgba(0, 0, 0, 0.9) 35%, rgba(0, 0, 0, 0.4) 55%, transparent 70%)',
          zIndex: 0
        }}
      />

      {/* Inner circle dark shadow vignette - softened dark shadow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, transparent 35%, rgba(2, 6, 17, 0.45) 60%, #020611 85%)',
          zIndex: 0
        }}
      />
      {/* Bottom transition blend to match next section (#020611) seamlessly */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-16 z-20"
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, #020611 100%)'
        }}
      />
      {/* Section Heading */}
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 text-center shrink-0">
        <div ref={headerRef}>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-2">
            My <span className="text-gradient-blue">Expertise</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed mb-0">
            Core programming languages, machine learning frameworks, reactive frontends, and developer tooling.
          </p>
        </div>
      </div>

      {/* Animated Showcase Container covering the ENTIRE width of the section */}
      <div
        ref={showcaseRef}
        className="w-full flex-1 flex justify-center items-center overflow-hidden px-0 mt-3 sm:mt-5"
      >
        <Skills3DMarquee skills={ALL_SKILLS} className="w-full" />
      </div>
    </section>
  );
};

export default SkillsSection;
