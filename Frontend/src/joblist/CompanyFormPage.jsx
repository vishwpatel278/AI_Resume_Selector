import React, { useEffect, useState } from "react";
import { CompanyForm } from "../utils/apifunction";
import "./CompanyForm.css";

const CompanyFormPage = () => {

  const [formData, setFormData] = useState({
    companyName: "",
    companyEmail: "",
    companyWebsite: "",
    industry: "",
    companySize: "",
    companyLocation: "",
    contactEmail: "",
    contactNumber: "",
    officeAddress: ""
  });

  const [message, setMessage] = useState("");

  // Fetch existing company data (if any)
  useEffect(() => {
    const fetchData = async () => {
      const res = await CompanyForm();
      if (res && res.data) {
        setFormData(res.data);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData); // You can call POST/PUT API here
    setMessage("Company details saved successfully ✅");
  };

  return (
    <div className="company-container">

      <div className="company-card">

        <h2>🏢 Company Details</h2>

        {message && <p className="success">{message}</p>}

        <form onSubmit={handleSubmit} className="company-form">

          <input name="companyName" placeholder="Company Name" value={formData.companyName} onChange={handleChange} required />

          <input name="companyEmail" placeholder="Company Email" value={formData.companyEmail} onChange={handleChange} required />

          <input name="companyWebsite" placeholder="Website" value={formData.companyWebsite} onChange={handleChange} />

          <input name="industry" placeholder="Industry" value={formData.industry} onChange={handleChange} />

          <input name="companySize" placeholder="Company Size" value={formData.companySize} onChange={handleChange} />

          <input name="companyLocation" placeholder="Location" value={formData.companyLocation} onChange={handleChange} />

          <input name="contactEmail" placeholder="HR Email" value={formData.contactEmail} onChange={handleChange} />

          <input name="contactNumber" placeholder="Contact Number" value={formData.contactNumber} onChange={handleChange} />

          <textarea name="officeAddress" placeholder="Office Address" value={formData.officeAddress} onChange={handleChange}></textarea>

          <button type="submit">Save Details</button>

        </form>

      </div>

    </div>
  );
};

export default CompanyFormPage;