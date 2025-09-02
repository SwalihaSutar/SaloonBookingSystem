import React, { useState } from "react";
import { sendOtp, verifyOtp, register } from "../services/authService";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Register.css";
import OwnerLogin from "../pages/OwnerLogin";

const Register = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    otp: "",

 

  });




  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validateInputs = () => {
    const newErrors = {};
    if (!form.username.trim()) newErrors.username = "Username is required.";
    if (!form.email.trim()) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = "Invalid email format.";
    if (!form.password.trim()) newErrors.password = "Password is required.";
    else if (form.password.length < 6)
      newErrors.password = "Password must be at least 6 characters.";
    return newErrors;
  };

  const handleSendOtp = async () => {
    const newErrors = validateInputs();
    if (!form.email || newErrors.email) {
      setErrors({ ...errors, ...newErrors });
      return;
    }

    try {
      await sendOtp({ email: form.email });
      setOtpSent(true);
      alert("OTP sent successfully to your email.");
    } catch (error) {
      alert("Failed to send OTP: " + (error.response?.data || error.message));
    }
  };

  const handleVerifyOtp = async () => {
    if (!form.otp) {
      setErrors({ ...errors, otp: "Please enter the OTP." });
      return;
    }

    try {
      await verifyOtp({ email: form.email, otp: form.otp });
      setOtpVerified(true);
      alert("OTP verified successfully.");
    } catch (error) {
      alert(
        "OTP verification failed: " + (error.response?.data || error.message)
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateInputs();
    if (Object.keys(newErrors).length > 0 || !otpVerified) {
      if (!otpVerified) {
        alert("Please verify OTP before registering.");
      }
      setErrors(newErrors);
      return;
    }

    try {
      await register(form);
      alert("Registered successfully!");
      navigate("/login");
    } catch (error) {
      alert("Registration failed: " + (error.response?.data || error.message));
    }
  };

  return (
    <div className="register-container">
      <div className="register-form-wrapper">
        <h2 className="register-title">Create Your Account</h2>
        <form className="register-form" onSubmit={handleSubmit}>
          <input
            className="input-style"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
          />
          {errors.username && <p className="error-text">{errors.username}</p>}

          <input
            className="input-style"
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />
          {errors.email && <p className="error-text">{errors.email}</p>}

          <button
            type="button"
            className="btn-secondary"
            onClick={handleSendOtp}
            disabled={otpSent}
          >
            {otpSent ? "OTP Sent" : "Send OTP"}
          </button>

          {otpSent && (
            <>
              <input
                className="input-style"
                name="otp"
                placeholder="Enter OTP"
                value={form.otp}
                onChange={handleChange}
              />
              {errors.otp && <p className="error-text">{errors.otp}</p>}

              <button
                type="button"
                className="btn-secondary"
                onClick={handleVerifyOtp}
                disabled={otpVerified}
              >
                {otpVerified ? "OTP Verified" : "Verify OTP"}
              </button>
            </>
          )}

          <input
            className="input-style"
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
          />
          {errors.password && <p className="error-text">{errors.password}</p>}

          <button type="submit" className="btn-primary">
            Register
          </button>

          <div className="register-link">
            Already have an account?
            <Link to="/login" className="register-link-highlight">
              Login here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;