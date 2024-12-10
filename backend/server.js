const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

// Import Routes
const userRoutes = require('./routes/userRoutes');
const blogRoutes = require('./routes/blogRoutes');
const createpracticeQuestionRoutes = require('./routes/admin/createPracticeQuestionRoutes');
const getPracticeQuestionRoutes = require('./routes/student/getPracticeQuestionsRoutes');
const createJobRoutes = require('./routes/admin/createJobRoutes');
const getJobsRoutes = require('./routes/student/getJobsRoutes');
const getCourseRoutes = require('./routes/student/getCourseRoutes');
const courseActionsRoutes = require('./routes/admin/courseActionsRoutes');

const app = express();
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB connection to atlas database
mongoose.connect('mongodb+srv://veda:0OLQQkrdGRL9Ubow@cluster0.lac3b.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Database connected to atlas'))
  .catch((err) => console.log('Database connection error:', err));

// Routes setup
app.use('/api/users', userRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/admin/practice', createpracticeQuestionRoutes);
app.use('/api/student/practice', getPracticeQuestionRoutes);
app.use('/api/admin/jobs', createJobRoutes);
app.use('/api/student/jobs', getJobsRoutes);
app.use('/api/student/courses',getCourseRoutes);
app.use('/api/admin/courses',courseActionsRoutes);

app.use((req, res) => {
  res.status(404).send('Not Found');
});

app.listen(5000, () => {
  console.log(`Server running on port 5000`);
});
