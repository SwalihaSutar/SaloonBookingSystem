// src/services/SkinCare.js
import React from "react";
import "../styles/SkinCare.css";
import skinImg from "../assets/skincareImgIN.jpg";

const SkinCare = () => {
  return (
    <div className="service-container">
      <h1 className="title">Skin Care Services</h1>
      <div className="image-card">
        <img src={skinImg} alt="Skin Care" className="service-image" />
      </div>
      <p className="description">
        <b>
          {" "}
          Pamper your skin with professional treatments and premium products.
          Glow naturally with facials, scrubs, and rejuvenating therapies.{" "}
        </b>
      </p>
      <a
        href="https://www.youtube.com/watch?v=example2"
        target="_blank"
        rel="noopener noreferrer"
        className="tutorial-link"
      >
        Youtube : Watch Skin Care Tutorial
      </a>
    </div>
  );
};

export default SkinCare;
