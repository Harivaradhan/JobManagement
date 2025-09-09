import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import JobList from "./JobList";

function JobsPage() {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [isFiltering, setIsFiltering] = useState(false); // new flag

  useEffect(() => {
    fetch("https://jobmanagement-server.onrender.com/JobServlet/api/jobs")
      .then((res) => res.json())
      .then((data) => {
        setJobs(data);
        setFilteredJobs(data); // show all initially
      })
      .catch((err) => console.error("Error fetching jobs:", err));
  }, []);

  const handleFilter = (filters) => {
    // Check if any filter is applied
    const hasFilter =
      filters.title ||
      filters.location ||
      (filters.type && filters.type !== "") ||
      filters.salaryIndex !== 0;

    if (!hasFilter) {
      setIsFiltering(false);
      setFilteredJobs(jobs); // show all if no filter
      return;
    }

    setIsFiltering(true);

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

    if (filters.type && filters.type !== "") {
      results = results.filter(
        (job) => job.jobType.toLowerCase() === filters.type.toLowerCase()
      );
    }

    if (filters.salaryIndex && filters.salaryIndex !== 0) {
      const salaryRanges = [
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
      const [min, max] = salaryRanges[filters.salaryIndex];
      results = results.filter(
        (job) => job.salaryMin >= min && job.salaryMax <= max
      );
    }

    setFilteredJobs(results);
  };

  return (
    <div>
      <SearchBar onFilterChange={handleFilter} />
      <JobList jobs={filteredJobs} />
    </div>
  );
}

export default JobsPage;
