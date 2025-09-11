import React, { useState } from 'react';
import './LoginPage.css';
import ForgotPassword from './ForgotPassword';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios';

function LoginPage() {
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  const handleForgotPasswordClick = () => {
    setShowForgotPassword(true);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/login`, formData);
      localStorage.setItem('token', res.data.token);
      window.location.href = '/';
    } catch (err) {
      console.error('Login error:', err);
      if (err.response) {
        setError(err.response.data.message);
      } else if (err.request) {
        setError('No response from server. Please check your network connection.');
      } else {
        setError('Something went wrong. Please try again later.');
      }
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          {error && <p className="error">{error}</p>}
          <div className="input-group">
            <label htmlFor="user-name">Username</label>
            <input type="text" id="username" name="username" onChange={handleChange} required />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <div className="password-wrapper">
              <input type={showPassword ? 'text' : 'password'} id="password" name="password" onChange={handleChange} required />
              <button type="button" onClick={togglePasswordVisibility} className="toggle-password">
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
          <button type="submit" className="login-button">Login</button>
        </form>
        <div className="extra-links">
          <button onClick={handleForgotPasswordClick} className="link-button">Forgot Password?</button>
          <span> | </span>
          <a href="/signup">Create an account</a>
        </div>
      </div>
      {showForgotPassword && <ForgotPassword />}
    </div>
  );
}

export default LoginPage;
