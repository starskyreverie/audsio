import React from "react";
import {
  FooterContainer,
  FooterIcon,
  VersionLabel,
  FooterText,
  FooterSeparator,
} from "./Footer.elements.js";

const Footer = () => {
  return (
    <FooterContainer>
      <FooterIcon />
      <FooterText>Audsio</FooterText>
      <FooterSeparator>·</FooterSeparator>
      <VersionLabel>v3.3.0</VersionLabel>
    </FooterContainer>
  );
};

export default Footer;
