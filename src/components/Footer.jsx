import React from "react";

const Footer = () => {
  const footerStyle = {
    backgroundColor: "#0A2342",
    color: "#ffffff",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 2rem",
    height: "100px",
    fontSize: "0.9rem",
    flexWrap: "wrap",
  };

  const addressStyle = {
    flex: "1",
    textAlign: "left",
  };

  const rightsStyle = {
    flex: "1",
    textAlign: "center",
  };

  const socialStyle = {
    flex: "1",
    textAlign: "right",
  };

  const linkStyle = {
    color: "#ffffff",
    marginLeft: "10px",
    textDecoration: "none",
  };

  return (
    <footer style={footerStyle}>
      <div style={addressStyle}>
        <p style={{ margin: 0 }}>
          Blissful Booking Hub, 3rd Floor, Lotus Tech Park, Mumbai, India
        </p>
      </div>

      <div style={rightsStyle}>
        <p style={{ margin: 0 }}>&copy; 2025 Blissful Booking Hub</p>
      </div>

      <div style={socialStyle}>
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          style={linkStyle}
        >
          Facebook
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          style={linkStyle}
        >
          Instagram
        </a>
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          style={linkStyle}
        >
          Twitter
        </a>
      </div>
    </footer>
  );
};

export default Footer;
