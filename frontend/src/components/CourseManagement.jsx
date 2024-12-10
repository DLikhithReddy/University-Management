import React, { useState } from "react";
import axios from "axios";
import "./CourseManagement.css"; // Ensure the correct path to the CSS file

const CourseManagement = () => {
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState({
    course_code: "",
    courses: "",
    year: "",
    sem: "",
    credits: "",
    course_description: "",
    pname: "",
    plink: "",
  });
  const [deleteCode, setDeleteCode] = useState("");
  const [updateCourseCode, setUpdateCourseCode] = useState("");
  const [updateCourse, setUpdateCourse] = useState({
    courses: "",
    year: "",
    sem: "",
    credits: "",
    course_description: "",
    pname: "",
    plink: "",
  });

  const fetchCourses = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/admin/courses");
      setCourses(response.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const handleAddCourse = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/admin/courses", newCourse);
      setCourses([...courses, response.data]);
      setNewCourse({
        course_code: "",
        courses: "",
        year: "",
        sem: "",
        credits: "",
        course_description: "",
        pname: "",
        plink: "",
      });
    } catch (error) {
      console.error("Error adding course:", error);
    }
  };

  const handleUpdateCourse = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/api/admin/courses/${updateCourseCode}`, updateCourse);
      setCourses(courses.map((course) => (course.course_code === updateCourseCode ? response.data : course)));
      setUpdateCourseCode("");
      setUpdateCourse({
        courses: "",
        year: "",
        sem: "",
        credits: "",
        course_description: "",
        pname: "",
        plink: "",
      });
    } catch (error) {
      console.error("Error updating course:", error);
    }
  };

  const handleDeleteCourse = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/courses/${deleteCode}`);
      setCourses(courses.filter((course) => course.course_code !== deleteCode));
      setDeleteCode("");
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  const handleInputChange = (e, targetState, setTargetState) => {
    const { name, value } = e.target;
    setTargetState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="course-management-container">
      <h1 className="course-management-title">Course Management</h1>

      {/* Add Course Form */}
      <form className="course-management-form" onSubmit={handleAddCourse}>
        <h2>Add New Course</h2>
        <div className="form-group">
          <label htmlFor="course_code">Course Code</label>
          <input
            id="course_code"
            type="text"
            name="course_code"
            value={newCourse.course_code}
            onChange={(e) => handleInputChange(e, newCourse, setNewCourse)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="courses">Course Name</label>
          <input
            id="courses"
            type="text"
            name="courses"
            value={newCourse.courses}
            onChange={(e) => handleInputChange(e, newCourse, setNewCourse)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="year">Year</label>
          <input
            id="year"
            type="number"
            name="year"
            value={newCourse.year}
            onChange={(e) => handleInputChange(e, newCourse, setNewCourse)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="sem">Semester</label>
          <input
            id="sem"
            type="number"
            name="sem"
            value={newCourse.sem}
            onChange={(e) => handleInputChange(e, newCourse, setNewCourse)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="credits">Credits</label>
          <input
            id="credits"
            type="number"
            name="credits"
            value={newCourse.credits}
            onChange={(e) => handleInputChange(e, newCourse, setNewCourse)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="course_description">Course Description</label>
          <textarea
            id="course_description"
            name="course_description"
            value={newCourse.course_description}
            onChange={(e) => handleInputChange(e, newCourse, setNewCourse)}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="pname">Professor Name</label>
          <input
            id="pname"
            type="text"
            name="pname"
            value={newCourse.pname}
            onChange={(e) => handleInputChange(e, newCourse, setNewCourse)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="plink">Practice Link</label>
          <input
            id="plink"
            type="url"
            name="plink"
            value={newCourse.plink}
            onChange={(e) => handleInputChange(e, newCourse, setNewCourse)}
            required
          />
        </div>
        <button type="submit">Add Course</button>
      </form>

      <hr />

      {/* Update Course Form */}
      <form className="course-management-form">
        <h2>Update Course</h2>
        <div className="form-group">
          <label htmlFor="update_code">Course Code to Update</label>
          <input
            id="update_code"
            type="text"
            value={updateCourseCode}
            onChange={(e) => setUpdateCourseCode(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="updated_courses">Updated Course Name</label>
          <input
            id="updated_courses"
            type="text"
            name="courses"
            value={updateCourse.courses}
            onChange={(e) => handleInputChange(e, updateCourse, setUpdateCourse)}
          />
        </div>
        {/* Add other fields for update as needed */}
        <button type="button" onClick={handleUpdateCourse}>
          Update Course
        </button>
      </form>

      <hr />

      {/* Delete Course */}
      <form className="course-management-form">
        <h2>Delete Course</h2>
        <div className="form-group">
          <label htmlFor="delete_code">Course Code to Delete</label>
          <input
            id="delete_code"
            type="text"
            value={deleteCode}
            onChange={(e) => setDeleteCode(e.target.value)}
          />
        </div>
        <button type="button" onClick={handleDeleteCourse}>
          Delete Course
        </button>
      </form>

      <hr />

      {/* List of Courses */}
      <h2>All Courses</h2>
      <ul className="course-list">
        {courses.map((course) => (
          <li key={course.course_code}>
            <strong>{course.courses}</strong>
            <br />
            <em>Code:</em> {course.course_code} | <em>Year:</em> {course.year} | <em>Semester:</em> {course.sem}
            <br />
            <em>Credits:</em> {course.credits} | <em>Professor:</em> {course.pname}
            <br />
            <em>Description:</em> {course.course_description}
            <br />
            <a href={course.plink} target="_blank" rel="noopener noreferrer">
              Professor Link
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseManagement;