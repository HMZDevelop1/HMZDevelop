import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { Background } from "../components/Background";
import { GlassCard } from "../components/GlassCard";
import { SectionLabel } from "../components/GradientText";
import { colors } from "../colors";

export const Contact: React.FC = () => {
  const frame = useCurrentFrame();

  const formFields = [
    { label: "Name", type: "text", delay: 10 },
    { label: "Email", type: "email", delay: 18 },
    { label: "Project Type", type: "select", delay: 26 },
    { label: "Message", type: "textarea", delay: 34 },
  ];

  return (
    <Background showOrbs showParticles showGrid gradient="charcoal">
      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "60px 80px",
          maxWidth: 600,
          width: "100%",
        }}
      >
        <SectionLabel text="Get in touch" startFrame={0} />

        <h2
          style={{
            fontFamily: "'Clash Display', sans-serif",
            fontSize: 38,
            fontWeight: 700,
            color: colors.white,
            margin: "0 0 32px 0",
            letterSpacing: "-0.02em",
            textAlign: "center",
          }}
        >
          Let{"'"}s build something{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #D4AF37, #F2D27A)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            great
          </span>
        </h2>

        <GlassCard
          width="100%"
          padding={36}
          startFrame={0}
          delay={5}
          glow
          style={{
            border: "1px solid rgba(212, 175, 55, 0.2)",
          }}
        >
          {/* Form fields */}
          {formFields.map((field, i) => {
            const f = Math.max(0, frame - field.delay);
            return (
              <div
                key={i}
                style={{
                  marginBottom: i < formFields.length - 1 ? 20 : 28,
                  opacity: interpolate(f, [0, 12], [0, 1], {
                    extrapolateRight: "clamp",
                  }),
                  transform: `translateY(${interpolate(f, [0, 12], [15, 0], {
                    extrapolateRight: "clamp",
                  })}px)`,
                }}
              >
                <div
                  style={{
                    fontFamily: "'Satoshi', sans-serif",
                    fontSize: 13,
                    color: colors.muted,
                    marginBottom: 6,
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                  }}
                >
                  {field.label}
                </div>
                {field.type === "textarea" ? (
                  <div
                    style={{
                      height: 80,
                      borderRadius: 8,
                      background: "rgba(255, 255, 255, 0.03)",
                      border: "1px solid rgba(212, 175, 55, 0.12)",
                    }}
                  />
                ) : field.type === "select" ? (
                  <div
                    style={{
                      height: 44,
                      borderRadius: 8,
                      background: "rgba(255, 255, 255, 0.03)",
                      border: "1px solid rgba(212, 175, 55, 0.12)",
                      display: "flex",
                      alignItems: "center",
                      padding: "0 16px",
                      color: colors.muted,
                      fontFamily: "'Satoshi', sans-serif",
                      fontSize: 14,
                    }}
                  >
                    Select project type...
                  </div>
                ) : (
                  <div
                    style={{
                      height: 44,
                      borderRadius: 8,
                      background: "rgba(255, 255, 255, 0.03)",
                      border: "1px solid rgba(212, 175, 55, 0.12)",
                    }}
                  />
                )}
              </div>
            );
          })}

          {/* Submit button */}
          <div
            style={{
              padding: "14px 0",
              borderRadius: 8,
              background: "linear-gradient(135deg, #D4AF37, #F2D27A)",
              textAlign: "center",
              color: colors.black,
              fontFamily: "'Satoshi', sans-serif",
              fontSize: 15,
              fontWeight: 700,
              letterSpacing: "0.02em",
              opacity: interpolate(
                Math.max(0, frame - 40),
                [0, 15],
                [0, 1],
                { extrapolateRight: "clamp" }
              ),
            }}
          >
            Send Message
          </div>
        </GlassCard>

        {/* Social links */}
        <div
          style={{
            display: "flex",
            gap: 24,
            marginTop: 28,
            opacity: interpolate(Math.max(0, frame - 55), [0, 15], [0, 1], {
              extrapolateRight: "clamp",
            }),
          }}
        >
          {["Email", "Instagram", "GitHub"].map((link, i) => (
            <div
              key={i}
              style={{
                fontFamily: "'Satoshi', sans-serif",
                fontSize: 13,
                color: colors.muted,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                cursor: "pointer",
              }}
            >
              {link}
            </div>
          ))}
        </div>
      </div>
    </Background>
  );
};
