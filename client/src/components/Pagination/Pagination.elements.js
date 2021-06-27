import styled from "styled-components";
import { BiChevronRight, BiChevronLeft } from "react-icons/bi";

export const PaginationContainer = styled.div`
  margin-top: 30px;
`;
export const PaginationUl = styled.ul`
  display: flex;
  background-color: hsla(0, 0%, 100%, 0.05);
  padding-left: 5px;
  padding-right: 5px;
  padding-top: 5px;
  padding-bottom: 5px;
  border-radius: 20px;
  justify-content: center;
  text-align: center;
`;
export const PaginationLi = styled.li`
  background-color: ${(props) =>
    props.active === "true" ? "hsla(0,98%,65%,0.5)" : "transparent"};
  border-radius: 50%;
  margin-left: 2px;
  margin-right: 2px;
  list-style: none;
  height: 30px;
  width: 30px;
  text-align: center;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease;
  &:hover {
    background-color: hsla(0, 98%, 65%, 0.5);
  }
`;

export const StyledRightChevron = styled(BiChevronRight)`
  background: transparent;
  line-height: 30px;
`;
export const StyledLeftChevron = styled(BiChevronLeft)`
  background: transparent;
  line-height: 30px;
`;
