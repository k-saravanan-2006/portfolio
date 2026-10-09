import React, { useRef, useState } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface MagneticButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  dataCursor?: string;
  type?: 'button' | 'submit' | 'reset';
  target?: string;
  rel?: string;
  style?: React.CSSProperties;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  onClick,
  href,
  className = '',
  variant = 'primary',
  dataCursor,
  type = 'button',
  target,
  rel,
  style
}) => {
  const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement | null>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const prefersReducedMotion = useReducedMotion();

  const handleMouseMove = (e: React.MouseEvent) => {
    if (prefersReducedMotion || !buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) * 0.35;
    const deltaY = (e.clientY - centerY) * 0.35;
    setOffset({ x: deltaX, y: deltaY });
  };

  const handleMouseLeave = () => {
    setOffset({ x: 0, y: 0 });
  };

  const baseStyle: React.CSSProperties = {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    padding: '12px 24px',
    borderRadius: '9999px',
    fontFamily: 'var(--font-display)',
    fontSize: '14px',
    fontWeight: 600,
    letterSpacing: '0.04em',
    textDecoration: 'none',
    cursor: 'pointer',
    border: 'none',
    transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
    transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.2s, border-color 0.2s, box-shadow 0.2s'
  };

  const variantStyles: Record<string, React.CSSProperties> = {
    primary: {
      backgroundColor: '#f8fafc',
      color: '#050608',
      boxShadow: '0 4px 16px rgba(255, 255, 255, 0.15)'
    },
    secondary: {
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      color: '#f8fafc',
      border: '1px solid rgba(255, 255, 255, 0.12)',
      backdropFilter: 'blur(8px)'
    },
    ghost: {
      backgroundColor: 'transparent',
      color: 'rgba(248, 250, 252, 0.8)',
      border: '1px solid transparent'
    }
  };

  const combinedStyle = { ...baseStyle, ...variantStyles[variant], ...style };

  if (href) {
    return (
      <a
        ref={buttonRef as React.RefObject<HTMLAnchorElement>}
        href={href}
        style={combinedStyle}
        className={className}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        data-cursor={dataCursor}
        target={target}
        rel={rel}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      ref={buttonRef as React.RefObject<HTMLButtonElement>}
      type={type}
      onClick={onClick}
      style={combinedStyle}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-cursor={dataCursor}
    >
      {children}
    </button>
  );
};
