// SignupPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignupPage.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { useAuth } from "./AuthContext";

function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword((prev) => !prev);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
      setError("All fields are required");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (formData.username.startsWith(" ")) {
      setError("Username cannot start with a space");
      return;
    }
    if (!formData.email.endsWith("gmail.com")) {
      setError("Email must be a gmail address");
      return;
    }

    try {
      const res = await axios.post(`${API_URL}/api/signup`, {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      // ✅ Save token + user with profilePhoto
      login(res.data.token, res.data.user);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/");
    } catch (err) {
      console.error("Signup error:", err);
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else if (err.request) {
        setError("No response from server. Please check your network connection.");
      } else {
        setError("Something went wrong. Please try again later.");
      }
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          {error && <p className="error">{error}</p>}
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} required />
          </div>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <div className="password-wrapper">
              <input type={showPassword ? "text" : "password"} id="password" name="password" value={formData.password} onChange={handleChange} required />
              <button type="button" onClick={togglePasswordVisibility} className="toggle-password">
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
          <div className="input-group">
            <label htmlFor="confirm-password">Confirm Password</label>
            <div className="password-wrapper">
              <input type={showConfirmPassword ? "text" : "password"} id="confirm-password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
              <button type="button" onClick={toggleConfirmPasswordVisibility} className="toggle-password">
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
          <button type="submit" className="signup-button">Sign Up</button>
        </form>
        <div className="extra-links">
          <a href="/login">Already have an account? Login</a>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
