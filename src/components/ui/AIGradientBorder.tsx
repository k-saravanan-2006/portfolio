import React, { useEffect } from "react";
import {
  animate,
  motion,
  useMotionTemplate,
  useMotionValue,
} from "motion/react";
import { cn } from "@/lib/utils";

export interface AIGradientBorderProps {
  children: React.ReactNode;
  className?: string;
  duration?: number;
  themeColor?: string; // e.g. "38 92% 50%" for themed cards
}

export const AIGradientBorder: React.FC<AIGradientBorderProps> = ({
  children,
  className,
  duration = 4,
  themeColor,
}) => {
  const turn = useMotionValue(0);

  useEffect(() => {
    const controls = animate(turn, 1, {
      ease: "linear",
      duration,
      repeat: Infinity,
    });
    return () => controls.stop();
  }, [duration, turn]);

  // If themeColor is provided, use the card's background/theme color beam with white highlight;
  // otherwise fallback to the multi-color AI spectrum gradient from reference code
  const gradient = themeColor
    ? useMotionTemplate`conic-gradient(from ${turn}turn, transparent 0%, transparent 6%, hsl(${themeColor} / 0) 10%, hsl(${themeColor} / 0.35) 18%, hsl(${themeColor} / 0.9) 26%, #ffffff 32%, hsl(${themeColor}) 36%, hsl(${themeColor} / 0.45) 44%, hsl(${themeColor} / 0) 50%, transparent 54%, transparent 100%)`
    : useMotionTemplate`conic-gradient(from ${turn}turn, transparent 0%, #f472b600 5%, #f472b6 10%, #c084fc 18%, #818cf8 26%, #38bdf8 34%, #2dd4bf 42%, #fbbf24 46%, #fbbf2400 52%, transparent 56%)`;

  return (
    <div className={cn("relative p-[1.5px] rounded-2xl w-full h-full group", className)}>
      {/* Outer ambient atmospheric glow */}
      <motion.div
        style={{ backgroundImage: gradient }}
        className="absolute inset-0 rounded-[inherit] blur-xl opacity-45 -z-10 pointer-events-none transition-opacity duration-500 group-hover:opacity-75"
      />

      {/* Moving gradient light border */}
      <motion.div
        style={{ backgroundImage: gradient }}
        className="absolute inset-0 rounded-[inherit] pointer-events-none z-0"
      />

      {/* Card Content Wrapper */}
      <div className="relative w-full h-full rounded-[inherit] overflow-hidden z-10">
        <div className="relative w-full h-full">{children}</div>

        {/* Inner edge spill glow */}
        <motion.div
          style={{ backgroundImage: gradient }}
          className="ai-glow-spill-mask opacity-60 blur-xl pointer-events-none absolute inset-[-30%] z-20 overflow-hidden"
        />
      </div>
    </div>
  );
};

export default AIGradientBorder;
