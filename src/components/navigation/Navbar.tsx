import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { ScrollTrigger } from '../../animation/gsapConfig';
import { scrollManager } from '../../animation/scroll/scrollManager';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('#home');

  const navLinks = [
    { title: 'Home', href: '#home' },
    { title: 'Coding Profiles', href: '#coding-profiles' },
    { title: 'Experience', href: '#experience' },
    { title: 'Projects', href: '#projects' },
    { title: 'Skills', href: '#skills' },
    { title: 'About', href: '#about' },
    { title: 'Contact', href: '#contact' }
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    scrollManager.scrollTo(href, { offset: href === '#home' ? 0 : -60 });
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  };

  // ScrollTrigger active section tracking
  useEffect(() => {
    const triggers: ScrollTrigger[] = [];

    // Small delay to ensure all DOM elements are mounted and sized
    const timer = setTimeout(() => {
      navLinks.forEach((link) => {
        const el = document.querySelector(link.href);
        if (el) {
          const st = ScrollTrigger.create({
            trigger: el,
            start: 'top 45%',
            end: 'bottom 45%',
            onEnter: () => setActiveSection(link.href),
            onEnterBack: () => setActiveSection(link.href)
          });
          triggers.push(st);
        }
      });
    }, 200);

    return () => {
      clearTimeout(timer);
      triggers.forEach((st) => st.kill());
    };
  }, []);

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 50,
        height: 'var(--header-height)',
        display: 'flex',
        alignItems: 'center',
        background: 'rgba(2, 6, 17, 0.45)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(80, 160, 255, 0.10)',
        transition: 'background-color 0.3s'
      }}
    >
      <div
        className="w-full px-4 sm:px-8 lg:px-10"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%'
        }}
      >
        {/* Left: SK Logo Monogram */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, '#home')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            textDecoration: 'none'
          }}
        >
          <div
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.15) 0%, rgba(2, 132, 199, 0.25) 100%)',
              border: '1px solid rgba(56, 189, 248, 0.35)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'var(--font-display)',
              fontSize: '16px',
              fontWeight: 800,
              color: '#f8fafc',
              letterSpacing: '0.04em',
              boxShadow: '0 0 14px rgba(56, 189, 248, 0.2)'
            }}
          >
            SK
          </div>
        </a>

        {/* Desktop Navigation: Horizontal list matching old portfolio */}
        <nav
          className="desktop-nav"
          style={{
            display: 'none',
            alignItems: 'center',
            gap: '22px'
          }}
        >
          <style>{`
            @media (min-width: 900px) {
              .desktop-nav { display: flex !important; }
              .mobile-toggle { display: none !important; }
            }
          `}</style>

          {navLinks.map((link) => {
            const isActive = activeSection === link.href;

            return (
              <a
                key={link.title}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={isActive ? "text-gradient-blue" : ""}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '14px',
                  fontWeight: isActive ? 600 : 500,
                  color: isActive ? undefined : 'rgba(248, 250, 252, 0.7)',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease, text-shadow 0.2s ease',
                  position: 'relative',
                  padding: '6px 2px',
                  textShadow: isActive ? '0 0 10px rgba(56, 189, 248, 0.5)' : 'none'
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = '#20CFFF';
                    e.currentTarget.style.textShadow = '0 0 8px rgba(32, 207, 255, 0.4)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = 'rgba(248, 250, 252, 0.7)';
                    e.currentTarget.style.textShadow = 'none';
                  }
                }}
              >
                {link.title}
                {isActive && (
                  <span
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '16px',
                      height: '2px',
                      backgroundColor: '#38bdf8',
                      boxShadow: '0 0 8px #38bdf8',
                      borderRadius: '2px'
                    }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Mobile Hamburger Toggle */}
        <button
          className="mobile-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Navigation Menu"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'transparent',
            border: 'none',
            color: '#f8fafc',
            cursor: 'pointer',
            padding: '8px'
          }}
        >
          {mobileMenuOpen ? <X size={22} color="#38bdf8" /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'absolute',
            top: 'var(--header-height)',
            left: 0,
            width: '100%',
            maxHeight: 'calc(100dvh - var(--header-height))',
            overflowY: 'auto',
            backgroundColor: 'rgba(2, 6, 17, 0.95)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            borderBottom: '1px solid rgba(80, 160, 255, 0.10)',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '18px'
          }}
        >
          {navLinks.map((link) => {
            const isActive = activeSection === link.href;

            return (
              <a
                key={link.title}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '16px',
                  fontWeight: 600,
                  color: isActive ? undefined : '#f8fafc',
                  textDecoration: 'none',
                  padding: '6px 0',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                {isActive && (
                  <span
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      backgroundColor: '#38bdf8',
                      boxShadow: '0 0 8px #38bdf8'
                    }}
                  />
                )}
                <span className={isActive ? "text-gradient-blue" : ""}>{link.title}</span>
              </a>
            );
          })}
        </div>
      )}
    </header>
  );
};
