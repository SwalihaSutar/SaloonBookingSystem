import React, { useEffect, useRef, useState } from "react";
import "../styles/Styles.css";
import spaImage from "../assets/spa.jpg";
import hairImage from "../assets/hair.jpg";
import skinImage from "../assets/skin.jpg";
import homecareImage from "../assets/homecare.jpg";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

const Home = () => {
  const navigate = useNavigate();

  const aboutRef = useRef(null);
  const [animateAbout, setAnimateAbout] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (aboutRef.current) {
        const rect = aboutRef.current.getBoundingClientRect();
        const windowHeight =
          window.innerHeight || document.documentElement.clientHeight;

        if (rect.top <= windowHeight - 100) {
          setAnimateAbout(true);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* <div className="background-container"></div> */}

      <div className="home-container">
        <div className="hero">
          <marquee
            behavior="scroll"
            direction="left"
            scrollAmount="6"
            style={{
              color: "white",
              fontSize: "22px",
              fontWeight: "bold",
              background: "rgba(0, 0, 0, 0.5)",
              padding: "10px 20px",
              margin: "15px auto",
              width: "80%",
              borderRadius: "10px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
            }}
          >
            Experience Luxury. Book with Ease. | Salon-Style Services, Anytime,
            Anywhere. | Premium Salon Services at Your Fingertips.
          </marquee>
        </div>

        <div className="services">
          {[hairImage, spaImage, skinImage, homecareImage].map((img, index) => {
            const titles = [
              "Hair Care",
              "Spa & Massage",
              "Skin Care",
              "HomeCare Service",
            ];
            const desc = [
              "Trendy cuts, coloring, and nourishing treatments.",
              "Unwind with relaxing massages and spa therapies.",
              "Glowing skin with expert facial and skincare services.",
              "Salon-style services delivered to your home with care and comfort.",
            ];
            const routes = [
              "/hair-care",
              "/spa-massage",
              "/skin-care",
              "/home-care",
            ];

            return (
              <div
                key={index}
                className="service-box"
                onClick={() => navigate(routes[index])}
                style={{
                  animation: `fadeInUp 0.8s ease forwards`,
                  animationDelay: `${index * 0.2}s`,
                  opacity: 0,
                }}
              >
                <img src={img} alt={titles[index]} />
                <h3>{titles[index]}</h3>
                <p>{desc[index]}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* About Us Section */}
      <div
        ref={aboutRef}
        className="about-us-section"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#ffffff",
          padding: "60px 30px",
          animation: animateAbout ? "fadeIn 1.5s ease-in-out" : "none",
          borderRadius: "12px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          minHeight: "100px",
          transition: "opacity 0.5s ease-in-out",
        }}
      >
        {/* Image Section */}
        <div style={{ flex: "1", paddingRight: "20px" }}>
          <img
            src={require("../assets/aboutus.jpeg")}
            alt="About Us"
            style={{
              width: "100%",
              height: "auto",
              maxWidth: "400px",
              borderRadius: "10px",
            }}
          />
        </div>

        {/* Text Section */}
        <div style={{ flex: "2" }}>
          <h2
            style={{
              fontSize: "32px",
              marginBottom: "15px",
              color: "#4B352A",
            }}
          >
            About Us
          </h2>
          <p style={{ fontSize: "18px", lineHeight: "1.7", color: "#444444" }}>
            <b>
              Blissful Booking Hub is your one-stop destination for salon and
              beauty care. We provide convenient, trusted, and relaxing beauty
              services right at your fingertips.
            </b>
          </p>
            
        </div>
      </div>

      {/* Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(40px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>

      <Footer />
    </>
  );
};

export default Home;
