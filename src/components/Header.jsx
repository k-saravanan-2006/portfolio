import React, { useState, useEffect } from 'react';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-400 ease-in-out ${
        scrolled
          ? 'bg-[#05060f]/70 backdrop-blur-md border-b border-[var(--color-brand-border)] py-4'
          : 'py-6'
      }`}
    >
      <div className="container mx-auto px-8 flex justify-between items-center max-w-[1200px]">
        <h1 className="text-3xl font-extrabold tracking-tighter">
          Milad<span className="text-[var(--color-brand-glow)]">.</span>
        </h1>
        <nav className="hidden md:block">
          <ul className="flex gap-10 list-none m-0 p-0">
            {['Home', 'About', 'Work', 'Gallery', 'Contact'].map((item) => (
              <li key={item}>
                <a
                  href={`#${item.toLowerCase() === 'work' ? 'projects' : item.toLowerCase()}`}
                  className="relative text-[15px] font-medium opacity-80 pb-1 transition-all duration-300 hover:opacity-100 hover:text-white"
                >
                  {item}
                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[var(--color-brand-glow)] shadow-[0_0_10px_var(--color-brand-glow)] transition-all duration-300 hover:w-full"></span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
