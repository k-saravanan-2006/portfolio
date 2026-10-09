import React from 'react';

export interface WeaveSpinnerProps {
  progress?: number;
  color?: string;
  glowColor?: string;
  secondaryGlow?: string;
  size?: number;
  showPercentage?: boolean;
}

export const WeaveSpinner: React.FC<WeaveSpinnerProps> = ({
  progress,
  color = '#20CFFF', // Portfolio electric cyan theme color
  glowColor = 'rgba(32, 207, 255, 0.75)',
  secondaryGlow = 'rgba(23, 111, 229, 0.6)',
  size = 160,
  showPercentage = true
}) => {
  return (
    <>
      <style>
        {`
          .weave-spinner-wrapper {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            user-select: none;
          }

          /* Main container for the spinner */
          .spinner-container {
            position: relative;
            width: ${size}px;
            height: ${size}px;
            transform-style: preserve-3d;
            perspective: 1200px;
          }

          /* Central glowing node with portfolio theme color */
          .weave-node {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 12px;
            height: 12px;
            background: ${color};
            border-radius: 50%;
            transform: translate(-50%, -50%);
            box-shadow:
              0 0 20px ${color},
              0 0 40px ${glowColor};
            animation: weaveNodePulse 1.6s cubic-bezier(0.68, -0.55, 0.27, 1.55) infinite;
          }

          /* Base style for all weaving threads */
          .weave-thread {
            position: absolute;
            background: linear-gradient(
              90deg,
              transparent,
              ${color},
              transparent
            );
            box-shadow: 0 0 10px ${glowColor};
            transform-origin: center;
          }

          /* Individual thread positioning and animation delays */
          .t1 {
            width: 100%;
            height: 2px;
            top: 30%;
            left: 0;
            animation: weave1 2s cubic-bezier(0.45, 0, 0.55, 1) infinite;
          }

          .t2 {
            width: 2px;
            height: 100%;
            top: 0;
            left: 70%;
            animation: weave2 2.2s cubic-bezier(0.68, -0.55, 0.27, 1.55) infinite;
          }

          .t3 {
            width: 100%;
            height: 2px;
            bottom: 30%;
            left: 0;
            animation: weave3 2.4s cubic-bezier(0.23, 1, 0.32, 1) infinite;
          }

          .t4 {
            width: 2px;
            height: 100%;
            top: 0;
            left: 30%;
            animation: weave4 2.6s cubic-bezier(0.36, 0, 0.66, -0.56) infinite;
          }

          /* Animation for the central node's pulsing effect */
          @keyframes weaveNodePulse {
            0%,
            100% {
              transform: translate(-50%, -50%) scale(1);
              box-shadow:
                0 0 20px ${color},
                0 0 40px ${glowColor};
            }
            50% {
              transform: translate(-50%, -50%) scale(1.4);
              box-shadow:
                0 0 30px ${color},
                0 0 60px ${secondaryGlow};
            }
          }

          /* Animations for each of the four weaving threads */
          @keyframes weave1 {
            0% {
              transform: translateY(0) rotateX(0deg) rotateZ(0deg);
              opacity: 0.8;
            }
            50% {
              transform: translateY(40px) rotateX(60deg) rotateZ(20deg);
              opacity: 1;
            }
            100% {
              transform: translateY(0) rotateX(0deg) rotateZ(0deg);
              opacity: 0.8;
            }
          }

          @keyframes weave2 {
            0% {
              transform: translateX(0) rotateY(0deg) rotateZ(0deg);
              opacity: 0.8;
            }
            50% {
              transform: translateX(-40px) rotateY(60deg) rotateZ(-20deg);
              opacity: 1;
            }
            100% {
              transform: translateX(0) rotateY(0deg) rotateZ(0deg);
              opacity: 0.8;
            }
          }

          @keyframes weave3 {
            0% {
              transform: translateY(0) rotateX(0deg) rotateZ(0deg);
              opacity: 0.8;
            }
            50% {
              transform: translateY(-40px) rotateX(-60deg) rotateZ(15deg);
              opacity: 1;
            }
            100% {
              transform: translateY(0) rotateX(0deg) rotateZ(0deg);
              opacity: 0.8;
            }
          }

          @keyframes weave4 {
            0% {
              transform: translateX(0) rotateY(0deg) rotateZ(0deg);
              opacity: 0.8;
            }
            50% {
              transform: translateX(40px) rotateY(-60deg) rotateZ(-15deg);
              opacity: 1;
            }
            100% {
              transform: translateX(0) rotateY(0deg) rotateZ(0deg);
              opacity: 0.8;
            }
          }

          /* Glowing percentage typography */
          .weave-percentage-text {
            font-family: var(--font-mono, monospace);
            font-size: 19px;
            font-weight: 700;
            letter-spacing: 0.08em;
            color: ${color};
            text-shadow: 0 0 12px ${glowColor}, 0 0 24px ${secondaryGlow};
            margin-top: 24px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
          }
        `}
      </style>
      <div className="weave-spinner-wrapper">
        <div className="spinner-container">
          <div className="weave-thread t1" />
          <div className="weave-thread t2" />
          <div className="weave-thread t3" />
          <div className="weave-thread t4" />
          <div className="weave-node" />
        </div>

        {showPercentage && progress !== undefined && (
          <div className="weave-percentage-text">
            <span>{Math.min(100, Math.max(0, Math.round(progress)))}%</span>
          </div>
        )}
      </div>
    </>
  );
};

export default WeaveSpinner;
