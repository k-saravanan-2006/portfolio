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
    <div className="w-full bg-[#111] border-y border-[#222] overflow-hidden py-4 flex mt-20">
      <div className="flex animate-[ticker_40s_linear_infinite] w-max hover:[animation-play-state:paused]">
        {tickerItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <a 
              key={idx}
              href={item.url}
              className="flex items-center gap-3 px-8 text-gray-400 hover:text-[var(--color-brand-glow)] transition-colors duration-300 border-r border-[#333] last:border-r-0 whitespace-nowrap"
            >
              <Icon size={20} weight="fill" />
              <span className="font-semibold">{item.name}</span>
            </a>
          );
        })}
      </div>
    </div>
  );
}
