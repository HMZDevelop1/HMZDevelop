import React from "react";
import { useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { Background } from "../components/Background";
import { colors } from "../colors";

export const Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoScale = spring({
    frame: Math.max(0, frame - 10),
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  const subtitleOpacity = interpolate(
    frame,
    [40, 60, 90, 110],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const subtitleY = interpolate(
    frame,
    [40, 60, 90, 110],
    [30, 0, 0, -20],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const tagOpacity = interpolate(frame, [60, 80, 110, 130], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const pulseRing = spring({
    frame: Math.max(0, frame - 20),
    fps,
    config: { damping: 20, stiffness: 50 },
  });

  return (
    <Background showParticles showOrbs showGrid gradient="black">
      {/* Pulsing ring behind logo */}
      <div
        style={{
          position: "absolute",
          width: 200,
          height: 200,
          borderRadius: "50%",
          border: "1px solid rgba(212, 175, 55, 0.2)",
          transform: `translate(-50%, -50%) scale(${pulseRing * 3})`,
          top: "42%",
          left: "50%",
          opacity: 1 - pulseRing,
        }}
      />

      {/* Main logo */}
      <div
        style={{
          transform: `scale(${logoScale})`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: -40,
        }}
      >
        <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
          <span
            style={{
              fontSize: 80,
              fontWeight: 700,
              fontFamily: "'Clash Display', sans-serif",
              background: "linear-gradient(135deg, #D4AF37, #F2D27A)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              letterSpacing: "-0.03em",
            }}
          >
            HMZ
          </span>
          <span
            style={{
              fontSize: 60,
              fontWeight: 500,
              fontFamily: "'Clash Display', sans-serif",
              color: colors.white,
              letterSpacing: "-0.02em",
            }}
          >
            Develop
          </span>
        </div>

        <div
          style={{
            width: 80,
            height: 2,
            background: "linear-gradient(90deg, transparent, #D4AF37, transparent)",
            marginTop: 16,
            transform: `scaleX(${interpolate(frame, [15, 35], [0, 1], { extrapolateRight: "clamp" })})`,
          }}
        />
      </div>

      {/* Tagline */}
      <div
        style={{
          position: "absolute",
          bottom: "38%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
          opacity: tagOpacity,
          transform: `translateY(${interpolate(frame, [60, 80], [20, 0], { extrapolateRight: "clamp" })}px)`,
        }}
      >
        <span
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 22,
            color: colors.gold,
            fontStyle: "italic",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
          }}
        >
          Premium Digital Studio
        </span>
      </div>

      {/* Subtitle */}
      <div
        style={{
          position: "absolute",
          bottom: "28%",
          opacity: subtitleOpacity,
          transform: `translateY(${subtitleY}px)`,
        }}
      >
        <span
          style={{
            fontFamily: "'Satoshi', sans-serif",
            fontSize: 18,
            color: colors.muted,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
          }}
        >
          WE TURN IDEAS INTO WEBSITES
        </span>
      </div>
    </Background>
  );
};
