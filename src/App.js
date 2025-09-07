import Navbar from './Components/Navbar';
import './App.css';
import { useState } from 'react';
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
      
     <SearchBar />
      <JobList />
    
    </div>
  );
}

export default App;
