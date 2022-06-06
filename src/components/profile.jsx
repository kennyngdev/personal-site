import React, { useState, useEffect } from "react";
import "../css/profile.css";
import { default as closeIcon } from "../close.svg";
import Contact from "./contact";
function Profile({
  showProfile,
  setShowProfile,
  continueGame,
  showReadyText,
  setShowReadyText,
  timer,
  setTimer,
}) {
  // const [showReadyText, setShowReadyText] = useState(false);
  // const [timer, setTimer] = useState(0);
  // useEffect(() => {
  //   if (timer > 0) {
  //     setTimeout(() => {
  //       console.log("startTime, ", timer);
  //       setTimer(timer - 1);
  //     }, 1000);
  //   }
  //   if (timer === 0 && showReadyText) {
  //     console.log("done");
  //     setShowReadyText(false);
  //     continueGame();
  //   }
  // }, [timer, showReadyText]);
  // style={showProfile ? null : { display: "none" }}
  return (
    <>
      <div className={showProfile ? "profile" : "profile-hidden"}>
        <h1>PROFILE</h1>
        <h2>Kenny Ng Wai Cheong</h2>
        <p>FROM: Hong Kong</p>
        <p>LOCATION: Tokyo, Japan</p>
        <a href="mailto:contact@kennyng.dev">
          <p id="mailto">MAIL: contact@kennyng.dev</p>
        </a>
        <h2>SKILLS:</h2>
        <p>
          LANGUAGE: Javascript(Typescript, Node.js),
          <br />
          Go, Python, Dart(Flutter)
        </p>
        <p>FRONTEND: HTML/CSS, React(Redux,Next.js),Vue(Vuex,Nuxt.js)</p>
        <p>DATABASE: Cloud Firestore, MongoDB, PostgreSQL, MySQL</p>
        <p>DB-RELATED: REST API, GraphQL, Knex.js, TypeORM</p>
        <p>BACKEND: Express, Flask, Gin, Nginx</p>
        <p>INFRA: Docker, Git</p>
        <p>PLATFORM: GCP(Firebase), Heroku</p>
        <h2>EDUCATION:</h2>
        <p>M.A. in International Relations, The University of Warwick</p>
        <p>B.B.A in Economics with Minor in Social Science</p>
        <p>Code Chrysalis Advanced Engineering Program</p>
        <p>Tokyo School of Japanese Language, Comprehensive Japanese Program</p>
        <Contact />
        <button
          className="goBack"
          onClick={() => {
            setTimer(3);
            setShowReadyText(true);
            setShowProfile(false);
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

export default Profile;
