import React, { useState } from "react";
import { RepeatIcon, DownloadIcon } from "./ControlPanel.elements.js";
import "./control-panel.css";
import axios from "axios";
import fileDownload from "js-file-download";

const ControlPanel = ({
  duration,
  currentTime,
  isRepeating,
  setIsRepeating,
  fileUrl,
  title,
}) => {
  const handleDownload = (url, filename) => {
    axios
      .get(url, {
        responseType: "blob",
      })
      .then((res) => {
        fileDownload(res.data, filename);
      });
  };

  const secondsToHms = (seconds) => {
    if (!seconds) return "00:00";

    let duration = seconds;
    let hours = duration / 3600;
    duration = duration % 3600;

    let min = parseInt(duration / 60);
    duration = duration % 60;

    let sec = parseInt(duration);

    if (sec < 10) {
      sec = `0${sec}`;
    }
    if (min < 10) {
      min = `0${min}`;
    }

    if (parseInt(hours, 10) > 0) {
      return `${parseInt(hours, 10)}h ${min}m ${sec}s`;
    } else if (min === 0) {
      return `00:${sec}`;
    } else {
      return `${min}:${sec}`;
    }
  };

  return (
    <>
      <div className="timer">{`${secondsToHms(currentTime)}/${secondsToHms(
        duration
      )}`}</div>
      <RepeatIcon
        color={isRepeating ? "#fd4d4d" : "#d1d2d2"}
        onClick={() => {
          setIsRepeating(!isRepeating);
        }}
      />
      <DownloadIcon
        onClick={() => {
          handleDownload(fileUrl, title);
        }}
      />
    </>
  );
};
export default ControlPanel;
