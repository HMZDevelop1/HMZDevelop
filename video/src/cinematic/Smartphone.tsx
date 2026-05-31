import React, { useMemo } from "react";
import { useCurrentFrame, interpolate, random, spring, useVideoConfig } from "remotion";
import { theme } from "../colors";

interface SmartphoneProps {
  startFrame: number;
  delay?: number;
  x?: number;
  y?: number;
  rotationY?: number;
  rotationX?: number;
  scale?: number;
  screenContent?: "hero" | "services" | "pricing" | "home";
}

const ScreenContent: React.FC<{ type: "hero" | "services" | "pricing" | "home" }> = ({ type }) => {
  switch (type) {
    case "hero":
      return (
        <div style={{ padding: "20% 8%", display: "flex", flexDirection: "column", gap: "4%", height: "100%", background: "#000", justifyContent: "center" }}>
          <div style={{ width: "40%", height: "2%", background: "linear-gradient(90deg, #D4AF37, #F2D27A)", borderRadius: 2 }} />
          <div style={{ width: "90%", height: "6%", background: "#fff", borderRadius: 4, opacity: 0.9 }} />
          <div style={{ width: "70%", height: "6%", background: "#fff", borderRadius: 4, opacity: 0.7 }} />
          <div style={{ width: "60%", height: "3%", background: "#333", borderRadius: 2, marginTop: "4%" }} />
          <div style={{ width: "50%", height: "5%", background: "linear-gradient(90deg, #D4AF37, #F2D27A)", borderRadius: 6, marginTop: "6%" }} />
        </div>
      );
    case "services":
      return (
        <div style={{ padding: "12% 6%", display: "flex", flexDirection: "column", gap: "3%", height: "100%", background: "#0A0A0C" }}>
          {["Starter", "Premium", "Business"].map((name, i) => (
            <div key={i} style={{ padding: "6%", borderRadius: 8, background: "rgba(212, 175, 55, 0.06)", border: "1px solid rgba(212, 175, 55, 0.1)" }}>
              <div style={{ fontSize: "1.5vw", color: "#D4AF37", fontWeight: 700, fontFamily: "'Clash Display', sans-serif" }}>{name}</div>
              <div style={{ fontSize: "1vw", color: "#666", marginTop: "2%" }}>Starting at 99 $ CAD</div>
            </div>
          ))}
        </div>
      );
    case "pricing":
      return (
        <div style={{ padding: "15% 6%", display: "flex", flexDirection: "column", gap: "4%", height: "100%", background: "#000", justifyContent: "center", alignItems: "center" }}>
          <div style={{ fontSize: "2.5vw", color: "#fff", fontWeight: 700, fontFamily: "'Clash Display', sans-serif" }}>99 $ CAD</div>
          <div style={{ fontSize: "1vw", color: "#666" }}>Premium Plan</div>
          <div style={{ width: "80%", height: "0.5%", background: "linear-gradient(90deg, #D4AF37, transparent)", margin: "4% 0" }} />
          <div style={{ display: "flex", flexDirection: "column", gap: "3%", width: "100%" }}>
            {["UI/UX Design", "Development", "SEO"].map((f, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "4%", color: "#888", fontSize: "1vw" }}>
                <span style={{ color: "#D4AF37" }}>◆</span> {f}
              </div>
            ))}
          </div>
        </div>
      );
    case "home":
      return (
        <div style={{ height: "100%", background: "#050505", display: "flex", flexDirection: "column" }}>
          <div style={{ padding: "6% 6% 3%", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ color: "#D4AF37", fontSize: "1.8vw", fontWeight: 700, fontFamily: "'Clash Display', sans-serif" }}>HMZDevelop</div>
            <div style={{ width: "6%", height: "6%", borderRadius: "50%", border: "1px solid rgba(212, 175, 55, 0.3)" }} />
          </div>
          <div style={{ flex: 1, padding: "0 6%" }}>
            <div style={{ width: "90%", height: "20%", borderRadius: 8, background: "linear-gradient(135deg, rgba(212, 175, 55, 0.1), rgba(0,0,0,0.5))", border: "1px solid rgba(212, 175, 55, 0.1)" }} />
            <div style={{ marginTop: "4%", display: "flex", gap: "3%" }}>
              {[1, 2, 3].map((i) => (
                <div key={i} style={{ flex: 1, height: "6%", borderRadius: 4, background: "rgba(212, 175, 55, 0.05)", border: "1px solid rgba(212, 175, 55, 0.08)" }} />
              ))}
            </div>
          </div>
        </div>
      );
  }
};

export const Smartphone: React.FC<SmartphoneProps> = ({
  startFrame,
  delay = 0,
  x = 50,
  y = 50,
  rotationY = 0,
  rotationX = 0,
  scale = 1,
  screenContent = "home",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const f = Math.max(0, frame - startFrame - delay);

  const phoneSpring = spring({
    frame: Math.max(0, f),
    fps,
    config: { damping: 15, stiffness: 60 },
  });

  const floatY = Math.sin(frame * 0.02 + delay) * 8;
  const floatRot = Math.sin(frame * 0.01 + delay * 0.5) * 2;

  const phoneWidth = 280 * scale;
  const phoneHeight = 560 * scale;

  return (
    <div
      style={{
        position: "absolute",
        left: `${x}%`,
        top: `${y}%`,
        transform: `translate(-50%, -50%) translateY(${-floatY}px)`,
        opacity: interpolate(f, [0, 20], [0, 1]),
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          width: phoneWidth,
          height: phoneHeight,
          borderRadius: phoneWidth * 0.12,
          background: "#111113",
          border: "1.5px solid rgba(212, 175, 55, 0.25)",
          boxShadow: `
            0 0 60px rgba(212, 175, 55, 0.08),
            0 20px 60px rgba(0, 0, 0, 0.6),
            inset 0 0 30px rgba(212, 175, 55, 0.03)
          `,
          transform: `perspective(800px) rotateY(${rotationY + floatRot}deg) rotateX(${rotationX}deg) scale(${phoneSpring})`,
          position: "relative",
          overflow: "hidden",
          padding: `${phoneWidth * 0.04}px ${phoneWidth * 0.03}px`,
        }}
      >
        {/* Notch */}
        <div
          style={{
            position: "absolute",
            top: phoneWidth * 0.03,
            left: "50%",
            transform: "translateX(-50%)",
            width: phoneWidth * 0.25,
            height: phoneWidth * 0.035,
            background: "#000",
            borderRadius: 20,
            zIndex: 10,
          }}
        />
        {/* Screen */}
        <div
          style={{
            width: "100%",
            height: "100%",
            borderRadius: phoneWidth * 0.07,
            overflow: "hidden",
            background: "#050505",
          }}
        >
          <ScreenContent type={screenContent} />
        </div>
        {/* Reflection overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, transparent 40%, transparent 60%, rgba(255,255,255,0.02) 100%)",
            borderRadius: phoneWidth * 0.12,
            pointerEvents: "none",
          }}
        />
        {/* Glow edge */}
        <div
          style={{
            position: "absolute",
            inset: -1,
            borderRadius: phoneWidth * 0.12,
            padding: 1,
            background: `conic-gradient(from ${frame * 0.5}deg, transparent, rgba(212, 175, 55, 0.1), transparent, rgba(212, 175, 55, 0.05), transparent)`,
            WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
            pointerEvents: "none",
          }}
        />
      </div>
    </div>
  );
};

export const SmartphoneShowcase: React.FC<{
  startFrame: number;
}> = ({ startFrame }) => {
  const frame = useCurrentFrame();
  const f = Math.max(0, frame - startFrame);

  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <Smartphone
        startFrame={startFrame}
        delay={0}
        x={20}
        y={45}
        rotationY={-10}
        rotationX={-2}
        scale={0.6}
        screenContent="hero"
      />
      <Smartphone
        startFrame={startFrame}
        delay={15}
        x={50}
        y={42}
        rotationY={0}
        rotationX={0}
        scale={0.7}
        screenContent="home"
      />
      <Smartphone
        startFrame={startFrame}
        delay={30}
        x={80}
        y={45}
        rotationY={10}
        rotationX={2}
        scale={0.6}
        screenContent="pricing"
      />
      <Smartphone
        startFrame={startFrame}
        delay={45}
        x={35}
        y={62}
        rotationY={-15}
        rotationX={5}
        scale={0.5}
        screenContent="services"
      />
      <Smartphone
        startFrame={startFrame}
        delay={55}
        x={65}
        y={62}
        rotationY={15}
        rotationX={-5}
        scale={0.5}
        screenContent="services"
      />
    </div>
  );
};
