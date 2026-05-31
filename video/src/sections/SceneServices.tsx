import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { Vignette, Glow, Particles, LightStreak, Grain, CinematicTitle, Subtitle, FloatingShape3D } from "../effects";
import { theme, REAL_SERVICES } from "../colors";

export const SceneServices: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <div style={{ position: "absolute", inset: 0, background: theme.gradientDark, overflow: "hidden" }}>
      <FloatingShape3D type="diamond" size={100} x={88} y={15} speed={0.3} startFrame={0} />
      <FloatingShape3D type="cube" size={60} x={12} y={80} speed={0.6} startFrame={5} />
      <FloatingShape3D type="torus" size={75} x={90} y={72} speed={0.4} startFrame={10} />

      <div style={{ position: "absolute", top: "6%", left: "50%", transform: "translateX(-50%)", textAlign: "center", zIndex: 10 }}>
        <Subtitle text="What we create" startFrame={0} style={{ fontSize: 20, justifyContent: "center" }} />
        <CinematicTitle text="Premium Services" startFrame={6} duration={20} size={60} gradient by="word" style={{ textAlign: "center" }} />
      </div>

      <div style={{ position: "absolute", top: "22%", left: "50%", transform: "translateX(-50%)", display: "flex", gap: 14, opacity: interpolate(frame, [15, 35], [0, 1]) }}>
        {["$99", "$149", "$249", "Custom"].map((p, i) => (
          <div key={i} style={{ padding: "8px 28px", borderRadius: 100, background: i === 1 ? theme.gradientGold : "rgba(212,175,55,0.06)", border: i === 1 ? "none" : "1px solid rgba(212,175,55,0.12)", color: i === 1 ? theme.black : theme.gold, fontFamily: theme.fontBody, fontSize: 18, fontWeight: i === 1 ? 700 : 500 }}>{p}</div>
        ))}
      </div>

      <div style={{ position: "absolute", top: "58%", left: "50%", transform: "translate(-50%,-50%)", display: "flex", gap: 20, padding: "0 60px", width: "100%", maxWidth: 2000, boxSizing: "border-box" }}>
        {REAL_SERVICES.map((svc, i) => {
          const f = Math.max(0, frame - 20 - i * 10);
          return (
            <div key={i} style={{ flex: 1, opacity: interpolate(f, [0, 20], [0, 1]) }}>
              <div style={{ padding: "34px 28px", borderRadius: 20, background: svc.popular ? "linear-gradient(135deg, rgba(212,175,55,0.1), rgba(11,11,13,0.7))" : theme.glassCard, border: svc.popular ? "1.5px solid rgba(212,175,55,0.5)" : "1px solid rgba(212,175,55,0.15)", boxShadow: svc.popular ? "0 0 80px rgba(212,175,55,0.12), 0 8px 40px rgba(0,0,0,0.5)" : "0 8px 32px rgba(0,0,0,0.4)", height: "100%", display: "flex", flexDirection: "column", position: "relative", overflow: "hidden" }}>
                {svc.popular && <div style={{ position: "absolute", top: 16, right: -34, padding: "4px 40px", background: theme.gradientGold, color: theme.black, fontFamily: theme.fontBody, fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", transform: "rotate(45deg)" }}>Most Popular</div>}
                <div style={{ fontSize: 38, marginBottom: 14 }}>{svc.icon}</div>
                <div style={{ fontFamily: theme.fontHeading, fontSize: 24, fontWeight: 600, color: theme.white, marginBottom: 8 }}>{svc.title}</div>
                <div style={{ fontFamily: theme.fontBody, fontSize: 44, fontWeight: 700, color: theme.gold, marginBottom: 10 }}>{svc.price}</div>
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 10 }}>
                  {svc.features.slice(0, 5).map((feat, j) => (
                    <div key={j} style={{ display: "flex", alignItems: "center", gap: 10, fontFamily: theme.fontBody, fontSize: 15, color: theme.mutedLight }}>
                      <span style={{ color: theme.gold, fontSize: 10 }}>◆</span> {feat}
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: 22, padding: "14px 0", borderRadius: 10, textAlign: "center", background: svc.popular ? theme.gradientGold : "rgba(212,175,55,0.06)", border: svc.popular ? undefined : "1px solid rgba(212,175,55,0.12)", color: svc.popular ? theme.black : theme.gold, fontFamily: theme.fontBody, fontSize: 16, fontWeight: 700 }}>Get Started</div>
              </div>
            </div>
          );
        })}
      </div>

      <Vignette opacity={0.5} /> <Glow intensity={0.03} /> <Particles count={100} startFrame={5} /> <LightStreak startFrame={15} /> <Grain />
    </div>
  );
};
