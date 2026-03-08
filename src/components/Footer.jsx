import React from 'react';
import ShinyText from './ShinyText';

export default function Footer() {
  return (
    <footer className="py-[18px] bg-black/80 backdrop-blur-sm border-t border-[#111]">
      <div className="container mx-auto px-8 flex flex-row items-center justify-between text-sm text-gray-500">
        <p>
          <ShinyText
            text={`© ${new Date().getFullYear()} Saravanan K. All rights reserved.`}
            speed={4.8}
            delay={0.3}
            color="#919191"
            shineColor="#00b4a6"
            spread={25}
            direction="left"
            yoyo={false}
            pauseOnHover={false}
            disabled={false}
          />
        </p>
        <p>Built with <span className="text-gray-300">React</span>, <span className="text-gray-300">Vite</span> & <span className="text-gray-300">Tailwind CSS</span>.</p>
      </div>
    </footer>
  );
}
