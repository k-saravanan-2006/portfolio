import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const SectionStack = ({ children }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const sections = gsap.utils.toArray('.stack-section');
    if (sections.length === 0) return;

    let currentIndex = Math.round(window.scrollY / window.innerHeight);
    let lastActivityTime = Date.now();

    const updateActivity = () => {
      lastActivityTime = Date.now();
      currentIndex = Math.round(window.scrollY / window.innerHeight);
    };

    const activityEvents = ['mousemove', 'keydown', 'scroll', 'mousedown'];
    activityEvents.forEach(event => window.addEventListener(event, updateActivity));

    const interval = setInterval(() => {
      const now = Date.now();
      if (now - lastActivityTime >= 5000) {
        currentIndex = (currentIndex + 1) % sections.length;
        const scrollPos = currentIndex * window.innerHeight;
        
        gsap.to(window, {
          scrollTo: scrollPos,
          duration: 2, // Slower duration for a premium feel
          ease: "power2.inOut",
          onComplete: () => {
            lastActivityTime = Date.now(); // Reset activity after animation
          }
        });
      }
    }, 5000);

    return () => {
      activityEvents.forEach(event => window.removeEventListener(event, updateActivity));
      clearInterval(interval);
    };
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
