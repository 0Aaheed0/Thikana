import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import logo from './logo.svg';

import ArticleSlider from './ArticleSlider';
import DataSpecialists from './DataSpecialists';
import Organizations from './Organizations';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import CaseArchive from './CaseArchive';

function HomePage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="App">
      <nav className="navbar">
        <div className="navbar-left">
          <button className="menu-button" onClick={toggleSidebar}>
            <i className="fas fa-bars"></i>
          </button>
          <img src={logo} className="App-logo" alt="Thikana Logo" />
          <h1 className="navbar-title">THIKANA</h1>
        </div>
        <div className="navbar-right">
          <button className="account-button" onClick={toggleModal}>
            <i className="fas fa-user-circle"></i>
          </button>
        </div>
      </nav>

      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <ul>
          {isSidebarOpen && <button className="close-sidebar-button" onClick={toggleSidebar}>&times;</button>}
          <li><a href="#home"><i className="fas fa-home"></i> Home</a></li>
          <li><Link to="/case-archive"><i className="fas fa-archive"></i> Case Archive</Link></li>
          <li><a href="#report-missing"><i className="fas fa-user-slash"></i> Report Missing</a></li>
          <li><a href="#report-accident"><i className="fas fa-car-crash"></i> Report Accident</a></li>
          <li><a href="#help-board"><i className="fas fa-hands-helping"></i> Help Board</a></li>
          <li><Link to="/login"><i className="fas fa-sign-in-alt"></i> Login</Link></li>
          <li><Link to="/signup"><i className="fas fa-user-plus"></i> Sign Up</Link></li>
        </ul>
      </div>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-button" onClick={toggleModal}>&times;</span>
            <p>Already have an account?</p>
            <Link to="/login"><button className="modal-button">Login</button></Link>
            <p>Don't have an account?</p>
            <Link to="/signup"><button className="modal-button">Sign Up</button></Link>
          </div>
        </div>
      )}

      <header className="hero">
        <div className="hero-content">
          <h2 className="welcome-text">Welcome to THIKANA</h2>
          <p className="description-text">Your trusted platform for reporting and tracking incidents. We are here to help you make a difference.</p>
          <div className="report-options">
            <button className="report-button">Report Road Accident</button>
            <button className="report-button">Report Missing</button>
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
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/case-archive" element={<CaseArchive />} />
        <Route path="/case-archive/:caseType" element={<CaseArchive />} />
      </Routes>
    </Router>
  );
}

export default App;
