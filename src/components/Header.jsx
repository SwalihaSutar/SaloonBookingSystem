import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

const Header = () => {
  const [username, setUsername] = useState(localStorage.getItem("username"));
  const navigate = useNavigate();

  useEffect(() => {
    // Listen for localStorage changes (login/logout in other tabs)
    const handleStorageChange = () => {
      setUsername(localStorage.getItem("username"));
    };
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userRole");
    localStorage.removeItem("username");
    setUsername(null);
    navigate("/"); // redirect to home
  };

  const headerStyle = {
    color: "#ffffff",
    padding: "1rem 2rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    position: "sticky",
    top: "0",
    zIndex: "1000",
    height: "70px",
    animation: "colorShift 8s infinite alternate ease-in-out",
  };

  const logoStyle = {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontWeight: "bold",
    fontSize: "1.2rem",
  };

  const logoImgStyle = {
    height: "40px",
    width: "40px",
  };

  const navLinksStyle = {
    display: "flex",
    gap: "1rem",
    textDecoration: "none",
    color: "#ffffff",
  };

  const userSectionStyle = {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  };

  const logoutButtonStyle = {
    backgroundColor: "#ff4d4d",
    color: "#fff",
    border: "none",
    padding: "6px 12px",
    borderRadius: "5px",
    cursor: "pointer",
  };

  return (
    <>
      <header style={headerStyle}>
        {/* Left Logo + Text */}
        <div style={logoStyle}>
          <img src={logo} alt="Logo" style={logoImgStyle} />
          <span>Blissful Salon Booking</span>
        </div>

        {/* Center Navigation Links */}
        <nav style={navLinksStyle}>
          <Link to="/" style={{ color: "#ffffff", textDecoration: "none" }}>
            Home
          </Link>
          <Link
            to="/salons"
            style={{ color: "#ffffff", textDecoration: "none" }}
          >
            Salons
          </Link>
          <Link
            to="/bookings"
            style={{ color: "#ffffff", textDecoration: "none" }}
          >
            My Bookings
          </Link>
          <Link
            to="/owner-auth"
            style={{ color: "#ffffff", textDecoration: "none" }}
          >
            Add Salon
          </Link>
        </nav>

        {/* Right User Section */}
        <div style={userSectionStyle}>
          {username ? (
            <>
              <span>Welcome, {username}</span>
              <button style={logoutButtonStyle} onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" style={{ color: "#ffffff", textDecoration: "none" }}>
              Login
            </Link>
          )}
        </div>
      </header>

      {/* Keyframes for animated background */}
      <style>
        {`
          @keyframes colorShift {
            0% { background-color: #0A2342; }
            50% { background-color: #133B63; }
            100% { background-color: #0A2342; }
          }
        `}
      </style>
    </>
  );
};

export default Header;
