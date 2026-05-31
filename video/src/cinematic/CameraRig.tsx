import React, { useRef } from "react";
import { useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

export type CameraKeyframe = {
  frame: number;
  position: [number, number, number];
  target: [number, number, number];
  ease?: "linear" | "easeInOut" | "easeOut" | "easeIn";
};

interface CameraRigProps {
  keyframes: CameraKeyframe[];
  children: React.ReactNode;
}

export const CameraRig: React.FC<CameraRigProps> = ({ keyframes, children }) => {
  const frame = useCurrentFrame();
  const { camera } = useThree();

  const sorted = [...keyframes].sort((a, b) => a.frame - b.frame);

  const getCurrentSegment = () => {
    for (let i = 0; i < sorted.length - 1; i++) {
      if (frame >= sorted[i].frame && frame < sorted[i + 1].frame) {
        return { start: sorted[i], end: sorted[i + 1], index: i };
      }
    }
    return { start: sorted[sorted.length - 1], end: sorted[sorted.length - 1], index: sorted.length - 1 };
  };

  useFrame(() => {
    const { start, end } = getCurrentSegment();

    if (start === end) {
      camera.position.set(...start.position);
      camera.lookAt(...start.target);
      return;
    }

    const segStart = start.frame;
    const segEnd = end.frame;
    const segDuration = segEnd - segStart;
    const localFrame = Math.max(0, Math.min(frame - segStart, segDuration));
    const t = segDuration > 0 ? localFrame / segDuration : 0;

    const eased = easeInOutCubic(t);

    const pos: THREE.Vector3 = new THREE.Vector3().lerpVectors(
      new THREE.Vector3(...start.position),
      new THREE.Vector3(...end.position),
      eased
    );
    const tgt: THREE.Vector3 = new THREE.Vector3().lerpVectors(
      new THREE.Vector3(...start.target),
      new THREE.Vector3(...end.target),
      eased
    );

    camera.position.copy(pos);
    camera.lookAt(tgt);
  });

  return <>{children}</>;
};

export function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

export const useCinematicZoom = (
  startFrame: number,
  duration: number,
  startZoom: number,
  endZoom: number
) => {
  const frame = useCurrentFrame();
  const f = Math.max(0, frame - startFrame);
  return interpolate(f, [0, duration], [startZoom, endZoom], {
    easing: easeOutCubic,
    extrapolateRight: "clamp",
  });
};
