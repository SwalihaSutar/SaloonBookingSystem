import React, { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import axios from "axios";
import "../styles/Login.css";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/salons"; // Redirect target

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8081/api/users/login", {
        username: credentials.username,
        password: credentials.password,
      });

      console.log("Login API response:", res.data);

      const token = res.data?.token;
      if (!token) {
        alert("Login failed: No token received");
        return;
      }

      // Save token and user info
      localStorage.setItem("userToken", token);
      localStorage.setItem("userRole", res.data.role);
      localStorage.setItem("username", res.data.username);

      alert("Login successful");
      navigate(from);
    } catch (err) {
      console.error("Login error:", err);
      alert("Login failed: " + (err.response?.data || err.message));
    }
  };

  return (
    <div className="login-container">
      <div className="login-form-wrapper">
        <h2 className="login-title">Login</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={credentials.username}
            onChange={handleChange}
            className="login-input"
            required
          />

          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={credentials.password}
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

          <button type="submit" className="login-button">
            Login
          </button>
        </form>

        <div className="register-link">
          Don’t have an account?{" "}
          <Link to="/register" className="register-link-highlight">
            Create an account
          </Link>{" "}
          and start booking effortlessly!
        </div>
      </div>
    </div>
  );
};

export default Login;
