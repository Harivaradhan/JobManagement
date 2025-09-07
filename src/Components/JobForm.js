import React, { useState } from "react";
import "./JobForm.css";

function JobForm({formData, setFormData, onClose }) {
 
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  const response = await fetch("http://localhost:8080/management/api/jobs", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  if (response.ok) {
    alert("Job saved successfully!");
    onClose();
  } else {
    alert("Error saving job");
  }
};

  const handleSaveDraft = () => {
    console.log("Draft Saved:", formData);
    onClose(); // close but keep data
  };
  
  return (
    <div className="form-overlay">
      <div className="form-container">
        <h2>Create Job Opening</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Job Title"
            value={formData.title}
            onChange={handleChange}
          />
          <input
            type="text"
            name="company"
            placeholder="Company Name"
            value={formData.company}
            onChange={handleChange}
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
          />

          <select
            name="jobType"
            value={formData.jobType}
            onChange={handleChange}
          >
            <option value="FullTime">Full-Time</option>
            <option value="PartTime">Part-Time</option>
            <option value="Internship">Internship</option>
          </select>

          <div className="salary-range">
            <input
              type="number"
              name="salaryMin"
              placeholder="Min Salary"
              value={formData.salaryMin}
              onChange={handleChange}
            />
            <input
              type="number"
              name="salaryMax"
              placeholder="Max Salary"
              value={formData.salaryMax}
              onChange={handleChange}
            />
          </div>

          <input
            type="date"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
          />

          <textarea
            name="description"
            placeholder="Job Description"
            value={formData.description}
            onChange={handleChange}
          ></textarea>

          <div className="form-actions">
            <button type="button" className="save-btn"
             onClick={handleSaveDraft}
             >
              Save Draft
            </button>
            <button type="submit" className="publish-btn">
              Publish »
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default JobForm;
