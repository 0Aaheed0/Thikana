import React, { useState } from 'react';
import './ReportAccident.css';

const ReportAccident = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    location: '',
    injuryType: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/report-accident', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert('Accident report submitted successfully!');
        // You might want to redirect the user to another page
      } else {
        alert('Failed to submit accident report.');
      }
    } catch (error) {
      console.error('Error submitting accident report:', error);
      alert('An error occurred while submitting the accident report.');
    }
  };

  return (
    <div className="report-accident-container">
      <h2>Report Accident</h2>
      <form onSubmit={handleSubmit} className="report-accident-form">
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Age:
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Gender:
          <select name="gender" value={formData.gender} onChange={handleChange} required>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </label>
        <label>
          Location:
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Injury Type:
          <input
            type="text"
            name="injuryType"
            value={formData.injuryType}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Description:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Submit Report</button>
      </form>
    </div>
  );
};

export default ReportAccident;
