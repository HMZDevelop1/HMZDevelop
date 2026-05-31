import React from "react";
import { useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { Background } from "../components/Background";
import { Scene3D } from "../components/Scene3D";
import { WordReveal } from "../components/TextReveal";
import { colors } from "../colors";

export const Hero: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const labelOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });
  const labelY = interpolate(frame, [0, 15], [15, 0], {
    extrapolateRight: "clamp",
  });

  const ctaOpacity = interpolate(frame, [50, 70], [0, 1], {
    extrapolateRight: "clamp",
  });
  const ctaY = interpolate(frame, [50, 70], [30, 0], {
    extrapolateRight: "clamp",
  });

  return (
    <Background showParticles showOrbs showGrid gradient="dark">
      <Scene3D type="hero" startFrame={0} />

      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 0,
          padding: "0 120px",
        }}
      >
        {/* Premium tag */}
        <div
          style={{
            opacity: labelOpacity,
            transform: `translateY(${labelY}px)`,
            padding: "8px 20px",
            borderRadius: 100,
            border: "1px solid rgba(212, 175, 55, 0.3)",
            background: "rgba(212, 175, 55, 0.08)",
            marginBottom: 24,
          }}
        >
          <span
            style={{
              fontFamily: "'Satoshi', sans-serif",
              fontSize: 13,
              color: colors.gold,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
          >
            Premium Digital Studio
          </span>
        </div>

        {/* Main heading */}
        <h1
          style={{
            fontSize: 72,
            fontWeight: 700,
            fontFamily: "'Clash Display', sans-serif",
            color: colors.white,
            textAlign: "center",
            lineHeight: 1.1,
            margin: 0,
            letterSpacing: "-0.03em",
          }}
        >
          <WordReveal
            text="We craft"
            startFrame={15}
            duration={12}
          />
          <br />
          <span
            style={{
              background: "linear-gradient(135deg, #D4AF37, #F2D27A)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            <WordReveal
              text="digital experiences"
              startFrame={30}
              duration={15}
            />
          </span>
        </h1>

        {/* Description */}
        <p
          style={{
            fontFamily: "'Satoshi', sans-serif",
            fontSize: 18,
            color: colors.muted,
            textAlign: "center",
            maxWidth: 600,
            marginTop: 20,
            lineHeight: 1.7,
            opacity: interpolate(frame, [45, 65], [0, 1], {
              extrapolateRight: "clamp",
            }),
            transform: `translateY(${interpolate(frame, [45, 65], [20, 0], {
              extrapolateRight: "clamp",
            })}px)`,
          }}
        >
          Clean code, thoughtful design — from first sketch to final launch.
        </p>

        {/* CTA Buttons */}
        <div
          style={{
            display: "flex",
            gap: 16,
            marginTop: 36,
            opacity: ctaOpacity,
            transform: `translateY(${ctaY}px)`,
          }}
        >
          <div
            style={{
              padding: "14px 32px",
              borderRadius: 8,
              background: "linear-gradient(135deg, #D4AF37, #F2D27A)",
              color: colors.black,
              fontFamily: "'Satoshi', sans-serif",
              fontSize: 15,
              fontWeight: 700,
              letterSpacing: "0.02em",
            }}
          >
            Start a Project
          </div>
          <div
            style={{
              padding: "14px 32px",
              borderRadius: 8,
              border: "1px solid rgba(212, 175, 55, 0.4)",
              color: colors.gold,
              fontFamily: "'Satoshi', sans-serif",
              fontSize: 15,
              fontWeight: 600,
              letterSpacing: "0.02em",
              background: "rgba(212, 175, 55, 0.05)",
            }}
          >
            Explore Services
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: "absolute",
          bottom: 40,
          left: "50%",
          transform: "translateX(-50%)",
          opacity: interpolate(frame, [70, 90, 130, 150], [0, 1, 1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <div
          style={{
            width: 1,
            height: 40,
            background: "linear-gradient(180deg, #D4AF37, transparent)",
            animation: "none",
          }}
        />
      </div>
    </Background>
  );
};
