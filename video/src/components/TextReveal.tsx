import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

interface TextRevealProps {
  text: string;
  startFrame?: number;
  duration?: number;
  className?: string;
  style?: React.CSSProperties;
  staggerDelay?: number;
  direction?: "up" | "down" | "none";
}

export const TextReveal: React.FC<TextRevealProps> = ({
  text,
  startFrame = 0,
  duration = 20,
  className = "",
  style = {},
  staggerDelay = 3,
  direction = "up",
}) => {
  const frame = useCurrentFrame();

  return (
    <span style={{ display: "inline-flex", flexWrap: "wrap", ...style }}>
      {text.split("").map((char, i) => {
        const charFrame = Math.max(0, frame - startFrame - i * staggerDelay);
        const progress = Math.min(charFrame / duration, 1);

        const translateY =
          direction === "up"
            ? interpolate(progress, [0, 1], [40, 0])
            : direction === "down"
              ? interpolate(progress, [0, 1], [-40, 0])
              : 0;

        return (
          <span
            key={i}
            className={className}
            style={{
              display: char === " " ? "inline" : "inline-block",
              opacity: interpolate(progress, [0, 0.5], [0, 1]),
              transform: `translateY(${translateY}px)`,
              filter: `blur(${interpolate(progress, [0, 0.8], [6, 0])}px)`,
              transition: "none",
              whiteSpace: char === " " ? "pre" : undefined,
            }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        );
      })}
    </span>
  );
};

interface WordRevealProps {
  text: string;
  startFrame?: number;
  duration?: number;
  style?: React.CSSProperties;
  className?: string;
}

export const WordReveal: React.FC<WordRevealProps> = ({
  text,
  startFrame = 0,
  duration = 15,
  style = {},
  className = "",
}) => {
  const frame = useCurrentFrame();
  const words = text.split(" ");

  return (
    <span style={{ display: "inline-flex", flexWrap: "wrap", gap: "0 0.4em", ...style }}>
      {words.map((word, i) => {
        const wordFrame = Math.max(0, frame - startFrame - i * 6);
        const progress = Math.min(wordFrame / duration, 1);

        return (
          <span
            key={i}
            className={className}
            style={{
              display: "inline-block",
              opacity: interpolate(progress, [0, 0.6], [0, 1]),
              transform: `translateY(${interpolate(progress, [0, 1], [30, 0])}px) rotateX(${interpolate(progress, [0, 1], [45, 0])}deg)`,
              filter: `blur(${interpolate(progress, [0, 0.5], [10, 0])}px)`,
            }}
          >
            {word}
          </span>
        );
      })}
    </span>
  );
};
