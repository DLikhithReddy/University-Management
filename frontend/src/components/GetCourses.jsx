import React, { useState, useEffect } from "react";
import axios from "axios";

const GetCourses = () => {
  const [courses, setCourses] = useState([]);
  const [year, setYear] = useState("");
  const [sem, setSem] = useState("");

  // Fetch courses based on year and semester
  const fetchCourses = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/student/courses?year=${year}&sem=${sem}`
      );
      setCourses(response.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  useEffect(() => {
    if (year && sem) {
      fetchCourses();
    }
  }, [year, sem]);

  return (
    <div className="course-container">
      <h2>Courses</h2>
      <div className="input-group">
        <input
          type="number"
          placeholder="Year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="input-field"
        />
        <input
          type="number"
          placeholder="Semester"
          value={sem}
          onChange={(e) => setSem(e.target.value)}
          className="input-field"
        />
        <button onClick={fetchCourses} className="fetch-button">
          Get Courses
        </button>
      </div>
      <ul className="course-list">
        {courses.map((course) => (
          <li key={course.course_code} className="course-item">
            <strong>{course.courses}</strong> <br />
            <em>Code:</em> {course.course_code} | <em>Year:</em> {course.year} |{" "}
            <em>Semester:</em> {course.sem} | <em>Credits:</em> {course.credits}{" "}
            <br />
            <em>Professor:</em> {course.pname} |{" "}
            <em>Description:</em> {course.course_description} <br />
            <a
              href={course.plink}
              target="_blank"
              rel="noopener noreferrer"
              className="professor-link"
            >
              Professor Link
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GetCourses;