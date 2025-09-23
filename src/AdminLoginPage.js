import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const allowedAdmins = [
   { email: "aaheedadmin@gmail.com", password: "aaheed94" },
  { email: "mirazadmin@gmail.com", password: "miraz92" },
  { email: "youshaadmin@gmail.com", password: "yousha87" },
];

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const found = allowedAdmins.find(
      (admin) => admin.email === email && admin.password === password
    );

    if (found) {
      localStorage.setItem("admin", JSON.stringify(found));
      navigate("/admin-dashboard");
    } else {
      setError("Invalid admin credentials");
    }
  };

  return (
    <div className="admin-login-overlay">
      <div className="admin-login-card">
        <h2>🔐 Admin Login</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleLogin} className="admin-login-form">
          <input
            type="email"
            placeholder="Admin Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Admin Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}
