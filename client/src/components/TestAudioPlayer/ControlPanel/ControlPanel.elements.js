import styled from "styled-components";
import { FiRepeat, FiDownload } from "react-icons/fi";

export const RepeatIcon = styled(FiRepeat)`
  font-size: 14px;
  margin-left: 8px;
  color: ${({ color }) => color};
  cursor: pointer;
`;

export const DownloadIcon = styled(FiDownload)`
  font-size: 14px;
  margin-left: 8px;
  color: ${({ color }) => color};
  color: #d1d2d2;
  cursor: pointer;
  &:hover {
    color: #fd4d4d;
  }
`;
