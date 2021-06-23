import React from "react";
import { CoolText, CoolTextContainer } from "./NotFound.elements.js";

const NotFound = () => {
  return (
    <CoolTextContainer>
      <CoolText>404 - the route specified doesn't exist.</CoolText>
    </CoolTextContainer>
  );
};

export default NotFound;
