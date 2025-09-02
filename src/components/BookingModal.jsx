// src/components/BookingModal.jsx
import React, { useState } from "react";
import axios from "axios";
import "../styles/BookingModal.css";

const BookingModal = ({ salon, onClose }) => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [service, setService] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("userToken");

      if (!token) {
        alert("You must be logged in to make a booking.");
        window.location.href = "/login"; // keep modal context simple
        return;
      }

      const bookingData = {
        salonId: parseInt(salon.id, 10), // ensure it's a number
        date,
        time,
        service,
        status: "Pending",
        dateTime: `${date}T${time}:00`,
      };

      await axios.post(
        "http://localhost:8081/api/user/bookings",
        bookingData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Booking successful!");
      onClose();
      window.location.href = "/my-bookings"; // redirect after modal closes
    } catch (err) {
      console.error("Booking error:", err);
      alert("Failed to book. Check console for details.");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Book Appointment at {salon.name}</h3>
        <form onSubmit={handleSubmit}>
          <label>Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />

          <label>Time:</label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />

          <label>Service:</label>
          <input
            type="text"
            placeholder="Enter service"
            value={service}
            onChange={(e) => setService(e.target.value)}
            required
          />

          <button type="submit" className="submit-booking">
            Confirm Booking
          </button>
          <button type="button" className="cancel-booking" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;
