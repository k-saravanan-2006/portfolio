import React, { useState, useEffect } from 'react';
import { useScrollProgress } from '../../animation/scroll/ScrollProvider';
import CometDial from '../ui/CometDial';

export const HUDTelemetry: React.FC = () => {
  const scrollProgress = useScrollProgress();
  const percentage = Math.round(scrollProgress * 100);

  const [dialSize, setDialSize] = useState<number>(() => {
    if (typeof window === 'undefined') return 85;
    if (window.innerWidth < 480) return 58;
    if (window.innerWidth < 640) return 65;
    if (window.innerWidth < 1024) return 75;
    return 85;
  });

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w < 480) setDialSize(58);
      else if (w < 640) setDialSize(65);
      else if (w < 1024) setDialSize(75);
      else setDialSize(85);
    };
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 'clamp(12px, 3vh, 20px)',
        left: 'clamp(12px, 3vw, 20px)',
        right: 'clamp(12px, 3vw, 20px)',
        zIndex: 50,
        pointerEvents: 'none',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        fontFamily: 'var(--font-mono)',
        fontSize: '11px',
        color: 'var(--text-muted)'
      }}
    >
      {/* Left Telemetry removed */}
      <div />

      {/* Right Progress Telemetry (CometDial Tiny Transparent Glass HUD) */}
      <div
        className="comet-dial-hud"
        style={{
          width: `${dialSize}px`,
          height: `${dialSize}px`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'auto',
          borderRadius: '50%',
          background: 'rgba(5, 15, 30, 0.10)',
          backdropFilter: 'blur(5px)',
          WebkitBackdropFilter: 'blur(5px)',
          border: '1px solid rgba(125, 211, 255, 0.12)',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.12), inset 0 0 10px rgba(80, 190, 255, 0.02)',
          position: 'relative'
        }}
      >
        <CometDial
          value={percentage}
          defaultValue={0}
          min={0}
          max={100}
          step={1}
          unit="%"
          label="SCROLL"
          accent="#7dd3fc"
          ink="#F5FAFF"
          size={dialSize}
          sweep={300}
          thickness={2.2}
          speed={35}
          tapBounce={0}
          flickBounce={0}
          momentum={1}
          cometReach={110}
          cometWidth={5}
          readOnly={true}
          disabled={false}
        />
      </div>
    </div>
  );
};

