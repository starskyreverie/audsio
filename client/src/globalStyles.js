import styled, { createGlobalStyle } from "styled-components";
import Lato from "./fonts/Lato-Regular.ttf";

const GlobalStyle = createGlobalStyle`
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    background-color: #1c1f22;
    font-family: "Lato", sans-serif;
    @font-face {
      font-family: "Lato";
      src: url(${Lato}) format('truetype');
    }
}
`;

export const Container = styled.div`
  z-index: 1;
  width: 95%;
  max-width: 1300px;
  margin-right: auto;
  margin-left: auto;
  padding-right: 50px;
  padding-left: 50px;

  @media screen and (max-width: 991px) {
    padding-right: 30px;
    padding-left: 30px;
  }
`;

export const Button = styled.button`
  border-radius: 0.25em;
  background-color: hsla(0, 0%, 100%, 0.05);
  white-space: nowrap;
  padding: ${({ big }) => (big ? "12px 64px" : "10px 20px")};
  color: #d1d2d2;
  font-size: ${({ fontBig }) => (fontBig ? "20px" : "16px")};
  outline: none;
  border: none;
  cursor: pointer;
  &:hover {
    border: 1px solid rgba(255, 255, 255, 0.075);
    animation: none;
  }
  @media screen and (max-width: 960px) {
    margin-top: 50px;
    width: 90%;
  }
`;

export const RedButton = styled.button`
  border-radius: 0.25em;
  background-color: hsla(0, 98%, 65%, 0.5);
  white-space: nowrap;
  padding: ${({ big }) => (big ? "12px 64px" : "10px 20px")};
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
  @media screen and (max-width: 960px) {
    width: 90%;
  }
`;

export const RedSmallButton = styled.button`
  border-radius: 0.25em;
  background-color: hsla(0, 98%, 65%, 0.5);
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
    background: #fff;
    background-color: #fd4d4d;
  }
`;

export default GlobalStyle;
