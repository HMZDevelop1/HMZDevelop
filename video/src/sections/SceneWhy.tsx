import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { Vignette, Glow, Particles, LightStreak, Grain, CinematicTitle, Subtitle, FloatingShape3D } from "../effects";
import { theme, REAL_WHY } from "../colors";

export const SceneWhy: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <div style={{ position: "absolute", inset: 0, background: theme.gradientDark, overflow: "hidden" }}>
      <FloatingShape3D type="diamond" size={95} x={88} y={18} speed={0.3} startFrame={0} />
      <FloatingShape3D type="torus" size={70} x={12} y={75} speed={0.5} startFrame={5} />
      <FloatingShape3D type="cube" size={60} x={92} y={82} speed={0.6} startFrame={10} />

      <div style={{ position: "absolute", left: "50%", top: "8%", width: "85%", maxWidth: 1600, transform: "translateX(-50%)", textAlign: "center" }}>
        <Subtitle text="Why choose us" startFrame={0} style={{ fontSize: 18, justifyContent: "center" }} />
        <div style={{ display: "flex", alignItems: "baseline", gap: 14, marginBottom: 20, justifyContent: "center", opacity: interpolate(frame, [0, 20], [0, 1]) }}>
          <span style={{ fontSize: 64, fontWeight: 700, fontFamily: theme.fontHeading, color: theme.white }}>Why</span>
          <span style={{ fontSize: 64, fontWeight: 700, fontFamily: theme.fontHeading, color: theme.gold }}>HMZDevelop?</span>
        </div>
        <div style={{ fontFamily: theme.fontBody, fontSize: 17, color: theme.muted, lineHeight: 1.8, marginBottom: 32, maxWidth: "70%", marginLeft: "auto", marginRight: "auto", opacity: interpolate(frame, [10, 30], [0, 1]) }}>
          We don't just build websites — we engineer complete digital ecosystems that merge luxury aesthetics with industrial-grade performance.
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center", maxWidth: 1100, marginLeft: "auto", marginRight: "auto" }}>
          {REAL_WHY.map((r, i) => {
            const f = Math.max(0, frame - 15 - i * 5);
            return (
              <div key={i} style={{ flex: "1 1 30%", minWidth: 280, maxWidth: 340, padding: "18px 20px", borderRadius: 16, background: "rgba(212,175,55,0.03)", border: "1px solid rgba(212,175,55,0.08)", opacity: interpolate(f, [0, 16], [0, 1]) }}>
                <div style={{ fontFamily: theme.fontHeading, fontSize: 32, fontWeight: 700, color: "rgba(212,175,55,0.2)", lineHeight: 1, marginBottom: 6, textAlign: "left" }}>{r.num}</div>
                <div style={{ textAlign: "left" }}>
                  <div style={{ fontFamily: theme.fontHeading, fontSize: 18, fontWeight: 600, color: theme.white, marginBottom: 4 }}>{r.title}</div>
                  <div style={{ fontFamily: theme.fontBody, fontSize: 14, color: theme.muted, lineHeight: 1.5 }}>{r.desc}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Vignette opacity={0.5} /> <Glow intensity={0.03} /> <Particles count={80} startFrame={5} /> <LightStreak startFrame={15} /> <Grain />
    </div>
  );
};
