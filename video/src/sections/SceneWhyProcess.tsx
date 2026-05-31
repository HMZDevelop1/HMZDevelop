import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { Vignette, Glow, Particles, LightStreak, Grain, CinematicTitle, Subtitle, FloatingShape3D } from "../effects";
import { theme, REAL_WHY, REAL_PROCESS } from "../colors";

export const SceneWhyProcess: React.FC = () => {
  const frame = useCurrentFrame();
  const phaseSwitch = Math.floor(300 / 2);

  return (
    <div style={{ position: "absolute", inset: 0, background: theme.gradientDark, overflow: "hidden" }}>
      <FloatingShape3D type="diamond" size={90} x={88} y={18} speed={0.35} startFrame={0} />
      <FloatingShape3D type="torus" size={65} x={12} y={75} speed={0.6} startFrame={5} />
      <FloatingShape3D type="cube" size={55} x={92} y={82} speed={0.7} startFrame={10} />

      {/* Phase 1: Why HMZ (centered) */}
      <div style={{ position: "absolute", left: "50%", top: "5%", width: "80%", maxWidth: 1400, transform: "translateX(-50%)", textAlign: "center", opacity: interpolate(frame, [0, 22, phaseSwitch - 20, phaseSwitch], [0, 1, 1, 0]) }}>
        <Subtitle text="Why choose us" startFrame={0} style={{ fontSize: 18, justifyContent: "center" }} />
        <div style={{ display: "flex", alignItems: "baseline", gap: 14, marginBottom: 16, justifyContent: "center" }}>
          <span style={{ fontSize: 60, fontWeight: 700, fontFamily: theme.fontHeading, color: theme.white }}>Why</span>
          <span style={{ fontSize: 60, fontWeight: 700, fontFamily: theme.fontHeading, color: theme.gold }}>HMZDevelop?</span>
        </div>
        <div style={{ fontFamily: theme.fontBody, fontSize: 16, color: theme.muted, lineHeight: 1.7, marginBottom: 28, maxWidth: "70%", marginLeft: "auto", marginRight: "auto" }}>
          We don't just build websites — we engineer complete digital ecosystems that merge luxury aesthetics with industrial-grade performance.
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 4, maxWidth: 800, marginLeft: "auto", marginRight: "auto" }}>
          {REAL_WHY.map((r, i) => {
            const f = Math.max(0, frame - 10 - i * 6);
            return (
              <div key={i} style={{ display: "flex", gap: 16, padding: "10px 0", borderBottom: i < REAL_WHY.length - 1 ? "1px solid rgba(212,175,55,0.07)" : undefined, opacity: interpolate(f, [0, 16], [0, 1]) }}>
                <div style={{ fontFamily: theme.fontHeading, fontSize: 36, fontWeight: 700, color: "rgba(212,175,55,0.15)", lineHeight: 1, minWidth: 48 }}>{r.num}</div>
                <div style={{ textAlign: "left" }}>
                  <div style={{ fontFamily: theme.fontHeading, fontSize: 18, fontWeight: 600, color: theme.white, marginBottom: 2 }}>{r.title}</div>
                  <div style={{ fontFamily: theme.fontBody, fontSize: 14, color: theme.muted, lineHeight: 1.5 }}>{r.desc}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Phase 2: Process (centered) */}
      <div style={{ position: "absolute", left: "50%", top: "5%", width: "92%", maxWidth: 1800, opacity: interpolate(frame, [phaseSwitch, phaseSwitch + 20], [0, 1]), transform: "translateX(-50%)" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <Subtitle text="Our approach" startFrame={phaseSwitch} style={{ fontSize: 18, justifyContent: "center" }} />
          <CinematicTitle text="How We Create" startFrame={phaseSwitch + 8} duration={18} size={56} gradient by="word" style={{ textAlign: "center", justifyContent: "center" }} />
        </div>

        <div style={{ position: "relative", display: "flex", gap: 16, justifyContent: "center" }}>
          <div style={{ position: "absolute", top: 30, left: "3%", right: "3%", height: 3, background: "rgba(212,175,55,0.08)", borderRadius: 1 }}>
            <div style={{ height: "100%", width: `${Math.min((frame - phaseSwitch - 5) * 0.6, 100)}%`, background: theme.gradientGold, borderRadius: 1 }} />
          </div>

          {REAL_PROCESS.map((step, i) => {
            const f = Math.max(0, frame - phaseSwitch - 10 - i * 8);
            const active = (frame - phaseSwitch - 5) * 0.6 >= (i / REAL_PROCESS.length) * 100;
            return (
              <div key={i} style={{ flex: 1, maxWidth: 300, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", opacity: interpolate(f, [0, 14], [0, 1]) }}>
                <div style={{ width: 60, height: 60, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", background: active ? theme.gradientGold : "rgba(212,175,55,0.06)", border: active ? "none" : "1px solid rgba(212,175,55,0.15)", marginBottom: 12, position: "relative", zIndex: 1 }}>
                  <span style={{ fontFamily: theme.fontHeading, fontSize: 22, fontWeight: 700, color: active ? theme.black : theme.gold }}>{step.num}</span>
                </div>
                <div style={{ fontFamily: theme.fontHeading, fontSize: 17, fontWeight: 600, color: theme.white, marginBottom: 6 }}>{step.title}</div>
                <div style={{ fontFamily: theme.fontBody, fontSize: 13, color: theme.muted, lineHeight: 1.6, maxWidth: 240 }}>{step.desc}</div>
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ position: "absolute", top: "50%", left: "5%", right: "5%", height: 1, background: `linear-gradient(90deg, transparent, rgba(212,175,55,0.08), transparent)`, opacity: interpolate(frame, [phaseSwitch - 10, phaseSwitch + 5, phaseSwitch + 10, phaseSwitch + 20], [0, 1, 1, 0]) }} />

      <Vignette opacity={0.5} /> <Glow intensity={0.03} /> <Particles count={70} startFrame={5} /> <LightStreak startFrame={20} /> <Grain />
    </div>
  );
};
