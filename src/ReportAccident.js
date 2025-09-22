import React, { useState } from 'react';
import './ReportAccident.css';
import axios from 'axios';

const ReportAccident = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    location: '',
    injuryType: '',
    description: '',
  });

  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/report-accident', formData);
      if (response.status === 201) {
        setStatus("success");
        alert("✅ Accident report submitted successfully!");
        setFormData({ name:'', age:'', gender:'', location:'', injuryType:'', description:'' });
      } else {
        setStatus("error");
        alert("❌ Failed to submit report.");
      }
    } catch (err) {
      console.error("Error submitting accident report:", err);
      setStatus("error");
      alert("❌ Error submitting report.");
    }
  };

  return (
    <div className="report-accident-container">
      <h2>Report Accident</h2>
      <form onSubmit={handleSubmit} className="report-accident-form">
        <label>Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </label>
        <label>Age:
          <input type="number" name="age" value={formData.age} onChange={handleChange} required />
        </label>
        <label>Gender:
          <select name="gender" value={formData.gender} onChange={handleChange} required>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </label>
        <label>Location:
          <input type="text" name="location" value={formData.location} onChange={handleChange} required />
        </label>
        <label>Injury Type:
          <input type="text" name="injuryType" value={formData.injuryType} onChange={handleChange} required />
        </label>
        <label>Description:
          <textarea name="description" value={formData.description} onChange={handleChange} required />
        </label>
        <button type="submit">Submit Report</button>
      </form>
    </div>
  );
};

export default ReportAccident;
