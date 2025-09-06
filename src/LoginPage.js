import React, { useState } from 'react';
import './LoginPage.css';
import ForgotPassword from './ForgotPassword';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function LoginPage() {
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleForgotPasswordClick = () => {
    setShowForgotPassword(true);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Login</h2>
        <form>
          <div className="input-group">
            <label htmlFor="user-name">Username</label>
            <input type="text" id="username" name="username" required />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <div className="password-wrapper">
              <input type={showPassword ? 'text' : 'password'} id="password" name="password" required />
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
