import styled from "styled-components";
import AudsioLogo from "../../images/audsio_logo.png";
import { Link } from "react-router-dom";

export const FooterContainer = styled.footer`
  text-align: center;
  margin: 0 auto;
  margin-bottom: 20px;
  max-width: 800%;
  width: 90%;
  padding: 0;
  color: #d1d2d2;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const FooterIcon = styled.img.attrs({
  src: `${AudsioLogo}`,
})`
  height: 30px;
  width: 30px;
  z-index: 1000;
`;

export const VersionLabel = styled.label`
  margin-left: 0.5em;
  padding: 0.5em 1em;
  color: hsla(0, 0%, 100%, 0.48);
  display: block;
  border-radius: 16px;
  background: hsla(0, 0%, 100%, 0.05);
  font-size: 14px;
  z-index: 1000;
`;

export const FooterText = styled.label`
  padding: 0.5em 0.5em;
  color: hsla(0, 0%, 100%, 0.8);
  display: block;
  border-radius: 16px;
  font-size: 14px;
  z-index: 1000;
`;

export const FooterLink = styled.a`
  padding: 0.5em 0.5em;
  text-decoration: none;
  color: hsla(0, 0%, 100%, 0.8);
  display: block;
  border-radius: 16px;
  font-size: 14px;
  z-index: 1000;
  &:hover {
    text-decoration: underline;
  }
`;

export const FooterReactLink = styled(Link)`
  padding: 0.5em 0.5em;
  text-decoration: none;
  color: hsla(0, 0%, 100%, 0.8);
  display: block;
  border-radius: 16px;
  font-size: 12px;
  z-index: 1000;
  &:hover {
    text-decoration: underline;
  }
`;
export const FooterSeparator = styled.label`
  color: hsla(0, 0%, 100%, 0.8);
  display: block;
  border-radius: 16px;
  font-size: 12px;
  z-index: 1000;
`;
