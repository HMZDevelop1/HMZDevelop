import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const slideInFromRight: React.CSSProperties = (
  frame: number,
  duration: number
) => ({
  transform: `translateX(${interpolate(frame, [0, duration], [200, 0], {
    extrapolateRight: "clamp",
  })}px)`,
  opacity: interpolate(frame, [0, duration * 0.5], [0, 1], {
    extrapolateRight: "clamp",
  }),
});

export const slideInFromLeft: React.CSSProperties = (
  frame: number,
  duration: number
) => ({
  transform: `translateX(${interpolate(frame, [0, duration], [-200, 0], {
    extrapolateRight: "clamp",
  })}px)`,
  opacity: interpolate(frame, [0, duration * 0.5], [0, 1], {
    extrapolateRight: "clamp",
  }),
});

export const fadeIn = (frame: number, duration: number) =>
  ({
    opacity: interpolate(frame, [0, duration], [0, 1], {
      extrapolateRight: "clamp",
    }),
  } as const);

export const scaleIn = (frame: number, duration: number) =>
  ({
    transform: `scale(${interpolate(frame, [0, duration], [0.8, 1], {
      extrapolateRight: "clamp",
    })})`,
    opacity: interpolate(frame, [0, duration * 0.5], [0, 1], {
      extrapolateRight: "clamp",
    }),
  } as const);

export const slideUp = (frame: number, duration: number) =>
  ({
    transform: `translateY(${interpolate(frame, [0, duration], [80, 0], {
      extrapolateRight: "clamp",
    })}px)`,
    opacity: interpolate(frame, [0, duration * 0.5], [0, 1], {
      extrapolateRight: "clamp",
    }),
  } as const);

export function useSlideInFromRight(duration: number) {
  const frame = useCurrentFrame();
  return slideInFromRight(frame, duration);
}

export function useSlideInFromLeft(duration: number) {
  const frame = useCurrentFrame();
  return slideInFromLeft(frame, duration);
}

export function useFadeIn(duration: number) {
  const frame = useCurrentFrame();
  return fadeIn(frame, duration);
}

export function useScaleIn(duration: number) {
  const frame = useCurrentFrame();
  return scaleIn(frame, duration);
}

export function useSlideUp(duration: number) {
  const frame = useCurrentFrame();
  return slideUp(frame, duration);
}

export function useStaggeredItems(
  itemCount: number,
  baseDelay: number,
  staggerDelay: number
) {
  const frame = useCurrentFrame();
  return Array.from({ length: itemCount }, (_, i) => {
    const itemFrame = Math.max(0, frame - baseDelay - i * staggerDelay);
    return {
      opacity: interpolate(itemFrame, [0, 10], [0, 1], {
        extrapolateRight: "clamp",
      }),
      transform: `translateY(${interpolate(itemFrame, [0, 20], [40, 0], {
        extrapolateRight: "clamp",
      })}px)`,
    };
  });
}

export function useTransition(duration: number) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const inStyle: React.CSSProperties = {
    opacity: interpolate(frame, [0, duration * 0.5], [0, 1], {
      extrapolateRight: "clamp",
    }),
    transform: `scale(${interpolate(
      frame,
      [0, duration],
      [1.1, 1],
      { extrapolateRight: "clamp" }
    )})`,
  };

  const outStyle = (
    outStart: number
  ): React.CSSProperties => ({
    opacity: interpolate(frame, [outStart, outStart + duration * 0.5], [1, 0], {
      extrapolateRight: "clamp",
      extrapolateLeft: "clamp",
    }),
    transform: `translateY(${interpolate(
      frame,
      [outStart, outStart + duration],
      [0, -30],
      { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
    )}px)`,
  });

  return { inStyle, outStyle };
}

export function useEntrance(
  startFrame: number,
  duration: number,
  direction: "up" | "left" | "right" | "scale" | "fade" = "up"
): React.CSSProperties {
  const frame = useCurrentFrame();
  const f = Math.max(0, frame - startFrame);

  const offsetMap = {
    up: `translateY(${interpolate(f, [0, duration], [80, 0], { extrapolateRight: "clamp" })}px)`,
    left: `translateX(${interpolate(f, [0, duration], [-100, 0], { extrapolateRight: "clamp" })}px)`,
    right: `translateX(${interpolate(f, [0, duration], [100, 0], { extrapolateRight: "clamp" })}px)`,
    scale: `scale(${interpolate(f, [0, duration], [0.8, 1], { extrapolateRight: "clamp" })})`,
    fade: "none",
  };

  return {
    opacity: interpolate(f, [0, duration * 0.4], [0, 1], {
      extrapolateRight: "clamp",
    }),
    transform: offsetMap[direction],
  };
}

export function useSceneTransition(
  sceneDuration: number,
  transitionDuration: number
) {
  const frame = useCurrentFrame();

  const enter: React.CSSProperties = {
    opacity: interpolate(
      frame,
      [0, transitionDuration],
      [0, 1],
      { extrapolateRight: "clamp" }
    ),
    transform: `scale(${interpolate(
      frame,
      [0, transitionDuration],
      [0.95, 1],
      { extrapolateRight: "clamp" }
    )})`,
    filter: `blur(${interpolate(
      frame,
      [0, transitionDuration],
      [8, 0],
      { extrapolateRight: "clamp" }
    )}px)`,
  };

  const exitFrame = sceneDuration - transitionDuration;
  const exit: React.CSSProperties = {
    opacity: interpolate(
      frame,
      [exitFrame, sceneDuration],
      [1, 0],
      { extrapolateLeft: "clamp" }
    ),
    transform: `scale(${interpolate(
      frame,
      [exitFrame, sceneDuration],
      [1, 1.05],
      { extrapolateLeft: "clamp" }
    )})`,
    filter: `blur(${interpolate(
      frame,
      [exitFrame, sceneDuration],
      [0, 4],
      { extrapolateLeft: "clamp" }
    )}px)`,
  };

  return { enter, exit };
}
