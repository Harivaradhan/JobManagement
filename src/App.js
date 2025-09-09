import Navbar from './Components/Navbar';
import './App.css';
import { useState, useEffect } from 'react';
import SearchBar from './Components/SearchBar';
import JobForm from './Components/JobForm';
import JobList from './Components/JobList';

function App() {
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    jobType: "FullTime",
    salaryMin: "",
    salaryMax: "",
    deadline: "",
    description: "",
  });

  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);

  // Fetch jobs once
  useEffect(() => {
    fetch("https://jobmanagement-server.onrender.com")
      .then((res) => res.json())
      .then((data) => {
        setJobs(data);
        setFilteredJobs(data);
      })
      .catch((err) => console.error(err));
  }, []);

  // Function to handle filtering
  const handleFilter = (filters) => {
    let results = jobs;

    if (filters.title) {
      results = results.filter(job =>
        job.title.toLowerCase().includes(filters.title.toLowerCase())
      );
    }

    if (filters.location) {
      results = results.filter(job =>
        job.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    if (filters.type) {
      results = results.filter(
        job => job.jobType.toLowerCase() === filters.type.toLowerCase()
      );
    }

    if (filters.salaryIndex != null) {
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
        job => job.salaryMin >= min && job.salaryMax <= max
      );
    }

    setFilteredJobs(results);
  };

  return (
    <div className="App">
      <Navbar onCreateJob={() => setShowForm(true)} />
      {showForm && (
        <JobForm
          formData={formData}
          setFormData={setFormData}
          onClose={() => setShowForm(false)}
        />
      )}

      <SearchBar onFilterChange={handleFilter} />
      <JobList jobs={filteredJobs} />
    </div>
  );
}

export default App;
