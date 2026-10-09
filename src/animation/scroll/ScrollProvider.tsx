import React, { createContext, useContext, useEffect, useState } from 'react';
import Lenis from 'lenis';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { scrollManager } from './scrollManager';

interface ScrollContextType {
  lenis: Lenis | null;
  scrollProgress: number; // 0 to 1 overall page scroll
}

const ScrollContext = createContext<ScrollContextType>({
  lenis: null,
  scrollProgress: 0
});

export const useScroll = () => useContext(ScrollContext);

/**
 * High-performance hook for telemetry components.
 * Subscribes directly to scrollManager without whole-tree React re-renders.
 */
export const useScrollProgress = () => {
  const [progress, setProgress] = useState(() => scrollManager.getProgress());
  useEffect(() => {
    return scrollManager.subscribe(setProgress);
  }, []);
  return progress;
};

export const ScrollProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const lenis = scrollManager.init(prefersReducedMotion);
    setLenisInstance(lenis);

    const unsubscribe = scrollManager.subscribe((p) => {
      setScrollProgress(p);
    });

    return () => {
      unsubscribe();
      scrollManager.destroy();
      setLenisInstance(null);
    };
  }, [prefersReducedMotion]);

  return (
    <ScrollContext.Provider value={{ lenis: lenisInstance, scrollProgress }}>
      {children}
    </ScrollContext.Provider>
  );
};
