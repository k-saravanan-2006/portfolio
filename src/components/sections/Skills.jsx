import React, { useState, useRef, useCallback, useEffect } from 'react';
import Orb from '../ui/Orb';

const SKILL_GROUPS = [
  {
    category: 'Programming & Core',
    direction: 'left',
    logos: [
      { src: '/image/py/C.svg', title: 'C', description: 'Fundamental system-level programming language.' },
      { src: '/image/py/Python.svg', title: 'Python', description: 'Versatile general-purpose programming language.' },
      { src: '/image/extras/JavaScript.svg', title: 'JavaScript', description: 'Core web interactivity & scripting language.' },
      { src: '/image/py/Java.svg', title: 'Java', description: 'Object-oriented application language.' },
      { src: '/image/web/HTML5.svg', title: 'HTML', description: 'Structure of the World Wide Web.' },
      { src: '/image/web/CSS3.svg', title: 'CSS', description: 'Styling and layout of web pages.' },
      { src: '/image/py/NumPy.svg', title: 'NumPy', description: 'Numerical computing with Python arrays.' },
      { src: '/image/py/Matplotlib.svg', title: 'Matplotlib', description: 'Create static, animated & interactive charts.' },
      { src: '/image/extras/Seaborn.svg', title: 'Seaborn', description: 'Statistical data visualization in Python.' },
      { src: '/image/web/Flutter.svg', title: 'Flutter', description: 'Cross-platform mobile UI framework by Google.' },
    ],
  },
  {
    category: 'Frameworks',
    direction: 'right',
    logos: [
      { src: '/image/web/React.svg', title: 'React.js', description: 'Building dynamic user interfaces.' },
      { src: '/image/web/Node.js.svg', title: 'Node.js', description: 'JavaScript runtime for the backend.' },
      { src: '/image/py/Flask.svg', title: 'Flask', description: 'Lightweight Python web framework.' },
      { src: '/image/web/FastAPI.svg', title: 'FastAPI', description: 'High-performance async Python APIs.' },
      { src: '/image/web/Flutter.svg', title: 'Flutter', description: 'Cross-platform mobile UI framework.' },
      { src: '/image/web/MongoDB.svg', title: 'MongoDB', description: 'NoSQL document database.' },
      { src: '/image/web/MySQL.svg', title: 'MySQL', description: 'Relational database management.' },
      { src: '/image/web/Tailwind CSS.svg', title: 'Tailwind', description: 'Utility-first CSS framework.' },
      { src: '/image/py/PyTorch.svg', title: 'PyTorch', description: 'Deep learning research framework.' },
      { src: '/image/py/OpenCV.svg', title: 'OpenCV', description: 'Real-time computer vision library.' },
      { src: '/image/py/langchain-icon-seeklogo.svg', title: 'LangChain', description: 'Building LLM-powered AI applications.' },
    ],
  },
  {
    category: 'Tools',
    direction: 'left',
    logos: [
      { src: '/image/plt/Git.svg', title: 'Git', description: 'Distributed version control system.' },
      { src: '/image/plt/GitHub.svg', title: 'GitHub', description: 'Cloud-hosted Git repository platform.' },
      { src: '/image/plt/Docker.svg', title: 'Docker', description: 'Containerize and ship applications anywhere.' },
      { src: '/image/plt/Jupyter.svg', title: 'Jupyter', description: 'Interactive Python notebooks for data science.' },
      { src: '/image/plt/Visual Studio Code (VS Code).svg', title: 'VS Code', description: 'Fast, extensible source code editor by Microsoft.' },
    ],
  },
];

function LogoItemCard({ item, logoHeight }) {
  const [hovered, setHovered] = useState(false);
  const [cardPos, setCardPos] = useState({ x: 0, y: 0 });
  const wrapRef = useRef(null);

  const handleEnter = useCallback(() => {
    if (wrapRef.current) {
      const r = wrapRef.current.getBoundingClientRect();
      setCardPos({ x: r.left + r.width / 2, y: r.top });
    }
    setHovered(true);
  }, []);

  const handleLeave = useCallback(() => {
    setHovered(false);
  }, []);

  return (
    <>
      <div
        ref={wrapRef}
        className="flex flex-col items-center justify-center cursor-pointer select-none"
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        style={{ margin: '0 8px' }}
      >
        <img
          src={item.src}
          alt={item.title}
          title={item.title}
          loading="lazy"
          draggable={false}
          style={{
            height: `${logoHeight}px`,
            width: 'auto',
            objectFit: 'contain',
            transition: 'transform 0.3s cubic-bezier(0.34,1.56,0.64,1), filter 0.3s ease',
            transform: hovered ? 'scale(1.25)' : 'scale(1)',
            filter: hovered
              ? 'drop-shadow(0 0 10px rgba(0,229,204,0.85)) brightness(1.1)'
              : 'none',
          }}
        />
      </div>

      {/* Fixed-position card — renders above overflow boundary */}
      {hovered && (
        <div style={{
          position: 'fixed',
          left: cardPos.x,
          top: cardPos.y,
          transform: 'translate(-50%, calc(-100% - 16px))',
          zIndex: 9999,
          pointerEvents: 'none',
        }}>
          <div style={{
            background: 'rgba(6, 6, 16, 0.9)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(0, 229, 204, 0.45)',
            borderRadius: '16px',
            padding: '14px 20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '6px',
            boxShadow: '0 8px 40px rgba(0,180,166,0.3), 0 2px 12px rgba(0,0,0,0.75)',
            animation: 'cardPopIn 0.2s cubic-bezier(0.34,1.56,0.64,1)',
            minWidth: '150px',
          }}>
            <img src={item.src} alt={item.title} style={{ height: '42px', width: 'auto', objectFit: 'contain', marginBottom: '4px' }} />
            <span style={{ color: '#fff', fontWeight: 800, fontSize: '0.92rem', letterSpacing: '0.04em', whiteSpace: 'nowrap' }}>
              {item.title}
            </span>
            <span style={{ color: 'rgba(255,255,255,0.58)', fontSize: '0.73rem', textAlign: 'center', maxWidth: '175px', whiteSpace: 'normal', lineHeight: 1.45 }}>
              {item.description}
            </span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '-1px' }}>
            <div style={{ width: 0, height: 0, borderLeft: '8px solid transparent', borderRight: '8px solid transparent', borderTop: '8px solid rgba(0,229,204,0.45)' }} />
          </div>
        </div>
      )}
    </>
  );
}

function SkillRow({ group }) {
  const logoHeight = 72;

  return (
    <div className="w-full flex flex-wrap justify-center items-center gap-6 px-8 py-4">
      {group.logos.map((item, i) => (
        <LogoItemCard key={i} item={item} logoHeight={logoHeight} onActiveChange={() => { }} />
      ))}
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="min-h-screen w-full relative overflow-hidden bg-black flex flex-col items-center justify-center pt-28 pb-20">
      {/* Orb animated background */}
      <div className="absolute inset-0 z-0" style={{ opacity: 0.35, pointerEvents: 'none' }}>
        <Orb
          hue={0}
          hoverIntensity={2}
          rotateOnHover={true}
          forceHoverState={false}
          backgroundColor="#000000"
        />
      </div>
      <style>{`
        @keyframes cardPopIn {
          from { opacity: 0; transform: translateX(-50%) scale(0.75); }
          to   { opacity: 1; transform: translateX(-50%) scale(1); }
        }
      `}</style>

      <div className="container mx-auto px-4 sm:px-8 max-w-[1200px] text-center w-full z-10 mb-14">
        <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-extrabold tracking-tight" data-aos="fade-up">
          My <span className="text-[var(--color-brand-glow)]">Expertise.</span>
        </h2>
      </div>

      <div className="w-full flex flex-col gap-10 z-10" data-aos="fade-up" data-aos-delay="100">
        {SKILL_GROUPS.map((group) => (
          <div key={group.category} className="flex flex-col items-center gap-4">
            {/* Row title */}
            <div className="flex items-center gap-4 px-6 w-full max-w-[900px]">
              <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, transparent, rgba(0,229,204,0.45))' }} />
              <span style={{
                color: 'rgba(0,229,204,0.9)',
                fontSize: '0.7rem',
                fontWeight: 700,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                padding: '5px 16px',
                borderRadius: '999px',
                border: '1px solid rgba(0,229,204,0.22)',
                background: 'rgba(0,229,204,0.06)',
                whiteSpace: 'nowrap',
              }}>
                {group.category}
              </span>
              <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to left, transparent, rgba(0,229,204,0.45))' }} />
            </div>

            {/* Scrolling row */}
            <div style={{ paddingTop: '6px', paddingBottom: '24px', width: '100%' }}>
              <SkillRow group={group} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
