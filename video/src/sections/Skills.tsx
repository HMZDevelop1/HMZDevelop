import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { Background } from "../components/Background";
import { GlassCard } from "../components/GlassCard";
import { SectionLabel } from "../components/GradientText";
import { colors } from "../colors";

const skillCategories = [
  {
    title: "Languages",
    icon: "⚡",
    skills: [
      { name: "JavaScript", level: 90 },
      { name: "TypeScript", level: 85 },
      { name: "HTML/CSS", level: 95 },
    ],
  },
  {
    title: "Frameworks & Tools",
    icon: "🛠",
    skills: [
      { name: "React", level: 92 },
      { name: "Node.js", level: 85 },
      { name: "Three.js", level: 78 },
    ],
  },
  {
    title: "Styling",
    icon: "🎨",
    skills: [
      { name: "Tailwind CSS", level: 90 },
      { name: "GSAP", level: 85 },
      { name: "Framer Motion", level: 88 },
    ],
  },
  {
    title: "3D & Motion",
    icon: "✨",
    skills: [
      { name: "Three.js / R3F", level: 80 },
      { name: "WebGL", level: 75 },
      { name: "Lenis Scroll", level: 85 },
    ],
  },
];

function SkillBar({
  name,
  level,
  startFrame,
}: {
  name: string;
  level: number;
  startFrame: number;
}) {
  const frame = useCurrentFrame();
  const f = Math.max(0, frame - startFrame);

  const fillWidth = interpolate(
    Math.min(f * 3, level),
    [0, level],
    [0, 1],
    { extrapolateRight: "clamp" }
  );

  return (
    <div style={{ marginBottom: 12 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 4,
          fontFamily: "'Satoshi', sans-serif",
          fontSize: 13,
          color: colors.muted,
        }}
      >
        <span>{name}</span>
        <span style={{ color: colors.gold }}>{level}%</span>
      </div>
      <div
        style={{
          height: 4,
          background: "rgba(212, 175, 55, 0.1)",
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${fillWidth * 100}%`,
            background: "linear-gradient(90deg, #D4AF37, #F2D27A)",
            borderRadius: 2,
            boxShadow: "0 0 8px rgba(212, 175, 55, 0.3)",
          }}
        />
      </div>
    </div>
  );
}

export const Skills: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <Background showOrbs showParticles showGrid gradient="charcoal">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "60px 80px",
          maxWidth: 1000,
          width: "100%",
        }}
      >
        <SectionLabel text="Technologies" startFrame={0} />

        <h2
          style={{
            fontFamily: "'Clash Display', sans-serif",
            fontSize: 48,
            fontWeight: 700,
            color: colors.white,
            margin: "0 0 40px 0",
            letterSpacing: "-0.02em",
          }}
        >
          Technologies we{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #D4AF37, #F2D27A)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            master
          </span>
        </h2>

        <div
          style={{
            display: "flex",
            gap: 16,
            width: "100%",
          }}
        >
          {skillCategories.map((cat, i) => (
            <GlassCard
              key={i}
              style={{ flex: 1, display: "flex", flexDirection: "column" }}
              startFrame={0}
              delay={10 + i * 8}
            >
              <div
                style={{
                  fontFamily: "'Clash Display', sans-serif",
                  fontSize: 18,
                  color: colors.gold,
                  marginBottom: 20,
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <span>{cat.icon}</span>
                <span>{cat.title}</span>
              </div>

              {cat.skills.map((skill, j) => (
                <SkillBar
                  key={j}
                  name={skill.name}
                  level={skill.level}
                  startFrame={20 + i * 8 + j * 5}
                />
              ))}
            </GlassCard>
          ))}
        </div>
      </div>
    </Background>
  );
};
