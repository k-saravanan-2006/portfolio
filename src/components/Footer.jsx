import React from 'react';

export default function Footer() {
  return (
    <footer className="py-8 bg-black/80 backdrop-blur-sm border-t border-[#111]">
      <div className="container mx-auto px-8 flex flex-col md:flex-row items-center justify-between text-center gap-4 text-sm text-gray-500">
        <p>&copy; {new Date().getFullYear()} Saravanan K. All rights reserved.</p>
        <p>Built with <span className="text-gray-300">React</span>, <span className="text-gray-300">Vite</span> & <span className="text-gray-300">Tailwind CSS</span>.</p>
      </div>
    </footer>
  );
}
