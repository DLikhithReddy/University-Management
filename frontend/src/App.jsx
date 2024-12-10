import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import StudentDashboard from './components/StudentDashboard';
import Navbar from './components/Navbar';
import CreateJob from './components/CreateJob';
import CreatePracticeQuestion from './components/CreatePracticeQuestion';
import GetJobs from './components/GetJobs';
import GetPracticeQuestions from './components/GetPracticeQuestions';
import BlogListing from './components/BlogListing';
import CreateBlog from './components/CreateBlog';
import BlogDetail from './components/BlogDetail';
import GetCourses from './components/GetCourses';
import CourseManagement from './components/CourseManagement';

const App = () => {
  const [userRole, setUserRole] = useState(null);
  const handleLogin = (role) => {
    setUserRole(role);
  };
  const handleLogout = () => {
    setUserRole(null);
  };

  return (
    <Router>
      {/* Only render Navbar if the user is logged in */}
      {userRole && <Navbar userRole={userRole} onLogout={handleLogout} />}

      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        {/* If userRole is admin */}
        {userRole === 'admin' && (
          <>
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/create-job" element={<CreateJob />} />
            <Route path="/create-practice-question" element={<CreatePracticeQuestion />} />
            <Route path='/course-actions' element={<CourseManagement />} />
          </>
        )}

        {/*If userRole is student */}
        {userRole === 'student' && (
          <>
            <Route path="/student-dashboard" element={<StudentDashboard />} />
            <Route path="/get-jobs" element={<GetJobs />} />
            <Route path="/get-practice-questions" element={<GetPracticeQuestions />} />
            <Route path="/blogs" element={<BlogListing />} />
            <Route path="/create-blog" element={<CreateBlog />} />
            <Route path="/blogs/:id" element={<BlogDetail />} />
            <Route path="/get-courses" element={<GetCourses />} />
          </>
        )}

        <Route
          path="*"
          element={userRole ? <Navigate to={`/${userRole}-dashboard`} /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
};

export default App;