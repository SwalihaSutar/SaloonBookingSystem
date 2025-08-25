import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddSalon = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    city: "",
    address: "",
    contact: "",
    services: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (
      !form.name ||
      !form.city ||
      !form.address ||
      !form.contact ||
      !form.services
    ) {
      setError("Please fill all fields.");
      return;
    }

    try {
      const token = localStorage.getItem("ownerToken");
      if (!token) {
        setError("You must be logged in as owner.");
        navigate("/owner-login");
        return;
      }

      const servicesArray = form.services.split(",").map((s) => s.trim());

      const salonData = {
        name: form.name,
        city: form.city,
        address: form.address,
        contact: form.contact,
        services: servicesArray,
      };

      await axios.post("http://localhost:8081/api/salons", salonData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      setSuccess("Salon added successfully!");
      setForm({
        name: "",
        city: "",
        address: "",
        contact: "",
        services: "",
      });
    } catch (err) {
      setError(err.response?.data || "Failed to add salon.");
    }
  };

  // Inline styles
  const containerStyle = {
    maxWidth: 480,
    margin: "40px auto",
    padding: "30px 25px",
    background: "#fff",
    borderRadius: 12,
    boxShadow: "0 8px 20px rgba(13, 71, 161, 0.15)",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: "#0d47a1",
  };

  const headingStyle = {
    textAlign: "center",
    marginBottom: 30,
    fontWeight: 700,
    fontSize: "2rem",
    letterSpacing: 1,
  };

  const inputStyle = {
    width: "100%",
    padding: "12px 14px",
    marginBottom: 20,
    fontSize: "1rem",
    border: "2px solid #0d47a1",
    borderRadius: 8,
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.3s ease",
  };

  const buttonStyle = {
    width: "100%",
    padding: 14,
    fontSize: "1.2rem",
    fontWeight: 700,
    color: "white",
    background: "linear-gradient(90deg, #0d47a1, #009688)",
    border: "none",
    borderRadius: 10,
    cursor: "pointer",
    transition: "background 0.3s ease",
  };

  const errorStyle = {
    color: "#e91e63",
    fontWeight: 600,
    marginBottom: 15,
    textAlign: "center",
  };

  const successStyle = {
    color: "#4caf50",
    fontWeight: 600,
    marginBottom: 15,
    textAlign: "center",
  };

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>Add New Salon</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Salon Name"
          value={form.name}
          onChange={handleChange}
          style={inputStyle}
          required
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          value={form.city}
          onChange={handleChange}
          style={inputStyle}
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
          style={inputStyle}
          required
        />
        <input
          type="text"
          name="contact"
          placeholder="Contact Number"
          value={form.contact}
          onChange={handleChange}
          style={inputStyle}
          required
        />
        <input
          type="text"
          name="services"
          placeholder="Services (comma separated)"
          value={form.services}
          onChange={handleChange}
          style={inputStyle}
          required
        />

        {error && <p style={errorStyle}>{error}</p>}
        {success && <p style={successStyle}>{success}</p>}

        <button
          type="submit"
          style={buttonStyle}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background =
              "linear-gradient(90deg, #009688, #0d47a1)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.background =
              "linear-gradient(90deg, #0d47a1, #009688)")
          }
        >
          Add Salon
        </button>
      </form>

      {/* Additional style for focus effects */}
      <style>{`
        input:focus {
          border-color: #009688 !important;
          box-shadow: 0 0 8px rgba(0, 150, 136, 0.6);
          background-color: #e0f2f1;
          color: #004d40;
        }
      `}</style>
    </div>
  );
};

export default AddSalon;
