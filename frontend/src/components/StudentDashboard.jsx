import React from 'react';
import { Link } from 'react-router-dom';
import './StudentDashboard.css';

const StudentDashboard = () => {
  return (
    <div className="student-dashboard">
      <h2 className="dashboard-title">Welcome to the Student Dashboard!</h2>
      <p className="dashboard-description">
        Here you can access available jobs, practice questions, and courses.
      </p>
      <div className="dashboard-actions">
        <div className="action-card">
          <h3>Available Jobs</h3>
          <p>Explore and apply to various job opportunities.</p>
          <Link to="/get-jobs" className="action-button">
            View Jobs
          </Link>
        </div>
        <div className="action-card">
          <h3>Practice Questions</h3>
          <p>Sharpen your skills with curated practice questions.</p>
          <Link to="/get-practice-questions" className="action-button">
            Practice Now
          </Link>
        </div>
        <div className="action-card">
          <h3>Courses</h3>
          <p>Access and manage your enrolled courses.</p>
          <Link to="/get-courses" className="action-button">
            View Courses
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;