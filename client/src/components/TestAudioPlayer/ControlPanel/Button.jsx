import React from "react";
import "./button.css";

function Button({ play, isPlaying }) {
  return (
    <div onClick={play} className={isPlaying ? "btn-stop" : "btn-play"}></div>
  );
}
export default Button;
