import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './BlogDetail.css'; // Import your CSS file

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [comment, setComment] = useState('');

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/blogs/${id}`);
        setBlog(response.data);
      } catch (err) {
        console.error('Error fetching blog:', err);
      }
    };

    fetchBlog();
  }, [id]);

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleAddComment = async () => {
    try {
      const response = await axios.post(`http://localhost:5000/api/blogs/${id}/comments`, { comment });
      setBlog(response.data);
      setComment('');
    } catch (err) {
      console.error('Error adding comment:', err);
    }
  };

  return (
    <div className="blog-detail-container">
      {blog ? (
        <>
          <h1 className="blog-title">{blog.title}</h1>
          {blog.imageUrl && (
            <div className="blog-image-container">
              <img
                src={`http://localhost:5000${blog.imageUrl}`}
                alt="Blog Cover"
                className="blog-image"
              />
            </div>
          )}

          <div className="blog-sections">
            {blog.sections.map((section, index) => (
              <div className="blog-section" key={index}>
                <h3 className="section-title">{section.sectionTitle}</h3>
                <div
                  className="section-content"
                  dangerouslySetInnerHTML={{ __html: section.sectionContent }}
                />
              </div>
            ))}
          </div>

          <div className="comment-section">
            <h3>Comments</h3>
            <ul className="comments-list">
              {blog.comments.map((comment, index) => (
                <li className="comment" key={index}>
                  {comment}
                </li>
              ))}
            </ul>

            <textarea
              className="comment-input"
              value={comment}
              onChange={handleCommentChange}
              placeholder="Add a comment"
            ></textarea>
            <button
              className="comment-submit-btn"
              onClick={handleAddComment}
            >
              Post Comment
            </button>
          </div>
        </>
      ) : (
        <p className="loading-text">Loading blog...</p>
      )}
    </div>
  );
};

export default BlogDetail;