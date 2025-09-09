import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import JobList from "./JobList";

function JobsPage() {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);

  // Fetch all jobs from backend once
  useEffect(() => {
    fetch("https://jobmanagement-server.onrender.com/api/jobs") // replace with your actual endpoint
      .then((res) => res.json())
      .then((data) => {
        setJobs(data);
        setFilteredJobs(data); // show all jobs initially
      })
      .catch((err) => console.error("Error fetching jobs:", err));
  }, []);

  const handleFilterChange = (filters) => {
    let results = jobs;

    // Apply title filter if user types
    if (filters.title) {
      results = results.filter((job) =>
        job.title.toLowerCase().includes(filters.title.toLowerCase())
      );
    }

    // Apply location filter if user types
    if (filters.location) {
      results = results.filter((job) =>
        job.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    // Apply job type filter if selected
    if (filters.type && filters.type !== "") {
      results = results.filter(
        (job) => job.jobType.toLowerCase() === filters.type.toLowerCase()
      );
    }

    // Apply salary range filter if slider moved
    if (filters.salaryIndex !== null && filters.salaryIndex !== 0) {
      const ranges = [
        [0, 100000],
        [100000, 200000],
        [200000, 300000],
        [300000, 400000],
        [400000, 500000],
        [500000, 600000],
        [600000, 700000],
        [700000, 800000],
        [800000, 900000],
        [900000, 1000000],
      ];
      const [min, max] = ranges[filters.salaryIndex];
      results = results.filter(
        (job) => job.salaryMin >= min && job.salaryMax <= max
      );
    }

    setFilteredJobs(results);
  };

  return (
    <div>
      <SearchBar onFilterChange={handleFilterChange} />
      <JobList jobs={filteredJobs} />
    </div>
  );
}

export default JobsPage;
