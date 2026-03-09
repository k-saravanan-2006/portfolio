import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SectionStack = ({ children }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const sections = gsap.utils.toArray('.stack-section');
    if (sections.length === 0) return;

    let currentIndex = 0;
    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % sections.length;
      const targetSection = sections[currentIndex];
      
      // Calculate the scroll position for the target section
      // Each section is pinned, so they are effectively at their own 'top' in the flow
      // but ScrollTrigger calculates their positions based on the spacer height.
      // However, for this specific pinned 'stack' layout, we can use the index to determine the scroll offset.
      const scrollPos = currentIndex * window.innerHeight;
      
      window.scrollTo({
        top: scrollPos,
        behavior: 'smooth'
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [children]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray('.stack-section');
      
      sections.forEach((section, i) => {
        // Higher index sections are on top
        gsap.set(section, { zIndex: i + 1 });

        // Pin all sections
        ScrollTrigger.create({
          trigger: section,
          start: "top top",
          pin: true,
          pinSpacing: false,
        });

        // For all sections except the first one, animate them coming in
        if (i > 0) {
          gsap.fromTo(section, 
            { opacity: 0, scale: 0.95 },
            { 
              opacity: 1, 
              scale: 1,
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start: "top bottom", // Start fading in as it enters from bottom
                end: "top top",    // Fully opaque when it reaches the top
                scrub: true,
              }
            }
          );
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, [children]);

  return (
    <div ref={containerRef} className="stack-container">
      {React.Children.map(children, (child, index) => (
        <div key={index} className="stack-section">
          {child}
        </div>
      ))}
    </div>
  );
};

export default SectionStack;
