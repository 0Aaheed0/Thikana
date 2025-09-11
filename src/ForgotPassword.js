import React, { useState } from 'react';
import './ForgotPassword.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [showPopup, setShowPopup] = useState(true);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    alert(`A verification link has been sent to ${email}`);
    setShowPopup(false);
  };

  const handleClose = () => {
    setShowPopup(false);
  };

  if (!showPopup) {
    return null;
  }

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <button className="close-button" onClick={handleClose}>X</button>
        <h2>Forgot Password</h2>
        <p>Please enter your email address to receive a verification link.</p>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={handleEmailChange}
            required
          />
          <button type="submit">Send Verification Link</button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
