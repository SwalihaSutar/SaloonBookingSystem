// src/pages/SalonList.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SalonCard from "../components/SalonCard";
import BookingModal from "../components/BookingModal";

import "../styles/SalonList.css";

const SalonList = () => {
  const [salons, setSalons] = useState([]);
  const [selectedService, setSelectedService] = useState("");
  const [searchCity, setSearchCity] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  const [selectedSalon, setSelectedSalon] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8081/api/salons")
      .then((res) => res.json())
      .then((data) => setSalons(data))
      .catch((err) => console.error(err));
  }, []);

  const handleBookNowClick = (salon) => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      setSelectedSalon(salon);
      setShowBookingModal(true);
    }
  };

  const toggleFavorite = (salonId) => {
    setFavorites((prev) =>
      prev.includes(salonId)
        ? prev.filter((id) => id !== salonId)
        : [...prev, salonId]
    );
  };

  const filteredSalons = salons.filter((salon) => {
    const cityMatch = salon.city
      ?.toLowerCase()
      .includes(searchCity.toLowerCase());

    const servicesArray = Array.isArray(salon.services)
      ? salon.services
      : typeof salon.services === "string"
      ? salon.services.split(",")
      : [];

    const serviceMatch =
      selectedService === "" || servicesArray.includes(selectedService);

    const favoriteMatch = !showFavoritesOnly || favorites.includes(salon.id);
    return cityMatch && serviceMatch && favoriteMatch;
  });

  return (
    <>
    

      <div className="salon-list-container">
        <h2 className="salon-list-heading">Show All Salons</h2>

        <div className="filters">
          <input
            type="text"
            placeholder="Search by city..."
            value={searchCity}
            onChange={(e) => setSearchCity(e.target.value)}
            className="salon-search-input"
          />

          <select
            value={selectedService}
            onChange={(e) => setSelectedService(e.target.value)}
            className="custom-dropdown"
          >
            <option value="">Search by service</option>
            <option value="Haircare">Haircare</option>
            <option value="Skincare">Skincare</option>
            <option value="Homecare">Homecare</option>
            <option value="Spa">Spa</option>
            <option value="Massage">Massage</option>
          </select>

          <label className="favorite-toggle">
            <input
              type="checkbox"
              checked={showFavoritesOnly}
              onChange={() => setShowFavoritesOnly(!showFavoritesOnly)}
            />
            Show Favorites
          </label>
        </div>

        <div className="salon-list-grid">
          {filteredSalons.map((salon) => (
            <SalonCard
              key={salon.id}
              salon={salon}
              isFavorite={favorites.includes(salon.id)}
              onToggleFavorite={() => toggleFavorite(salon.id)}
              onBookNowClick={handleBookNowClick}
              onTagClick={(tag) => setSelectedService(tag)}
            />
          ))}
        </div>
      </div>

      {showBookingModal && selectedSalon && (
        <BookingModal
          salon={selectedSalon}
          onClose={() => setShowBookingModal(false)}
        />
      )}
    </>
  );
};

export default SalonList;
