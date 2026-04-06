import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const NavBar = () => {
  const navigate = useNavigate();
  const role = sessionStorage.getItem("userRole");
  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="navbar">

      <div className="logo">
        <h2>AI Jobs</h2>
      </div>

      <ul className="nav-links">

        {/* Common for all */}
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>

        <li>
          <Link to="/find-job">Find Job</Link>
        </li>

        <li>
          <Link to="/post-job">Post Job</Link>
        </li>

        {role.includes("Admin") ? (
          <li>
            <Link to="/admin">Admin Panel</Link>
          </li>
        ): null}

        {role.includes("JobProvider") ? (
          <li>
            <Link to="/job-provider">Provider Panel</Link>
          </li>
        ):null}

        {/* Logout */}
        <li>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </li>

      </ul>

    </nav>
  );
};

export default NavBar;