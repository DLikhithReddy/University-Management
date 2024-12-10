import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './GetJobs.css';

const GetJobs = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/student/jobs');
        setJobs(response.data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="jobs-container">
      <h1 className="jobs-title">Available Jobs</h1>
      {jobs.length === 0 ? (
        <p className="no-jobs-message">No jobs available.</p>
      ) : (
        <div className="jobs-list">
          {jobs.map((job) => (
            <div key={job._id} className="job-card">
              <div className="job-card-header">
                <h2 className="job-title">{job.title}</h2>
                <p className="job-location">{job.location}</p>
              </div>
              <p className="job-description">{job.description}</p>
              <div className="job-info">
                <p><strong>Tags:</strong> {job.tags.join(', ')}</p>
                <p><strong>Job Type:</strong> {job.jobType}</p>
                <a href={job.applyLink} className="apply-link" target="_blank" rel="noopener noreferrer">Apply here</a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GetJobs;