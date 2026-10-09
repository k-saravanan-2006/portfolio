import React from 'react';
import { Github, Linkedin, Code2, Award, Terminal, Mail } from 'lucide-react';
import ShinyText from '../ui/ShinyText';

export const FooterSection: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: 'GitHub', icon: <Github size={15} />, url: 'https://github.com/k-saravanan-2006' },
    { name: 'LinkedIn', icon: <Linkedin size={15} />, url: 'https://www.linkedin.com/in/k-saravanan-14b03132a/' },
    { name: 'LeetCode', icon: <Code2 size={15} />, url: 'https://leetcode.com/u/K_SARAVANAN/' },
    { name: 'SkillRack', icon: <Award size={15} />, url: 'https://www.skillrack.com/faces/resume.xhtml?id=494274&key=c6656285d433d6f25b8b37f07312a1b086e8525f' },
    { name: 'CodeChef', icon: <Terminal size={15} />, url: 'https://www.codechef.com/users/k_saravanan' },
    { name: 'Email', icon: <Mail size={15} />, url: 'mailto:saravanankumar8285@gmail.com' }
  ];

  // Repeat for continuous marquee ticker effect
  const tickerItems = [...socialLinks, ...socialLinks, ...socialLinks];

  return (
    <div style={{ position: 'relative', zIndex: 10, backgroundColor: '#050608' }}>
      {/* Social Ticker Marquee with reduced height */}
      <div
        style={{
          width: '100%',
          backgroundColor: 'rgba(10, 12, 16, 0.95)',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          overflow: 'hidden',
          padding: '8px 0',
          display: 'flex'
        }}
      >
        <div
          className="marquee-track"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '32px',
            whiteSpace: 'nowrap',
            animation: 'marqueeScroll 35s linear infinite'
          }}
        >
          <style>{`
            @keyframes marqueeScroll {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .marquee-track:hover {
              animation-play-state: paused;
            }
          `}</style>
          {tickerItems.map((item, idx) => (
            <a
              key={idx}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                color: 'rgba(248, 250, 252, 0.8)',
                textDecoration: 'none',
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                fontWeight: 600,
                padding: '2px 10px',
                transition: 'color 0.2s, transform 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#38bdf8';
                e.currentTarget.style.transform = 'scale(1.06)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'rgba(248, 250, 252, 0.8)';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <span style={{ color: '#38bdf8' }}>{item.icon}</span>
              <span>{item.name}</span>
            </a>
          ))}
        </div>
      </div>

      {/* Main Footer with ShinyText & compact height */}
      <footer
        style={{
          padding: '10px 0',
          backgroundColor: '#050608'
        }}
      >
        <div
          className="container"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px',
            fontFamily: 'var(--font-mono)',
            fontSize: '12px'
          }}
        >
          <div>
            <ShinyText
              text={`© ${currentYear} Saravanan K. All rights reserved.`}
              speed={2.5}
              color="rgba(248, 250, 252, 0.65)"
              shineColor="#20CFFF"
              spread={120}
            />
          </div>

          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <ShinyText
              text="Sri Sairam Engineering College // AI & DS"
              speed={2.5}
              color="rgba(248, 250, 252, 0.65)"
              shineColor="#ffffff"
              spread={120}
            />
            <span className="text-gradient-blue" style={{ fontWeight: 600 }}>
              Chennai, India
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};
