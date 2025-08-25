import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function BookingPage() {
  const { salonId } = useParams(); // comes from /salons/:id/book
  const navigate = useNavigate();

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [service, setService] = useState("");

  const handleBooking = async () => {
    try {
      const token = localStorage.getItem("userToken");

      if (!token) {
        alert("You must be logged in to make a booking.");
        navigate("/login");
        return;
      }

      const bookingData = {
        salonId: parseInt(salonId, 10), // ensure it's a number
        date,
        time,
        service,
        status: "Pending",
        dateTime: `${date}T${time}:00`,
      };

      await axios.post("http://localhost:8081/api/user/bookings", bookingData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Booking successful!");
      navigate("/my-bookings");
    } catch (err) {
      console.error("Booking error:", err);
      alert("Failed to book. Check console for details.");
    }
  };

  return (
    <>
      <style>{`
        .booking-container {
          max-width: 480px;
          margin: 40px auto;
          padding: 30px 25px;
          background: #fff;
          border-radius: 12px;
          box-shadow: 0 8px 20px rgba(13, 71, 161, 0.15);
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          color: #0d47a1;
        }

        .booking-container h2 {
          text-align: center;
          margin-bottom: 30px;
          font-weight: 700;
          font-size: 2rem;
          letter-spacing: 1px;
        }

        .booking-input {
          width: 100%;
          padding: 12px 14px;
          margin-bottom: 20px;
          font-size: 1rem;
          border: 2px solid #0d47a1;
          border-radius: 8px;
          outline: none;
          box-sizing: border-box;
          transition: border-color 0.3s ease;
        }

        .booking-input:focus {
          border-color: #009688;
          box-shadow: 0 0 8px rgba(0, 150, 136, 0.6);
          background-color: #e0f2f1;
          color: #004d40;
        }

        .booking-row {
          display: flex;
          gap: 20px;
          margin-bottom: 20px;
          flex-wrap: wrap;
        }

        .booking-row .booking-input {
          flex: 1 1 45%;
          min-width: 130px;
        }

        .booking-button {
          width: 100%;
          padding: 14px 0;
          font-size: 1.2rem;
          font-weight: 700;
          color: white;
          background: linear-gradient(90deg, #0d47a1, #009688);
          border: none;
          border-radius: 10px;
          cursor: pointer;
          transition: background 0.3s ease;
        }

        .booking-button:hover {
          background: linear-gradient(90deg, #009688, #0d47a1);
        }

        @media (max-width: 480px) {
          .booking-row {
            flex-direction: column;
          }

          .booking-row .booking-input {
            flex: 1 1 100%;
          }
        }
      `}</style>

      <div className="booking-container">
        <h2>Book Appointment</h2>
        <div className="booking-row">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="booking-input"
          />
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="booking-input"
          />
        </div>
        <input
          type="text"
          placeholder="Service"
          value={service}
          onChange={(e) => setService(e.target.value)}
          className="booking-input"
        />
        <button onClick={handleBooking} className="booking-button">
          Book Now
        </button>
      </div>
    </>
  );
}

export default BookingPage;
