import styled from "styled-components";
import { FaPlay, FaPause, FaStepBackward, FaStepForward } from "react-icons/fa";

export const PlayIcon = styled(FaPlay)`
  font-size: 18px;
  margin-left: 4px;
  color: #d1d2d2;
  cursor: pointer;
  &:hover {
    color: #fd4d4d;
  }
`;

export const PauseIcon = styled(FaPause)`
  font-size: 18px;
  margin-left: 4px;
  color: #d1d2d2;
  cursor: pointer;
  &:hover {
    color: #fd4d4d;
  }
`;

export const StepBackwardIcon = styled(FaStepBackward)`
  font-size: 18px;
  margin-left: 4px;
  color: #d1d2d2;
  cursor: pointer;
  &:hover {
    color: #fd4d4d;
  }
`;

export const StepForwardIcon = styled(FaStepForward)`
  font-size: 18px;
  margin-left: 4px;
  color: #d1d2d2;
  cursor: pointer;

  &:hover {
    color: #fd4d4d;
  }
`;
