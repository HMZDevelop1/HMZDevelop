import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

interface GlassCardProps {
  children: React.ReactNode;
  width?: number | string;
  height?: number | string;
  padding?: number;
  startFrame?: number;
  delay?: number;
  style?: React.CSSProperties;
  glow?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  width = "auto",
  height = "auto",
  padding = 24,
  startFrame = 0,
  delay = 0,
  style = {},
  glow = true,
}) => {
  const frame = useCurrentFrame();
  const f = Math.max(0, frame - startFrame - delay);

  return (
    <div
      style={{
        width,
        height,
        padding,
        background: "rgba(11, 11, 13, 0.6)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: "1px solid rgba(212, 175, 55, 0.15)",
        borderRadius: 16,
        boxShadow: glow
          ? "0 0 30px rgba(212, 175, 55, 0.06), inset 0 1px 0 rgba(212, 175, 55, 0.1)"
          : undefined,
        opacity: interpolate(f, [0, 20], [0, 1], { extrapolateRight: "clamp" }),
        transform: `translateY(${interpolate(f, [0, 25], [30, 0], { extrapolateRight: "clamp" })}px)`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};
