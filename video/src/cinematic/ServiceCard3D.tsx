import React from "react";
import { useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { theme } from "../colors";

interface ServiceCard3DProps {
  title: string;
  description: string;
  icon: string;
  index: number;
  startFrame: number;
  x: number;
  y: number;
  rotationY?: number;
}

export const ServiceCard3D: React.FC<ServiceCard3DProps> = ({
  title,
  description,
  icon,
  index,
  startFrame,
  x,
  y,
  rotationY = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const f = Math.max(0, frame - startFrame - index * 6);

  const cardSpring = spring({
    frame: Math.max(0, f),
    fps,
    config: { damping: 18, stiffness: 70 },
  });

  const hoverFloat = Math.sin(frame * 0.015 + index * 1.2) * 6;
  const hoverRot = Math.sin(frame * 0.008 + index * 0.8) * 1.5;

  return (
    <div
      style={{
        position: "absolute",
        left: `${x}%`,
        top: `${y}%`,
        transform: `translate(-50%, -50%) translateY(${-hoverFloat}px)`,
        opacity: interpolate(f, [0, 20], [0, 1]),
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          width: 320,
          padding: 32,
          borderRadius: 16,
          background: theme.glassBg,
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid",
          borderImage: `linear-gradient(135deg, rgba(212, 175, 55, 0.2), rgba(242, 210, 122, 0.1)) 1`,
          boxShadow: `
            0 8px 32px rgba(0, 0, 0, 0.4),
            0 0 40px rgba(212, 175, 55, 0.03),
            inset 0 1px 0 rgba(212, 175, 55, 0.08)
          `,
          transform: `perspective(800px) rotateY(${rotationY + hoverRot}deg) scale(${cardSpring})`,
          transition: "none",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Inner glow */}
        <div
          style={{
            position: "absolute",
            top: "-50%",
            left: "-50%",
            width: "200%",
            height: "200%",
            background: `radial-gradient(circle at ${50 + Math.sin(index * 1.5) * 20}% ${30 + Math.cos(index) * 20}%, rgba(212, 175, 55, 0.03), transparent 60%)`,
            pointerEvents: "none",
          }}
        />

        {/* Icon */}
        <div
          style={{
            fontSize: 36,
            marginBottom: 16,
            filter: "drop-shadow(0 0 10px rgba(212, 175, 55, 0.2))",
          }}
        >
          {icon}
        </div>

        {/* Title */}
        <div
          style={{
            fontFamily: "'Clash Display', sans-serif",
            fontSize: 22,
            fontWeight: 600,
            color: theme.white,
            marginBottom: 8,
            letterSpacing: "-0.01em",
          }}
        >
          {title}
        </div>

        {/* Description */}
        <div
          style={{
            fontFamily: "'Satoshi', sans-serif",
            fontSize: 14,
            color: theme.muted,
            lineHeight: 1.6,
            marginBottom: 20,
          }}
        >
          {description}
        </div>

        {/* Bottom accent line */}
        <div
          style={{
            width: "60%",
            height: 1,
            background: `linear-gradient(90deg, ${theme.gold}, transparent)`,
            opacity: 0.5,
          }}
        />
      </div>
    </div>
  );
};

export const ServicesGrid3D: React.FC<{ startFrame: number }> = ({ startFrame }) => {
  const services = [
    { title: "Restaurant Websites", description: "Digital menus, online reservations, immersive galleries", icon: "🍽️" },
    { title: "Luxury Brand Sites", description: "Premium storytelling with cinematic visual design", icon: "✨" },
    { title: "E-Commerce Stores", description: "Full-featured shops with secure payment integration", icon: "🛒" },
    { title: "Perfume Websites", description: "Sensory digital experiences for luxury fragrances", icon: "🌹" },
    { title: "Business Platforms", description: "Enterprise-grade dashboards and management tools", icon: "💼" },
    { title: "Portfolio Websites", description: "Stunning showcase platforms for creatives", icon: "🎨" },
    { title: "Premium Solutions", description: "Custom digital products built for scale", icon: "◆" },
  ];

  const positions = [
    { x: 15, y: 25 }, { x: 38, y: 22 }, { x: 62, y: 25 }, { x: 85, y: 22 },
    { x: 22, y: 58 }, { x: 50, y: 55 }, { x: 78, y: 58 },
  ];

  return (
    <div style={{ position: "absolute", inset: 0 }}>
      {services.map((svc, i) => (
        <ServiceCard3D
          key={i}
          title={svc.title}
          description={svc.description}
          icon={svc.icon}
          index={i}
          startFrame={startFrame}
          x={positions[i].x}
          y={positions[i].y}
          rotationY={(i - 3) * 3}
        />
      ))}
    </div>
  );
};
