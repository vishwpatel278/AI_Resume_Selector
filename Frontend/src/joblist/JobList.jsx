import React, { useEffect, useState } from "react";
import "./JobList.css";
import { jobList } from "../utils/apifunction";

const JobList = () => {

  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await jobList();
        setJobs(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchJobs();
  }, []);

  return (
    <div className="job-container">

      <h1 className="job-title">🚀 Available Jobs</h1>

      <div className="job-list">

        {jobs.map((job) => (
          <div
            key={job._id}
            className="job-card"
            onClick={() => setSelectedJob(job)}
          >
            <h3>{job.jobTitle}</h3>

            <div className="job-info">
              <span>📍 {job.jobLocation}</span>
              <span>💼 {job.department}</span>
            </div>

            <div className="job-tags">
              <span>{job.employementType}</span>
              <span>{job.NumberOfOpening} Openings</span>
            </div>

          </div>
        ))}

      </div>

      {/* MODAL */}
      {selectedJob && (
        <div className="modal-overlay">

          <div className="modal-card">

            <button
              className="close-btn"
              onClick={() => setSelectedJob(null)}
            >
              ✖
            </button>

            <h2>{selectedJob.jobTitle}</h2>

            <p><b>📍 Location:</b> {selectedJob.jobLocation}</p>
            <p><b>💼 Department:</b> {selectedJob.department}</p>
            <p><b>⏳ Type:</b> {selectedJob.employementType}</p>
            <p><b>👥 Openings:</b> {selectedJob.NumberOfOpening}</p>

            <h4>Description</h4>
            <p>{selectedJob.jobDescription}</p>

            <h4>Skills Required</h4>
            <p>{selectedJob.skills}</p>

            <p><b>🎓 Education:</b> {selectedJob.educationRequirement}</p>
            <p><b>🧠 Experience:</b> {selectedJob.minExperience} years</p>

            <button className="apply-btn">Apply Now</button>

          </div>

        </div>
      )}

    </div>
  );
};

export default JobList;