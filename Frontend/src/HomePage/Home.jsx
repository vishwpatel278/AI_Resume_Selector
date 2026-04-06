import React from "react";
import NavBar from "./NavBar";
import "./Home.css";

const Home = () => {
  return (
    <div>

      <NavBar />

      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-content">
          <h1>AI Powered Resume Screening</h1>
          <p>
            Find the best candidates instantly with intelligent resume matching.
          </p>

          <div className="hero-buttons">
            <a href="/find-job" className="btn primary">Find Jobs</a>
            <a href="/post-job" className="btn secondary">Post Job</a>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features">

        <div className="feature-card">
          <h3>Smart Matching</h3>
          <p>AI analyzes resumes and matches best candidates automatically.</p>
        </div>

        <div className="feature-card">
          <h3>Fast Hiring</h3>
          <p>Reduce hiring time with automated screening process.</p>
        </div>

        <div className="feature-card">
          <h3>Accurate Results</h3>
          <p>Get precise candidate ranking based on skills & experience.</p>
        </div>

      </section>

      {/* CTA */}
      <section className="cta">
        <h2>Start Hiring Smarter Today</h2>
        <a href="/signup" className="btn primary">Get Started</a>
      </section>

    </div>
  );
};

export default Home;