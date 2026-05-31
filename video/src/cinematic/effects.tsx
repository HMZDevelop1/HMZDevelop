import React, { useMemo } from "react";
import { useCurrentFrame, interpolate, random } from "remotion";
import { theme, FPS } from "../colors";

export const FilmGrain: React.FC<{ opacity?: number }> = ({ opacity = 0.02 }) => {
  const frame = useCurrentFrame();
  const seed = useMemo(() => Math.floor(random("grain") * 99999), []);
  const noise = (seed + frame * 7) % 99999;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        opacity,
        pointerEvents: "none",
        mixBlendMode: "overlay",
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n%24{noise}'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch' seed='${noise}'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n%24{noise})'/%3E%3C/svg%3E")`,
        backgroundSize: "256px 256px",
      }}
    />
  );
};

export const GoldParticles: React.FC<{
  count?: number;
  startFrame?: number;
  speed?: number;
  depth?: boolean;
}> = ({ count = 120, startFrame = 0, speed = 1, depth = true }) => {
  const frame = useCurrentFrame();
  const f = Math.max(0, frame - startFrame);

  const particles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: random(`px-${i}`) * 100,
        y: random(`py-${i}`) * 100,
        z: depth ? random(`pz-${i}`) : 0,
        size: 1 + random(`ps-${i}`) * 4,
        driftX: (random(`pdx-${i}`) - 0.5) * 0.4,
        driftY: (random(`pdy-${i}`) - 0.5) * 0.4,
        driftZ: (random(`pdz-${i}`) - 0.5) * 0.2,
        phase: random(`pph-${i}`) * Math.PI * 2,
        twinkleSpeed: 0.5 + random(`pt-${i}`) * 2,
        opacity: 0.2 + random(`po-${i}`) * 0.8,
      })),
    [count, depth]
  );

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", perspective: depth ? "2000px" : undefined }}>
      {particles.map((p) => {
        const t = f * 0.008 * speed;
        const x = p.x + Math.sin(t * p.driftX + p.phase) * 20;
        const y = p.y + Math.cos(t * p.driftY + p.phase) * 20;
        const z = depth ? Math.sin(t * p.driftZ + p.phase * 0.5) * 50 : 0;
        const twinkle = Math.sin(f * 0.03 * p.twinkleSpeed + p.id) * 0.3 + 0.7;

        return (
          <div
            key={p.id}
            style={{
              position: "absolute",
              left: `${x}%`,
              top: `${y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              transform: depth
                ? `translate(-50%, -50%) translateZ(${z}px)`
                : "translate(-50%, -50%)",
              borderRadius: "50%",
              background: `radial-gradient(circle, rgba(242, 210, 122, 0.9), rgba(212, 175, 55, 0.2))`,
              opacity: p.opacity * twinkle * interpolate(f, [0, 30], [0, 1], { extrapolateRight: "clamp" }),
              boxShadow: `0 0 ${p.size * 2}px rgba(212, 175, 55, 0.3)`,
            }}
          />
        );
      })}
    </div>
  );
};

export const LightStreaks: React.FC<{
  startFrame?: number;
  count?: number;
}> = ({ startFrame = 0, count = 3 }) => {
  const frame = useCurrentFrame();
  const f = Math.max(0, frame - startFrame);
  const duration = 120;

  const streaks = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        delay: random(`lsd-${i}`) * 60,
        y: 10 + random(`lsy-${i}`) * 80,
        height: 1 + random(`lsh-${i}`) * 2,
        speed: 0.8 + random(`lss-${i}`) * 0.4,
        opacity: 0.1 + random(`lso-${i}`) * 0.3,
        width: 30 + random(`lsw-${i}`) * 70,
      })),
    [count]
  );

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      {streaks.map((s) => {
        const localF = Math.max(0, f - s.delay);
        const progress = (localF % duration) / duration;
        const x = interpolate(progress, [0, 1], [-s.width, 100 + s.width]);

        return (
          <div
            key={s.id}
            style={{
              position: "absolute",
              left: `${x}%`,
              top: `${s.y}%`,
              width: `${s.width}%`,
              height: s.height,
              background: `linear-gradient(90deg, transparent, ${theme.goldLight}, transparent)`,
              opacity: s.opacity * interpolate(localF, [0, 10, duration - 10, duration], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
              boxShadow: `0 0 15px ${theme.glowGold}`,
            }}
          />
        );
      })}
    </div>
  );
};

export const LensFlare: React.FC<{
  x?: number;
  y?: number;
  startFrame?: number;
  size?: number;
}> = ({ x = 70, y = 30, startFrame = 0, size = 400 }) => {
  const frame = useCurrentFrame();
  const f = Math.max(0, frame - startFrame);
  const opacity = interpolate(f, [0, 20, 200, 220], [0, 0.6, 0.6, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <div
      style={{
        position: "absolute",
        left: `${x}%`,
        top: `${y}%`,
        width: size,
        height: size,
        transform: "translate(-50%, -50%)",
        pointerEvents: "none",
        opacity,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(circle, rgba(212, 175, 55, 0.08) 0%, rgba(242, 210, 122, 0.03) 30%, transparent 70%)`,
          borderRadius: "50%",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "30%",
          left: "30%",
          width: "40%",
          height: "40%",
          background: `radial-gradient(circle, rgba(255, 255, 255, 0.15) 0%, transparent 60%)`,
          borderRadius: "50%",
        }}
      />
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: `${20 + i * 15}%`,
            height: 2,
            transform: `translate(-50%, -50%) rotate(${i * 30}deg)`,
            background: `linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.04), transparent)`,
          }}
        />
      ))}
    </div>
  );
};

export const CinematicBars: React.FC<{
  height?: number;
  startFrame?: number;
  animate?: boolean;
}> = ({ height = 120, startFrame = 0, animate = true }) => {
  const frame = useCurrentFrame();
  const f = Math.max(0, frame - startFrame);

  const topY = animate
    ? interpolate(f, [0, 30, 120, 150], [-height, 0, 0, -height], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
    : 0;

  const bottomY = animate
    ? interpolate(f, [0, 30, 120, 150], [height, 0, 0, height], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
    : 0;

  return (
    <>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height,
          background: theme.black,
          zIndex: 999,
          transform: `translateY(${topY}px)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height,
          background: theme.black,
          zIndex: 999,
          transform: `translateY(${bottomY}px)`,
        }}
      />
    </>
  );
};

export const HolographicGrid: React.FC<{
  startFrame?: number;
  opacity?: number;
}> = ({ startFrame = 0, opacity = 0.03 }) => {
  const frame = useCurrentFrame();
  const f = Math.max(0, frame - startFrame);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        opacity: interpolate(f, [0, 20], [0, opacity], { extrapolateRight: "clamp" }),
        backgroundImage: `
          linear-gradient(rgba(212, 175, 55, 0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(212, 175, 55, 0.03) 1px, transparent 1px)
        `,
        backgroundSize: "80px 80px",
        pointerEvents: "none",
        perspective: "1000px",
        transform: "rotateX(5deg)",
        transformOrigin: "center center",
      }}
    />
  );
};

export const Vignette: React.FC<{
  startFrame?: number;
  opacity?: number;
}> = ({ startFrame = 0, opacity = 0.6 }) => {
  const frame = useCurrentFrame();
  const f = Math.max(0, frame - startFrame);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        opacity: interpolate(f, [0, 20], [0, opacity], { extrapolateRight: "clamp" }),
        background: `radial-gradient(ellipse at center, transparent 50%, rgba(0, 0, 0, 0.8) 100%)`,
      }}
    />
  );
};

export const GlowOverlay: React.FC<{
  intensity?: number;
  color?: string;
  startFrame?: number;
}> = ({ intensity = 0.03, color = "#D4AF37", startFrame = 0 }) => {
  const frame = useCurrentFrame();
  const f = Math.max(0, frame - startFrame);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        opacity: interpolate(f, [0, 30], [0, intensity], { extrapolateRight: "clamp" }),
        background: `radial-gradient(ellipse at 50% 40%, ${color} 0%, transparent 70%)`,
        mixBlendMode: "screen",
      }}
    />
  );
};
