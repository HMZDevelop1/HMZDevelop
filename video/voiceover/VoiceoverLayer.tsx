import React from "react";
import { Audio, staticFile, useCurrentFrame, interpolate, Easing } from "remotion";
import { DURATIONS } from "../src/colors";

type SubLine = { frame: number; text: string };
type Segment = { id: string; startFrame: number; duration: number; lines: SubLine[] };

const GOLD = "#D4AF37";

export const SCRIPT: Segment[] = [
  {
    id: "intro",
    startFrame: 0,
    duration: DURATIONS.INTRO,
    lines: [
      { frame: 0, text: "HMZDevelop." },
      { frame: 70, text: "Premium Digital Studio." },
      { frame: 169, text: "Where visionary brands meet cinematic design." },
      { frame: 335, text: "Every pixel tells a story." },
    ],
  },
  {
    id: "hero",
    startFrame: 0,
    duration: DURATIONS.HERO,
    lines: [
      { frame: 0, text: "We don't just build websites." },
      { frame: 103, text: "We engineer premium digital platforms." },
      { frame: 249, text: "Powered by React 19. Three.js. Framer Motion." },
      { frame: 441, text: "From first concept to final launch. Every detail built with purpose and precision." },
    ],
  },
  {
    id: "services",
    startFrame: 0,
    duration: DURATIONS.SERVICES,
    lines: [
      { frame: 0, text: "Starter websites at ninety nine." },
      { frame: 128, text: "Premium business platforms at one forty nine." },
      { frame: 276, text: "E-commerce with full checkout integration." },
      { frame: 429, text: "Custom solutions built around your needs." },
      { frame: 557, text: "Each service crafted to elevate your brand." },
    ],
  },
  {
    id: "showcase",
    startFrame: 0,
    duration: DURATIONS.SHOWCASE,
    lines: [
      { frame: 0, text: "Meet Looking2Flyy." },
      { frame: 106, text: "A premium hair studio reimagined for the digital age." },
      { frame: 311, text: "Online booking. Immersive galleries. We speak JavaScript. TypeScript. GSAP. Framer Motion and Three.js." },
      { frame: 706, text: "Cinematic results every time." },
    ],
  },
  {
    id: "why",
    startFrame: 0,
    duration: DURATIONS.WHY,
    lines: [
      { frame: 0, text: "Why HMZDevelop." },
      { frame: 117, text: "Modern architecture. Luxury design." },
      { frame: 257, text: "Blazing performance with smooth interactions. Mobile first. Fully scalable." },
      { frame: 550, text: "Every line of code written with care. Every pixel placed with purpose." },
    ],
  },
  {
    id: "final",
    startFrame: 0,
    duration: DURATIONS.FINAL,
    lines: [
      { frame: 0, text: "HMZDevelop." },
      { frame: 75, text: "We Design. We Develop. We Scale." },
      { frame: 208, text: "Complete digital solutions without limits. Your vision paired with our expertise." },
      { frame: 455, text: "Let us build something extraordinary together. Find us at hmzdevelop dot com. At hmzdevelop on Instagram." },
    ],
  },
];

const CaptionLine: React.FC<{ text: string; local: number; lineFrame: number; nextFrame: number; isLatest: boolean; idx: number }> = ({ text, local, lineFrame, nextFrame, isLatest, idx }) => {
  const elapsed = local - lineFrame;
  const remaining = nextFrame - local;
  const show = local >= lineFrame && remaining > 0;

  const fadeIn = interpolate(elapsed, [0, 12], [0, 1], { easing: Easing.out(Easing.ease) });
  const fadeOut = interpolate(-remaining, [-8, 0], [1, 0], { easing: Easing.in(Easing.ease) });
  const opacity = show ? Math.min(fadeIn, fadeOut) : 0;

  const scale = isLatest ? interpolate(Math.min(elapsed, 16), [0, 16], [1.05, 1]) : 0.92;
  const yOffset = isLatest ? 0 : interpolate(idx, [0, 2], [-35, 0]);

  return (
    <div
      style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        opacity,
        transform: `translateY(${yOffset}px) scale(${scale})`,
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: isLatest ? 38 : 26,
        fontWeight: isLatest ? 700 : 400,
        fontStyle: "italic",
        color: isLatest ? GOLD : "rgba(255,255,255,0.2)",
        textShadow: isLatest
          ? `0 0 60px rgba(212,175,55,0.35), 0 0 120px rgba(212,175,55,0.12)`
          : "0 0 20px rgba(0,0,0,0.5)",
        letterSpacing: isLatest ? "0.08em" : "0.04em",
        lineHeight: 1.6,
      }}
    >
      {text}
    </div>
  );
};

const CaptionOverlay: React.FC<{ local: number; lines: SubLine[]; sceneDuration: number }> = ({ local, lines, sceneDuration }) => {
  const idx = lines.findLastIndex((l) => local >= l.frame);
  const activeIdx = Math.min(idx, lines.length - 1);
  if (activeIdx < 0) return null;

  const isFinalScene = sceneDuration === DURATIONS.FINAL;

  return (
    <div
      style={{
        position: "absolute", bottom: isFinalScene ? "18%" : "10%", left: "50%",
        transform: "translateX(-50%)", textAlign: "center", zIndex: 999,
        pointerEvents: "none", width: "85%", maxWidth: 1800,
      }}
    >
      {lines.map((l, i) => {
        const next = i < lines.length - 1 ? lines[i + 1].frame : Infinity;
        return (
          <CaptionLine
            key={i}
            text={l.text}
            local={local}
            lineFrame={l.frame}
            nextFrame={next}
            isLatest={i === activeIdx}
            idx={i}
          />
        );
      })}
    </div>
  );
};

export const VoiceoverSegment: React.FC<{ segment: typeof SCRIPT[number] }> = ({ segment }) => {
  const local = useCurrentFrame();
  return (
    <>
      <Audio src={staticFile(`/audio/${segment.id}.mp3`)} />
      <CaptionOverlay local={local} lines={segment.lines} sceneDuration={segment.duration} />
    </>
  );
};

export default SCRIPT;
