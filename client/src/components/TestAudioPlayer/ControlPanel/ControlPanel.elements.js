import styled from "styled-components";
import { FiRepeat } from "react-icons/fi";

export const RepeatIcon = styled(FiRepeat)`
  font-size: 14px;
  margin-left: 8px;
  color: ${({ color }) => color};
  cursor: pointer;
`;
