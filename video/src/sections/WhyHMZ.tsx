import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { Background } from "../components/Background";
import { Scene3D } from "../components/Scene3D";
import { SectionLabel } from "../components/GradientText";
import { GlassCard } from "../components/GlassCard";
import { colors } from "../colors";

const reasons = [
  {
    num: "01",
    title: "Modern Architecture",
    desc: "Built with the latest stack — React 19, Vite, and TypeScript for peak performance.",
  },
  {
    num: "02",
    title: "Luxury UI / UX",
    desc: "Every pixel is crafted with intention, delivering premium brand experiences.",
  },
  {
    num: "03",
    title: "Fast Performance",
    desc: "Optimized builds, lazy-loaded 3D, and smooth 60fps interactions guaranteed.",
  },
  {
    num: "04",
    title: "Smooth Interactions",
    desc: "GSAP, Framer Motion, and custom 3D — motion that feels alive.",
  },
  {
    num: "05",
    title: "Mobile-First",
    desc: "Fully responsive design that looks stunning on every screen size.",
  },
  {
    num: "06",
    title: "Built for Scale",
    desc: "From landing pages to full platforms — architecture that grows with you.",
  },
];

export const WhyHMZ: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <Background showOrbs showParticles showGrid gradient="charcoal">
      <Scene3D type="minimal" startFrame={0} />

      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          gap: 60,
          padding: "60px 100px",
          maxWidth: 1200,
          width: "100%",
        }}
      >
        {/* Left - Sticky heading */}
        <div
          style={{
            flex: "0 0 320px",
          }}
        >
          <SectionLabel text="Why HMZDevelop" startFrame={0} />
          <h2
            style={{
              fontFamily: "'Clash Display', sans-serif",
              fontSize: 42,
              fontWeight: 700,
              color: colors.white,
              margin: "0 0 16px 0",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            Why{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #D4AF37, #F2D27A)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              HMZDevelop
            </span>
            ?
          </h2>
          <div
            style={{
              width: 60,
              height: 3,
              background: "linear-gradient(90deg, #D4AF37, transparent)",
            }}
          />
        </div>

        {/* Right - Reason list */}
        <div style={{ flex: 1 }}>
          {reasons.map((reason, i) => {
            const f = Math.max(0, frame - 10 - i * 10);
            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  gap: 24,
                  padding: "20px 0",
                  borderBottom: "1px solid rgba(212, 175, 55, 0.1)",
                  opacity: interpolate(f, [0, 15], [0, 1], {
                    extrapolateRight: "clamp",
                  }),
                  transform: `translateX(${interpolate(f, [0, 15], [30, 0], {
                    extrapolateRight: "clamp",
                  })}px)`,
                }}
              >
                <div
                  style={{
                    fontFamily: "'Clash Display', sans-serif",
                    fontSize: 48,
                    fontWeight: 700,
                    color: "rgba(212, 175, 55, 0.2)",
                    lineHeight: 1,
                    flex: "0 0 60px",
                  }}
                >
                  {reason.num}
                </div>
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontFamily: "'Clash Display', sans-serif",
                      fontSize: 20,
                      fontWeight: 600,
                      color: colors.white,
                      marginBottom: 6,
                    }}
                  >
                    {reason.title}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Satoshi', sans-serif",
                      fontSize: 14,
                      color: colors.muted,
                      lineHeight: 1.6,
                    }}
                  >
                    {reason.desc}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Background>
  );
};
