import React from 'react';

interface AnimatedInputProps {
  as?: 'input' | 'textarea';
  type?: string;
  name?: string;
  required?: boolean;
  placeholder?: string;
  value?: string;
  rows?: number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  className?: string;
}

export const AnimatedInput: React.FC<AnimatedInputProps> = ({
  as = 'input',
  className = '',
  ...props
}) => {
  const Component = as as any;

  return (
    <div className={`animated-input-container ${className}`}>
      {/* Decorative Rotating Border Layers */}
      <div className="glow" />
      <div className="darkBorderBg" />
      <div className="darkBorderBg" />
      <div className="darkBorderBg" />

      <div className="white" />
      <div className="border-layer" />

      <div className="main-input-wrap">
        <Component
          className={`input-element ${as === 'textarea' ? 'is-textarea' : 'is-input'}`}
          {...props}
        />
        {/* Animated cyan mask highlight */}
        <div className="cyan-mask" />
      </div>

      <style>{`
        .animated-input-container {
          width: 100%;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          isolation: isolate;
        }

        .animated-input-container .glow,
        .animated-input-container .darkBorderBg,
        .animated-input-container .white,
        .animated-input-container .border-layer {
          position: absolute;
          inset: 0;
          max-width: 100%;
          overflow: hidden;
          pointer-events: none;
        }

        .animated-input-container .glow {
          border-radius: 14px;
          opacity: 0.35;
          filter: blur(20px);
          z-index: -1;
          transition: opacity 0.5s ease;
        }

        .animated-input-container .darkBorderBg {
          border-radius: 14px;
          z-index: -1;
        }

        .animated-input-container .white {
          border-radius: 12px;
          filter: blur(2px);
          z-index: -1;
        }

        .animated-input-container .border-layer {
          border-radius: 13px;
          filter: blur(0.5px);
          z-index: -1;
        }

        .animated-input-container .white::before,
        .animated-input-container .border-layer::before,
        .animated-input-container .darkBorderBg::before,
        .animated-input-container .glow::before {
          content: "";
          position: absolute;
          z-index: -2;
          text-align: center;
          top: 50%;
          left: 50%;
          width: 200vw;
          height: 200vw;
          max-width: 1200px;
          max-height: 1200px;
          background-repeat: no-repeat;
          background-position: 0 0;
          transition: transform 2s ease;
        }

        .animated-input-container .white::before {
          transform: translate(-50%, -50%) rotate(83deg);
          filter: brightness(1.4);
          background-image: conic-gradient(
            rgba(0, 0, 0, 0) 0%,
            #ffffff,
            rgba(0, 0, 0, 0) 8%,
            rgba(0, 0, 0, 0) 50%,
            #00E5FF,
            rgba(0, 0, 0, 0) 58%
          );
        }

        .animated-input-container .border-layer::before {
          transform: translate(-50%, -50%) rotate(70deg);
          filter: brightness(1.3);
          background-image: conic-gradient(
            #02070D,
            #ffffff 5%,
            #02070D 14%,
            #02070D 50%,
            #00C8FF 60%,
            #02070D 64%
          );
        }

        .animated-input-container .darkBorderBg::before {
          transform: translate(-50%, -50%) rotate(82deg);
          background-image: conic-gradient(
            rgba(0, 0, 0, 0),
            #00E5FF,
            rgba(0, 0, 0, 0) 10%,
            rgba(0, 0, 0, 0) 50%,
            #168BFF,
            rgba(0, 0, 0, 0) 60%
          );
        }

        .animated-input-container .glow::before {
          transform: translate(-50%, -50%) rotate(60deg);
          background-image: conic-gradient(
            #030507,
            #00C8FF 5%,
            #030507 38%,
            #030507 50%,
            #006CFF 60%,
            #030507 87%
          );
        }

        /* Hover states */
        .animated-input-container:hover .darkBorderBg::before {
          transform: translate(-50%, -50%) rotate(-98deg);
        }
        .animated-input-container:hover .glow::before {
          transform: translate(-50%, -50%) rotate(-120deg);
        }
        .animated-input-container:hover .white::before {
          transform: translate(-50%, -50%) rotate(-97deg);
        }
        .animated-input-container:hover .border-layer::before {
          transform: translate(-50%, -50%) rotate(-110deg);
        }
        .animated-input-container:hover .glow {
          opacity: 0.65;
        }

        /* Focus states - continuous rotation via linear transition */
        .animated-input-container:focus-within .darkBorderBg::before {
          transform: translate(-50%, -50%) rotate(442deg);
          transition: transform 4s linear;
        }
        .animated-input-container:focus-within .glow::before {
          transform: translate(-50%, -50%) rotate(420deg);
          transition: transform 4s linear;
        }
        .animated-input-container:focus-within .white::before {
          transform: translate(-50%, -50%) rotate(443deg);
          transition: transform 4s linear;
        }
        .animated-input-container:focus-within .border-layer::before {
          transform: translate(-50%, -50%) rotate(430deg);
          transition: transform 4s linear;
        }
        .animated-input-container:focus-within .glow {
          opacity: 0.9;
        }

        .animated-input-container .main-input-wrap {
          position: relative;
          width: 100%;
          height: 100%;
          z-index: 10;
          padding: 2px;
        }

        .animated-input-container .input-element {
          width: 100%;
          background-color: #02070D;
          color: #ffffff;
          border: none;
          border-radius: 10px;
          padding: 14px 20px;
          font-family: inherit;
          font-size: 15px;
          outline: none;
          position: relative;
          z-index: 10;
          transition: background-color 0.2s ease;
        }

        .animated-input-container .input-element::placeholder {
          color: rgba(248, 250, 252, 0.45);
        }

        .animated-input-container .input-element.is-input {
          height: 56px;
        }

        .animated-input-container .input-element.is-textarea {
          min-height: 120px;
          resize: vertical;
        }

        .animated-input-container .cyan-mask {
          pointer-events: none;
          width: 32px;
          height: 20px;
          position: absolute;
          background-color: #00E5FF;
          top: 10px;
          left: 6px;
          filter: blur(20px);
          opacity: 0.75;
          transition: all 2s ease;
          z-index: 11;
        }

        .animated-input-container:hover .cyan-mask,
        .animated-input-container:focus-within .cyan-mask {
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

export default AnimatedInput;
