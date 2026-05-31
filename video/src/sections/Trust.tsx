import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { Background } from "../components/Background";
import { SectionLabel } from "../components/GradientText";
import { GlassCard } from "../components/GlassCard";
import { colors } from "../colors";

const stats = [
  { number: "48h", label: "Delivery", desc: "Average turnaround time" },
  { number: "100%", label: "Premium UI/UX", desc: "Pixel-perfect interfaces" },
  { number: "98", label: "SEO Score", desc: "Optimized performance" },
  { number: "100%", label: "Responsive", desc: "All devices covered" },
  { number: "∞", label: "Animations", desc: "Smooth motion design" },
  { number: "∞", label: "Scalable", desc: "Built to grow" },
];

export const Trust: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <Background showOrbs showParticles showGrid gradient="charcoal">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "60px 80px",
          maxWidth: 1100,
          width: "100%",
        }}
      >
        <SectionLabel text="Why choose us" startFrame={0} />

        <h2
          style={{
            fontFamily: "'Clash Display', sans-serif",
            fontSize: 42,
            fontWeight: 700,
            color: colors.white,
            margin: "0 0 8px 0",
            letterSpacing: "-0.02em",
          }}
        >
          Numbers speak for{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #D4AF37, #F2D27A)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            themselves
          </span>
        </h2>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 12,
            justifyContent: "center",
            marginTop: 36,
          }}
        >
          {stats.map((stat, i) => (
            <GlassCard
              key={i}
              width={310}
              height={160}
              startFrame={0}
              delay={10 + i * 5}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontFamily: "'Clash Display', sans-serif",
                  fontSize: 48,
                  fontWeight: 700,
                  background: "linear-gradient(135deg, #D4AF37, #F2D27A)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  lineHeight: 1,
                  marginBottom: 8,
                }}
              >
                {stat.number}
              </div>
              <div
                style={{
                  fontFamily: "'Satoshi', sans-serif",
                  fontSize: 16,
                  fontWeight: 700,
                  color: colors.white,
                  marginBottom: 4,
                }}
              >
                {stat.label}
              </div>
              <div
                style={{
                  fontFamily: "'Satoshi', sans-serif",
                  fontSize: 13,
                  color: colors.muted,
                }}
              >
                {stat.desc}
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </Background>
  );
};
