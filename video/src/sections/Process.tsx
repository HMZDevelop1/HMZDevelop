import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { Background } from "../components/Background";
import { SectionLabel } from "../components/GradientText";
import { colors } from "../colors";

const steps = [
  { num: "01", title: "Strategy", desc: "We define your goals, audience, and vision" },
  { num: "02", title: "Design", desc: "Pixel-perfect mockups with luxury aesthetics" },
  { num: "03", title: "Development", desc: "Clean code with modern architecture" },
  { num: "04", title: "Optimization", desc: "Performance, SEO, and accessibility" },
  { num: "05", title: "Scale", desc: "Deploy, monitor, and grow your presence" },
];

export const Process: React.FC = () => {
  const frame = useCurrentFrame();
  const progress = Math.min(frame * 0.8, 100);

  return (
    <Background showOrbs showParticles showGrid gradient="charcoal">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "60px 80px",
          maxWidth: 1200,
          width: "100%",
        }}
      >
        <SectionLabel text="How we create" startFrame={0} />

        <h2
          style={{
            fontFamily: "'Clash Display', sans-serif",
            fontSize: 42,
            fontWeight: 700,
            color: colors.white,
            margin: "0 0 48px 0",
            letterSpacing: "-0.02em",
          }}
        >
          Our{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #D4AF37, #F2D27A)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            process
          </span>
        </h2>

        <div
          style={{
            position: "relative",
            display: "flex",
            gap: 16,
            width: "100%",
          }}
        >
          {/* Progress line */}
          <div
            style={{
              position: "absolute",
              top: 32,
              left: "2.5%",
              right: "2.5%",
              height: 2,
              background: "rgba(212, 175, 55, 0.1)",
              borderRadius: 1,
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${progress}%`,
                background: "linear-gradient(90deg, #D4AF37, #F2D27A)",
                borderRadius: 1,
                transition: "none",
              }}
            />
          </div>

          {steps.map((step, i) => {
            const f = Math.max(0, frame - 10 - i * 8);
            const isActive = progress >= (i / steps.length) * 100;

            return (
              <div
                key={i}
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  opacity: interpolate(f, [0, 15], [0, 1], {
                    extrapolateRight: "clamp",
                  }),
                  transform: `translateY(${interpolate(f, [0, 20], [30, 0], {
                    extrapolateRight: "clamp",
                  })}px)`,
                }}
              >
                {/* Circle number */}
                <div
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: isActive
                      ? "linear-gradient(135deg, #D4AF37, #F2D27A)"
                      : "rgba(212, 175, 55, 0.08)",
                    border: isActive
                      ? "none"
                      : "1px solid rgba(212, 175, 55, 0.2)",
                    marginBottom: 16,
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Clash Display', sans-serif",
                      fontSize: 20,
                      fontWeight: 700,
                      color: isActive ? colors.black : colors.gold,
                    }}
                  >
                    {step.num}
                  </span>
                </div>

                <div
                  style={{
                    fontFamily: "'Clash Display', sans-serif",
                    fontSize: 18,
                    fontWeight: 600,
                    color: colors.white,
                    marginBottom: 6,
                  }}
                >
                  {step.title}
                </div>

                <div
                  style={{
                    fontFamily: "'Satoshi', sans-serif",
                    fontSize: 13,
                    color: colors.muted,
                    lineHeight: 1.5,
                    padding: "0 8px",
                  }}
                >
                  {step.desc}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Background>
  );
};
