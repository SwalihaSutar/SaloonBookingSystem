// src/routes.js
import React from "react";
import { Routes, Route } from "react-router-dom";

// Auth pages
import Register from "./auth/Register.jsx";
import Login from "./auth/Login.jsx";

// User pages
import Home from "./pages/Home.jsx";
import SalonList from "./pages/SalonList.jsx";
import MyBookings from "./pages/MyBookings.jsx";

// Owner pages
import OwnerLogin from "./pages/OwnerLogin";
import AddSalon from "./pages/AddSalon";
import OwnerAuth from "./pages/OwnerAuth";
//import BookingForm from "./components/BookingForm.js";
import BookingPage from "./pages/BookingPage.jsx";

// Admin pages
import AdminLogin from "./pages/AdminLogin";
import AdminPanel from "./pages/AdminPanel";


// Route protection
import { ProtectedAdminRoute } from "./routes/ProtectedAdminRoute"; 

// ✅ Updated imports from 'services' folder
import HairCare from "./services/HairCare.jsx";
import SpaMassage from "./services/SpaMassage.jsx";
import SkinCareImg  from "./services/SkinCare.jsx";
import HomeCare from "./services/HomeCare.jsx";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/salons" element={<SalonList />} />
      <Route path="/bookings" element={<MyBookings />} />
       <Route path="/book/:salonId" element={<BookingPage />} />

      {/* Owner Flow */}
      <Route path="/owner-login" element={<OwnerLogin />} />
      <Route path="/owner-auth" element={<OwnerAuth />} />
      <Route path="/add-salon" element={<AddSalon />} />

      {/* Admin Routes */}
      <Route path="/login/admin" element={<AdminLogin />} />
      <Route
        path="/admin-panel"
        element={
          <ProtectedAdminRoute>
            <AdminPanel />
          </ProtectedAdminRoute>
        }
      />
      {/* ✅ Service Detail Pages */}
      <Route path="/hair-care" element={<HairCare />} />
      <Route path="/spa-massage" element={<SpaMassage />} />
      <Route path="/skin-care" element={<SkinCareImg />} />
      <Route path="/home-care" element={<HomeCare />} />
      
    </Routes>
  );
};

export default AppRoutes;
