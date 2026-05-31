import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { Vignette, Glow, Particles, Grain, FloatingShape3D } from "../effects";
import { theme } from "../colors";

export const SceneIntro: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <div style={{ position: "absolute", inset: 0, background: theme.black, overflow: "hidden" }}>
      <FloatingShape3D type="diamond" size={120} x={50} y={50} speed={0.2} startFrame={0} />
      <FloatingShape3D type="torus" size={80} x={85} y={20} speed={0.3} startFrame={10} />
      <FloatingShape3D type="cube" size={60} x={15} y={80} speed={0.4} startFrame={20} />

      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "70%", height: "70%", background: "radial-gradient(ellipse, rgba(212,175,55,0.05), transparent 60%)" }} />

      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <div style={{ position: "relative", width: 400, height: 400, marginBottom: 40 }}>
          <div style={{ position: "absolute", inset: 0, borderRadius: "50%", border: "1px solid rgba(212,175,55,0.12)", transform: `scale(${interpolate(frame, [0, 80], [1, 3])})`, opacity: interpolate(frame, [0, 80], [0.4, 0]) }} />
          <div style={{ position: "absolute", inset: "10%", borderRadius: "50%", border: "1px solid rgba(212,175,55,0.06)", transform: `scale(${interpolate(frame, [20, 100], [1, 2.5])})`, opacity: interpolate(frame, [20, 100], [0.3, 0]) }} />
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
              <span style={{ fontSize: 110, fontWeight: 700, fontFamily: theme.fontHeading, color: theme.gold, textShadow: "0 0 80px rgba(212,175,55,0.3), 0 0 160px rgba(212,175,55,0.1)" }}>HMZ</span>
              <span style={{ fontSize: 76, fontWeight: 500, fontFamily: theme.fontHeading, color: theme.white, textShadow: "0 0 60px rgba(255,255,255,0.08)" }}>Develop</span>
            </div>
          </div>
        </div>
        <div style={{ height: 3, width: 180, background: theme.gradientGold, transform: `scaleX(${interpolate(frame, [30, 70], [0, 1])})`, marginBottom: 32, boxShadow: "0 0 40px rgba(212,175,55,0.5)" }} />
        <div style={{ fontFamily: theme.fontHeading, fontSize: 22, color: theme.muted, letterSpacing: "0.25em", textTransform: "uppercase", opacity: interpolate(frame, [60, 100], [0, 1]) }}>
          Premium Digital Studio
        </div>
      </div>

      <Vignette opacity={0.6} /> <Glow intensity={0.08} /> <Particles count={200} startFrame={0} /> <Grain />
    </div>
  );
};
