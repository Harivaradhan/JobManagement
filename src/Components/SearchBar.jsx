import React, { useState } from "react";
import "./SearchBar.css";

export default function SearchBar({ onFilterChange }) {
  const ranges = [
    "0L - 1L",
    "1L - 2L",
    "2L - 3L",
    "3L - 4L",
    "4L - 5L",
    "5L - 6L",
    "6L - 7L",
    "7L - 8L",
    "8L - 9L",
    "9L - 10L",
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
          Salary per Year: <b>{ranges[filters.salaryIndex]}</b>
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
