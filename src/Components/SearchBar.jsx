import React from "react";
import { useState } from "react";
import "./SearchBar.css";

export default function SearchBar() {


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
    "90k - 100k"
  ];
const [rangeIndex, setRangeIndex] = useState(0);

  return (
    <div className="search-bar">
      <input type="text" placeholder="Search By Job Title" className="search-input" />
       <input type="text" placeholder="Job Location" className="search-input" />
      <select className="search-select">
        <option>Job Type</option>
        <option>Full-Time</option>
        <option>Part-Time</option>
        <option>Contract</option>
        <option>Internship</option>
      </select>
        <div className="salary-filter">
        <label>
          Salary Range: <b>{ranges[rangeIndex]}</b>
        </label>
        <input
          type="range"
          min="0"
          max={ranges.length - 1}
          value={rangeIndex}
          onChange={(e) => setRangeIndex(Number(e.target.value))}
        />
      </div>
    </div>
  );
}
