import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CreateBlog.css';

const CreateBlog = () => {
  const [blogData, setBlogData] = useState({
    title: '',
    sections: [{ sectionTitle: '', sectionContent: '' }],
    imageUrl: '',
  });

  const navigate = useNavigate();

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const updatedSections = [...blogData.sections];
    updatedSections[index][name] = value;
    setBlogData({ ...blogData, sections: updatedSections });
  };

  const handleEditorChange = (content, index) => {
    const updatedSections = [...blogData.sections];
    updatedSections[index].sectionContent = content;
    setBlogData({ ...blogData, sections: updatedSections });
  };

  const handleAddSection = () => {
    setBlogData({
      ...blogData,
      sections: [...blogData.sections, { sectionTitle: '', sectionContent: '' }],
    });
  };

  const handleRemoveSection = (index) => {
    const updatedSections = [...blogData.sections];
    updatedSections.splice(index, 1);
    setBlogData({ ...blogData, sections: updatedSections });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', blogData.title);
    formData.append('sections', JSON.stringify(blogData.sections));

    if (blogData.imageUrl) {
      formData.append('image', blogData.imageUrl);
    }

    try {
      const response = await axios.post('http://localhost:5000/api/blogs', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log('Blog created successfully:', response.data);
      navigate('/blogs');
    } catch (error) {
      console.error('Error creating blog:', error);
      alert('Failed to create blog');
    }
  };

  return (
    <div className="create-blog-container">
      <h1 className="create-blog-title">Create a New Blog</h1>
      <form className="create-blog-form" onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="text"
            name="title"
            value={blogData.title}
            onChange={(e) => setBlogData({ ...blogData, title: e.target.value })}
            placeholder="Blog Title"
            required
            className="input-field"
          />
        </div>

        <div className="sections-container">
          <label className="section-label">Sections</label>
          {blogData.sections.map((section, index) => (
            <div key={index} className="input-group">
              <input
                type="text"
                name="sectionTitle"
                value={section.sectionTitle}
                onChange={(e) => handleChange(e, index)}
                placeholder={`Section ${index + 1} Title`}
                required
                className="input-field"
              />
              <ReactQuill
                value={section.sectionContent}
                onChange={(content) => handleEditorChange(content, index)}
                modules={CreateBlog.modules}
                theme="snow"
                placeholder={`Write your section ${index + 1} content here`}
                className="quill-editor"
              />
              <button
                type="button"
                onClick={() => handleRemoveSection(index)}
                className="remove-section-btn"
              >
                Remove Section
              </button>
            </div>
          ))}
          <button type="button" onClick={handleAddSection} className="add-section-btn">
            Add Section
          </button>
        </div>

        <div className="input-group">
          <label className="section-label">Upload Image (Optional)</label>
          <input
            type="file"
            name="imageUrl"
            onChange={(e) => setBlogData({ ...blogData, imageUrl: e.target.files[0] })}
            className="file-upload"
          />
        </div>

        <button type="submit" className="submit-btn">
          Create Blog
        </button>
      </form>
    </div>
  );
};

CreateBlog.modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['bold', 'italic', 'underline'],
    [{ align: [] }],
    ['link'],
    ['image'],
    ['blockquote'],
    ['code-block'],
  ],
};

export default CreateBlog;