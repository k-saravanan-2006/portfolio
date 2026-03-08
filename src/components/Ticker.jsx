import React from 'react';
import { GithubLogo, LinkedinLogo, EnvelopeSimple, Phone, Globe } from '@phosphor-icons/react';

export default function Ticker() {
  const links = [
    { name: 'GitHub', icon: GithubLogo, url: '#' },
    { name: 'LinkedIn', icon: LinkedinLogo, url: '#' },
    { name: 'LeetCode', icon: Globe, url: '#' },
    { name: 'CodeForces', icon: Globe, url: '#' },
    { name: 'CodeChef', icon: Globe, url: '#' },
    { name: 'Email', icon: EnvelopeSimple, url: 'mailto:saravanan@example.com' },
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
