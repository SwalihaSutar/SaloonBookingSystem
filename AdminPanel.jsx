// // src/pages/AdminPanel.jsx
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import "../styles/AdminPanel.css";

// axios.get("http://localhost:8081/api/admin/users", {
//   headers: {
//     Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
//   },
// });


// const AdminPanel = () => {
//   const [dashboardMsg, setDashboardMsg] = useState("");
//   const [salons, setSalons] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem("adminToken");
//     if (!token) {
//       navigate("/login/admin");
//       return;
//     }

//     const headers = { Authorization: `Bearer ${token}` };

//     axios
//       .get("http://localhost:8081/api/admin/dashboard", { headers })
//       .then((res) => setDashboardMsg(res.data))
//       .catch(() => setError("⚠️ Failed to load admin dashboard."));

//     axios
//       .get("http://localhost:8081/api/salons", { headers })
//       .then((res) => setSalons(res.data))
//       .catch(() => setError("⚠️ Failed to load salons."));

//     axios
//       .get("http://localhost:8081/api/users", { headers })
//       .then((res) => setUsers(res.data))
//       .catch(() => setError("⚠️ Failed to load users."));
//   }, [navigate]);

//   const handleLogout = () => {
//     localStorage.removeItem("adminToken");
//     navigate("/login/admin");
//   };

//   return (
//     <div className="admin-panel-container">
//       {/* Logout Button */}
//       <div className="admin-logout-container">
//         <button className="admin-logout-btn" onClick={handleLogout}>
//           🚪 Logout
//         </button>
//       </div>

//       <h1 className="admin-panel-title">Admin Panel</h1>
//       {error && <p className="admin-panel-error">{error}</p>}
//       {dashboardMsg && <p className="admin-panel-dashboard">{dashboardMsg}</p>}

//       <div className="admin-section">
//         <h2>📋 Salon List</h2>
//         <table>
//           <thead>
//             <tr>
//               <th>Salon Name</th>
//               <th>Location</th>
//             </tr>
//           </thead>
//           <tbody>
//             {salons.map((salon, index) => (
//               <tr key={index}>
//                 <td>{salon.name}</td>
//                 <td>{salon.location}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <div className="admin-section">
//         <h2>👤 User List</h2>
//         <table>
//           <thead>
//             <tr>
//               <th>Username</th>
//               <th>Email</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.map((user, index) => (
//               <tr key={index}>
//                 <td>{user.username}</td>
//                 <td>{user.email}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default AdminPanel;
