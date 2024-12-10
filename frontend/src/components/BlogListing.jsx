import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './BlogListing.css';

const BlogListing = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/blogs');
        setBlogs(response.data);
      } catch (err) {
        console.error('Error fetching blogs:', err);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="blog-listing-container">
      <h1 className="blog-listing-title">Blog Listings</h1>
      <div style={{ marginBottom: '20px' }}>
        <Link to="/create-blog">
          <button className="create-blog-button">Create Blog</button>
        </Link>
      </div>

      {blogs.length === 0 ? (
        <p>No blogs available</p>
      ) : (
        <ul className="blog-listing">
          {blogs.map((blog) => (
            <li key={blog._id}>
              <Link to={`/blogs/${blog._id}`}>
                <h2>{blog.title}</h2>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BlogListing;