import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from '../assets/logo.png'

const Navbar = ({ userRole, onLogout }) => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/" className="logo-link">
          <img src={logo} alt="UniPortal Logo" className="navbar-logo-img" />
          </Link>
        </div>
        <ul className="navbar-menu">
          {userRole === 'admin' ? (
            <>
              <li>
                <Link to="/admin-dashboard">Dashboard</Link>
              </li>
              <li>
                <Link to="/create-job">Job Postings</Link>
              </li>
              <li>
                <Link to="/create-practice-question">Practice Questions</Link>
              </li>
              <li>
                <Link to="/course-actions">Course Management</Link>
              </li>
            </>
          ) : userRole === 'student' ? (
            <>
              <li>
                <Link to="/student-dashboard">Dashboard</Link>
              </li>
              <li>
                <Link to="/get-jobs">Jobs</Link>
              </li>
              <li>
                <Link to="/get-practice-questions">Practice Questions</Link>
              </li>
              <li>
                <Link to="/blogs">Blogs</Link>
              </li>
              <li>
                <Link to="/get-courses">Courses</Link>
              </li>
            </>
          ) : null}
          <li>
            <button className="logout-button" onClick={onLogout}>
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
