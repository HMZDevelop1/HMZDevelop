import React from "react";
import { useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { Background } from "../components/Background";
import { colors } from "../colors";

export const Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleScale = spring({
    frame: Math.max(0, frame - 10),
    fps,
    config: { damping: 14, stiffness: 80 },
  });

  const buttonOpacity = interpolate(frame, [30, 50], [0, 1], {
    extrapolateRight: "clamp",
  });

  const socialOpacity = interpolate(frame, [45, 65], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <Background showParticles showOrbs showGrid gradient="black">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 0,
        }}
      >
        {/* Closing text */}
        <div
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 22,
            color: colors.gold,
            fontStyle: "italic",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            opacity: interpolate(frame, [0, 15], [0, 1], {
              extrapolateRight: "clamp",
            }),
            transform: `translateY(${interpolate(frame, [0, 15], [10, 0], {
              extrapolateRight: "clamp",
            })}px)`,
          }}
        >
          Ready to start?
        </div>

        {/* Main CTA */}
        <h1
          style={{
            fontSize: 72,
            fontWeight: 700,
            fontFamily: "'Clash Display', sans-serif",
            transform: `scale(${titleScale})`,
            margin: "20px 0",
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
            Let's talk
          </span>
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontFamily: "'Satoshi', sans-serif",
            fontSize: 18,
            color: colors.muted,
            textAlign: "center",
            maxWidth: 400,
            lineHeight: 1.6,
            margin: "0 0 36px 0",
            opacity: interpolate(frame, [15, 30], [0, 1], {
              extrapolateRight: "clamp",
            }),
          }}
        >
          Your next project starts here. Let&apos;t turn your vision into reality.
        </p>

        {/* CTA Button */}
        <div
          style={{
            padding: "16px 40px",
            borderRadius: 8,
            background: "linear-gradient(135deg, #D4AF37, #F2D27A)",
            color: colors.black,
            fontFamily: "'Satoshi', sans-serif",
            fontSize: 16,
            fontWeight: 700,
            letterSpacing: "0.03em",
            opacity: buttonOpacity,
            transform: `translateY(${interpolate(frame, [30, 50], [20, 0], {
              extrapolateRight: "clamp",
            })}px)`,
            cursor: "pointer",
          }}
        >
          hmzdevelop.com
        </div>

        {/* Links */}
        <div
          style={{
            display: "flex",
            gap: 32,
            marginTop: 48,
            opacity: socialOpacity,
            transform: `translateY(${interpolate(frame, [45, 65], [15, 0], {
              extrapolateRight: "clamp",
            })}px)`,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 8,
            }}
          >
            <div
              style={{
                fontFamily: "'Satoshi', sans-serif",
                fontSize: 12,
                color: colors.muted,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
              }}
            >
              Email
            </div>
            <div
              style={{
                fontFamily: "'Satoshi', sans-serif",
                fontSize: 15,
                color: colors.gold,
              }}
            >
              hello@hmzdevelop.com
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 8,
            }}
          >
            <div
              style={{
                fontFamily: "'Satoshi', sans-serif",
                fontSize: 12,
                color: colors.muted,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
              }}
            >
              Instagram
            </div>
            <div
              style={{
                fontFamily: "'Satoshi', sans-serif",
                fontSize: 15,
                color: colors.gold,
              }}
            >
              @hmzdevelop
            </div>
          </div>
        </div>

        {/* Footer line */}
        <div
          style={{
            position: "absolute",
            bottom: 40,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            alignItems: "center",
            gap: 16,
            opacity: interpolate(frame, [55, 75], [0, 1], {
              extrapolateRight: "clamp",
            }),
          }}
        >
          <div style={{ width: 40, height: 1, background: "rgba(212, 175, 55, 0.3)" }} />
          <div
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 14,
              color: colors.muted,
              fontStyle: "italic",
            }}
          >
            HMZDevelop — Premium Digital Studio
          </div>
          <div style={{ width: 40, height: 1, background: "rgba(212, 175, 55, 0.3)" }} />
        </div>
      </div>
    </Background>
  );
};
