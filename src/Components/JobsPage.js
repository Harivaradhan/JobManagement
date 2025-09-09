import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import JobList from "./JobList";

function JobsPage() {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);

  useEffect(() => {
    fetch("https://jobmanagement-server.onrender.com/JobServlet")
      .then((res) => res.json())
      .then((data) => {
        setJobs(data);
        setFilteredJobs(data); // initially show all
      })
      .catch((err) => console.error("Error fetching jobs:", err));
  }, []);

  const handleFilter = (filters) => {
    let results = jobs;

    if (filters.title) {
      results = results.filter((job) =>
        job.title.toLowerCase().includes(filters.title.toLowerCase())
      );
    }

    if (filters.location) {
      results = results.filter((job) =>
        job.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    if (filters.jobType && filters.jobType !== "Job Type") {
      results = results.filter(
        (job) => job.jobType.toLowerCase() === filters.jobType.toLowerCase()
      );
    }

    if (filters.salaryRange) {
      const [min, max] = filters.salaryRange;
      results = results.filter(
        (job) => job.salaryMin >= min && job.salaryMax <= max
      );
    }

    setFilteredJobs(results);
  };

  return (
    <div>
      <SearchBar onFilter={handleFilter} />
      <JobList jobs={filteredJobs} />
    </div>
  );
}

export default JobsPage;

