import React from "react";
import { useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { theme } from "../colors";

interface CinematicTitleProps {
  text: string;
  startFrame: number;
  duration?: number;
  style?: React.CSSProperties;
  className?: string;
  revealBy?: "char" | "word" | "all";
  direction?: "up" | "down" | "left" | "right";
  blur?: boolean;
  gradient?: boolean;
  fontSize?: number;
  delay?: number;
}

export const CinematicTitle: React.FC<CinematicTitleProps> = ({
  text,
  startFrame,
  duration = 30,
  style = {},
  className = "",
  revealBy = "word",
  direction = "up",
  blur = true,
  gradient = false,
  fontSize = 72,
  delay = 0,
}) => {
  const frame = useCurrentFrame();
  const f = Math.max(0, frame - startFrame - delay);

  if (revealBy === "all") {
    const progress = Math.min(f / duration, 1);
    const dirOffset = direction === "up" ? 40 : direction === "down" ? -40 : direction === "left" ? -40 : 40;
    const isHorizontal = direction === "left" || direction === "right";

    return (
      <span
        className={className}
        style={{
          fontSize,
          fontWeight: 700,
          fontFamily: "'Clash Display', sans-serif",
          color: gradient ? theme.gold : theme.white,
          display: "inline-block",
          opacity: interpolate(progress, [0, 0.6], [0, 1]),
          transform: isHorizontal
            ? `translateX(${interpolate(progress, [0, 1], [dirOffset, 0])}px)`
            : `translateY(${interpolate(progress, [0, 1], [dirOffset, 0])}px)`,
          ...style,
        }}
      >
        {text}
      </span>
    );
  }

  const items = revealBy === "char" ? text.split("") : text.split(" ");
  const staggerDelay = revealBy === "char" ? 2 : 6;

  return (
    <span
      style={{
        display: "inline-flex",
        flexWrap: "wrap",
        gap: revealBy === "word" ? "0 0.3em" : undefined,
        ...style,
      }}
    >
      {items.map((item, i) => {
        const itemFrame = Math.max(0, f - i * staggerDelay);
        const progress = Math.min(itemFrame / duration, 1);
        const dirOffset = direction === "up" ? 50 : direction === "down" ? -50 : 0;

        return (
          <span
            key={i}
            className={className}
            style={{
              fontSize,
              fontWeight: 700,
              fontFamily: "'Clash Display', sans-serif",
              color: gradient ? theme.gold : theme.white,
              display: "inline-block",
              opacity: interpolate(progress, [0, 0.4], [0, 1]),
              transform: `translateY(${interpolate(progress, [0, 1], [dirOffset, 0])}px)`,
              whiteSpace: item === " " ? "pre" : undefined,
            }}
          >
            {item === " " ? "\u00A0" : item}
          </span>
        );
      })}
    </span>
  );
};

export const CinematicSubtitle: React.FC<{
  text: string;
  startFrame: number;
  delay?: number;
  style?: React.CSSProperties;
}> = ({ text, startFrame, delay = 0, style = {} }) => {
  const frame = useCurrentFrame();
  const f = Math.max(0, frame - startFrame - delay);

  return (
    <div
      style={{
        fontFamily: "'Satoshi', sans-serif",
        fontSize: 20,
        color: theme.muted,
        letterSpacing: "0.15em",
        textTransform: "uppercase",
        opacity: interpolate(f, [0, 30], [0, 1]),
        transform: `translateY(${interpolate(f, [0, 30], [20, 0])}px)`,
        filter: `blur(${interpolate(f, [0, 15], [8, 0])}px)`,
        ...style,
      }}
    >
      {text}
    </div>
  );
};

export const DividerLine: React.FC<{
  startFrame: number;
  delay?: number;
  width?: number;
}> = ({ startFrame, delay = 0, width = 80 }) => {
  const frame = useCurrentFrame();
  const f = Math.max(0, frame - startFrame - delay);

  return (
    <div
      style={{
        height: 1,
        width,
        background: theme.gradientGold,
        transform: `scaleX(${interpolate(f, [0, 20], [0, 1])})`,
        opacity: interpolate(f, [0, 15], [0, 1]),
        boxShadow: `0 0 10px ${theme.glowGold}`,
      }}
    />
  );
};
