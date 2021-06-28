import styled from "styled-components";
import { FaPlay, FaPause, FaStepBackward, FaStepForward } from "react-icons/fa";

export const AudioPlayerContainer = styled.div`
  display: flex;
`;

export const PlayIcon = styled(FaPlay)`
  margin-left: 4px;
  margin-top: 1px;
  color: #d1d2d2;
  cursor: pointer;
  &:hover {
    color: #fd4d4d;
  }
`;

export const PauseIcon = styled(FaPause)`
  margin-left: 4px;
  margin-top: 1px;
  color: #d1d2d2;
  cursor: pointer;
  &:hover {
    color: #fd4d4d;
  }
`;

export const StepBackwardIcon = styled(FaStepBackward)`
  margin-left: 4px;
  margin-top: 1px;
  color: #d1d2d2;
  cursor: pointer;
  &:hover {
    color: #fd4d4d;
  }
`;

export const StepForwardIcon = styled(FaStepForward)`
  margin-left: 4px;
  margin-top: 1px;
  color: #d1d2d2;
  cursor: pointer;

  &:hover {
    color: #fd4d4d;
  }
`;

export const TimeLabel = styled.div`
  margin-left: 5px;
  margin-right: 5px;
`;

export const ProgressBar = styled.input`
  --bar-bg: #d1d2d2;
  --seek-before-width: 3px;
  --seek-before-color: hsla(0, 72.2%, 52%, 0.81);
  --knob: #fd4d4d;
  --selectedKnob: #fd4d4d;

  -webkit-appearance: none;
  appearance: none;
  background: var(--bar-bg);
  border-radius: 10px;
  position: relative;
  height: 10px;
  outline: none;

  &::-webkit-slider-runnable-track {
    background: var(--bar-bg);
    border-radius: 10px;
    position: relative;
    height: 10px;
    outline: none;
  }

  &::-moz-range-track {
    background: var(--bar-bg);
    border-radius: 10px;
    position: relative;
    height: 10px;
    outline: none;
  }

  &::-moz-focus-outer {
    border: 0;
  }

  &::before {
    content: "";
    height: 10px;
    width: var(--seek-before-width);
    background-color: var(--seek-before-color);
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
  }

  &::-moz-range-progress {
    background-color: var(--seek-before-color);
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    height: 10px;
    z-index: 2;
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 15px;
    width: 15px;
    border-radius: 50%;
    border: none;
    background-color: var(--knob);
    cursor: pointer;
    position: relative;
    margin: -2px 0 0 0;
    z-index: 3;
    box-sizing: border-box;
  }

  &:active::-webkit-slider-thumb {
    transform: scale(1.2);
    background: var(--selectedKnob);
  }

  &::-moz-range-thumb {
    height: 15px;
    width: 15px;
    border-radius: 50%;
    border: transparent;
    background-color: var(--knob);
    cursor: pointer;
    position: relative;
    z-index: 3;
    box-sizing: border-box;
  }

  &:active::-moz-range-thumb {
    transform: scale(1.2);
    background: var(--selectedKnob);
  }
`;
