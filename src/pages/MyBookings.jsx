import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import "../styles/Mybooking.css";

import makeup1 from "../assets/makeup1.jpg";
import makeup2 from "../assets/makeup2.jpg";
import makeup3 from "../assets/makeup3.jpg";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("userToken");

    if (!token) {
      setError("You must be logged in to view bookings.");
      setLoading(false);
      return;
    }

    fetch("http://localhost:8081/api/user/bookings/my", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch bookings");
        return res.json();
      })
      .then((data) => {
        setBookings(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleCancelClick = (booking) => {
    setSelectedBooking(booking);
    setShowModal(true);
  };

  const confirmCancel = async () => {
    try {
      const token = localStorage.getItem("userToken");
      await fetch(
        `http://localhost:8081/api/user/bookings/${selectedBooking.id}/cancel`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setBookings((prev) => prev.filter((b) => b.id !== selectedBooking.id));
    } catch (err) {
      alert("Error cancelling booking.");
    } finally {
      setShowModal(false);
    }
  };

  return (
    <div className="my-bookings-container">
      <div className="hero-section">
        <h2 className="booking-header">My Bookings</h2>
        <p className="booking-subtitle">
          Manage all your salon appointments in one place.
        </p>
      </div>

      {loading && <p>Loading your bookings...</p>}
      {error && <p className="error-text">{error}</p>}

      {!loading && !error && (
        <div className="booking-list">
          {bookings.length === 0 ? (
            <p>No bookings found.</p>
          ) : (
            bookings.map((booking) => (
              <div key={booking.id} className="booking-card">
                <p>
                  <strong>Salon:</strong>{" "}
                  {booking.salon?.name || booking.salonName || "N/A"}
                </p>
                <p>
                  <strong>Date:</strong> {booking.dateTime || booking.date || "N/A"}
                </p>
                <p>
                  <strong>Status:</strong> {booking.status || "PENDING"}
                </p>
                <button onClick={() => handleCancelClick(booking)}>Cancel</button>
              </div>
            ))
          )}
        </div>
      )}

      <div className="image-gallery">
        <img src={makeup1} alt="Salon Service 1" />
        <img src={makeup2} alt="Salon Service 2" />
        <img src={makeup3} alt="Salon Service 3" />
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Are you sure you want to cancel?</h3>
            <p>
              {selectedBooking?.salon?.name || selectedBooking?.salonName} on{" "}
              {selectedBooking?.dateTime || selectedBooking?.date}
            </p>
            <button onClick={confirmCancel}>Yes, Cancel</button>
            <button onClick={() => setShowModal(false)}>No</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBookings;
