import React, { useEffect, useState } from 'react';
import { WeaveSpinner } from '../ui/weave-spinner';

interface SystemBootProps {
  onComplete: () => void;
}

export const SystemBoot: React.FC<SystemBootProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const startTime = performance.now();
    const duration = 1450; // 1.45s smooth loading experience

    let animId: number;

    const update = (now: number) => {
      const elapsed = now - startTime;
      const rawProgress = Math.min(1, elapsed / duration);
      // Smooth deceleration curve
      const eased = 1 - Math.pow(1 - rawProgress, 2.2);
      const currentPercent = Math.min(100, Math.round(eased * 100));

      setProgress(currentPercent);

      if (rawProgress < 1) {
        animId = requestAnimationFrame(update);
      } else {
        setTimeout(() => setFading(true), 140);
        setTimeout(() => onComplete(), 460);
      }
    };

    animId = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [onComplete]);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: '#020611',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        opacity: fading ? 0 : 1,
        transition: 'opacity 0.35s ease-out',
        pointerEvents: fading ? 'none' : 'auto'
      }}
    >
      <WeaveSpinner progress={progress} showPercentage={true} />
    </div>
  );
};

export default SystemBoot;
