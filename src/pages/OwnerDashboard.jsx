import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "./OwnerDashboard.css";

const OwnerDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      <div className="bg-dark text-white p-3" style={{ width: "250px" }}>
        <h4 className="text-center mb-4">Owner Dashboard</h4>
        <ul className="nav flex-column">
          <li className="nav-item mb-2">
            <Link to="/owner/add-salon" className="nav-link text-white">
              🏢 Add Salon
            </Link>
          </li>
          <li className="nav-item mb-2">
            <Link to="/owner/services" className="nav-link text-white">
              💈 Manage Services
            </Link>
          </li>
          <li className="nav-item mb-2">
            <Link to="/owner/bookings" className="nav-link text-white">
              📆 View Bookings
            </Link>
          </li>
          <li className="nav-item mt-3">
            <button onClick={handleLogout} className="btn btn-danger w-100">
              🚪 Logout
            </button>
          </li>
        </ul>
      </div>

      <div className="flex-grow-1 p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default OwnerDashboard;
