import React from "react";
import { useHistory } from "react-router-dom";

import {
  ModalContainer,
  BackgroundOverlay,
  ModalWindowBar,
  ModalWindowBarWithDifferentMargins,
  StyledCloseButtonIcon,
  SmallCloseButton,
  ModalButton,
  ModalButtonWithoutAutoMarginLeft,
  StyledTitle,
} from "./Modal.elements.js";

const Modal = ({ onClose, title }) => {
  const history = useHistory();
  return (
    <>
      <BackgroundOverlay onClick={onClose} />
      <ModalContainer>
        <ModalWindowBar>
          <StyledTitle>{title}</StyledTitle>
          <SmallCloseButton onClick={onClose}>
            <StyledCloseButtonIcon />
          </SmallCloseButton>
        </ModalWindowBar>
        <ModalWindowBarWithDifferentMargins>
          <ModalButtonWithoutAutoMarginLeft
            onClick={() => {
              history.push("/register");
              onClose();
            }}
          >
            Sign up
          </ModalButtonWithoutAutoMarginLeft>
          <ModalButton
            onClick={() => {
              history.push("/login");
              onClose();
            }}
          >
            Login
          </ModalButton>
        </ModalWindowBarWithDifferentMargins>
      </ModalContainer>
    </>
  );
};

export default Modal;
