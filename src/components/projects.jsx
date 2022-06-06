import React, { useState, useEffect } from "react";
import "../css/projects.css";
import { default as closeIcon } from "../close.svg";
import { default as androidIcon } from "../icons/android.png";
import { default as githubIcon } from "../icons/github128.png";

function Projects({
  showProjects,
  setShowProjects,
  continueGame,
  showReadyText,
  setShowReadyText,
  timer,
  setTimer,
}) {
  return (
    <>
      <div className={showProjects ? "profile" : "profile-hidden"}>
        <h1>PROJECTS</h1>
        <div className="projects">
          <div className="oneProject">
            <span>
              <a href="https://play.google.com/store/apps/details?id=movienight.cc.app">
                <h2>MOVIE NIGHT </h2>
              </a>{" "}
              <a href="https://play.google.com/store/apps/details?id=movienight.cc.app">
                <img
                  src={androidIcon}
                  className="title-icon"
                  id="android"
                  alt="Google-Play-Store-Link"
                ></img>
              </a>
              <a href="https://github.com/MovieNightCC/MovieNight">
                {" "}
                <img
                  src={githubIcon}
                  className="title-icon"
                  alt="Github-Link"
                ></img>
              </a>{" "}
            </span>
            <p>ANDROID: Dart, Flutter, TypeScript, Firebase, Firestore</p>
            <p>A One-Stop Solution for choosing movies for your Movie Night.</p>
          </div>
          <div className="oneProject">
            <span>
              <a href="https://mymizuteams.web.app/">
                <h2>MYMIZU TEAMS</h2>
              </a>{" "}
              <a href="https://github.com/dius00/mymizu_teams">
                {" "}
                <img
                  src={githubIcon}
                  className="title-icon"
                  alt="Github-Link"
                ></img>
              </a>{" "}
            </span>{" "}
            <p>WEB: JavaScript, React, Firebase, Firestore</p>
            <p>
              Gamifying and Socializing your{" "}
              <a href="https://www.mymizu.co/">mymizu®</a> experience.
            </p>
          </div>
          <div className="oneProject">
            <span>
              <a href="https://github.com/kenny01123/pun_detector">
                <h2>PUN DETECTOR</h2>
              </a>{" "}
              <a href="https://github.com/kenny01123/pun_detector">
                {" "}
                <img
                  src={githubIcon}
                  className="title-icon"
                  alt="Github-Link"
                ></img>
              </a>{" "}
            </span>{" "}
            <p>CLI: GO, Python, Snowboy Hotword Detection</p>
            <p>
              Utilizing Voice Recognization technology to create a Pun-safe
              environment for you.
            </p>
          </div>{" "}
          <div className="oneProject">
            <span>
              <a href="https://github.com/kenny01123/file-storage-server">
                <h2>FILE STORAGE SERVICE</h2>
              </a>{" "}
              <a href="https://github.com/kenny01123/file-storage-server">
                {" "}
                <img src={githubIcon} id="icon4" alt="Github-Link"></img>
              </a>{" "}
            </span>{" "}
            <p>WEB/CLI: Python, Nginx, React, Docker</p>
            <p>A simple microservice for file storage, with Web client/CLI.</p>
          </div>
          <div className="oneProject">
            <span>
              <a href="http://barteryprod.herokuapp.com/">
                <h2>BARTERY</h2>
              </a>{" "}
              <a href="https://github.com/kenny01123/bartery">
                {" "}
                <img
                  src={githubIcon}
                  className="title-icon"
                  alt="Github-Link"
                ></img>
              </a>{" "}
            </span>{" "}
            <p>WEB: Javascript, React, PostgreSQL, Heroku, Bootstrap</p>
            <p>
              A WEB Board for trading your unwanted items in return for
              something that sparks joy.
            </p>
          </div>
        </div>
        <button
          className="goBack"
          onClick={() => {
            setTimer(3);
            setShowReadyText(true);
            setShowProjects(false);
          }}
        >
          <img src={closeIcon} alt="close-icon"></img>
        </button>
      </div>
      <div
        className="getReadyContainer"
        style={showReadyText ? null : { display: "none" }}
      >
        <h1 className="getReady">
          Get Ready!
          <br />
          {timer}
        </h1>
      </div>
    </>
  );
}

export default Projects;
