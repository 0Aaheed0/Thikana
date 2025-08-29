import React from 'react';
import './ForgotPassword.css';

const ForgotPassword = ({ onForgotPasswordClose }) => {
  const handleForgotPasswordSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    console.log(`Sending verification code to ${email}`);
    // Here you would typically handle sending the verification code
    onForgotPasswordClose();
  };

  return (
    <div className="forgot-password-popup">
      <div className="forgot-password-popup-content">
        <h2>Forgot Password</h2>
        <form onSubmit={handleForgotPasswordSubmit}>
          <label htmlFor="email">Enter your email:</label>
          <input type="email" id="email" name="email" required />
          <button type="submit">Send Verification Code</button>
        </form>
        <button className="close-button" onClick={onForgotPasswordClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default ForgotPassword;
