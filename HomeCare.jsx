// src/services/HomeCare.js
import React from "react";
import "../styles/HomeCare.css";
import homeCareImg from "../assets/homecareImgIN.jpg";

const HomeCare = () => {
  return (
    <div className="service-container">
      <h1 className="title">Home Care Services</h1>
      <div className="image-card">
        <img src={homeCareImg} alt="Home Care" className="service-image" />
      </div>
      <p className="description">
        <b>
          Enjoy premium salon services at the comfort of your home. Professional
          care delivered to your doorstep, with safety and convenience in mind.
        </b>
      </p>
      <a
        href="https://youtu.be/kc06SSVGK5g?si=N8LDqFDa6f-APVzV"
        target="_blank"
        rel="noopener noreferrer"
        className="tutorial-link"
      >
        Youtube : Watch Home Care Tutorial
      </a>
    </div>
  );
};

export default HomeCare;
