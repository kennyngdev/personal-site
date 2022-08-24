import React from "react";
import { default as githubIcon } from "../icons/github128.png";
import { default as twitterIcon } from "../icons/twitter128.png";
import { default as linkedinIcon } from "../icons/linkedin128.png";
import "../css/contact.css";

function Contact() {
  return (
    <div className="contact">
      <a href="https://github.com/kenny01123">
        <img src={githubIcon} alt="github-logo" />
      </a>
      <a href="https://twitter.com/kennyngdev">
        <img src={twitterIcon} alt="twitter-logo" />
      </a>
      <a href="https://www.linkedin.com/in/kenny-wai-cheong-ng/">
        <img src={linkedinIcon} alt="linkedin-logo" />
      </a>
    </div>
  );
}

export default Contact;
