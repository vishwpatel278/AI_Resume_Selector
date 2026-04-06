import React, { useState } from "react";
import { loginuser } from "../utils/apifunction";
import { useAuth } from "./AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {

  const auth = useAuth();
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await loginuser(loginData);

      if (res) {
        const token = res.data;
        auth.handleLogin(token);
        navigate("/");
      } else {
        setError("Invalid credentials");
      }
    } catch (err) {
      setError("Login failed");
      console.log(err)
    }
  };

    return (
    <div className="login-container">
      <div className="login-card">

        <h1 className="app-title">AI Resume Selector</h1>
        <p className="subtitle">
          Smart hiring powered by AI
        </p>

        <form onSubmit={handleSubmit} className="form">

          <h2>Login</h2>

          {error && <p className="error">{error}</p>}

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={loginData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={loginData.password}
            onChange={handleChange}
            required
          />

          <button type="submit">Login</button>

          <p className="signup-text">
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p>

        </form>
      </div>
    </div>
  );
};

export default Login;