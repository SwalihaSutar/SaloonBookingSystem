// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import "../styles/AdminLogin.css";

// const AdminLogin = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError("");

//     try {
//       const res = await axios.post("http://localhost:8081/api/admin/login", {
//         username,
//         password,
//       });

//       // assuming backend sends { token: "...", role: "ADMIN" }
//       localStorage.setItem("adminToken", res.data.token);
//       localStorage.setItem("role", res.data.role);

//       navigate("/admin-panel");
//     } catch (err) {
//       setError(err.response?.data || "Login failed");
//     }
//   };

//   return (
//     <div className="admin-login-container">
//       <div className="admin-login-form-wrapper">
//         <h2 className="admin-login-title">Admin Login</h2>
//         {error && <p className="admin-login-error">{error}</p>}
//         <form className="admin-login-form" onSubmit={handleLogin}>
//           <input
//             type="text"
//             placeholder="Username"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             className="admin-login-input"
//             required
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="admin-login-input"
//             required
//           />
//           <button type="submit" className="admin-login-button">
//             Login
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AdminLogin;
