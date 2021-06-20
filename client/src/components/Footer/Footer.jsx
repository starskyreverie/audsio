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
      <FooterText>eriv</FooterText>
      <FooterSeparator>·</FooterSeparator>
      <VersionLabel>v1.0.0</VersionLabel>
    </FooterContainer>
  );
};

export default Footer;
