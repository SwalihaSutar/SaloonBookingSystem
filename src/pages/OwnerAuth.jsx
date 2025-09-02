import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerOwner, sendOtp, verifyOtp } from "../services/authService";
import "../styles/OwnerAuth.css";

const OwnerAuth = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    otp: "",
  });
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSendOtp = async () => {
    if (!form.email.trim()) {
      setError("Email is required to send OTP.");
      return;
    }
    try {
      await sendOtp({ email: form.email });
      setOtpSent(true);
      alert("OTP sent successfully to your email.");
    } catch (err) {
      setError(err.response?.data || "Failed to send OTP");
    }
  };

  const handleVerifyOtp = async () => {
    if (!form.otp.trim()) {
      setError("Please enter the OTP.");
      return;
    }
    try {
      await verifyOtp({ email: form.email, otp: form.otp });
      setOtpVerified(true);
      alert("OTP verified successfully.");
    } catch (err) {
      setError(err.response?.data || "OTP verification failed");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (!otpVerified) {
        setError("Please verify OTP before registering.");
        return;
      }
      await registerOwner(form);
      alert("Owner registered successfully!");
      navigate("/owner-login"); // redirect to login page after successful registration
    } catch (err) {
      setError(err.response?.data || "Something went wrong");
    }
  };

  return (
    <div className="owner-auth-container">
      <div className="owner-auth-form-wrapper">
        <h2 className="owner-auth-title">Owner Registration</h2>
        {error && <p className="owner-auth-error">{error}</p>}

        <form className="owner-auth-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            className="owner-auth-input"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="owner-auth-input"
            required
          />

          <button
            type="button"
            className="owner-auth-button secondary"
            onClick={handleSendOtp}
            disabled={otpSent}
          >
            {otpSent ? "OTP Sent" : "Send OTP"}
          </button>

          {otpSent && (
            <>
              <input
                type="text"
                name="otp"
                placeholder="Enter OTP"
                value={form.otp}
                onChange={handleChange}
                className="owner-auth-input"
              />

              <button
                type="button"
                className="owner-auth-button secondary"
                onClick={handleVerifyOtp}
                disabled={otpVerified}
              >
                {otpVerified ? "OTP Verified" : "Verify OTP"}
              </button>
            </>
          )}

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="owner-auth-input"
            required
          />

          <button type="submit" className="owner-auth-button">
            Register
          </button>
        </form>

        <p className="owner-auth-toggle">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/owner-login")}
            style={{ cursor: "pointer", textDecoration: "underline" }}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default OwnerAuth;
