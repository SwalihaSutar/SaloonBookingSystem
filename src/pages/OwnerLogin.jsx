import React, { useState } from "react";
import "../styles/OwnerLogin.css";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const OwnerLogin = () => {
  const [form, setForm] = useState({
    email: "",
    userId: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleOwnerLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.email || !form.userId || !form.password) {
      setError("Email, User ID, and Password are required.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:8081/api/users/login", {
        email: form.email,
        userId: form.userId,
        password: form.password,
      });

      const token = res.data?.token;
      if (!token) {
        setError("Login failed: No token received");
        return;
      }

      // Store owner login info
      localStorage.setItem("ownerToken", token);
      localStorage.setItem("ownerRole", res.data.role || "OWNER");
      localStorage.setItem("ownerEmail", res.data.email);
      localStorage.setItem("ownerName", res.data.username);

      // Update UI immediately (for headers, nav, etc.)
      window.dispatchEvent(new Event("userChange"));

      alert(`Welcome ${res.data.username}!`);
      navigate("/add-salon");
    } catch (err) {
      setError(err.response?.data || "Invalid credentials.");
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-form-wrapper">
        <h2 className="admin-login-title">Owner Login</h2>

        <form className="admin-login-form" onSubmit={handleOwnerLogin}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="admin-login-input"
            required
          />

          <input
            type="text"
            name="userId"
            placeholder="User ID"
            value={form.userId}
            onChange={handleChange}
            className="admin-login-input"
            required
          />

          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="password-input"
              required
            />
            <span
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
              title={showPassword ? "Hide Password" : "Show Password"}
            >
              {showPassword ? "👁️" : "👁️‍🗨️"}
            </span>
          </div>

          {error && <p className="admin-login-error">{error}</p>}

          <button type="submit" className="admin-login-button">
            Login
          </button>
        </form>

        <p className="register-link-text">
          Don’t have an account?
          <Link
            to="/owner-auth"
            style={{
              color: "#0A2342",
              fontWeight: "bold",
              textDecoration: "none",
            }}
          >
            Create your account
          </Link>
          
        </p>
      </div>
    </div>
  );
};

export default OwnerLogin;
