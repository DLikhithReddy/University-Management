import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CreateJob.css';

const CreateJob = () => {
  const navigate = useNavigate();
  const [jobDetails, setJobDetails] = useState({
    title: '',
    description: '',
    location: '',
    tags: '',
    jobType: 'Full-time',
    applyLink: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const tagsArray = jobDetails.tags.split(',').map((tag) => tag.trim());
      await axios.post('http://localhost:5000/api/admin/jobs', {
        ...jobDetails,
        tags: tagsArray,
      });
      navigate('/admin-dashboard');
    } catch (err) {
      console.error('Error posting job:', err);
    }
  };

  return (
    <div className="create-job-container">
      <h1 className="create-job-title">Post a New Job</h1>
      <form className="create-job-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Company Name</label>
          <input
            id="title"
            type="text"
            name="title"
            placeholder="Enter company name"
            value={jobDetails.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Job Description</label>
          <textarea
            id="description"
            name="description"
            placeholder="Enter job description"
            value={jobDetails.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            id="location"
            type="text"
            name="location"
            placeholder="Enter job location"
            value={jobDetails.location}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="tags">Tags</label>
          <input
            id="tags"
            type="text"
            name="tags"
            placeholder="e.g., React, Node.js, MongoDB"
            value={jobDetails.tags}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="jobType">Job Type</label>
          <select
            id="jobType"
            name="jobType"
            value={jobDetails.jobType}
            onChange={handleChange}
            required
          >
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="applyLink">Apply Link</label>
          <input
            id="applyLink"
            type="url"
            name="applyLink"
            placeholder="Enter apply link"
            value={jobDetails.applyLink}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="submit-button">
          Post Job
        </button>
      </form>
    </div>
  );
};

export default CreateJob;