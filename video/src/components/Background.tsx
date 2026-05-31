import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { colors } from "../colors";
import { GoldParticles, FloatingOrbs, GridOverlay } from "./Particles";

interface BackgroundProps {
  children: React.ReactNode;
  startFrame?: number;
  duration?: number;
  showParticles?: boolean;
  showOrbs?: boolean;
  showGrid?: boolean;
  gradient?: "dark" | "charcoal" | "black";
}

export const Background: React.FC<BackgroundProps> = ({
  children,
  startFrame = 0,
  duration = 150,
  showParticles = true,
  showOrbs = true,
  showGrid = true,
  gradient = "dark",
}) => {
  const frame = useCurrentFrame();
  const f = Math.max(0, frame - startFrame);

  const bgColors = {
    dark: { from: "#050505", via: "#0B0B0D", to: "#050505" },
    charcoal: { from: "#0B0B0D", via: "#050505", to: "#0B0B0D" },
    black: { from: "#050505", via: "#050505", to: "#050505" },
  };

  const bg = bgColors[gradient];

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        background: `radial-gradient(ellipse at 50% 50%, ${bg.from} 0%, ${bg.via} 50%, ${bg.to} 100%)`,
        overflow: "hidden",
      }}
    >
      {showOrbs && <FloatingOrbs startFrame={startFrame} />}
      {showParticles && <GoldParticles startFrame={startFrame} />}
      {showGrid && <GridOverlay />}

      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: Math.min(f / 20, 1) * 0.03,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "256px 256px",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {children}
      </div>
    </div>
  );
};
