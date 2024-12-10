import React, { useState } from "react";
import axios from "axios";
import "./CreatePracticeQuestion.css";

const CreatePracticeQuestion = () => {
  const [newQuestion, setNewQuestion] = useState({
    question: "",
    topic: "",
    company: "",
    link: "",
  });

  const handleAddQuestion = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/admin/practice", newQuestion);
      // Reset form fields
      setNewQuestion({ question: "", topic: "", company: "", link: "" });
    } catch (error) {
      console.error("Error adding question:", error);
    }
  };

  return (
    <div className="create-practice-container">
      <h2 className="create-practice-title">Add a New Practice Question</h2>
      <form className="create-practice-form" onSubmit={handleAddQuestion}>
        <div className="form-group">
          <label htmlFor="question">Question</label>
          <input
            id="question"
            type="text"
            placeholder="Enter the question"
            value={newQuestion.question}
            onChange={(e) =>
              setNewQuestion({ ...newQuestion, question: e.target.value })
            }
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="topic">Topic</label>
          <input
            id="topic"
            type="text"
            placeholder="Enter the topic"
            value={newQuestion.topic}
            onChange={(e) =>
              setNewQuestion({ ...newQuestion, topic: e.target.value })
            }
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="company">Company</label>
          <input
            id="company"
            type="text"
            placeholder="Enter the company"
            value={newQuestion.company}
            onChange={(e) =>
              setNewQuestion({ ...newQuestion, company: e.target.value })
            }
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="link">Practice Link</label>
          <input
            id="link"
            type="url"
            placeholder="Enter the practice link"
            value={newQuestion.link}
            onChange={(e) =>
              setNewQuestion({ ...newQuestion, link: e.target.value })
            }
            required
          />
        </div>
        <button type="submit" className="submit-button">
          Add Question
        </button>
      </form>
    </div>
  );
};

export default CreatePracticeQuestion;