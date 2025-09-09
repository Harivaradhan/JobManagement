import React from "react";
import "./JobList.css";

function JobList({ jobs }) {
  return (
    <div className="job-list">
      <h2>Available Jobs</h2>
      <div className="job-cards">
        {jobs.length === 0 ? (
          <p>No jobs match your filters.</p>
        ) : (
          jobs.map((job) => (
            <div key={job.id} className="job-card">
              <h3>{job.title}</h3>
              <p>
                <strong>Company:</strong> {job.company}
              </p>
              <p>
                <strong>Location:</strong> {job.location}
              </p>
              <p>
                <strong>Type:</strong> {job.jobType}
              </p>
              <p>
                <strong>Salary:</strong> ₹{job.salaryMin} - ₹{job.salaryMax}
              </p>
              <p>
                <strong>Deadline:</strong> {job.deadline}
              </p>
              <p className="desc">{job.description}</p>
              <button className="buttun">Apply Now</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default JobList;
