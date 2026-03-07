import React from 'react';

export default function Footer() {
  return (
    <footer className="border-t border-[var(--glass-border)] py-16 pb-8 bg-[#05060f]/80 backdrop-blur-sm">
      <div className="container mx-auto px-8 max-w-[1200px] flex flex-col items-center gap-8">
        <div className="text-3xl font-extrabold tracking-tighter">
          Milad<span className="text-[var(--color-brand-glow)] drop-shadow-[0_0_10px_rgba(216,236,248,0.5)]">.</span>
        </div>
        <ul className="flex gap-8 list-none m-0 p-0">
          {['Home', 'About', 'Work'].map((item) => (
            <li key={item}>
              <a
                href={`#${item.toLowerCase() === 'work' ? 'projects' : item.toLowerCase()}`}
                className="opacity-70 transition-all duration-300 hover:opacity-100 hover:text-[var(--color-brand-glow)] hover:drop-shadow-[0_0_10px_rgba(216,236,248,0.3)]"
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
        <p className="text-[0.9rem] opacity-50 mt-4">&copy; 2026 Milad. All rights reserved.</p>
      </div>
    </footer>
  );
}
