import React, { useState, useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const navRef = useRef(null);
  const linkRefs = useRef({});
  const indicatorRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Detect active section on scroll
  useEffect(() => {
    const sectionIds = ['home', 'coding-profiles', 'experience', 'projects', 'skills', 'about', 'contact'];
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.35, rootMargin: '-80px 0px 0px 0px' }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Animate the indicator to the active link
  useEffect(() => {
    const activeLink = linkRefs.current[activeSection];
    const indicator = indicatorRef.current;
    if (activeLink && indicator) {
      const linkRect = activeLink.getBoundingClientRect();
      const navRect = navRef.current.getBoundingClientRect();
      gsap.to(indicator, {
        x: linkRect.left - navRect.left,
        width: linkRect.width,
        duration: 0.4,
        ease: 'power3.out',
      });
    }
  }, [activeSection]);

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

  const setLinkRef = useCallback((el, href) => {
    const id = href.replace('#', '');
    linkRefs.current[id] = el;
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-400 ease-in-out backdrop-blur-md ${scrolled
        ? 'bg-[#0a0a0a]/90 border-b border-[#222] py-[19px] shadow-lg'
        : 'bg-white/10 py-[19px] border-b border-white/10 shadow-sm'
        }`}
    >
      <div className="container mx-auto px-10 flex justify-between items-center max-w-[1400px]">
        {/* Placeholder for Left Side / Logo */}
        <div></div>

        <nav className="hidden md:block relative" ref={navRef}>
          <ul className="flex gap-8 list-none m-0 p-0 items-center">
            {navLinks.map((item) => {
              const sectionId = item.href.replace('#', '');
              return (
                <li key={item.title}>
                  <a
                    href={item.href}
                    ref={(el) => setLinkRef(el, item.href)}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="relative inline-block text-[14px] font-semibold tracking-wide transition-all duration-300 pb-2 no-underline hover-text-glow hover:scale-110 hover:-translate-y-0.5"
                    style={{ 
                      textDecoration: 'none',
                      color: activeSection === sectionId ? 'rgb(0, 180, 166)' : '#ffffff',
                      textShadow: activeSection === sectionId 
                        ? '0 0 8px rgba(0, 180, 166, 0.8), 0 0 20px rgba(0, 180, 166, 0.5), 0 0 40px rgba(0, 180, 166, 0.3)' 
                        : 'none',
                      transition: 'color 0.3s, text-shadow 0.3s',
                    }}
                  >
                    {item.title}
                  </a>
                </li>
              );
            })}
          </ul>
          {/* Animated sliding underline */}
          <div
            ref={indicatorRef}
            className="absolute bottom-0 h-[2px] rounded-full"
            style={{
              background: 'rgb(0, 180, 166)',
              boxShadow: '0 0 8px rgba(0, 180, 166, 0.6), 0 0 20px rgba(0, 180, 166, 0.3)',
              willChange: 'transform, width',
            }}
          />
        </nav>
      </div>
    </header>
  );
}
