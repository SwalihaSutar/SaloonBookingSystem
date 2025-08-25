import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/SalonCard.css";

function SalonCard({ salon }) {
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);

  // Normalize services
  const services = Array.isArray(salon.services)
    ? salon.services.map((s) =>
        typeof s === "string"
          ? s.trim()
          : typeof s?.name === "string"
          ? s.name.trim()
          : ""
      )
    : typeof salon.services === "string"
    ? salon.services.split(",").map((s) => s.trim())
    : [];

  const handleBookNow = () => {
    const token = localStorage.getItem("userToken");
    if (!token) {
      navigate("/login", { state: { from: `/book/${salon.id}` } });
    } else {
      navigate(`/book/${salon.id}`);
    }
  };

  // Toggle favorite state with animation
  const handleFavoriteClick = () => {
    setIsFavorite((prev) => !prev);
  };

  return (
    <div className="salon-card">
      <div className="salon-card-header">
        <h5 className="card-title">{salon.name || "Unnamed Salon"}</h5>
        <button
          className={`favorite-icon ${isFavorite ? "favorite-active" : ""}`}
          onClick={handleFavoriteClick}
          aria-label="Toggle favorite"
          title={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          {/* Unicode heart: filled if favorite, else outline */}
          {isFavorite ? "❤️" : "🤍"}
        </button>
      </div>

      <h6 className="card-subtitle">{salon.city || "No city provided"}</h6>
      <p className="card-text">{salon.address || "No address provided"}</p>

      {salon.contact && (
        <p className="card-text">
          <strong>Contact:</strong> {salon.contact}
        </p>
      )}

      {services.length > 0 && (
        <div className="services-tags">
          {services.map((service, index) => (
            <span key={index} className="service-tag">
              {service}
            </span>
          ))}
        </div>
      )}

      <button className="book-now-button" onClick={handleBookNow}>
        Book Now
      </button>
    </div>
  );
}

export default SalonCard;
