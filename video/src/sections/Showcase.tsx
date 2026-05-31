import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { Background } from "../components/Background";
import { Scene3D } from "../components/Scene3D";
import { SectionLabel } from "../components/GradientText";
import { GlassCard } from "../components/GlassCard";
import { colors } from "../colors";

export const Showcase: React.FC = () => {
  const frame = useCurrentFrame();

  const imageOpacity = interpolate(frame, [0, 25], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <Background showOrbs showParticles showGrid gradient="charcoal">
      <Scene3D type="showcase" startFrame={0} />

      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "60px 100px",
          maxWidth: 1100,
          width: "100%",
        }}
      >
        <SectionLabel text="Featured project" startFrame={0} />

        <h2
          style={{
            fontFamily: "'Clash Display', sans-serif",
            fontSize: 38,
            fontWeight: 700,
            color: colors.white,
            margin: "0 0 32px 0",
            letterSpacing: "-0.02em",
          }}
        >
          Our latest{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #D4AF37, #F2D27A)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            work
          </span>
        </h2>

        <GlassCard
          width="100%"
          padding={32}
          startFrame={0}
          delay={10}
          glow
          style={{
            display: "flex",
            gap: 40,
            alignItems: "center",
            position: "relative",
            overflow: "hidden",
            border: "1px solid rgba(212, 175, 55, 0.3)",
          }}
        >
          {/* Animated rotating border effect */}
          <div
            style={{
              position: "absolute",
              inset: -1,
              borderRadius: 16,
              padding: 1,
              background: `conic-gradient(from ${frame * 2}deg, transparent, rgba(212, 175, 55, 0.3), transparent, rgba(242, 210, 122, 0.2), transparent)`,
              WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              WebkitMaskComposite: "xor",
              maskComposite: "exclude",
              pointerEvents: "none",
            }}
          />

          {/* Left - Project preview */}
          <div
            style={{
              flex: "0 0 320px",
              height: 240,
              borderRadius: 12,
              background: "linear-gradient(135deg, rgba(212, 175, 55, 0.1), rgba(11, 11, 13, 0.8))",
              border: "1px solid rgba(212, 175, 55, 0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              opacity: imageOpacity,
              overflow: "hidden",
              position: "relative",
            }}
          >
            <div
              style={{
                fontFamily: "'Clash Display', sans-serif",
                fontSize: 32,
                fontWeight: 700,
                letterSpacing: "-0.02em",
              }}
            >
              <span
                style={{
                  background: "linear-gradient(135deg, #D4AF37, #F2D27A)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                L
              </span>
              <span style={{ color: colors.white }}>2</span>
              <span
                style={{
                  background: "linear-gradient(135deg, #D4AF37, #F2D27A)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                F
              </span>
            </div>

            {/* Glow overlay */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: `radial-gradient(circle at 50% 50%, rgba(212, 175, 55, 0.08), transparent 70%)`,
              }}
            />
          </div>

          {/* Right - Project info */}
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontFamily: "'Satoshi', sans-serif",
                fontSize: 12,
                color: colors.gold,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                marginBottom: 8,
              }}
            >
              Hair Salon Website
            </div>

            <h3
              style={{
                fontFamily: "'Clash Display', sans-serif",
                fontSize: 28,
                fontWeight: 600,
                color: colors.white,
                margin: "0 0 12px 0",
              }}
            >
              LOOKING2FLYY
            </h3>

            <p
              style={{
                fontFamily: "'Satoshi', sans-serif",
                fontSize: 14,
                color: colors.muted,
                lineHeight: 1.6,
                margin: "0 0 16px 0",
              }}
            >
              A premium booking & showcase platform for a luxury hair salon, featuring
              online booking, service menus, and interactive galleries.
            </p>

            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {["Online Booking", "Service Menu", "Gallery", "Location"].map(
                (tag, i) => (
                  <span
                    key={i}
                    style={{
                      padding: "4px 12px",
                      borderRadius: 100,
                      background: "rgba(212, 175, 55, 0.1)",
                      border: "1px solid rgba(212, 175, 55, 0.15)",
                      color: colors.gold,
                      fontFamily: "'Satoshi', sans-serif",
                      fontSize: 12,
                    }}
                  >
                    {tag}
                  </span>
                )
              )}
            </div>
          </div>
        </GlassCard>
      </div>
    </Background>
  );
};
