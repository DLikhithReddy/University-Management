const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  sections: [
    {
      sectionTitle: { type: String, required: true },
      sectionContent: { type: String, required: true },
    },
  ],
  imageUrl: { type: String, required: false },
  comments: [
    { type: String },
  ],
}, { timestamps: true });

const Blog = mongoose.model('Blog', BlogSchema);

module.exports = Blog;