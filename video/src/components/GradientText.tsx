import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

interface GradientTextProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  animate?: boolean;
  from?: string;
  to?: string;
}

export const GradientText: React.FC<GradientTextProps> = ({
  children,
  style = {},
  animate = true,
  from = "#D4AF37",
  to = "#F2D27A",
}) => {
  const frame = useCurrentFrame();

  const gradientStyle: React.CSSProperties = {
    background: `linear-gradient(135deg, ${from}, ${to})`,
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    ...(animate
      ? {
          backgroundSize: "200% 200%",
          backgroundPosition: `${50 + Math.sin(frame * 0.02) * 25}% ${50 + Math.cos(frame * 0.015) * 25}%`,
        }
      : {}),
    ...style,
  };

  return <span style={gradientStyle}>{children}</span>;
};

interface SectionLabelProps {
  text: string;
  startFrame?: number;
}

export const SectionLabel: React.FC<SectionLabelProps> = ({
  text,
  startFrame = 0,
}) => {
  const frame = useCurrentFrame();
  const f = Math.max(0, frame - startFrame);

  return (
    <div
      style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: 20,
        color: "#D4AF37",
        fontStyle: "italic",
        letterSpacing: "0.05em",
        textTransform: "uppercase",
        opacity: interpolate(f, [0, 15], [0, 1], { extrapolateRight: "clamp" }),
        transform: `translateY(${interpolate(f, [0, 15], [10, 0], { extrapolateRight: "clamp" })}px)`,
        marginBottom: 16,
      }}
    >
      {text}
    </div>
  );
};
