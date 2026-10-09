import React from 'react';

export const SkillDecoration: React.FC<{ name: string; accentColor: string }> = ({ name, accentColor }) => {
  switch (name) {
    case 'C':
      // Honeycomb hex lattice
      return (
        <svg
          viewBox="0 0 100 80"
          className="absolute right-0 top-0 w-28 h-24 pointer-events-none opacity-25 transition-opacity duration-300 group-hover:opacity-45"
          fill="none"
          stroke={accentColor}
          strokeWidth="1.2"
        >
          <polygon points="70,10 85,18 85,35 70,43 55,35 55,18" />
          <polygon points="100,10 115,18 115,35 100,43 85,35 85,18" />
          <polygon points="85,35 100,43 100,60 85,68 70,60 70,43" />
          <polygon points="55,35 70,43 70,60 55,68 40,60 40,43" />
        </svg>
      );

    case 'Python':
      // Particle waves and orbital constellation
      return (
        <svg
          viewBox="0 0 120 80"
          className="absolute right-0 top-0 w-32 h-24 pointer-events-none opacity-20 transition-opacity duration-300 group-hover:opacity-40"
          fill="none"
        >
          <path d="M20 70 Q 60 20 120 40" stroke="#ffd43b" strokeWidth="1.2" strokeDasharray="2 3" />
          <path d="M10 80 Q 70 30 130 60" stroke="#38bdf8" strokeWidth="1" />
          <circle cx="90" cy="35" r="2.5" fill="#ffd43b" />
          <circle cx="110" cy="50" r="1.5" fill="#38bdf8" />
          <circle cx="65" cy="45" r="2" fill="#ffd43b" />
        </svg>
      );

    case 'JavaScript':
      // Golden flowing wave ribbons
      return (
        <svg
          viewBox="0 0 100 80"
          className="absolute right-0 bottom-0 w-28 h-20 pointer-events-none opacity-25 transition-opacity duration-300 group-hover:opacity-45"
          fill="none"
          stroke="#f7df1e"
          strokeWidth="1.2"
        >
          <path d="M0 60 Q 40 20 100 50" />
          <path d="M20 70 Q 60 35 100 65" opacity="0.6" />
          <path d="M40 75 Q 70 45 100 72" opacity="0.35" />
        </svg>
      );

    case 'Java':
      // Fiery heat curves & steam embers
      return (
        <svg
          viewBox="0 0 100 80"
          className="absolute right-0 bottom-0 w-28 h-22 pointer-events-none opacity-25 transition-opacity duration-300 group-hover:opacity-45"
          fill="none"
          stroke="#f97316"
          strokeWidth="1.3"
        >
          <path d="M50 70 C 60 40 45 30 75 10" />
          <path d="M65 75 C 75 50 60 40 90 20" opacity="0.6" />
          <circle cx="78" cy="18" r="2" fill="#ea580c" />
          <circle cx="92" cy="28" r="1.5" fill="#f97316" />
        </svg>
      );

    case 'HTML':
      // Faded </> code bracket watermark
      return (
        <svg
          viewBox="0 0 100 80"
          className="absolute right-2 top-2 w-24 h-20 pointer-events-none opacity-20 transition-opacity duration-300 group-hover:opacity-40"
          fill="none"
          stroke="#ef4444"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M35 25 L15 45 L35 65" />
          <path d="M55 20 L40 70" />
          <path d="M60 25 L80 45 L60 65" />
        </svg>
      );

    case 'CSS':
      // Faded '3' shield watermark
      return (
        <svg
          viewBox="0 0 100 80"
          className="absolute right-2 top-2 w-22 h-20 pointer-events-none opacity-20 transition-opacity duration-300 group-hover:opacity-40"
          fill="none"
          stroke="#38bdf8"
          strokeWidth="2"
        >
          <path d="M40 15 L75 15 L68 65 L55 72 L42 65 Z" />
          <path d="M50 28 L68 28 L64 44 L50 44 L50 56 L60 52 L62 46" strokeWidth="1.8" />
        </svg>
      );

    case 'NumPy':
      // Isometric 3D wireframe cube mesh
      return (
        <svg
          viewBox="0 0 100 80"
          className="absolute right-2 top-2 w-24 h-20 pointer-events-none opacity-25 transition-opacity duration-300 group-hover:opacity-45"
          fill="none"
          stroke="#38bdf8"
          strokeWidth="1.2"
        >
          <polygon points="65,10 95,25 65,40 35,25" />
          <polygon points="35,25 65,40 65,70 35,55" />
          <polygon points="65,40 95,25 95,55 65,70" />
          <line x1="50" y1="17" x2="80" y2="32" strokeDasharray="2 2" />
        </svg>
      );

    case 'Matplotlib':
      // Histogram bar chart columns & trend line
      return (
        <svg
          viewBox="0 0 100 80"
          className="absolute right-2 bottom-2 w-24 h-18 pointer-events-none opacity-20 transition-opacity duration-300 group-hover:opacity-40"
          fill="none"
          stroke="#14b8a6"
          strokeWidth="1.5"
        >
          <rect x="40" y="45" width="8" height="25" fill="#14b8a6" opacity="0.3" />
          <rect x="52" y="30" width="8" height="40" fill="#0ea5e9" opacity="0.3" />
          <rect x="64" y="20" width="8" height="50" fill="#3b82f6" opacity="0.3" />
          <rect x="76" y="35" width="8" height="35" fill="#f59e0b" opacity="0.3" />
          <path d="M38 52 Q 60 15 88 32" stroke="#38bdf8" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );

    case 'Seaborn':
      // Gaussian distribution curve / statistical area wave
      return (
        <svg
          viewBox="0 0 100 80"
          className="absolute right-0 bottom-0 w-28 h-20 pointer-events-none opacity-25 transition-opacity duration-300 group-hover:opacity-45"
          fill="none"
          stroke="#60a5fa"
          strokeWidth="1.5"
        >
          <path
            d="M10 70 C 40 70 45 15 65 15 C 80 15 85 70 100 70"
            fill="rgba(96, 165, 250, 0.12)"
          />
          <path d="M20 70 C 45 70 55 35 75 35 C 88 35 95 70 100 70" stroke="#38bdf8" strokeDasharray="3 2" />
        </svg>
      );

    case 'Flutter':
      // Smartphone outline wireframe
      return (
        <svg
          viewBox="0 0 100 80"
          className="absolute right-3 top-2 w-20 h-22 pointer-events-none opacity-20 transition-opacity duration-300 group-hover:opacity-40"
          fill="none"
          stroke="#38bdf8"
          strokeWidth="1.5"
          rx="6"
        >
          <rect x="46" y="8" width="40" height="64" rx="6" />
          <line x1="60" y1="14" x2="72" y2="14" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="66" cy="65" r="2.5" />
        </svg>
      );

    case 'React.js':
      // Browser window wireframe
      return (
        <svg
          viewBox="0 0 100 80"
          className="absolute right-2 top-2 w-24 h-20 pointer-events-none opacity-20 transition-opacity duration-300 group-hover:opacity-40"
          fill="none"
          stroke="#00CFFF"
          strokeWidth="1.3"
        >
          <rect x="25" y="12" width="68" height="52" rx="4" />
          <line x1="25" y1="24" x2="93" y2="24" strokeWidth="1" />
          <circle cx="33" cy="18" r="1.8" fill="#00CFFF" />
          <circle cx="39" cy="18" r="1.8" fill="#00CFFF" />
          <circle cx="45" cy="18" r="1.8" fill="#00CFFF" />
          <rect x="33" y="32" width="24" height="24" rx="2" strokeDasharray="2 2" />
          <line x1="64" y1="36" x2="85" y2="36" />
          <line x1="64" y1="44" x2="80" y2="44" />
        </svg>
      );

    case 'Node.js':
      // Green honeycomb hex lattice
      return (
        <svg
          viewBox="0 0 100 80"
          className="absolute right-0 top-0 w-28 h-22 pointer-events-none opacity-25 transition-opacity duration-300 group-hover:opacity-45"
          fill="none"
          stroke="#22c55e"
          strokeWidth="1.2"
        >
          <polygon points="70,12 84,20 84,36 70,44 56,36 56,20" />
          <polygon points="98,12 112,20 112,36 98,44 84,36 84,20" />
          <polygon points="84,36 98,44 98,60 84,68 70,60 70,44" />
          <polygon points="56,36 70,44 70,60 56,68 42,60 42,44" />
        </svg>
      );

    case 'Flask':
      // Chemistry flask silhouette
      return (
        <svg
          viewBox="0 0 100 80"
          className="absolute right-2 top-2 w-22 h-22 pointer-events-none opacity-20 transition-opacity duration-300 group-hover:opacity-40"
          fill="none"
          stroke="#cbd5e1"
          strokeWidth="1.5"
        >
          <path d="M60 12 L68 12 L68 28 L82 56 C86 64 80 72 70 72 L45 72 C35 72 29 64 33 56 L47 28 L47 12 Z" />
          <circle cx="58" cy="58" r="2" fill="#38bdf8" />
          <circle cx="68" cy="52" r="1.5" fill="#38bdf8" />
        </svg>
      );

    case 'FastAPI':
      // Diagonal electric speed lines
      return (
        <svg
          viewBox="0 0 100 80"
          className="absolute right-0 top-0 w-28 h-24 pointer-events-none opacity-25 transition-opacity duration-300 group-hover:opacity-50"
          fill="none"
          stroke="#14b8a6"
          strokeWidth="1.5"
        >
          <line x1="50" y1="10" x2="25" y2="70" strokeDasharray="6 4" />
          <line x1="70" y1="10" x2="45" y2="70" strokeWidth="2" />
          <line x1="90" y1="10" x2="65" y2="70" strokeDasharray="10 3" />
        </svg>
      );

    case 'MongoDB':
      // Database cylinder stacks
      return (
        <svg
          viewBox="0 0 100 80"
          className="absolute right-3 top-2 w-20 h-22 pointer-events-none opacity-25 transition-opacity duration-300 group-hover:opacity-45"
          fill="none"
          stroke="#22c55e"
          strokeWidth="1.5"
        >
          <ellipse cx="68" cy="22" rx="20" ry="7" />
          <path d="M48 22 L48 40 C48 44 57 47 68 47 C79 47 88 44 88 40 L88 22" />
          <path d="M48 40 L48 58 C48 62 57 65 68 65 C79 65 88 62 88 58 L88 40" />
        </svg>
      );

    case 'MySQL':
      // 3-tier Relational Database Cylinder
      return (
        <svg
          viewBox="0 0 100 80"
          className="absolute right-3 top-2 w-20 h-22 pointer-events-none opacity-25 transition-opacity duration-300 group-hover:opacity-45"
          fill="none"
          stroke="#0284c7"
          strokeWidth="1.5"
        >
          <ellipse cx="68" cy="20" rx="22" ry="7" />
          <path d="M46 20 L46 36 C46 40 56 43 68 43 C80 43 90 40 90 36 L90 20" />
          <path d="M46 36 L46 52 C46 56 56 59 68 59 C80 59 90 56 90 52 L90 36" />
          <path d="M46 52 L46 68 C46 72 56 75 68 75 C80 75 90 72 90 68 L90 52" />
        </svg>
      );

    case 'Tailwind':
      // Flowing CSS Bezier wind waves
      return (
        <svg
          viewBox="0 0 100 80"
          className="absolute right-0 bottom-0 w-28 h-20 pointer-events-none opacity-25 transition-opacity duration-300 group-hover:opacity-45"
          fill="none"
          stroke="#06b6d4"
          strokeWidth="1.5"
        >
          <path d="M0 65 Q 40 25 70 50 T 110 35" />
          <path d="M10 75 Q 50 35 80 60 T 120 45" opacity="0.6" />
        </svg>
      );

    case 'PyTorch':
      // Neural network node graph
      return (
        <svg
          viewBox="0 0 100 80"
          className="absolute right-2 top-2 w-24 h-22 pointer-events-none opacity-25 transition-opacity duration-300 group-hover:opacity-45"
          fill="none"
          stroke="#ee4c2c"
          strokeWidth="1.2"
        >
          <line x1="50" y1="20" x2="80" y2="35" />
          <line x1="50" y1="20" x2="70" y2="60" />
          <line x1="80" y1="35" x2="70" y2="60" />
          <line x1="80" y1="35" x2="95" y2="50" />
          <circle cx="50" cy="20" r="3" fill="#ee4c2c" />
          <circle cx="80" cy="35" r="3" fill="#ee4c2c" />
          <circle cx="70" cy="60" r="3" fill="#ee4c2c" />
          <circle cx="95" cy="50" r="2.5" fill="#ee4c2c" />
        </svg>
      );

    case 'OpenCV':
      // Computer vision camera frame & crosshairs
      return (
        <svg
          viewBox="0 0 100 80"
          className="absolute right-2 top-2 w-22 h-20 pointer-events-none opacity-25 transition-opacity duration-300 group-hover:opacity-45"
          fill="none"
          stroke="#6366f1"
          strokeWidth="1.5"
        >
          {/* Target box corners */}
          <path d="M45 22 L35 22 L35 32" />
          <path d="M85 22 L95 22 L95 32" />
          <path d="M45 68 L35 68 L35 58" />
          <path d="M85 68 L95 68 L95 58" />
          <circle cx="65" cy="45" r="5" stroke="#22c55e" strokeDasharray="2 2" />
          <line x1="65" y1="35" x2="65" y2="55" stroke="#ef4444" strokeWidth="1" />
          <line x1="55" y1="45" x2="75" y2="45" stroke="#ef4444" strokeWidth="1" />
        </svg>
      );

    case 'LangChain':
      // AI chat / robot watermark
      return (
        <svg
          viewBox="0 0 100 80"
          className="absolute right-2 top-2 w-22 h-20 pointer-events-none opacity-25 transition-opacity duration-300 group-hover:opacity-45"
          fill="none"
          stroke="#a855f7"
          strokeWidth="1.5"
        >
          <rect x="46" y="24" width="44" height="34" rx="6" />
          <circle cx="59" cy="40" r="2.5" fill="#a855f7" />
          <circle cx="77" cy="40" r="2.5" fill="#a855f7" />
          <line x1="68" y1="16" x2="68" y2="24" strokeWidth="2" />
          <circle cx="68" cy="14" r="2" fill="#38bdf8" />
          <path d="M56 64 L64 58" />
        </svg>
      );

    case 'Git':
      // Branching commit graph
      return (
        <svg
          viewBox="0 0 100 80"
          className="absolute right-2 top-2 w-24 h-22 pointer-events-none opacity-25 transition-opacity duration-300 group-hover:opacity-45"
          fill="none"
          stroke="#f05032"
          strokeWidth="1.4"
        >
          <circle cx="48" cy="65" r="3" fill="#f05032" />
          <circle cx="48" cy="25" r="3" fill="#f05032" />
          <circle cx="78" cy="40" r="3" fill="#f05032" />
          <line x1="48" y1="25" x2="48" y2="65" />
          <path d="M48 65 C68 65 78 55 78 40" />
        </svg>
      );

    case 'GitHub':
      // Planetary orbital ring
      return (
        <svg
          viewBox="0 0 100 80"
          className="absolute right-1 top-1 w-24 h-22 pointer-events-none opacity-20 transition-opacity duration-300 group-hover:opacity-40"
          fill="none"
          stroke="#e2e8f0"
          strokeWidth="1.4"
        >
          <circle cx="68" cy="42" r="16" fill="rgba(255,255,255,0.04)" />
          <ellipse cx="68" cy="42" rx="28" ry="8" transform="rotate(-25 68 42)" strokeDasharray="4 2" />
        </svg>
      );

    case 'Docker':
      // 3D isometric container blocks
      return (
        <svg
          viewBox="0 0 100 80"
          className="absolute right-2 top-2 w-24 h-20 pointer-events-none opacity-25 transition-opacity duration-300 group-hover:opacity-45"
          fill="none"
          stroke="#2496ed"
          strokeWidth="1.3"
        >
          <polygon points="60,20 80,10 95,18 75,28" />
          <polygon points="60,20 75,28 75,44 60,36" fill="rgba(36, 150, 237, 0.15)" />
          <polygon points="75,28 95,18 95,34 75,44" />
          <polygon points="45,36 60,28 75,36 60,44" strokeDasharray="2 2" />
        </svg>
      );

    case 'Jupyter':
      // Interactive notebook cell watermark
      return (
        <svg
          viewBox="0 0 100 80"
          className="absolute right-2 top-2 w-22 h-20 pointer-events-none opacity-20 transition-opacity duration-300 group-hover:opacity-40"
          fill="none"
          stroke="#f37626"
          strokeWidth="1.4"
        >
          <rect x="42" y="16" width="50" height="48" rx="4" />
          <line x1="50" y1="28" x2="84" y2="28" />
          <line x1="50" y1="36" x2="74" y2="36" />
          <line x1="50" y1="46" x2="80" y2="46" stroke="#38bdf8" />
        </svg>
      );

    case 'VS Code':
      // Editor window with sidebar and syntax lines
      return (
        <svg
          viewBox="0 0 100 80"
          className="absolute right-2 top-2 w-24 h-20 pointer-events-none opacity-25 transition-opacity duration-300 group-hover:opacity-45"
          fill="none"
          stroke="#007acc"
          strokeWidth="1.3"
        >
          <rect x="32" y="14" width="60" height="52" rx="4" />
          <line x1="46" y1="14" x2="46" y2="66" strokeWidth="1" />
          <line x1="52" y1="24" x2="80" y2="24" stroke="#38bdf8" />
          <line x1="56" y1="32" x2="72" y2="32" />
          <line x1="56" y1="40" x2="84" y2="40" stroke="#f59e0b" />
          <line x1="52" y1="48" x2="68" y2="48" />
        </svg>
      );

    default:
      return null;
  }
};
