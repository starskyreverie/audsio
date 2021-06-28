import React, { useState, useRef } from "react";
import {
  AudioPlayerContainer,
  PlayIcon,
  PauseIcon,
  StepBackwardIcon,
  StepForwardIcon,
  TimeLabel,
  ProgressBar,
} from "./AudioPlayer.elements.js";

const AudioPlayer = ({ fileUrl }) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const [isSeeking, setSeeking] = useState(false);

  const audioPlayer = useRef();
  const progressBar = useRef();
  const animationRef = useRef();

  const calculateTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${returnedMinutes}:${returnedSeconds}`;
  };

  const togglePlayPause = () => {
    const prevValue = isPlaying;
    setPlaying(!prevValue);
    if (!prevValue) {
      audioPlayer.current.play();
      animationRef.current = requestAnimationFrame(whilePlaying);
    } else {
      audioPlayer.current.pause();
      cancelAnimationFrame(animationRef.current);
    }
  };

  const whilePlaying = () => {
    if (audioPlayer.current) {
      progressBar.current.value = audioPlayer.current.currentTime;
      progressBar?.current.style.setProperty(
        "--seek-before-width",
        `${(progressBar.current.value / duration) * 100}%`
      );
      setCurrentTime(progressBar.current.value);
    }
    animationRef.current = requestAnimationFrame(whilePlaying);
  };

  const changeRange = () => {
    audioPlayer.current.currentTime = progressBar.current.value;
    progressBar.current.style.setProperty(
      "--seek-before-width",
      `${(progressBar.current.value / duration) * 100}%`
    );
    setCurrentTime(progressBar.current.value);
  };

  const forwardByFive = () => {
    progressBar.current.value = parseInt(progressBar.current.value) + 5;
    changeRange();
  };

  const backwardByFive = () => {
    progressBar.current.value -= 5;
    changeRange();
  };

  return (
    <AudioPlayerContainer>
      <StepBackwardIcon onClick={() => backwardByFive()} />
      {!isPlaying ? (
        <PlayIcon onClick={() => togglePlayPause()} />
      ) : (
        <PauseIcon onClick={() => togglePlayPause()} />
      )}
      <StepForwardIcon
        onClick={() => {
          forwardByFive();
        }}
      />
      <audio
        ref={audioPlayer}
        src={fileUrl}
        preload="metadata"
        onLoadedData={() => {
          setDuration(Math.floor(audioPlayer.current.duration));
          progressBar.current.max = Math.floor(audioPlayer.current.duration);
        }}
        onSeeking={() => setSeeking(true)}
        onSeeked={() => setSeeking(false)}
        onTimeUpdate={() => setCurrentTime(audioPlayer.current.currentTime)}
        onEnded={() => setPlaying(false)}
      ></audio>

      <TimeLabel>{calculateTime(currentTime)}</TimeLabel>
      <div>
        <ProgressBar
          ref={progressBar}
          type="range"
          defaultValue="0"
          onChange={changeRange}
        />
      </div>
      <TimeLabel>
        {!isNaN(duration) ? calculateTime(duration) : <></>}
      </TimeLabel>
    </AudioPlayerContainer>
  );
};

export default AudioPlayer;
