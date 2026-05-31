import React from "react";
import { Composition } from "remotion";
import { CinematicVideo, TOTAL_DURATION } from "./Video";
import { FPS, RESOLUTION } from "./colors";
import "./fonts.css";

export const RemotionRoot: React.FC = () => (
  <Composition
    id="CinematicVideo"
    component={CinematicVideo}
    durationInFrames={TOTAL_DURATION}
    fps={FPS}
    width={RESOLUTION.width}
    height={RESOLUTION.height}
  />
);
