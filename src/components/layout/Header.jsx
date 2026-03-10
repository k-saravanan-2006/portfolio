import React, { useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

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

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const targetId = href.replace('#', '');

    if (targetId === 'home') {
      gsap.to(window, {
        scrollTo: 0,
        duration: 1.2,
        ease: "power4.inOut",
        overwrite: true
      });
      return;
    }

    const sections = gsap.utils.toArray('.stack-section');
    const targetIndex = sections.findIndex(section =>
      section.querySelector(`#${targetId}`) || section.id === targetId
    );

    if (targetIndex !== -1) {
      const targetSection = sections[targetIndex];
      gsap.to(window, {
        scrollTo: { y: targetSection.offsetTop, autoKill: false },
        duration: 1.5,
        ease: "expo.inOut",
        overwrite: true
      });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-400 ease-in-out backdrop-blur-md ${scrolled
        ? 'bg-[#0a0a0a]/90 border-b border-[#222] py-4 shadow-lg'
        : 'bg-white/10 py-6 border-b border-white/10 shadow-sm'
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
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="relative inline-block text-[14px] font-semibold tracking-wide transition-all duration-300 pb-2 text-white no-underline hover-text-glow hover:scale-110 hover:-translate-y-0.5"
                  style={{ textDecoration: 'none' }}
                >
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
