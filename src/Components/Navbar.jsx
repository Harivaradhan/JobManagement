import React from "react";
import "./Navbar.css";

export default function Navbar({ onCreateJob }) {
  return (
    <nav className="navbar">
      <div className="logo">
        <img src="logoo.JPG" alt="Company Logo" />
      </div>
      <ul className="nav-links">
        <li>Home</li>
        <li>Find Jobs</li>
        <li>Find Talents</li>
        <li>About us</li>
        <li>Testimonials</li>
      </ul>
      <button className="create-btn" onClick={onCreateJob}>Create Jobs</button>
    </nav>
  );
}
