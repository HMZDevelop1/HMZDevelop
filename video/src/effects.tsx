import React, { useMemo } from "react";
import { useCurrentFrame, interpolate, spring, useVideoConfig, random } from "remotion";
import { theme } from "./colors";

export const Vignette: React.FC<{ opacity?: number }> = ({ opacity = 0.6 }) => (
  <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: `radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.9) 100%)`, opacity }} />
);

export const Glow: React.FC<{ color?: string; intensity?: number }> = ({ color = theme.gold, intensity = 0.04 }) => (
  <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: `radial-gradient(ellipse at 50% 40%, ${color} 0%, transparent 70%)`, opacity: intensity, mixBlendMode: "screen" as const }} />
);

export const Particles: React.FC<{ count?: number; startFrame?: number }> = ({ count = 150, startFrame = 0 }) => {
  const frame = useCurrentFrame(); const f = Math.max(0, frame - startFrame);
  const p = useMemo(() => Array.from({ length: count }, (_, i) => ({ id: i, x: random(`x${i}`) * 100, y: random(`y${i}`) * 100, s: 1.5 + random(`s${i}`) * 5, dx: (random(`dx${i}`) - 0.5) * 0.4, dy: (random(`dy${i}`) - 0.5) * 0.4, ph: random(`ph${i}`) * 6.28, tw: 0.3 + random(`tw${i}`) * 2.5, op: 0.3 + random(`op${i}`) * 0.7 })), [count]);
  return (<div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>{p.map(p => { const t = f * 0.008; const x = p.x + Math.sin(t * p.dx + p.ph) * 20; const y = p.y + Math.cos(t * p.dy + p.ph) * 20; const tw = Math.sin(f * 0.025 * p.tw + p.id) * 0.35 + 0.65; return (<div key={p.id} style={{ position: "absolute", left: `${x}%`, top: `${y}%`, width: p.s, height: p.s, borderRadius: "50%", transform: "translate(-50%,-50%)", background: `radial-gradient(circle, rgba(242,210,122,1), rgba(212,175,55,0.3))`, opacity: p.op * tw * interpolate(f, [0, 25], [0, 1], { extrapolateRight: "clamp" }), boxShadow: `0 0 ${p.s * 3}px rgba(212,175,55,0.4)` }} />); })}</div>);
};

export const LightStreak: React.FC<{ startFrame?: number }> = ({ startFrame = 0 }) => {
  const frame = useCurrentFrame(); const f = Math.max(0, frame - startFrame);
  const d = 90;
  const p = useMemo(() => Array.from({ length: 4 }, (_, i) => ({ y: 5 + random(`y${i}`) * 90, delay: random(`del${i}`) * 50, h: 1 + random(`h${i}`) * 3, w: 20 + random(`w${i}`) * 80 })), []);
  return (<div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>{p.map(s => { const l = Math.max(0, f - s.delay); const pr = (l % d) / d; const x = interpolate(pr, [0, 1], [-s.w, 100 + s.w]); return (<div key={s.y} style={{ position: "absolute", left: `${x}%`, top: `${s.y}%`, width: `${s.w}%`, height: s.h, background: `linear-gradient(90deg, transparent, ${theme.goldLight}, transparent)`, opacity: 0.4 * interpolate(l, [0, 8, d - 8, d], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }), boxShadow: `0 0 20px ${theme.glowGold}` }} />); })}</div>);
};

export const Grain: React.FC = () => {
  const frame = useCurrentFrame();
  return (<div style={{ position: "absolute", inset: 0, opacity: 0.02, pointerEvents: "none", mixBlendMode: "overlay" as any, backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch' seed='${Math.floor(random("g") * 99999)}'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundSize: "256px 256px" }} />);
};

/** Clean text rendering - 2D transforms only, no text-shadow, no blur */
export const CinematicTitle: React.FC<{ text: string; startFrame: number; delay?: number; duration?: number; style?: React.CSSProperties; gradient?: boolean; size?: number; by?: "word" | "char" | "all" }> = ({ text, startFrame, delay = 0, duration = 25, style = {}, gradient, size = 80, by = "word" }) => {
  const frame = useCurrentFrame(); const f = Math.max(0, frame - startFrame - delay);
  const col = gradient ? theme.gold : theme.white;
  if (by === "all") {
    const p = Math.min(f / duration, 1);
    return <span style={{ fontSize: size, fontWeight: 700, fontFamily: theme.fontHeading, color: col, display: "inline-block", opacity: interpolate(p, [0, 0.5], [0, 1]), transform: `translateY(${interpolate(p, [0, 1], [30, 0])}px)`, ...style }}>{text}</span>;
  }
  const items = by === "char" ? text.split("") : text.split(" "); const st = by === "char" ? 2 : 6;
  return <span style={{ display: "inline-flex", flexWrap: "wrap", gap: by === "word" ? "0 0.35em" : undefined, ...style }}>{items.map((it, i) => { const fr = Math.max(0, f - i * st); const p = Math.min(fr / duration, 1); return <span key={i} style={{ fontSize: size, fontWeight: 700, fontFamily: theme.fontHeading, color: col, display: "inline-block", opacity: interpolate(p, [0, 0.35], [0, 1]), transform: `translateY(${interpolate(p, [0, 1], [30, 0])}px)`, whiteSpace: it === " " ? "pre" : undefined }}>{it === " " ? "\u00A0" : it}</span>; })}</span>;
};

export const Subtitle: React.FC<{ text: string; startFrame: number; delay?: number; style?: React.CSSProperties }> = ({ text, startFrame, delay = 0, style = {} }) => {
  const frame = useCurrentFrame(); const f = Math.max(0, frame - startFrame - delay);
  return <div style={{ fontFamily: theme.fontAccent, fontSize: 22, color: theme.gold, fontStyle: "italic", letterSpacing: "0.18em", textTransform: "uppercase", opacity: interpolate(f, [0, 20], [0, 1]), transform: `translateY(${interpolate(f, [0, 20], [15, 0])}px)`, ...style }}>{text}</div>;
};

export const GlassCard: React.FC<{ children: React.ReactNode; style?: React.CSSProperties; startFrame?: number; delay?: number; glow?: boolean }> = ({ children, style = {}, startFrame = 0, delay = 0, glow = true }) => {
  const frame = useCurrentFrame(); const f = Math.max(0, frame - startFrame - delay); const { fps } = useVideoConfig(); const s = spring({ frame: Math.max(0, f), fps, config: { damping: 14, stiffness: 55 } });
  return <div style={{ background: theme.glassCard, backdropFilter: "blur(30px)", WebkitBackdropFilter: "blur(30px)", border: `1px solid ${theme.border}`, borderRadius: 24, boxShadow: glow ? `0 8px 40px rgba(0,0,0,0.6), 0 0 40px ${theme.glowGoldSoft}, inset 0 1px 0 rgba(212,175,55,0.1)` : `0 8px 40px rgba(0,0,0,0.6)`, opacity: interpolate(f, [0, 18], [0, 1]), transform: `translateY(${interpolate(f, [0, 25], [25, 0])}px) scale(${s})`, ...style }}>{children}</div>;
};

export const TagPill: React.FC<{ text: string; active?: boolean; style?: React.CSSProperties }> = ({ text, active, style }) => (
  <div style={{ padding: "8px 22px", borderRadius: 100, background: active ? theme.gradientGold : "rgba(212,175,55,0.06)", border: active ? "none" : `1px solid rgba(212,175,55,0.15)`, color: active ? theme.black : theme.gold, fontFamily: theme.fontBody, fontSize: 15, fontWeight: active ? 700 : 500, letterSpacing: "0.04em", display: "inline-flex", alignItems: "center", gap: 8, boxShadow: active ? "0 4px 20px rgba(212,175,55,0.3)" : undefined, ...style }}>{text}</div>
);

export const FloatingShape3D: React.FC<{ startFrame?: number; type?: "cube" | "sphere" | "torus" | "diamond"; size?: number; x?: number; y?: number; speed?: number }> = ({ startFrame = 0, type = "diamond", size = 60, x = 50, y = 50, speed = 1 }) => {
  const frame = useCurrentFrame(); const f = Math.max(0, frame - startFrame);
  const r = f * 0.015 * speed; const fl = Math.sin(f * 0.012 * speed) * 10;
  const borders: Record<string, string> = { cube: "0%", sphere: "50%", torus: "50%", diamond: "0%" };
  const transforms: Record<string, string> = { cube: `rotateX(${r * 1.3}rad) rotateY(${r * 0.7}rad)`, sphere: "none", torus: `rotateX(${r}rad)`, diamond: `rotate(${r * 1.5}rad) scaleX(0.6)` };
  const clip: Record<string, string> = { cube: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)", sphere: "none", torus: "none", diamond: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" };
  return (<div style={{ position: "absolute", left: `${x + Math.sin(f * 0.005) * 5}%`, top: `${y + Math.cos(f * 0.007) * 5}%`, width: size, height: size, transform: `translate(-50%,-50%) translateY(${-fl}px)`, opacity: interpolate(f, [0, 30], [0, 0.2]) }}>
    <div style={{ width: "100%", height: "100%", border: "1px solid rgba(212,175,55,0.2)", borderRadius: borders[type], transform: transforms[type], clipPath: clip[type], background: "rgba(212,175,55,0.03)", boxShadow: "inset 0 0 30px rgba(212,175,55,0.05)" }} />
  </div>);
};

export const GoldDivider: React.FC<{ width?: number; startFrame?: number; delay?: number }> = ({ width = 120, startFrame = 0, delay = 0 }) => {
  const frame = useCurrentFrame(); const f = Math.max(0, frame - startFrame - delay);
  return <div style={{ height: 2, width, background: theme.gradientGold, transform: `scaleX(${interpolate(f, [0, 18], [0, 1])})`, opacity: interpolate(f, [0, 15], [0, 1]), boxShadow: `0 0 20px ${theme.glowGold}` }} />;
};
