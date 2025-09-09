import React, { useState } from "react";
import "./SearchBar.css";

export default function SearchBar({ onFilterChange }) {
  const ranges = [
    [0, 10000],
    [10000, 20000],
    [20000, 30000],
    [30000, 40000],
    [40000, 50000],
    [50000, 60000],
    [60000, 70000],
    [70000, 80000],
    [80000, 90000],
    [90000, 100000],
  ];

  const [filters, setFilters] = useState({
    title: "",
    location: "",
    jobType: "",
    salaryIndex: 0,
  });

  const handleChange = (field, value) => {
    const updated = { ...filters, [field]: value };

    // also send real salary range to parent
    const salaryRange = ranges[updated.salaryIndex];
    onFilterChange({ 
      title: updated.title,
      location: updated.location,
      jobType: updated.jobType,
      salaryRange: salaryRange
    });

    setFilters(updated);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search By Job Title"
        className="search-input"
        value={filters.title}
        onChange={(e) => handleChange("title", e.target.value)}
      />
      <input
        type="text"
        placeholder="Job Location"
        className="search-input"
        value={filters.location}
        onChange={(e) => handleChange("location", e.target.value)}
      />
      <select
        className="search-select"
        value={filters.jobType}
        onChange={(e) => handleChange("jobType", e.target.value)}
      >
        <option value="">Job Type</option>
        <option>Full-Time</option>
        <option>Part-Time</option>
        <option>Contract</option>
        <option>Internship</option>
      </select>
      <div className="salary-filter">
        <label>
          Salary Range:{" "}
          <b>
            {ranges[filters.salaryIndex][0] / 1000}k -{" "}
            {ranges[filters.salaryIndex][1] / 1000}k
          </b>
        </label>
        <input
          type="range"
          min="0"
          max={ranges.length - 1}
          value={filters.salaryIndex}
          onChange={(e) => handleChange("salaryIndex", Number(e.target.value))}
        />
      </div>
    </div>
  );
}
