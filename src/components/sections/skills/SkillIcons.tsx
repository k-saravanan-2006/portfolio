import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

export const SkillIcon: React.FC<{ name: string; size?: number; className?: string }> = ({
  name,
  size = 38,
  className = ''
}) => {
  const s = size;

  switch (name) {
    case 'C':
      return (
        <svg width={s} height={s} viewBox="0 0 128 128" className={className} aria-label="C programming language logo">
          <defs>
            <linearGradient id="c-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1e40af" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
            <filter id="c-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#2563eb" floodOpacity="0.4" />
            </filter>
          </defs>
          <path
            d="M64 8 L114 36 L114 92 L64 120 L14 92 L14 36 Z"
            fill="url(#c-grad)"
            stroke="#60a5fa"
            strokeWidth="3.5"
            filter="url(#c-glow)"
          />
          {/* Stylized White C */}
          <path
            d="M78 40 C65 38 48 45 44 64 C40 82 55 90 78 88 L82 76 C68 78 58 74 58 64 C58 54 68 50 82 52 Z"
            fill="#ffffff"
          />
        </svg>
      );

    case 'Python':
      return (
        <svg width={s} height={s} viewBox="0 0 128 128" className={className} aria-label="Python logo">
          <defs>
            <linearGradient id="py-blue" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#387eb8" />
              <stop offset="100%" stopColor="#2563eb" />
            </linearGradient>
            <linearGradient id="py-yellow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffe873" />
              <stop offset="100%" stopColor="#ffd43b" />
            </linearGradient>
          </defs>
          {/* Top Blue Snake */}
          <path
            d="M63 12 C44 12 45 20 45 20 L45 29 L64 29 L64 32 L34 32 C20 32 12 42 12 55 C12 70 20 74 27 74 L34 74 L34 64 C34 50 44 50 44 50 L64 50 C76 50 82 42 82 32 C82 20 74 12 63 12 Z M53 20 C56 20 58 22 58 25 C58 28 56 30 53 30 C50 30 48 28 48 25 C48 22 50 20 53 20 Z"
            fill="url(#py-blue)"
          />
          {/* Bottom Yellow Snake */}
          <path
            d="M65 116 C84 116 83 108 83 108 L83 99 L64 99 L64 96 L94 96 C108 96 116 86 116 73 C116 58 108 54 101 54 L94 54 L94 64 C94 78 84 78 84 78 L64 78 C52 78 46 86 46 96 C46 108 54 116 65 116 Z M75 108 C72 108 70 106 70 103 C70 100 72 98 75 98 C78 98 80 100 80 103 C80 106 78 108 75 108 Z"
            fill="url(#py-yellow)"
          />
        </svg>
      );

    case 'JavaScript':
      return (
        <svg width={s} height={s} viewBox="0 0 128 128" className={className} aria-label="JavaScript logo">
          <rect width="128" height="128" rx="20" fill="#f7df1e" />
          <path
            d="M38 102 C42 104 48 106 56 106 C68 106 74 99 74 88 L74 46 L58 46 L58 87 C58 92 55 94 50 94 C46 94 42 92 39 90 Z"
            fill="#18181b"
          />
          <path
            d="M78 98 C84 103 93 106 102 106 C116 106 124 99 124 88 C124 78 116 72 104 67 C95 63 90 60 90 55 C90 50 95 47 101 47 C107 47 113 49 118 53 L123 41 C117 37 110 35 101 35 C88 35 77 42 77 55 C77 64 83 71 96 76 C105 80 110 83 110 89 C110 95 104 98 97 98 C90 98 83 95 78 90 Z"
            fill="#18181b"
          />
        </svg>
      );

    case 'Java':
      return (
        <svg width={s} height={s} viewBox="0 0 128 128" className={className} aria-label="Java logo">
          <defs>
            <linearGradient id="java-red" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f97316" />
              <stop offset="100%" stopColor="#ea580c" />
            </linearGradient>
            <linearGradient id="java-blue" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#0284c7" />
            </linearGradient>
          </defs>
          {/* Steam curves */}
          <path
            d="M66 18 C74 28 60 38 68 48 C72 53 78 55 76 60 C73 66 56 63 52 54 C48 43 62 34 58 24 C56 20 60 16 66 18 Z"
            fill="url(#java-red)"
          />
          <path
            d="M48 28 C54 36 44 44 50 52 C53 56 58 58 56 62 C53 66 40 64 36 56 C32 48 44 41 41 33 C39 30 43 27 48 28 Z"
            fill="url(#java-red)"
            opacity="0.85"
          />
          {/* Cup & Saucer Base */}
          <path
            d="M32 78 C32 94 50 102 68 102 C86 102 104 94 104 78 L32 78 Z"
            fill="url(#java-blue)"
          />
          <path
            d="M92 80 C106 80 114 88 114 96 C114 104 102 108 92 108 L92 100 C98 100 104 98 104 94 C104 90 98 88 92 88 Z"
            fill="url(#java-blue)"
          />
          <path
            d="M24 108 C40 116 96 116 112 108 C100 114 36 114 24 108 Z"
            fill="url(#java-blue)"
            opacity="0.75"
          />
        </svg>
      );

    case 'HTML':
      return (
        <svg width={s} height={s} viewBox="0 0 128 128" className={className} aria-label="HTML5 logo">
          <defs>
            <linearGradient id="html-orange" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="50%" stopColor="#e44d26" />
              <stop offset="50%" stopColor="#f16529" />
            </linearGradient>
          </defs>
          <path d="M19 14 L28 114 L64 124 L100 114 L109 14 Z" fill="url(#html-orange)" />
          {/* White '5' */}
          <path
            d="M64 32 L64 48 L86 48 L84 68 L64 68 L64 84 L78 80 L79 69 L95 69 L93 93 L64 102 L64 86 L49 82 L47 50 L64 50 L64 32 L33 32 L37 84 L64 92 L64 108 L30 98 L24 20 L64 20 Z"
            fill="#ffffff"
            opacity="0.95"
          />
        </svg>
      );

    case 'CSS':
      return (
        <svg width={s} height={s} viewBox="0 0 128 128" className={className} aria-label="CSS3 logo">
          <defs>
            <linearGradient id="css-blue" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="50%" stopColor="#1572b6" />
              <stop offset="50%" stopColor="#33a9dc" />
            </linearGradient>
          </defs>
          <path d="M19 14 L28 114 L64 124 L100 114 L109 14 Z" fill="url(#css-blue)" />
          {/* White '3' */}
          <path
            d="M64 32 L95 32 L93 50 L64 50 L64 64 L86 64 L84 84 L64 90 L49 85 L48 72 L32 72 L34 94 L64 104 L94 94 L98 32 L64 32 Z M35 32 L36 48 L64 48 L64 32 Z"
            fill="#ffffff"
            opacity="0.95"
          />
        </svg>
      );

    case 'NumPy':
      return (
        <svg width={s} height={s} viewBox="0 0 128 128" className={className} aria-label="NumPy logo">
          <defs>
            <linearGradient id="numpy-cube" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4dabcf" />
              <stop offset="100%" stopColor="#013243" />
            </linearGradient>
          </defs>
          {/* Isometric Cube Grid with 'N' */}
          <polygon points="64,12 114,40 64,68 14,40" fill="#4dabcf" stroke="#38bdf8" strokeWidth="2" />
          <polygon points="14,40 64,68 64,120 14,92" fill="#035375" stroke="#38bdf8" strokeWidth="2" />
          <polygon points="64,68 114,40 114,92 64,120" fill="#013243" stroke="#38bdf8" strokeWidth="2" />
          <text
            x="64"
            y="76"
            textAnchor="middle"
            fill="#ffffff"
            fontFamily="sans-serif"
            fontWeight="900"
            fontSize="46"
            letterSpacing="-2"
          >
            N
          </text>
        </svg>
      );

    case 'Matplotlib':
      return (
        <svg width={s} height={s} viewBox="0 0 128 128" className={className} aria-label="Matplotlib logo">
          <circle cx="64" cy="64" r="54" fill="#0f172a" stroke="#38bdf8" strokeWidth="3" />
          {/* Wheel wedges */}
          <path d="M64 64 L64 16 A48 48 0 0 1 106 40 Z" fill="#14b8a6" />
          <path d="M64 64 L106 40 A48 48 0 0 1 112 64 Z" fill="#0ea5e9" />
          <path d="M64 64 L112 64 A48 48 0 0 1 88 106 Z" fill="#3b82f6" />
          <path d="M64 64 L88 106 A48 48 0 0 1 40 106 Z" fill="#f59e0b" />
          <path d="M64 64 L40 106 A48 48 0 0 1 16 64 Z" fill="#ef4444" />
          <path d="M64 64 L16 64 A48 48 0 0 1 64 16 Z" fill="#10b981" />
          <circle cx="64" cy="64" r="16" fill="#050c19" stroke="#ffffff" strokeWidth="3" />
        </svg>
      );

    case 'Seaborn':
      return (
        <svg width={s} height={s} viewBox="0 0 128 128" className={className} aria-label="Seaborn logo">
          <defs>
            <linearGradient id="seaborn-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1e3a8a" />
              <stop offset="100%" stopColor="#0284c7" />
            </linearGradient>
          </defs>
          <circle cx="64" cy="64" r="52" fill="url(#seaborn-grad)" stroke="#60a5fa" strokeWidth="3" />
          {/* Sinusoidal Wave Lines */}
          <path
            d="M20 74 C36 40 50 88 68 56 C82 32 98 70 108 58"
            fill="none"
            stroke="#ffffff"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <path
            d="M20 84 C36 56 52 94 68 70 C82 50 96 82 108 72"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="3.5"
            strokeLinecap="round"
            opacity="0.85"
          />
        </svg>
      );

    case 'Flutter':
      return (
        <svg width={s} height={s} viewBox="0 0 128 128" className={className} aria-label="Flutter logo">
          {/* Top Chevron */}
          <path d="M72 16 L22 66 L38 82 L104 16 Z" fill="#02569b" />
          {/* Bottom Chevron split */}
          <path d="M62 76 L42 96 L74 128 L104 128 L72 96 Z" fill="#0175c2" />
          <path d="M72 96 L52 116 L64 128 L84 128 Z" fill="#00CFFF" />
          <path d="M72 96 L104 64 L84 64 L52 96 Z" fill="#13b9fd" />
        </svg>
      );

    case 'React.js':
      return (
        <svg width={s} height={s} viewBox="0 0 128 128" className={className} aria-label="React.js logo">
          <ellipse cx="64" cy="64" rx="48" ry="18" fill="none" stroke="#61dafb" strokeWidth="4.5" />
          <ellipse cx="64" cy="64" rx="48" ry="18" fill="none" stroke="#61dafb" strokeWidth="4.5" transform="rotate(60 64 64)" />
          <ellipse cx="64" cy="64" rx="48" ry="18" fill="none" stroke="#61dafb" strokeWidth="4.5" transform="rotate(120 64 64)" />
          <circle cx="64" cy="64" r="8" fill="#61dafb" />
        </svg>
      );

    case 'Node.js':
      return (
        <svg width={s} height={s} viewBox="0 0 128 128" className={className} aria-label="Node.js logo">
          <path
            d="M64 12 L112 40 L112 92 L64 120 L16 92 L16 40 Z"
            fill="#339933"
            stroke="#22c55e"
            strokeWidth="3.5"
          />
          <text
            x="64"
            y="76"
            textAnchor="middle"
            fill="#ffffff"
            fontFamily="sans-serif"
            fontWeight="900"
            fontSize="38"
            letterSpacing="-1"
          >
            JS
          </text>
        </svg>
      );

    case 'Flask':
      return (
        <svg width={s} height={s} viewBox="0 0 128 128" className={className} aria-label="Flask logo">
          {/* Chemistry horn flask */}
          <path
            d="M56 16 L72 16 L72 40 C72 44 76 52 82 60 L102 92 C108 102 102 114 90 116 L38 116 C26 114 20 102 26 92 L46 60 C52 52 56 44 56 40 Z"
            fill="none"
            stroke="#f8fafc"
            strokeWidth="6"
            strokeLinejoin="round"
          />
          <path d="M52 16 L76 16" stroke="#f8fafc" strokeWidth="6" strokeLinecap="round" />
          {/* Liquid content with bubble */}
          <path
            d="M36 104 L92 104 C96 104 98 100 96 96 L86 80 C80 82 72 78 64 80 C56 82 48 78 42 80 L32 96 C30 100 32 104 36 104 Z"
            fill="#38bdf8"
            opacity="0.8"
          />
          <circle cx="56" cy="92" r="3" fill="#ffffff" />
          <circle cx="72" cy="88" r="2" fill="#ffffff" />
        </svg>
      );

    case 'FastAPI':
      return (
        <svg width={s} height={s} viewBox="0 0 128 128" className={className} aria-label="FastAPI logo">
          <circle cx="64" cy="64" r="54" fill="#009688" stroke="#14b8a6" strokeWidth="3" />
          {/* Lightning Bolt */}
          <path
            d="M68 20 L36 68 L60 68 L52 108 L92 56 L68 56 Z"
            fill="#ffffff"
            stroke="#ffffff"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </svg>
      );

    case 'MongoDB':
      return (
        <svg width={s} height={s} viewBox="0 0 128 128" className={className} aria-label="MongoDB logo">
          <defs>
            <linearGradient id="mongo-leaf" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#47a248" />
              <stop offset="100%" stopColor="#3fa037" />
            </linearGradient>
          </defs>
          <path
            d="M64 12 C64 12 34 50 34 76 C34 98 48 114 64 122 C80 114 94 98 94 76 C94 50 64 12 64 12 Z"
            fill="url(#mongo-leaf)"
            stroke="#22c55e"
            strokeWidth="2"
          />
          <path
            d="M64 18 L64 118 C61 116 58 112 56 108 L64 74 L62 40 Z"
            fill="#ffffff"
            opacity="0.6"
          />
        </svg>
      );

    case 'MySQL':
      return (
        <svg width={s} height={s} viewBox="0 0 128 128" className={className} aria-label="MySQL logo">
          {/* Blue Dolphin Sakila Silhouette */}
          <path
            d="M20 90 C28 62 48 34 72 26 C90 20 106 28 110 38 C104 38 96 34 88 38 C76 44 68 56 60 70 C52 84 38 94 20 90 Z"
            fill="#00758f"
          />
          <path
            d="M48 48 C42 42 36 40 30 42 C36 48 42 54 48 48 Z"
            fill="#f29111"
          />
          <text
            x="64"
            y="114"
            textAnchor="middle"
            fill="#f29111"
            fontFamily="sans-serif"
            fontWeight="bold"
            fontSize="26"
            letterSpacing="0.5"
          >
            MySQL
          </text>
        </svg>
      );

    case 'Tailwind':
      return (
        <svg width={s} height={s} viewBox="0 0 128 128" className={className} aria-label="Tailwind CSS logo">
          <path
            d="M34 56 C40 38 52 32 70 38 C60 48 60 54 70 60 C80 66 84 74 78 86 C72 100 58 104 42 98 C50 88 50 82 42 76 C34 70 30 64 34 56 Z"
            fill="#06b6d4"
          />
          <path
            d="M66 32 C72 20 80 16 92 20 C86 28 86 32 92 36 C98 40 102 46 98 54 C94 62 84 66 74 62 C80 54 80 50 74 46 C68 42 64 38 66 32 Z"
            fill="#38bdf8"
            opacity="0.9"
          />
        </svg>
      );

    case 'PyTorch':
      return (
        <svg width={s} height={s} viewBox="0 0 128 128" className={className} aria-label="PyTorch logo">
          {/* Flame icon */}
          <path
            d="M64 26 C64 26 84 46 84 68 C84 84 74 96 64 102 C54 96 44 84 44 68 C44 56 52 46 52 46 C52 46 48 56 50 64 C52 70 58 76 64 76 C70 76 74 70 74 62 C74 46 64 36 64 26 Z"
            fill="#ee4c2c"
          />
          <circle cx="78" cy="32" r="5" fill="#ee4c2c" />
        </svg>
      );

    case 'OpenCV':
      return (
        <svg width={s} height={s} viewBox="0 0 128 128" className={className} aria-label="OpenCV logo">
          {/* Top Red circle */}
          <circle cx="64" cy="38" r="22" fill="none" stroke="#ef4444" strokeWidth="9" />
          {/* Bottom Left Green circle */}
          <circle cx="42" cy="84" r="22" fill="none" stroke="#22c55e" strokeWidth="9" />
          {/* Bottom Right Blue circle */}
          <circle cx="86" cy="84" r="22" fill="none" stroke="#3b82f6" strokeWidth="9" />
        </svg>
      );

    case 'LangChain':
      return (
        <svg width={s} height={s} viewBox="0 0 128 128" className={className} aria-label="LangChain logo">
          <defs>
            <linearGradient id="chain-cyan" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#0284c7" />
            </linearGradient>
            <linearGradient id="chain-purple" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="#7c3aed" />
            </linearGradient>
          </defs>
          {/* Interlocked Chain links */}
          <rect
            x="24"
            y="48"
            width="50"
            height="32"
            rx="16"
            transform="rotate(-40 49 64)"
            fill="none"
            stroke="url(#chain-cyan)"
            strokeWidth="9"
          />
          <rect
            x="54"
            y="48"
            width="50"
            height="32"
            rx="16"
            transform="rotate(-40 79 64)"
            fill="none"
            stroke="url(#chain-purple)"
            strokeWidth="9"
          />
        </svg>
      );

    case 'Git':
      return (
        <svg width={s} height={s} viewBox="0 0 128 128" className={className} aria-label="Git logo">
          <rect x="22" y="22" width="84" height="84" rx="18" fill="#f05032" transform="rotate(45 64 64)" />
          {/* Git Branch Lines & Dots */}
          <g transform="rotate(45 64 64)">
            <circle cx="48" cy="48" r="7" fill="#ffffff" />
            <circle cx="80" cy="80" r="7" fill="#ffffff" />
            <circle cx="48" cy="80" r="7" fill="#ffffff" />
            <line x1="48" y1="48" x2="48" y2="80" stroke="#ffffff" strokeWidth="5" />
            <path d="M80 80 C80 62 48 68 48 54" fill="none" stroke="#ffffff" strokeWidth="5" />
          </g>
        </svg>
      );

    case 'GitHub':
      return (
        <svg width={s} height={s} viewBox="0 0 128 128" className={className} aria-label="GitHub logo">
          <circle cx="64" cy="64" r="54" fill="#0f172a" stroke="#cbd5e1" strokeWidth="2.5" />
          <path
            d="M64 24 C41.9 24 24 41.9 24 64 C24 81.7 35.5 96.7 51.4 102 C53.4 102.4 54.1 101.1 54.1 100.1 C54.1 99.2 54.1 96.6 54.1 93.3 C43 95.7 40.6 88 40.6 88 C38.8 83.4 36.2 82.2 36.2 82.2 C32.6 79.7 36.5 79.8 36.5 79.8 C40.5 80.1 42.6 83.9 42.6 83.9 C46.1 89.9 51.9 88.2 54.2 87.1 C54.6 84.6 55.6 82.8 56.7 81.8 C47.8 80.8 38.5 77.4 38.5 62.1 C38.5 57.7 40.1 54.1 42.6 51.3 C42.2 50.3 40.8 46.2 43 40.7 C43 40.7 46.4 39.6 54.1 44.8 C57.3 43.9 60.7 43.5 64.1 43.5 C67.5 43.5 70.9 43.9 74.1 44.8 C81.8 39.6 85.2 40.7 85.2 40.7 C87.4 46.2 86 50.3 85.6 51.3 C88.2 54.1 89.7 57.7 89.7 62.1 C89.7 77.5 80.3 80.8 71.4 81.8 C72.8 83 74.1 85.5 74.1 89.3 C74.1 94.8 74 99.2 74 100.1 C74 101.1 74.7 102.4 76.8 102 C92.7 96.6 104.1 81.7 104.1 64 C104.1 41.9 86.1 24 64 24 Z"
            fill="#ffffff"
          />
        </svg>
      );

    case 'Docker':
      return (
        <svg width={s} height={s} viewBox="0 0 128 128" className={className} aria-label="Docker logo">
          {/* Whale body */}
          <path
            d="M116 68 C112 68 106 72 104 76 C96 74 86 78 82 82 C74 76 60 76 46 80 C36 82 24 90 20 100 C40 108 92 108 114 90 C120 86 122 76 116 68 Z"
            fill="#2496ed"
          />
          {/* Container boxes */}
          <g fill="#0284c7" stroke="#38bdf8" strokeWidth="1.5">
            <rect x="42" y="60" width="10" height="9" rx="1.5" />
            <rect x="54" y="60" width="10" height="9" rx="1.5" />
            <rect x="66" y="60" width="10" height="9" rx="1.5" />
            <rect x="54" y="49" width="10" height="9" rx="1.5" />
            <rect x="66" y="49" width="10" height="9" rx="1.5" />
            <rect x="78" y="60" width="10" height="9" rx="1.5" />
            <rect x="30" y="60" width="10" height="9" rx="1.5" />
          </g>
        </svg>
      );

    case 'Jupyter':
      return (
        <svg width={s} height={s} viewBox="0 0 128 128" className={className} aria-label="Jupyter logo">
          {/* Orange Top & Bottom crescents */}
          <path
            d="M26 64 C26 40 43 22 64 22 C85 22 102 40 102 64 C90 48 76 44 64 44 C52 44 38 48 26 64 Z"
            fill="#f37626"
          />
          <path
            d="M26 64 C26 88 43 106 64 106 C85 106 102 88 102 64 C90 80 76 84 64 84 C52 84 38 80 26 64 Z"
            fill="#f37626"
          />
          {/* Moon dots */}
          <circle cx="34" cy="38" r="8" fill="#767677" />
          <circle cx="94" cy="38" r="8" fill="#f37626" />
          <circle cx="34" cy="90" r="8" fill="#e5e7eb" />
        </svg>
      );

    case 'VS Code':
      return (
        <svg width={s} height={s} viewBox="0 0 128 128" className={className} aria-label="VS Code logo">
          <path d="M96 16 L118 26 L118 102 L96 112 L44 76 L96 16 Z" fill="#0065a9" />
          <path d="M96 112 L44 76 L22 92 L10 82 L34 64 L10 46 L22 36 L44 52 L96 16 Z" fill="#007acc" />
          <path d="M96 16 L44 52 L96 88 L118 72 L118 26 Z" fill="#1f9cf0" opacity="0.9" />
          <path d="M44 76 L96 112 L118 102 L118 72 L96 88 Z" fill="#0065a9" />
        </svg>
      );

    default:
      return (
        <div
          style={{ width: s, height: s }}
          className="rounded-lg bg-sky-500/20 border border-sky-400/40 flex items-center justify-center text-sky-300 font-bold text-xs"
        >
          {name.slice(0, 2).toUpperCase()}
        </div>
      );
  }
};
