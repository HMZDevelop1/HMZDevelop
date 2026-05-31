import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { Background } from "../components/Background";
import { GlassCard } from "../components/GlassCard";
import { SectionLabel } from "../components/GradientText";
import { colors } from "../colors";

const services = [
  {
    name: "Starter",
    price: "$99 CAD",
    desc: "Modern single-page website",
    popular: false,
    features: ["Responsive design", "Basic SEO", "1 revision", "5-day delivery"],
  },
  {
    name: "Premium",
    price: "$149 CAD",
    desc: "Multi-page business website",
    popular: true,
    features: ["Custom animations", "Advanced SEO", "3 revisions", "Contact form"],
  },
  {
    name: "E-Commerce",
    price: "$249 CAD",
    desc: "Online store with payments",
    popular: false,
    features: ["Product management", "Payment integration", "Inventory", "Analytics"],
  },
  {
    name: "Custom",
    price: "Custom Quote",
    desc: "Tailored digital solutions",
    popular: false,
    features: ["Full custom build", "API development", "3D experiences", "Ongoing support"],
  },
];

export const Services: React.FC = () => {
  const frame = useCurrentFrame();

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
        <SectionLabel text="Our services" startFrame={0} />

        <h2
          style={{
            fontFamily: "'Clash Display', sans-serif",
            fontSize: 42,
            fontWeight: 700,
            color: colors.white,
            margin: "0 0 36px 0",
            letterSpacing: "-0.02em",
          }}
        >
          Premium{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #D4AF37, #F2D27A)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            services
          </span>
        </h2>

        <div style={{ display: "flex", gap: 16, width: "100%" }}>
          {services.map((service, i) => (
            <GlassCard
              key={i}
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                ...(service.popular
                  ? {
                      border: "1px solid rgba(212, 175, 55, 0.5)",
                      boxShadow: "0 0 40px rgba(212, 175, 55, 0.1), inset 0 1px 0 rgba(212, 175, 55, 0.2)",
                    }
                  : {}),
              }}
              startFrame={0}
              delay={10 + i * 6}
            >
              {service.popular && (
                <div
                  style={{
                    alignSelf: "center",
                    padding: "4px 14px",
                    borderRadius: 100,
                    background: "linear-gradient(135deg, #D4AF37, #F2D27A)",
                    color: colors.black,
                    fontFamily: "'Satoshi', sans-serif",
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    marginBottom: 16,
                  }}
                >
                  Most Popular
                </div>
              )}

              <div
                style={{
                  fontFamily: "'Clash Display', sans-serif",
                  fontSize: 22,
                  fontWeight: 600,
                  color: colors.white,
                  marginBottom: 4,
                }}
              >
                {service.name}
              </div>

              <div
                style={{
                  fontFamily: "'Satoshi', sans-serif",
                  fontSize: 14,
                  color: colors.muted,
                  marginBottom: 16,
                }}
              >
                {service.desc}
              </div>

              <div
                style={{
                  fontFamily: "'Clash Display', sans-serif",
                  fontSize: 36,
                  fontWeight: 700,
                  background: "linear-gradient(135deg, #D4AF37, #F2D27A)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  marginBottom: 20,
                }}
              >
                {service.price}
              </div>

              <div style={{ flex: 1 }}>
                {service.features.map((feat, j) => (
                  <div
                    key={j}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      padding: "6px 0",
                      fontFamily: "'Satoshi', sans-serif",
                      fontSize: 13,
                      color: colors.muted,
                      borderTop: j === 0 ? "1px solid rgba(212, 175, 55, 0.1)" : undefined,
                      borderBottom: "1px solid rgba(212, 175, 55, 0.1)",
                    }}
                  >
                    <span style={{ color: colors.gold }}>◆</span>
                    {feat}
                  </div>
                ))}
              </div>

              <div
                style={{
                  marginTop: 20,
                  padding: "12px 24px",
                  borderRadius: 8,
                  textAlign: "center",
                  background: service.popular
                    ? "linear-gradient(135deg, #D4AF37, #F2D27A)"
                    : "rgba(212, 175, 55, 0.08)",
                  border: service.popular ? undefined : "1px solid rgba(212, 175, 55, 0.2)",
                  color: service.popular ? colors.black : colors.gold,
                  fontFamily: "'Satoshi', sans-serif",
                  fontSize: 14,
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                Get Started
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </Background>
  );
};
