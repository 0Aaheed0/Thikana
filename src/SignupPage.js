import React from 'react';
import './SignupPage.css';

function SignupPage() {
  return (
    <div className="signup-page">
      <div className="signup-container">
        <h2>Sign Up</h2>
        <form>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="username" required />
          </div>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" required />
          </div>
          <div className="input-group">
            <label htmlFor="confirm-password">Confirm Password</label>
            <input type="password" id="confirm-password" name="confirm-password" required />
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
