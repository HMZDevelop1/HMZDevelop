import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { Vignette, Glow, Particles, LightStreak, Grain, TagPill, FloatingShape3D } from "../effects";
import { theme } from "../colors";

export const SceneHero: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <div style={{ position: "absolute", inset: 0, background: theme.gradientDark, overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 30%, rgba(212,175,55,0.04), transparent 60%)" }} />

      <FloatingShape3D type="diamond" size={100} x={12} y={25} speed={0.3} startFrame={0} />
      <FloatingShape3D type="cube" size={70} x={88} y={30} speed={0.5} startFrame={5} />
      <FloatingShape3D type="torus" size={80} x={80} y={75} speed={0.4} startFrame={10} />

      <div style={{ position: "absolute", inset: 0, opacity: 0.03, pointerEvents: "none", backgroundImage: "linear-gradient(rgba(212,175,55,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.08) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-55%)", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", width: "90%", maxWidth: 1600 }}>
        <div style={{ marginBottom: 40, opacity: interpolate(frame, [0, 25], [0, 1]) }}>
          <TagPill text="Premium Digital Studio" active style={{ fontSize: 18, padding: "12px 32px" }} />
        </div>

        <div style={{ opacity: interpolate(frame, [10, 50], [0, 1]) }}>
          <span style={{ fontSize: 130, fontWeight: 700, fontFamily: theme.fontHeading, color: theme.white, letterSpacing: "-0.03em", lineHeight: 1.05 }}>
            Building premium digital<br />
            <span style={{ color: theme.gold, textShadow: "0 0 60px rgba(212,175,55,0.2)" }}>experiences that scale.</span>
          </span>
        </div>

        <p style={{ fontFamily: theme.fontBody, fontSize: 24, color: theme.muted, maxWidth: 900, lineHeight: 1.8, marginTop: 32, opacity: interpolate(frame, [30, 65], [0, 1]) }}>
          We're a small team that turns ideas into websites. Clean code, thoughtful design, and a process built around you — from first sketch to final launch.
        </p>

        <div style={{ display: "flex", gap: 24, marginTop: 48, opacity: interpolate(frame, [45, 80], [0, 1]) }}>
          <div style={{ padding: "22px 48px", borderRadius: 14, background: theme.gradientGold, color: theme.black, fontWeight: 700, fontFamily: theme.fontBody, fontSize: 18, boxShadow: "0 8px 60px rgba(212,175,55,0.35), 0 0 100px rgba(212,175,55,0.1)" }}>Start a Project</div>
          <div style={{ padding: "22px 48px", borderRadius: 14, border: "1.5px solid rgba(212,175,55,0.35)", color: theme.gold, fontFamily: theme.fontBody, fontSize: 18, fontWeight: 600, background: "rgba(212,175,55,0.06)" }}>Explore Services</div>
        </div>
      </div>

      <div style={{ position: "absolute", bottom: "8%", left: "50%", transform: "translateX(-50%)", display: "flex", gap: 32, opacity: interpolate(frame, [55, 95], [0, 1]) }}>
        {["React 19", "Three.js", "GSAP", "Tailwind", "Framer Motion"].map((t, i) => (
          <div key={i} style={{ padding: "10px 24px", borderRadius: 10, background: "rgba(212,175,55,0.04)", border: "1px solid rgba(212,175,55,0.1)", color: theme.muted, fontFamily: theme.fontBody, fontSize: 15 }}>{t}</div>
        ))}
      </div>

      <Vignette opacity={0.5} /> <Glow intensity={0.04} /> <Particles count={120} startFrame={10} /> <LightStreak startFrame={25} /> <Grain />
    </div>
  );
};
