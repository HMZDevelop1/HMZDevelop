import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { Vignette, Glow, Particles, Grain, FloatingShape3D } from "../effects";
import { theme } from "../colors";

const InstagramIcon: React.FC = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="#D4AF37">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

export const SceneFinal: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <div style={{ position: "absolute", inset: 0, background: theme.black, overflow: "hidden" }}>
      <FloatingShape3D type="diamond" size={120} x={50} y={50} speed={0.15} startFrame={0} />
      <FloatingShape3D type="torus" size={80} x={20} y={25} speed={0.3} startFrame={5} />
      <FloatingShape3D type="cube" size={65} x={80} y={75} speed={0.4} startFrame={10} />

      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "70%", height: "70%", background: "radial-gradient(ellipse, rgba(212,175,55,0.03), transparent 60%)" }} />

      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "45%", height: "45%", borderRadius: "50%", border: "1px solid rgba(212,175,55,0.04)", opacity: interpolate(frame, [0, 80], [0, 0.3]) }} />
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "55%", height: "55%", borderRadius: "50%", border: "1px solid rgba(212,175,55,0.02)", opacity: interpolate(frame, [30, 120], [0, 0.2]) }} />

      {/* Logo */}
      <div style={{ position: "absolute", top: "22%", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 12, opacity: interpolate(frame, [0, 30], [0, 1]) }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 14 }}>
          <span style={{ fontSize: 110, fontWeight: 700, fontFamily: theme.fontHeading, color: theme.gold, textShadow: "0 0 80px rgba(212,175,55,0.3), 0 0 160px rgba(212,175,55,0.1)" }}>HMZ</span>
          <span style={{ fontSize: 76, fontWeight: 500, fontFamily: theme.fontHeading, color: theme.white, textShadow: "0 0 60px rgba(255,255,255,0.08)" }}>Develop</span>
        </div>
        <div style={{ height: 3, width: 200, background: theme.gradientGold, transform: `scaleX(${interpolate(frame, [20, 50], [0, 1])})`, boxShadow: "0 0 50px rgba(212,175,55,0.5)" }} />
      </div>

      {/* We Design. We Develop. We Scale. */}
      <div style={{ position: "absolute", top: "38%", left: "50%", transform: "translateX(-50%)", textAlign: "center" }}>
        <div style={{ fontFamily: theme.fontAccent, fontSize: 30, color: theme.gold, fontStyle: "italic", letterSpacing: "0.3em", marginBottom: 14, opacity: interpolate(frame, [40, 75], [0, 1]) }}>
          We Design. We Develop. We Scale.
        </div>
        <div style={{ fontFamily: theme.fontHeading, fontSize: 56, fontWeight: 700, color: theme.white, letterSpacing: "-0.02em", opacity: interpolate(frame, [55, 95], [0, 1]) }}>
          Digital Solutions,{" "}
          <span style={{ color: theme.gold }}>Without Limits.</span>
        </div>
      </div>

      {/* Instagram + Email */}
      <div style={{ position: "absolute", top: "60%", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 16, opacity: interpolate(frame, [100, 150], [0, 1]) }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <InstagramIcon />
          <span style={{ fontFamily: theme.fontBody, fontSize: 22, color: theme.gold, letterSpacing: "0.08em" }}>@hmzdevelop</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
          <span style={{ fontFamily: theme.fontBody, fontSize: 20, color: theme.muted, letterSpacing: "0.04em" }}>hmzdevelop@hmzdevelop.net</span>
        </div>
      </div>

      {/* Designed by credit */}
      <div style={{ position: "absolute", bottom: "6%", left: "50%", transform: "translateX(-50%)", opacity: interpolate(frame, [120, 180], [0, 1]) }}>
        <div style={{ width: 60, height: 1, background: "rgba(212,175,55,0.15)", margin: "0 auto 12px" }} />
        <span style={{ fontFamily: theme.fontAccent, fontSize: 16, color: theme.muted, fontStyle: "italic" }}>
          Designed &amp; Developed by HMZDevelop
        </span>
      </div>

      <Vignette opacity={0.7} /> <Glow intensity={0.05} /> <Particles count={250} startFrame={0} /> <Grain />
    </div>
  );
};
