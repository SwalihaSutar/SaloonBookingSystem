// src/services/HairCare.js
import React from "react";
import "../styles/HairCare.css";
import haircutImg from "../assets/haircutImgIN.jpg";

const HairCare = () => {
  return (
    <div className="service-container hair-care-page">
      <h1 className="title">Hair Care Services</h1>
      <div className="image-card">
        <img src={haircutImg} alt="Hair Care" className="service-image" />
      </div>
      <p className="description">
        <b>
          Transform your tresses with expert styling and precision cuts.
          Reimagine your look with nourishing treatments and trendy finishes.
          Because every great day starts with great hair.
        </b>
      </p>
      <a
        href="https://youtu.be/ltJR0-QxTJk?si=oI5vWD47l5SrTEmk"
        target="_blank"
        rel="noopener noreferrer"
        className="tutorial-link"
      >
        Youtube : Watch Hair Care Tutorial
      </a>
    </div>
  );
};

export default HairCare;
