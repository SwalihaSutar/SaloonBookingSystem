import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8081/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// ===================== USER AUTH =====================

// User Registration
export const register = (data) => {
  return axiosInstance.post("/users/register", data);
};

// User Login
export const login = (credentials) => {
  return axiosInstance.post("/users/login", credentials);
};

// Send OTP
export const sendOtp = (data) => {
  return axiosInstance.post("/otp/send", data);
};

// Verify OTP
export const verifyOtp = (data) => {
  return axiosInstance.post("/otp/validate", data); // Ensure backend path is correct
};

// ===================== OWNER AUTH =====================

// Owner Registration
export const registerOwner = (data) => {
  return axiosInstance.post("/owners/register", data);
};

// Owner Login
export const loginOwner = (credentials) => {
  return axiosInstance.post("/owners/login", credentials);
};

export default axiosInstance;
