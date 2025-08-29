import React, { useState } from 'react';
import './LoginPage.css';
import ForgotPassword from './ForgotPassword';

function LoginPage() {
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const handleForgotPasswordClick = () => {
    setShowForgotPassword(true);
  };

  const handleForgotPasswordClose = () => {
    setShowForgotPassword(false);
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
            <input type="password" id="password" name="password" required />
          </div>
          <button type="submit" className="login-button">Login</button>
        </form>
        <div className="extra-links">
          <a href="#" onClick={handleForgotPasswordClick}>Forgot Password?</a>
          <span> | </span>
          <a href="/signup">Create an account</a>
        </div>
      </div>
      {showForgotPassword && <ForgotPassword onForgotPasswordClose={handleForgotPasswordClose} />}
    </div>
  );
}

export default LoginPage;
