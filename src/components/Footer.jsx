import React from 'react';
import ShinyText from './ShinyText';

export default function Footer() {
  return (
    <footer className="py-[15px] bg-black/80 backdrop-blur-sm border-t border-[#111]">
      <div className="container mx-[22px] px-8 flex flex-row  justify-between text-sm text-gray-500">

        {/* Left side */}
        <ShinyText
          text={`© ${new Date().getFullYear()} Saravanan K. All rights reserved.`}
          speed={4.8}
          delay={0.3}
          color="#919191b1"
          shineColor="#edf4f3ff"
          spread={25}
          direction="left"
          yoyo={false}
          pauseOnHover={false}
          disabled={false}
        />

        {/* Right side */}
        <ShinyText
          text={`Built with React, Vite & Tailwind CSS.`}
          speed={4.8}
          delay={0.3}
          color="#919191b1"
          shineColor="#edf4f3ff"
          spread={25}
          direction="left"
          yoyo={false}
          pauseOnHover={false}
          disabled={false}
        />

      </div>
    </footer>
  );
}