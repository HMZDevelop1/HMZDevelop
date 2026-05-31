import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { Vignette, Glow, Particles, LightStreak, Grain, CinematicTitle, Subtitle, GlassCard, FloatingShape3D } from "../effects";
import { theme, REAL_CONTACT } from "../colors";

export const SceneContact: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <div style={{ position: "absolute", inset: 0, background: theme.gradientDark, overflow: "hidden" }}>
      <FloatingShape3D type="diamond" size={80} x={12} y={22} speed={0.4} startFrame={0} />
      <FloatingShape3D type="cube" size={60} x={88} y={78} speed={0.6} startFrame={5} />
      <FloatingShape3D type="torus" size={70} x={85} y={20} speed={0.5} startFrame={10} />

      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(circle at 50% 50%, rgba(212,175,55,0.03), transparent 60%)` }} />

      <div style={{ position: "absolute", top: "8%", left: "50%", transform: "translateX(-50%)", textAlign: "center", zIndex: 10 }}>
        <Subtitle text="Let's create" startFrame={0} style={{ justifyContent: "center", fontSize: 18 }} />
        <div style={{ opacity: interpolate(Math.max(0, frame - 6), [0, 14], [0, 1]) }}>
          <span style={{ fontFamily: theme.fontHeading, fontSize: 56, fontWeight: 700, backgroundImage: theme.gradientGold, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Let's Build</span>
          <span style={{ fontFamily: theme.fontHeading, fontSize: 56, fontWeight: 700, color: theme.white, display: "block", textShadow: "0 0 40px rgba(255,255,255,0.08)" }}>Together</span>
        </div>
      </div>

      <div style={{ position: "absolute", top: "48%", left: "50%", transform: "translate(-50%,-55%)", display: "flex", gap: 36, width: "70%", maxWidth: 1400 }}>
        <GlassCard glow style={{ flex: 1.5, padding: 44, border: "1px solid rgba(212,175,55,0.15)" }}>
          <div style={{ display: "flex", flexDirection: "column", marginBottom: 28, padding: "16px 20px", borderRadius: 14, background: "rgba(212,175,55,0.04)", border: "1px solid rgba(212,175,55,0.08)", opacity: interpolate(frame, [15, 38], [0, 1]) }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: theme.gold }} />
              <span style={{ fontFamily: theme.fontBody, fontSize: 13, color: theme.gold, letterSpacing: "0.2em", textTransform: "uppercase" }}>{REAL_CONTACT.booking}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 12px", borderRadius: 8, background: "rgba(212,175,55,0.04)", border: "1px solid rgba(212,175,55,0.06)", marginBottom: 12 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ color: "rgba(212,175,55,0.5)" }}><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
              <span style={{ fontFamily: theme.fontBody, fontSize: 12, color: "rgba(212,175,55,0.5)" }}>Google Meet</span>
              <span style={{ fontFamily: theme.fontBody, fontSize: 11, color: "rgba(255,255,255,0.2)", marginLeft: "auto" }}>Link sent after confirmation</span>
            </div>
            <div style={{ display: "flex", gap: 12 }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: theme.fontBody, fontSize: 11, color: theme.muted, letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: 4 }}>Date</div>
                <div style={{ height: 36, borderRadius: 6, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(212,175,55,0.06)", display: "flex", alignItems: "center", padding: "0 10px", fontFamily: theme.fontBody, fontSize: 12, color: "rgba(255,255,255,0.4)" }}>Select a date</div>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: theme.fontBody, fontSize: 11, color: theme.muted, letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: 4 }}>Time</div>
                <div style={{ height: 36, borderRadius: 6, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(212,175,55,0.06)", display: "flex", alignItems: "center", padding: "0 10px", fontFamily: theme.fontBody, fontSize: 12, color: "rgba(255,255,255,0.4)" }}>Select a time</div>
              </div>
            </div>
          </div>

          {[
            { label: "Name", ph: "Your name", delay: 6 },
            { label: "Email", ph: "your@email.com", delay: 14 },
            { label: "Project Type", ph: "Select a service", delay: 22 },
          ].map((field, i) => {
            const f = Math.max(0, frame - field.delay);
            return (
              <div key={i} style={{ marginBottom: 20, opacity: interpolate(f, [0, 14], [0, 1]) }}>
                <div style={{ fontFamily: theme.fontBody, fontSize: 14, color: theme.muted, marginBottom: 6, letterSpacing: "0.05em", textTransform: "uppercase" }}>{field.label}</div>
                <div style={{ height: 48, borderRadius: 10, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(212,175,55,0.08)", display: "flex", alignItems: "center", padding: "0 16px", color: theme.muted, fontFamily: theme.fontBody, fontSize: 16 }}>
                  {field.label === "Project Type" ? REAL_CONTACT.projectOptions[0] : field.ph}
                </div>
              </div>
            );
          })}

          <div style={{ marginBottom: 24, opacity: interpolate(Math.max(0, frame - 30), [0, 10], [0, 1]) }}>
            <div style={{ fontFamily: theme.fontBody, fontSize: 14, color: theme.muted, marginBottom: 6, letterSpacing: "0.05em", textTransform: "uppercase" }}>Message</div>
            <div style={{ height: 90, borderRadius: 10, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(212,175,55,0.08)" }} />
          </div>

          <div style={{ padding: "16px 0", borderRadius: 10, background: theme.gradientGold, textAlign: "center", color: theme.black, fontWeight: 700, fontFamily: theme.fontBody, fontSize: 17, opacity: interpolate(Math.max(0, frame - 40), [0, 14], [0, 1]) }}>
            Send Message
          </div>
        </GlassCard>

        <GlassCard glow style={{ flex: 1, padding: 40, display: "flex", flexDirection: "column", justifyContent: "center", border: "1px solid rgba(212,175,55,0.15)" }}>
          <div style={{ fontFamily: theme.fontBody, fontSize: 14, color: theme.muted, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 24, opacity: interpolate(frame, [10, 28], [0, 1]) }}>Connect With Us</div>
          
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {REAL_CONTACT.socials.map((s, i) => {
              const f = Math.max(0, frame - 14 - i * 4);
              const Icon = () => {
                if (s.name === "Email") return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>;
                if (s.name === "Instagram") return <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>;
                if (s.name === "GitHub") return <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>;
                return null;
              };
              return (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 16, opacity: interpolate(f, [0, 18], [0, 1]) }}>
                  <div style={{ width: 48, height: 48, borderRadius: "50%", background: "rgba(212,175,55,0.06)", border: "1px solid rgba(212,175,55,0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: theme.gold }}><Icon /></div>
                  <div>
                    <div style={{ fontFamily: theme.fontBody, fontSize: 13, color: theme.muted, letterSpacing: "0.08em", textTransform: "uppercase" }}>{s.name}</div>
                    <div style={{ fontFamily: theme.fontBody, fontSize: 17, color: theme.gold }}>{s.value}</div>
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ marginTop: 28, padding: "14px 18px", borderRadius: 14, background: "rgba(34,197,94,0.04)", border: "1px solid rgba(34,197,94,0.12)", opacity: interpolate(frame, [24, 40], [0, 1]) }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#22c55e" }} />
              <span style={{ fontFamily: theme.fontBody, fontSize: 16, color: "#22c55e", fontWeight: 600 }}>Available for projects</span>
            </div>
            <div style={{ fontFamily: theme.fontBody, fontSize: 14, color: theme.muted, lineHeight: 1.6 }}>
              Open to new collaborations. Let's build something extraordinary together.
            </div>
          </div>
        </GlassCard>
      </div>

      <Vignette opacity={0.5} /> <Glow intensity={0.03} /> <Particles count={75} startFrame={5} /> <LightStreak startFrame={20} /> <Grain />
    </div>
  );
};
