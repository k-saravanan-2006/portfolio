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

  const navLinks = [
    { title: 'Home', href: '#home' },
    { title: 'Coding Profiles', href: '#coding-profiles' },
    { title: 'Experience', href: '#experience' },
    { title: 'Projects', href: '#projects' },
    { title: 'Skills', href: '#skills' },
    { title: 'About', href: '#about' },
    { title: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-400 ease-in-out ${
        scrolled
          ? 'bg-[#0a0a0a]/90 backdrop-blur-md border-b border-[#222] py-4 shadow-lg'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-12 flex justify-between items-center max-w-[1400px]">
        {/* Placeholder for Left Side / Logo (Empty or invisible for now to match screenshot flow) */}
        <div></div>

        <nav className="hidden md:block">
          <ul className="flex gap-8 list-none m-0 p-0 items-center">
            {navLinks.map((item, index) => (
              <li key={item.title}>
                <a
                  href={item.href}
                  className={`relative text-[14px] font-semibold tracking-wide transition-all duration-300 pb-2 ${
                    index === 0 ? 'text-white border-b-2 border-white' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {item.title}
                </a>
              </li>
            ))}
            {/* Dark Mode Icon Placeholder matching the screenshot */}
            <li className="ml-4">
              <button className="flex items-center justify-center w-[40px] h-[40px] rounded-lg border border-gray-700 text-gray-300 hover:text-white hover:border-gray-500 transition-colors bg-[#111]">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 256 256">
                  <path d="M216.71,152.61a96,96,0,1,1-113.3-113.3,8,8,0,0,1,10.14,10.14,80,80,0,1,0,93.06,93.06A8,8,0,0,1,216.71,152.61Z" />
                </svg>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
