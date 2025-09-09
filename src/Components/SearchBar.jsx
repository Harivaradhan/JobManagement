import React, { useState } from "react";
import "./SearchBar.css";

export default function SearchBar({ onFilterChange }) {
  const ranges = [
    "0k - 10k",
    "10k - 20k",
    "20k - 30k",
    "30k - 40k",
    "40k - 50k",
    "50k - 60k",
    "60k - 70k",
    "70k - 80k",
    "80k - 90k",
    "90k - 100k",
  ];

  const [filters, setFilters] = useState({
    title: "",
    location: "",
    type: "",
    salaryIndex: 0,
  });

  const handleChange = (field, value) => {
    const updated = { ...filters, [field]: value };
    setFilters(updated);
    onFilterChange(updated); // send to parent for filtering
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
        value={filters.type}
        onChange={(e) => handleChange("type", e.target.value)}
      >
        <option value="">Job Type</option>
        <option>Full-Time</option>
        <option>Part-Time</option>
        <option>Contract</option>
        <option>Internship</option>
      </select>
      <div className="salary-filter">
        <label>
          Salary Range: <b>{ranges[filters.salaryIndex]}</b>
        </label>
        <input
          type="range"
          min="0"
          max={ranges.length - 1}
          value={filters.salaryIndex}
          onChange={(e) =>
            handleChange("salaryIndex", Number(e.target.value))
          }
        />
      </div>
    </div>
  );
}
