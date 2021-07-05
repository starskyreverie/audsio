import React from "react";
import {
  StepBackwardIcon,
  StepForwardIcon,
  PlayIcon,
  PauseIcon,
} from "./Button.elements.js";

const Button = ({ play, isPlaying, forwardByFive, backwardByFive }) => {
  return (
    <>
      <StepBackwardIcon onClick={backwardByFive} />
      {!isPlaying ? <PlayIcon onClick={play} /> : <PauseIcon onClick={play} />}
      <StepForwardIcon onClick={forwardByFive} />
    </>
  );
};
export default Button;
