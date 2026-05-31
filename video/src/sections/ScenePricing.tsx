import React from "react";
import { useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { GoldParticles, LensFlare, Vignette, LightStreaks, GlowOverlay, FilmGrain, HolographicGrid } from "../cinematic/effects";
import { CinematicTitle, CinematicSubtitle } from "../cinematic/TextReveal";
import { theme } from "../colors";

const plans = [
  {
    name: "Starter",
    price: "99 $ CAD",
    desc: "Single-page website",
    features: ["Responsive Design", "Basic SEO", "1 Revision", "5-Day Delivery"],
    popular: false,
  },
  {
    name: "Premium",
    price: "149 $ CAD",
    desc: "Multi-page business site",
    features: ["Custom Animations", "Advanced SEO", "3 Revisions", "Contact Form", "Blog CMS"],
    popular: true,
  },
  {
    name: "E-Commerce",
    price: "249 $ CAD",
    desc: "Online store",
    features: ["Product Management", "Payments", "Inventory System", "Analytics", "Email Support"],
    popular: false,
  },
  {
    name: "Custom",
    price: "Custom",
    desc: "Tailored solution",
    features: ["Full Custom Build", "API Integration", "3D Experiences", "Dedicated Support"],
    popular: false,
  },
];

const PricingCard: React.FC<{
  plan: typeof plans[0];
  index: number;
  startFrame: number;
}> = ({ plan, index, startFrame }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const f = Math.max(0, frame - startFrame - index * 8);

  const cardSpring = spring({
    frame: Math.max(0, f),
    fps,
    config: { damping: 20, stiffness: 65 },
  });

  const floatY = Math.sin(frame * 0.012 + index * 1.5) * 4;

  return (
    <div
      style={{
        flex: 1,
        minWidth: 0,
        opacity: interpolate(f, [0, 20], [0, 1]),
        transform: `translateY(${-floatY}px)`,
      }}
    >
      <div
        style={{
          padding: "28px 24px",
          borderRadius: 16,
          background: plan.popular
            ? "linear-gradient(135deg, rgba(212, 175, 55, 0.08), rgba(10, 10, 12, 0.7))"
            : theme.glassBg,
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: plan.popular
            ? "1.5px solid rgba(212, 175, 55, 0.4)"
            : "1px solid rgba(212, 175, 55, 0.1)",
          boxShadow: plan.popular
            ? "0 0 60px rgba(212, 175, 55, 0.1), 0 8px 32px rgba(0,0,0,0.5)"
            : "0 8px 32px rgba(0,0,0,0.3)",
          transform: `scale(${cardSpring})`,
          position: "relative",
          overflow: "hidden",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {plan.popular && (
          <div
            style={{
              position: "absolute",
              top: 12,
              right: -28,
              padding: "4px 36px",
              background: theme.gradientGold,
              color: theme.black,
              fontFamily: "'Satoshi', sans-serif",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              transform: "rotate(45deg)",
            }}
          >
            Popular
          </div>
        )}

        <div style={{ fontFamily: "'Clash Display', sans-serif", fontSize: 20, fontWeight: 600, color: theme.white, marginBottom: 4 }}>
          {plan.name}
        </div>
        <div style={{ fontFamily: "'Satoshi', sans-serif", fontSize: 13, color: theme.muted, marginBottom: 20 }}>
          {plan.desc}
        </div>
        <div style={{ fontFamily: "'Clash Display', sans-serif", fontSize: 38, fontWeight: 700, color: theme.gold, marginBottom: 20 }}>
          {plan.price}
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
          {plan.features.map((feat, j) => (
            <div key={j} style={{ display: "flex", alignItems: "center", gap: 10, fontFamily: "'Satoshi', sans-serif", fontSize: 13, color: theme.mutedLight }}>
              <span style={{ color: theme.gold, fontSize: 10 }}>◆</span>
              {feat}
            </div>
          ))}
        </div>
        <div
          style={{
            marginTop: 24,
            padding: "12px 0",
            borderRadius: 8,
            textAlign: "center",
            background: plan.popular ? theme.gradientGold : "rgba(212, 175, 55, 0.06)",
            border: plan.popular ? undefined : "1px solid rgba(212, 175, 55, 0.15)",
            color: plan.popular ? theme.black : theme.gold,
            fontFamily: "'Satoshi', sans-serif",
            fontSize: 14,
            fontWeight: 700,
            letterSpacing: "0.02em",
          }}
        >
          Get Started
        </div>
      </div>
    </div>
  );
};

export const ScenePricing: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: theme.gradientDark,
        overflow: "hidden",
      }}
    >
      {/* Ambient glow */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "80%",
          height: "60%",
          background: "radial-gradient(ellipse, rgba(212, 175, 55, 0.03), transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: "6%",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          zIndex: 10,
        }}
      >
        <CinematicSubtitle text="Simple pricing" startFrame={0} style={{ fontSize: 14, marginBottom: 8 }} />
        <CinematicTitle text="Choose Your Plan" startFrame={10} duration={25} fontSize={50} gradient revealBy="word" style={{ textAlign: "center", letterSpacing: "-0.02em" }} />
      </div>

      {/* Pricing cards */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          display: "flex",
          gap: 16,
          padding: "0 60px",
          width: "100%",
          maxWidth: 1600,
          boxSizing: "border-box",
        }}
      >
        {plans.map((plan, i) => (
          <PricingCard key={i} plan={plan} index={i} startFrame={20} />
        ))}
      </div>

      {/* Effects */}
      <GoldParticles count={80} startFrame={0} speed={0.5} />
      <LightStreaks startFrame={15} count={2} />
      <LensFlare x={50} y={15} startFrame={5} size={800} />
      <Vignette opacity={0.55} />
      <GlowOverlay intensity={0.02} />
      <FilmGrain opacity={0.01} />
      <HolographicGrid opacity={0.02} />
    </div>
  );
};
