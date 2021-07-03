import styled from "styled-components";
import { RiCloseFill } from "react-icons/ri";

export const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #1c1f22;
  padding-left: 30px;
  padding-right: 30px;
  padding-top: 15px;
  padding-bottom: 17px;
  z-index: 600000;
  border-radius: 5px;
  max-width: 740px;
  max-height: 100vh;
`;

export const BackgroundOverlay = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 500000;
`;

export const ModalWindowBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  padding: 0;
  box-sizing: border-box;
`;

export const ModalWindowBarWithDifferentMargins = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 5px;
  padding: 0;
  box-sizing: border-box;
`;
export const StyledCloseButtonIcon = styled(RiCloseFill)`
  background-color: transparent;
  color: #d1d2d2;
`;

export const SmallCloseButton = styled.button`
  margin-top: 2.5px;
  margin-left: 50px;
  border-radius: 0.25em;
  background-color: hsla(0, 0%, 100%, 0.05);
  padding: ${({ big }) => (big ? "12px 64px" : "10px")};
  color: #d1d2d2;
  font-size: ${({ fontBig }) => (fontBig ? "20px" : "16px")};
  outline: none;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: hsla(0, 0%, 100%, 0.1);
    animation: none;
  }
  display: flex;
  align-items: center;
`;

export const ModalButton = styled.button`
  border-radius: 0.25em;
  background-color: hsla(0, 98%, 65%, 0.5);
  white-space: nowrap;
  padding: ${({ big }) => (big ? "12px 64px" : "10px 20px")};
  margin-top: 20px;
  margin-left: auto;
  color: #d1d2d2;
  font-size: ${({ fontBig }) => (fontBig ? "20px" : "16px")};
  outline: none;
  border: none;
  cursor: pointer;
  &:hover {
    transition: all 0.3s ease-out;
    background: #fff;
    background-color: #fd4d4d;
  }
`;

export const ModalButtonWithoutAutoMarginLeft = styled.button`
  border-radius: 0.25em;
  background-color: hsla(0, 0%, 100%, 0.05);
  white-space: nowrap;
  padding: ${({ big }) => (big ? "12px 64px" : "10px 20px")};
  margin-top: 20px;
  color: #d1d2d2;
  font-size: ${({ fontBig }) => (fontBig ? "20px" : "16px")};
  outline: none;
  border: none;
  cursor: pointer;
  &:hover {
    transition: all 0.3s ease-out;
    background-color: hsla(0, 0%, 100%, 0.1);
  }
`;

export const StyledTitle = styled.div`
  font-weight: bold;
  color: #d1d2d2;
`;
