import React, { useState, useRef } from "react";
import Slider from "./Slider/Slider.jsx";
import Button from "./ControlPanel/Button.jsx";
import ControlPanel from "./ControlPanel/ControlPanel.jsx";
import { AudioContainer } from "../Posts/Post/Post.elements.js";

const TestAudioPlayer = ({ fileUrl }) => {
  const [percentage, setPercentage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const audioRef = useRef();

  const onChange = (e) => {
    const audio = audioRef.current;
    audio.currentTime = (audio.duration / 100) * e.target.value;
    setPercentage(e.target.value);
  };

  const play = () => {
    const audio = audioRef.current;
    audio.volume = 0.1;

    if (!isPlaying) {
      setIsPlaying(true);
      audio.play();
    }

    if (isPlaying) {
      setIsPlaying(false);
      audio.pause();
    }
  };

  const getCurrDuration = (e) => {
    const percent = (
      (e.currentTarget.currentTime / e.currentTarget.duration) *
      100
    ).toFixed(2);
    const time = e.currentTarget.currentTime;

    setPercentage(+percent);
    setCurrentTime(time.toFixed(2));
  };

  return (
    <>
      <AudioContainer>
        <Button play={play} isPlaying={isPlaying} />
        <Slider percentage={percentage} onChange={onChange} />
        <audio
          ref={audioRef}
          onTimeUpdate={getCurrDuration}
          onLoadedData={(e) => {
            setDuration(e.currentTarget.duration.toFixed(2));
          }}
          src={fileUrl}
          onEnded={() => {
            setIsPlaying(false);
          }}
        ></audio>
      </AudioContainer>
      <ControlPanel
        play={play}
        isPlaying={isPlaying}
        duration={duration}
        currentTime={currentTime}
      />
    </>
  );
};

export default TestAudioPlayer;
