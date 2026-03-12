import React, { useState, useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { List, X } from '@phosphor-icons/react';

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navRef = useRef(null);
  const linkRefs = useRef({});
  const indicatorRef = useRef(null);
  const mobileMenuRef = useRef(null);

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

  // Animate the indicator to the active link (Desktop Only)
  useEffect(() => {
    const activeLink = linkRefs.current[activeSection];
    const indicator = indicatorRef.current;
    if (activeLink && indicator && window.innerWidth >= 768) {
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

  // Mobile menu animation
  useEffect(() => {
    if (mobileMenuRef.current) {
      if (mobileMenuOpen) {
        gsap.to(mobileMenuRef.current, {
          autoAlpha: 1,
          y: 0,
          duration: 0.4,
          ease: 'power3.out'
        });
      } else {
        gsap.to(mobileMenuRef.current, {
          autoAlpha: 0,
          y: -20,
          duration: 0.3,
          ease: 'power3.in'
        });
      }
    }
  }, [mobileMenuOpen]);

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
    setMobileMenuOpen(false);
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
        : 'bg-black/20 py-[19px] border-b border-white/10 shadow-sm'
        }`}
    >
      <div className="container mx-auto px-6 md:px-10 flex justify-between items-center max-w-[1400px]">
        {/* Logo / Brand Name */}
        <div 
          className="text-xl font-bold tracking-tighter"
          style={{
            background: 'linear-gradient(to right, #00b4a6, #ffffff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 0 15px rgba(0, 180, 166, 0.3)'
          }}
        >
          SK
        </div>

        {/* Desktop Nav */}
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

        {/* Mobile menu button */}
        <button
          className="md:hidden text-white p-2 focus:outline-none z-50 transition-all active:scale-90"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          {mobileMenuOpen ? (
            <X size={28} weight="bold" className="text-[rgb(0,180,166)] shadow-[0_0_10px_rgba(0,180,166,0.5)]" />
          ) : (
            <List size={28} weight="bold" />
          )}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        ref={mobileMenuRef}
        className="absolute top-full left-0 w-full bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-[#222] md:hidden overflow-hidden invisible opacity-0"
        style={{ pointerEvents: mobileMenuOpen ? 'auto' : 'none' }}
      >
        <ul className="flex flex-col items-center py-10 gap-6 list-none m-0 p-0">
          {navLinks.map((item) => {
            const sectionId = item.href.replace('#', '');
            const isActive = activeSection === sectionId;
            return (
              <li key={item.title} className="w-full text-center">
                <a
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`block text-xl font-bold tracking-widest transition-all duration-300 py-2 ${
                    isActive ? 'text-[rgb(0,180,166)] scale-110' : 'text-white/70 hover:text-white'
                  }`}
                  style={{
                    textDecoration: 'none',
                    textShadow: isActive ? '0 0 15px rgba(0, 180, 166, 0.6)' : 'none'
                  }}
                >
                  {item.title}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </header>
  );
}
