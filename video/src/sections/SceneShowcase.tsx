import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { Vignette, Glow, Particles, LightStreak, Grain, CinematicTitle, Subtitle, TagPill, GlassCard, FloatingShape3D } from "../effects";
import { theme, REAL_PROJECT, REAL_SKILLS } from "../colors";

export const SceneShowcase: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <div style={{ position: "absolute", inset: 0, background: theme.gradientDark, overflow: "hidden" }}>
      <FloatingShape3D type="diamond" size={90} x={10} y={20} speed={0.35} startFrame={0} />
      <FloatingShape3D type="cube" size={65} x={90} y={80} speed={0.5} startFrame={5} />
      <FloatingShape3D type="torus" size={75} x={85} y={25} speed={0.4} startFrame={10} />

      <div style={{ position: "absolute", top: "6%", left: "50%", transform: "translateX(-50%)", zIndex: 10, textAlign: "center" }}>
        <Subtitle text="Our latest work" startFrame={0} style={{ fontSize: 20, justifyContent: "center" }} />
        <CinematicTitle text="Featured Project" startFrame={6} duration={18} size={54} gradient by="word" style={{ textAlign: "center" }} />
      </div>

      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-55%)", width: "80%", maxWidth: 1600, opacity: interpolate(frame, [10, 40], [0, 1]) }}>
        <GlassCard glow style={{ padding: 0, border: "1px solid rgba(212,175,55,0.25)", borderRadius: 24, overflow: "hidden" }}>
          <div style={{ display: "flex", minHeight: "38vh" }}>
            <div style={{ flex: "0 0 38%", background: "linear-gradient(135deg, rgba(13,11,8,0.5), rgba(5,5,5,0.5))", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", borderRight: "1px solid rgba(212,175,55,0.06)" }}>
              <div style={{ position: "absolute", top: 24, left: 24, width: 14, height: 14, borderTop: "2px solid rgba(212,175,55,0.2)", borderLeft: "2px solid rgba(212,175,55,0.2)" }} />
              <div style={{ position: "absolute", top: 24, right: 24, width: 14, height: 14, borderTop: "2px solid rgba(212,175,55,0.2)", borderRight: "2px solid rgba(212,175,55,0.2)" }} />
              <div style={{ position: "absolute", bottom: 24, left: 24, width: 14, height: 14, borderBottom: "2px solid rgba(212,175,55,0.2)", borderLeft: "2px solid rgba(212,175,55,0.2)" }} />
              <div style={{ position: "absolute", bottom: 24, right: 24, width: 14, height: 14, borderBottom: "2px solid rgba(212,175,55,0.2)", borderRight: "2px solid rgba(212,175,55,0.2)" }} />
              <div style={{ position: "absolute", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(212,175,55,0.12), transparent 60%)" }} />
              <div style={{ width: 130, height: 130, borderRadius: 20, background: "linear-gradient(135deg, rgba(212,175,55,0.12), rgba(5,5,5,0.9))", border: "1px solid rgba(212,175,55,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 4 }}>
                <span style={{ fontFamily: theme.fontHeading, fontSize: 22, fontWeight: 700, color: theme.white, letterSpacing: "0.12em" }}>LOOKING</span>
                <span style={{ fontFamily: theme.fontHeading, fontSize: 30, fontWeight: 700, color: theme.gold, letterSpacing: "0.06em" }}>2FLYY</span>
              </div>
            </div>

            <div style={{ flex: 1, padding: "40px 36px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <div style={{ fontFamily: theme.fontBody, fontSize: 12, color: "rgba(212,175,55,0.5)", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 8 }}>{REAL_PROJECT.category}</div>
              <div style={{ fontFamily: theme.fontHeading, fontSize: 36, fontWeight: 600, color: theme.white, marginBottom: 10 }}>{REAL_PROJECT.title}</div>
              <p style={{ fontFamily: theme.fontBody, fontSize: 16, color: "rgba(255,255,255,0.4)", lineHeight: 1.7, marginBottom: 16 }}>{REAL_PROJECT.desc}</p>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
                {REAL_PROJECT.tags.map((t, i) => <TagPill key={i} text={t} style={{ fontSize: 12 }} />)}
              </div>
              <div style={{ padding: "10px 16px", borderRadius: 10, background: "linear-gradient(135deg, rgba(212,175,55,0.06), rgba(242,210,122,0.02))", border: "1px solid rgba(212,175,55,0.08)", display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ flex: 1, height: 6, borderRadius: 3, background: "rgba(212,175,55,0.08)", overflow: "hidden" }}>
                  <div style={{ height: "100%", width: "60%", borderRadius: 3, background: "linear-gradient(90deg, #D4AF37, #F2D27A, #D4AF37)" }} />
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: theme.gold, boxShadow: "0 0 6px rgba(212,175,55,0.5)" }} />
                  <span style={{ fontFamily: theme.fontBody, fontSize: 10, color: "rgba(212,175,55,0.5)", letterSpacing: "0.2em", textTransform: "uppercase" }}>Beta</span>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 18, marginTop: 12, borderTop: "1px solid rgba(212,175,55,0.06)" }}>
                <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                  {REAL_PROJECT.features.map((f, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      <span style={{ width: 4, height: 4, borderRadius: "50%", background: "rgba(212,175,55,0.2)" }} />
                      <span style={{ fontFamily: theme.fontBody, fontSize: 10, color: "rgba(212,175,55,0.35)", letterSpacing: "0.06em", textTransform: "uppercase" }}>{f}</span>
                    </div>
                  ))}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 18px", borderRadius: 100, border: "1px solid rgba(212,175,55,0.2)", color: "rgba(212,175,55,0.8)", fontFamily: theme.fontBody, fontSize: 12, letterSpacing: "0.06em", textTransform: "uppercase" }}>
                  <span>Visit site</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </div>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>

      <div style={{ position: "absolute", bottom: "6%", left: "50%", transform: "translateX(-50%)", display: "flex", gap: 24, opacity: interpolate(frame, [25, 55], [0, 1]) }}>
        {[{v:"48h",l:"Delivery"},{v:"100%",l:"UI/UX"},{v:"98",l:"SEO"},{v:"∞",l:"Animations"}].map((s, i) => (
          <div key={i} style={{ textAlign: "center", padding: "10px 36px", borderRight: i < 3 ? "1px solid rgba(212,175,55,0.1)" : undefined }}>
            <div style={{ fontFamily: theme.fontHeading, fontSize: 40, fontWeight: 700, color: theme.gold }}>{s.v}</div>
            <div style={{ fontFamily: theme.fontBody, fontSize: 15, color: theme.muted }}>{s.l}</div>
          </div>
        ))}
      </div>

      <Vignette opacity={0.5} /> <Glow intensity={0.03} /> <Particles count={90} startFrame={5} /> <LightStreak startFrame={15} /> <Grain />
    </div>
  );
};
