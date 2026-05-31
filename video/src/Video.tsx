import React from "react";
import { AbsoluteFill, Sequence, useCurrentFrame, interpolate, Easing } from "remotion";
import { theme, DURATIONS, RESOLUTION, TOTAL_DURATION } from "./colors";
import { SceneIntro } from "./sections/SceneIntro";
import { SceneHero } from "./sections/SceneHero";
import { SceneServices } from "./sections/SceneServices";
import { SceneShowcase } from "./sections/SceneShowcase";
import { SceneWhy } from "./sections/SceneWhy";
import { SceneFinal } from "./sections/SceneFinal";
import { VoiceoverSegment, SCRIPT } from "../voiceover/VoiceoverLayer";
import { Vignette, Glow, Particles, LightStreak, Grain } from "./effects";

const T_ZOOM = 18;
const T_SWIPE = 20;
const finalFade = 24;

const scenes = [
  { C: SceneIntro, d: DURATIONS.INTRO, ext: "zoom" },
  { C: SceneHero, d: DURATIONS.HERO, ext: "swipe" },
  { C: SceneServices, d: DURATIONS.SERVICES, ext: "zoom" },
  { C: SceneShowcase, d: DURATIONS.SHOWCASE, ext: "swipe" },
  { C: SceneWhy, d: DURATIONS.WHY, ext: "zoom" },
  { C: SceneFinal, d: DURATIONS.FINAL, ext: "fade" },
];
const sceneOffsets: number[] = [];
let acc = 0;
for (const s of scenes) { sceneOffsets.push(acc); acc += s.d; }

const Wrapper: React.FC<{ children: React.ReactNode; duration: number; idx: number }> = ({ children, duration, idx }) => {
  const frame = useCurrentFrame();
  const local = frame % duration;
  const s = scenes[idx];
  const prev = idx > 0 ? scenes[idx - 1].ext : null;
  const next = idx < scenes.length - 1 ? s.ext : null;
  const isFirst = idx === 0;
  const isLast = idx === scenes.length - 1;

  let opacity = 1;
  let scale = 1;
  let blur = 0;

  // Entrance
  if (!isFirst) {
    if (prev === "zoom") {
      opacity = interpolate(local, [0, T_ZOOM], [0, 1], { easing: Easing.out(Easing.ease) });
      scale = interpolate(local, [0, T_ZOOM], [0.92, 1], { easing: Easing.out(Easing.ease) });
      blur = interpolate(local, [0, T_ZOOM], [8, 0], { easing: Easing.out(Easing.ease) });
    } else if (prev === "swipe") {
      opacity = interpolate(local, [0, T_SWIPE], [0.4, 1], { easing: Easing.out(Easing.ease) });
    }
  }

  // Exit
  if (!isLast) {
    const exitStart = duration - T_ZOOM;
    if (next === "zoom") {
      const o = interpolate(local, [exitStart, duration], [1, 0], { easing: Easing.in(Easing.ease), extrapolateLeft: "clamp" });
      opacity = Math.min(opacity, o);
      const s = interpolate(local, [exitStart, duration], [1, 1.12], { easing: Easing.in(Easing.ease), extrapolateLeft: "clamp" });
      scale = Math.min(scale, s);
      const b = interpolate(local, [exitStart, duration], [0, 6], { easing: Easing.in(Easing.ease), extrapolateLeft: "clamp" });
      blur = Math.max(blur, b);
    } else if (next === "swipe") {
      const exitStartSwipe = duration - T_SWIPE;
      const o = interpolate(local, [exitStartSwipe, duration], [1, 0.2], { easing: Easing.in(Easing.ease), extrapolateLeft: "clamp" });
      opacity = Math.min(opacity, o);
    }
  }

  // Final fade to black
  if (isLast) {
    const o = interpolate(local, [duration - finalFade, duration], [1, 0], { easing: Easing.in(Easing.ease), extrapolateLeft: "clamp" });
    opacity = Math.min(opacity, o);
  }

  const filter = blur > 0 ? `blur(${blur}px)` : undefined;

  return <AbsoluteFill style={{ opacity, transform: `scale(${scale})`, filter }}>{children}</AbsoluteFill>;
};

const ZoomTransitionOverlay: React.FC<{ start: number }> = ({ start }) => {
  const frame = useCurrentFrame();
  const local = frame - start;
  if (local < 0 || local > T_ZOOM) return null;
  const mid = T_ZOOM * 0.45;
  const opacity = interpolate(local, [0, mid, mid + 4, T_ZOOM], [0, 0.08, 0.15, 0], { easing: Easing.inOut(Easing.ease) });
  const scale = interpolate(local, [0, T_ZOOM], [0.8, 1.2]);
  return (
    <div
      style={{
        position: "absolute", inset: 0, zIndex: 150, pointerEvents: "none",
        background: "radial-gradient(ellipse at 50% 50%, rgba(212,175,55,0.12) 0%, transparent 60%)",
        opacity, transform: `scale(${scale})`,
      }}
    />
  );
};

const SwipeOverlay: React.FC<{ start: number }> = ({ start }) => {
  const frame = useCurrentFrame();
  const local = frame - start;
  if (local < 0 || local > T_SWIPE) return null;
  const progress = interpolate(local, [0, T_SWIPE], [0, 1], { easing: Easing.inOut(Easing.ease) });
  const edgeX = progress * 100;

  return (
    <>
      {/* Gold sweep bar */}
      <div
        style={{
          position: "absolute", top: 0, bottom: 0, zIndex: 200, pointerEvents: "none",
          left: `${edgeX}%`, width: "12%",
          background: "linear-gradient(90deg, transparent 0%, rgba(212,175,55,0.35) 25%, rgba(245,230,163,0.2) 50%, rgba(212,175,55,0.35) 75%, transparent 100%)",
          filter: "blur(25px)",
          transform: "translateX(-50%)",
          opacity: interpolate(local, [0, 4, T_SWIPE - 4, T_SWIPE], [0.2, 0.6, 0.6, 0.2], { easing: Easing.inOut(Easing.ease) }),
        }}
      />
      {/* Subtle gold glow behind sweep */}
      <div
        style={{
          position: "absolute", inset: 0, zIndex: 199, pointerEvents: "none",
          background: `linear-gradient(90deg, transparent 0%, transparent ${Math.max(0, edgeX - 15)}%, rgba(212,175,55,0.04) ${Math.max(0, edgeX - 8)}%, rgba(212,175,55,0.02) ${Math.min(100, edgeX + 5)}%, transparent ${Math.min(100, edgeX + 20)}%, transparent 100%)`,
          opacity: interpolate(local, [0, 6, T_SWIPE - 6, T_SWIPE], [0, 0.3, 0.3, 0], { easing: Easing.inOut(Easing.ease) }),
        }}
      />
    </>
  );
};

const CinematicLayer: React.FC = () => (
  <>
    <Vignette opacity={0.55} />
    <Glow intensity={0.025} />
    <LightStreak />
    <Particles count={120} />
    <Grain />
  </>
);

export const CinematicVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: theme.black, width: RESOLUTION.width, height: RESOLUTION.height, overflow: "hidden" }}>
      {scenes.map(({ C, d }, i) => {
        const offset = sceneOffsets[i];
        const nextOffset = offset + d;
        return (
          <React.Fragment key={i}>
            <Sequence from={offset} durationInFrames={d}>
              <Wrapper duration={d} idx={i}>
                <C />
              </Wrapper>
            </Sequence>
            <Sequence from={offset} durationInFrames={d}>
              <VoiceoverSegment segment={SCRIPT[i]} />
            </Sequence>
            {i < scenes.length - 1 && scenes[i].ext === "zoom" && <ZoomTransitionOverlay start={nextOffset - T_ZOOM} />}
            {i < scenes.length - 1 && scenes[i].ext === "swipe" && <SwipeOverlay start={nextOffset - T_SWIPE} />}
          </React.Fragment>
        );
      })}
      <CinematicLayer />
    </AbsoluteFill>
  );
};

export { TOTAL_DURATION };
