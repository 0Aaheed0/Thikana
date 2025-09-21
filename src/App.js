import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import logo from './logo.svg';
import { useAuth } from './AuthContext';

import ArticleSlider from './ArticleSlider';
import DataSpecialists from './DataSpecialists';
import Organizations from './Organizations';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import CaseArchive from './CaseArchive';
import HelpBoard from './HelpBoard';
import ReportMissing from './ReportMissing';
import ReportAccident from './ReportAccident';

// Account Info Component
function AccountInfo() {
  const { user, logout } = useAuth();

  return (
    <div className="account-info">
      <p>Logged in as {user.username}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

// Navbar Component
function Navbar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAccountInfoOpen, setIsAccountInfoOpen] = useState(false);
  const { user } = useAuth();

  const toggleModal = () => setIsModalOpen(!isModalOpen);
  const toggleAccountInfo = () => setIsAccountInfoOpen(!isAccountInfoOpen);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src={logo} className="App-logo" alt="Thikana Logo" />
        <h1 className="navbar-title">THIKANA</h1>
      </div>

      {/* ✅ NEW: center container for nav links */}
      <div className="navbar-center">
        <Link to="/" className="navbar-link">
          <i className="fas fa-home"></i> Home
        </Link>
        <Link to="/case-archive" className="navbar-link">
          <i className="fas fa-archive"></i> Case Archive
        </Link>
        <Link to="/report-missing" className="navbar-link">
          <i className="fas fa-user-slash"></i> Report Missing
        </Link>
        <Link to="/report-accident" className="navbar-link">
          <i className="fas fa-car-crash"></i> Report Accident
        </Link>
        <Link to="/help-board" className="navbar-link">
          <i className="fas fa-hands-helping"></i> Help Board
        </Link>
      </div>

      <div className="navbar-right">
        {user ? (
          <div className="account-menu">
            <button className="account-button" onClick={toggleAccountInfo}>
              <i className="fas fa-user-circle"></i>
            </button>
            {isAccountInfoOpen && <AccountInfo />}
          </div>
        ) : (
          <div className="account-menu">
            <button className="account-button" onClick={toggleModal}>
              <i className="fas fa-user-plus"></i>
            </button>
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-button" onClick={toggleModal}>
              &times;
            </span>
            <p>Already have an account?</p>
            <Link to="/login" onClick={toggleModal}>
              <button className="modal-button">Login</button>
            </Link>
            <p>Don't have an account?</p>
            <Link to="/signup" onClick={toggleModal}>
              <button className="modal-button">Sign Up</button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

function HomePage() {
  return (
    <div className="App">
      <header className="hero">
        <div className="hero-content">
          <h2 className="welcome-text">Welcome to THIKANA</h2>
          <p className="description-text">
            Your trusted platform for reporting and tracking incidents. We are here to help you make a difference.
          </p>
          <div className="report-options">
            <Link to="/report-accident">
              <button className="report-button">Report Road Accident</button>
            </Link>
            <Link to="/report-missing">
              <button className="report-button">Report Missing</button>
            </Link>
          </div>
        </div>
      </header>

      <ArticleSlider />

      <section className="statistics-section">
        <div className="statistic-item">
          <Link to="/case-archive">
            <h3>Total Cases</h3>
            <p>1234</p>
          </Link>
        </div>
        <div className="statistic-item">
          <h3>Reports</h3>
          <p>567</p>
        </div>
        <div className="statistic-item">
          <h3>Road Accidents</h3>
          <p>89</p>
        </div>
        <div className="statistic-item">
          <h3>Resolved Cases</h3>
          <p>1000</p>
        </div>
        <div className="statistic-item">
          <Link to="/help-board">
            <h3>Help Board</h3>
            <p>Get Help</p>
          </Link>
        </div>
      </section>

      <DataSpecialists />
      <Organizations />

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-column">
            <p>Helpline: +880 2 12345678 </p>
            <p>Contact: thikana@gmail.com</p>
            <p>Emergency: 999</p>
            <p>Press: somoytv@gmail.com</p>
          </div>
          <div className="footer-column">
            <p>Address: 123 Love Road, Tejgaon, Dhaka</p>
            <p>Fax: +1-212-9876543</p>
            <p>Legal: legal@thikana.com</p>
            <p>Careers: careers@thikana.com</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/case-archive" element={<CaseArchive />} />
        <Route path="/case-archive/:caseType" element={<CaseArchive />} />
        <Route path="/help-board" element={<HelpBoard />} />
        <Route path="/report-missing" element={<ReportMissing />} />
        <Route path="/report-accident" element={<ReportAccident />} />
      </Routes>
    </Router>
  );
}

export default App;
