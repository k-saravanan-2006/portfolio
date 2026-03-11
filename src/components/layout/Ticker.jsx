import React from 'react';
import { GithubLogo, LinkedinLogo, EnvelopeSimple, Phone, Globe } from '@phosphor-icons/react';

export default function Ticker() {
  const links = [
    { name: 'GitHub', icon: GithubLogo, url: 'https://github.com/k-saravanan-2006' },
    { name: 'LinkedIn', icon: LinkedinLogo, url: 'https://www.linkedin.com/in/k-saravanan-14b03132a/' },
    { name: 'LeetCode', icon: Globe, url: 'https://leetcode.com/u/K_SARAVANAN/' },
    { name: 'SkillRack', icon: Globe, url: 'https://www.skillrack.com/faces/resume.xhtml?id=494274&key=c6656285d433d6f25b8b37f07312a1b086e8525f' },
    { name: 'CodeChef', icon: Globe, url: '#' },
    { name: 'Email', icon: EnvelopeSimple, url: 'mailto:saravanankumar8285@gmail.com' },
    { name: 'Phone', icon: Phone, url: 'tel:+910000000000' },
  ];

  // Duplicate items to create a seamless infinite scrolling effect
  const tickerItems = [...links, ...links, ...links];

  return (
    <div className="w-full bg-[#111] border-y border-[#222] overflow-hidden py-3 flex mt-3">
      <div className="flex animate-[ticker_40s_linear_infinite] w-max hover:[animation-play-state:paused]">
        {tickerItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <a
              key={idx}
              href={item.url}
              className="group flex items-center gap-3 px-8 text-white border-r border-[#333] last:border-r-0 whitespace-nowrap !no-underline transition-all duration-300 ease-out hover:!text-[#00b4a6] hover:scale-150 hover:z-20 relative"
              style={{ textDecoration: 'none !important' }}
            >
              <Icon
                size={20}
                weight="fill"
                className="transition-all duration-300 drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] group-hover:drop-shadow-[0_0_15px_rgb(0,180,166)] group-hover:scale-110"
              />
              <span
                className="font-semibold transition-all duration-300 drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] group-hover:drop-shadow-[0_0_15px_rgb(0,180,166)]"
              >
                {item.name}
              </span>
            </a>
          );
        })}
      </div>
    </div>
  );
}
