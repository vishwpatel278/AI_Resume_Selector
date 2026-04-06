import React, { useState } from "react";
import { signupUser } from "../utils/apifunction";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";

const Signup = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const res = await signupUser(formData);

      if(res){
        setSuccess("Account created successfully");
        setError("");

        setTimeout(()=>{
          navigate("/login");
        },1500);
      }

    } catch(err){
      setError("Signup failed");
      console.log(err);
    }

  };

    return (
    <div className="signup-container">
      <div className="signup-card">

        <h1 className="app-title">Create Account</h1>
        <p className="subtitle">
          Start using AI Resume Selector today
        </p>

        <form onSubmit={handleSubmit} className="form">

          <h2>Sign Up</h2>

          {error && <p className="error">{error}</p>}
          {success && <p className="success">{success}</p>}

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button type="submit">Create Account</button>

          <p className="login-text">
            Already have an account? <Link to="/login">Login</Link>
          </p>

        </form>
      </div>
    </div>
  );
};

export default Signup;