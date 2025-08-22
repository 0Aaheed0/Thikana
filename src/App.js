import React from 'react';
import './App.css';
import logo from './logo.svg';

function App() {
  return (
    <div className="App">
      <nav className="navbar">
        <div className="navbar-logo">
          <img src={logo} alt="Thikana Logo" />
          <h1>THIKANA</h1>
        </div>
        <ul className="navbar-links">
          <li><a href="#">Home</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </nav>

      <header className="hero">
        <div className="hero-content">
          <h2>Welcome to THIKANA</h2>
          <p>Your one-stop solution for finding your dream home.</p>
          <button className="hero-button">Get Started</button>
        </div>
      </header>

      <footer className="footer">
        <p>&copy; 2025 THIKANA. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;