import React from 'react';
import { Link } from 'react-router-dom';
import './AdminDashboard.css';

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <h2 className="dashboard-title">Welcome to the Admin Dashboard!</h2>
      <p className="dashboard-description">
        Here you can manage jobs, practice questions, and courses.
      </p>
      <div className="dashboard-actions">
        <div className="action-card">
          <h3>Manage Jobs</h3>
          <p>Create, update, or delete job listings.</p>
          <Link to="/create-job" className="action-button">
            Go to Jobs
          </Link>
        </div>
        <div className="action-card">
          <h3>Practice Questions</h3>
          <p>Add and manage practice questions for students.</p>
          <Link to="/create-practice-question" className="action-button">
            Manage Questions
          </Link>
        </div>
        <div className="action-card">
          <h3>Course Management</h3>
          <p>Update and organize course offerings.</p>
          <Link to="/course-actions" className="action-button">
            Manage Courses
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;