// src/services/SpaMassage.js
import React from "react";
import "../styles/SpaMassage.css";
import spaImg from "../assets/spaImgIN.jpg";
import massageImg from "../assets/MassageImgIN.jpg"; // <- Add your massage image

const SpaMassage = () => {
  return (
    <div className="service-container">
      <h1 className="title">Spa & Massage Services</h1>

      <div className="cards-wrapper">
        {/* Spa */}
        <div className="service-card">
          <div className="image-card">
            <img src={spaImg} alt="Spa" className="service-image" />
          </div>
          <p className="tagline">
            <b>
              {" "}
              Relax, rejuvenate, and refresh with our luxurious spa treatments.
            </b>
          </p>
          <a
            href="https://youtu.be/tKkJnauWFgA?si=5hRdrvELokFamT0w"
            target="_blank"
            rel="noopener noreferrer"
            className="tutorial-link"
          >
            Youtube : Watch Spa Tutorial
          </a>
        </div>

        {/* Massage */}
        <div className="service-card">
          <div className="image-card">
            <img src={massageImg} alt="Massage" className="service-image" />
          </div>
          <p className="tagline">
            <b>
              {" "}
              Experience the healing touch with our soothing massage therapies.
            </b>
          </p>
          <a
            href="https://youtu.be/r0_Yp3EDqRE?si=RAVLmLt828tAJKba"
            target="_blank"
            rel="noopener noreferrer"
            className="tutorial-link"
          >
            Youtube : Watch Massage Tutorial
          </a>
        </div>
      </div>
    </div>
  );
};

export default SpaMassage;
