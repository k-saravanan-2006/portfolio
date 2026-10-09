"use client";

import React, { createContext, useContext, useRef } from "react";
import { useScroll, useTransform, motion, MotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

type TextOpacityEnum = "none" | "soft" | "medium";
type ViewTypeEnum = "word" | "letter";

type TextGradientScrollType = {
  text: string;
  type?: ViewTypeEnum;
  className?: string;
  textOpacity?: TextOpacityEnum;
  progress?: MotionValue<number>;
};

type LetterType = {
  children: React.ReactNode | string;
  progress: MotionValue<number>;
  range: number[];
};

type WordType = {
  children: React.ReactNode;
  progress: MotionValue<number>;
  range: number[];
};

type CharType = {
  children: React.ReactNode;
  progress: MotionValue<number>;
  range: number[];
};

type TextGradientScrollContextType = {
  textOpacity?: TextOpacityEnum;
  type?: ViewTypeEnum;
};

const TextGradientScrollContext = createContext<TextGradientScrollContextType>(
  {}
);

function useGradientScroll() {
  const context = useContext(TextGradientScrollContext);
  return context;
}

function TextGradientScroll({
  text,
  className,
  type = "letter",
  textOpacity = "soft",
  progress: customProgress,
}: TextGradientScrollType) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });

  const activeProgress = customProgress ?? scrollYProgress;
  const words = text.split(" ");

  return (
    <TextGradientScrollContext.Provider value={{ textOpacity, type }}>
      <p ref={ref} className={cn("relative flex m-0 flex-wrap", className)}>
        {words.map((word, i) => {
          const start = i / words.length;
          const end = start + 1 / words.length;
          return type === "word" ? (
            <Word key={i} progress={activeProgress} range={[start, end]}>
              {word}
            </Word>
          ) : (
            <Letter key={i} progress={activeProgress} range={[start, end]}>
              {word}
            </Letter>
          );
        })}
      </p>
    </TextGradientScrollContext.Provider>
  );
}

export { TextGradientScroll };

const Word = ({ children, progress, range }: WordType) => {
  const opacity = useTransform(progress, range, [0, 1]);

  return (
    <span className="relative me-2 mt-1 inline-block">
      <span
        style={{ position: "absolute", inset: 0 }}
        className="opacity-20 text-slate-400 select-none pointer-events-none"
      >
        {children}
      </span>
      <motion.span style={{ transition: "opacity 0.4s ease", opacity: opacity }}>
        {children}
      </motion.span>
    </span>
  );
};

const Letter = ({ children, progress, range }: LetterType) => {
  if (typeof children === "string") {
    const amount = range[1] - range[0];
    const step = amount / children.length;

    return (
      <span className="relative me-2 mt-1 inline-block">
        {children.split("").map((char: string, i: number) => {
          const start = range[0] + i * step;
          const end = range[0] + (i + 1) * step;
          return (
            <Char key={`c_${i}`} progress={progress} range={[start, end]}>
              {char}
            </Char>
          );
        })}
      </span>
    );
  }
  return null;
};

const Char = ({ children, progress, range }: CharType) => {
  const opacity = useTransform(progress, range, [0, 1]);
  const { textOpacity } = useGradientScroll();

  return (
    <span className="relative inline-block">
      <span
        className={cn("absolute inset-0 select-none pointer-events-none", {
          "opacity-0": textOpacity === "none",
          "opacity-15 text-slate-400": textOpacity === "soft",
          "opacity-30 text-slate-400": textOpacity === "medium",
        })}
      >
        {children}
      </span>
      <motion.span
        style={{
          transition: "opacity 0.4s ease",
          opacity: opacity,
        }}
      >
        {children}
      </motion.span>
    </span>
  );
};
