import React from 'react';

const AnimatedInput = ({ as = 'input', className = '', ...props }) => {
  const Component = as;

  return (
    <div className={`animated-input-container w-full relative flex items-center justify-center group ${className}`}>
      {/* Decorative Rotating Border Layers */}
      <div className="glow absolute inset-0 rounded-[12px] opacity-40 blur-[20px] max-w-full overflow-hidden z-[-1]" />
      <div className="darkBorderBg absolute inset-0 rounded-[12px] max-w-full overflow-hidden z-[-1]" />
      <div className="darkBorderBg absolute inset-0 rounded-[12px] max-w-full overflow-hidden z-[-1]" />
      <div className="darkBorderBg absolute inset-0 rounded-[12px] max-w-full overflow-hidden z-[-1]" />
      
      <div className="white absolute inset-0 rounded-[10px] blur-[2px] max-w-full overflow-hidden z-[-1]" />
      <div className="border-layer absolute inset-0 rounded-[11px] blur-[0.5px] max-w-full overflow-hidden z-[-1]" />

      <div className="main-input-wrap relative w-full h-full z-10 p-[2px]">
        <Component 
          className={`
            w-full bg-[#010201] text-white border-none rounded-[10px] 
            px-5 py-4 font-inherit text-base outline-none z-10 relative 
            placeholder:text-gray-500
            ${as === 'textarea' ? 'min-h-[80px] lg:min-h-[120px] resize-y' : 'h-[56px]'}
          `}
          {...props}
        />
        {/* Animated pink mask from original translated to cyan */}
        <div className="cyan-mask pointer-events-none w-[30px] h-[20px] absolute bg-[#00e5cc] top-[10px] left-[5px] blur-[20px] opacity-80 transition-all duration-[2000ms] group-hover:opacity-0" />
      </div>

      <style>{`
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
          transition: all 2s ease;
        }

        .animated-input-container .white::before {
          transform: translate(-50%, -50%) rotate(83deg);
          filter: brightness(1.4);
          background-image: conic-gradient(
            rgba(0, 0, 0, 0) 0%,
            #ffffff,
            rgba(0, 0, 0, 0) 8%,
            rgba(0, 0, 0, 0) 50%,
            #00e5cc,
            rgba(0, 0, 0, 0) 58%
          );
        }

        .animated-input-container .border-layer::before {
          transform: translate(-50%, -50%) rotate(70deg);
          filter: brightness(1.3);
          background-image: conic-gradient(
            #1c191c,
            #ffffff 5%,
            #1c191c 14%,
            #1c191c 50%,
            #00e5cc 60%,
            #1c191c 64%
          );
        }

        .animated-input-container .darkBorderBg::before {
          transform: translate(-50%, -50%) rotate(82deg);
          background-image: conic-gradient(
            rgba(0, 0, 0, 0),
            #ffffff,
            rgba(0, 0, 0, 0) 10%,
            rgba(0, 0, 0, 0) 50%,
            #00e5cc,
            rgba(0, 0, 0, 0) 60%
          );
        }

        .animated-input-container .glow::before {
          transform: translate(-50%, -50%) rotate(60deg);
          background-image: conic-gradient(
            #000,
            #ffffff 5%,
            #000 38%,
            #000 50%,
            #00e5cc 60%,
            #000 87%
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

        /* Focus states - continuous rotation via very long transition or animation */
        .animated-input-container:focus-within .darkBorderBg::before {
          transform: translate(-50%, -50%) rotate(442deg);
          transition: all 4s linear;
        }
        .animated-input-container:focus-within .glow::before {
          transform: translate(-50%, -50%) rotate(420deg);
          transition: all 4s linear;
        }
        .animated-input-container:focus-within .white::before {
          transform: translate(-50%, -50%) rotate(443deg);
          transition: all 4s linear;
        }
        .animated-input-container:focus-within .border-layer::before {
          transform: translate(-50%, -50%) rotate(430deg);
          transition: all 4s linear;
        }

        /* Fix internal mask display logic */
        .animated-input-container:focus-within .cyan-mask {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default AnimatedInput;
