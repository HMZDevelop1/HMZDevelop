import React, { useMemo } from "react";
import { interpolate, useCurrentFrame, random } from "remotion";

interface GoldParticlesProps {
  count?: number;
  startFrame?: number;
  opacity?: number;
  size?: [number, number];
  speed?: number;
}

export const GoldParticles: React.FC<GoldParticlesProps> = ({
  count = 60,
  startFrame = 0,
  opacity = 0.6,
  size = [1.5, 4],
  speed = 1,
}) => {
  const frame = useCurrentFrame();
  const f = Math.max(0, frame - startFrame);

  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: random(`x-${i}`) * 100,
      y: random(`y-${i}`) * 100,
      size: size[0] + random(`s-${i}`) * (size[1] - size[0]),
      driftX: (random(`dx-${i}`) - 0.5) * 2,
      driftY: (random(`dy-${i}`) - 0.5) * 2,
      delay: random(`delay-${i}`) * 100,
      twinkleSpeed: 0.5 + random(`twinkle-${i}`) * 2,
    }));
  }, [count, size]);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      {particles.map((p) => {
        const progress = Math.max(0, f - p.delay) * 0.01 * speed;
        const x = (p.x + Math.sin(progress * p.driftX) * 15) % 100;
        const y = (p.y + Math.cos(progress * p.driftY) * 15) % 100;
        const twinkle = Math.sin(f * 0.05 * p.twinkleSpeed + p.id) * 0.3 + 0.7;

        return (
          <div
            key={p.id}
            style={{
              position: "absolute",
              left: `${x}%`,
              top: `${y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(242, 210, 122, 0.9), rgba(212, 175, 55, 0.3))",
              opacity: opacity * twinkle * interpolate(progress, [0, 5], [0, 1], { extrapolateRight: "clamp" }),
              boxShadow: "0 0 6px rgba(212, 175, 55, 0.4)",
              transform: `translate(-50%, -50%)`,
            }}
          />
        );
      })}
    </div>
  );
};

interface FloatingOrbsProps {
  startFrame?: number;
  count?: number;
}

export const FloatingOrbs: React.FC<FloatingOrbsProps> = ({
  startFrame = 0,
  count = 3,
}) => {
  const frame = useCurrentFrame();
  const f = Math.max(0, frame - startFrame);

  const orbs = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      size: 300 + random(`os-${i}`) * 400,
      x: random(`ox-${i}`) * 100,
      y: random(`oy-${i}`) * 100,
      driftX: (random(`odx-${i}`) - 0.5) * 0.3,
      driftY: (random(`ody-${i}`) - 0.5) * 0.3,
      phase: random(`oph-${i}`) * Math.PI * 2,
    }));
  }, [count]);

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      {orbs.map((orb) => {
        const x = orb.x + Math.sin(f * 0.005 * orb.driftX + orb.phase) * 10;
        const y = orb.y + Math.cos(f * 0.005 * orb.driftY + orb.phase) * 10;
        const pulse = Math.sin(f * 0.02 + orb.phase) * 0.15 + 0.85;

        return (
          <div
            key={orb.id}
            style={{
              position: "absolute",
              left: `${x}%`,
              top: `${y}%`,
              width: `${orb.size}px`,
              height: `${orb.size}px`,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(212, 175, 55, 0.12) 0%, rgba(212, 175, 55, 0.04) 50%, transparent 70%)",
              transform: `translate(-50%, -50%) scale(${pulse})`,
              opacity: interpolate(f, [0, 30], [0, 1], { extrapolateRight: "clamp" }) * 0.8,
            }}
          />
        );
      })}
    </div>
  );
};

interface GridOverlayProps {
  opacity?: number;
}

export const GridOverlay: React.FC<GridOverlayProps> = ({ opacity = 0.04 }) => {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundImage: `
          linear-gradient(rgba(212, 175, 55, ${opacity}) 1px, transparent 1px),
          linear-gradient(90deg, rgba(212, 175, 55, ${opacity}) 1px, transparent 1px)
        `,
        backgroundSize: "60px 60px",
        pointerEvents: "none",
      }}
    />
  );
};
