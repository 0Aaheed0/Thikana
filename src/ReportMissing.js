import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ReportMissing.css';

const ReportMissing = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    lastSeenLocation: '',
    description: '',
    photo: null,
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      photo: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('age', formData.age);
      data.append('gender', formData.gender);
      data.append('lastSeenLocation', formData.lastSeenLocation);
      data.append('description', formData.description);
      data.append('photo', formData.photo);

      const response = await fetch('http://localhost:5000/api/report-missing', {
        method: 'POST',
        body: data,
      });

      if (response.ok) {
        alert('Report submitted successfully!');
        navigate('/');
      } else {
        alert('Failed to submit report.');
      }
    } catch (error) {
      console.error('Error submitting report:', error);
      alert('An error occurred while submitting the report.');
    }
  };

  return (
    <div className="report-missing-container">
      <h2>Report Missing Person</h2>
      <form onSubmit={handleSubmit} className="report-missing-form">
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
          Last Seen Location:
          <input
            type="text"
            name="lastSeenLocation"
            value={formData.lastSeenLocation}
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
        <label>
          Photo:
          <input
            type="file"
            name="photo"
            onChange={handleFileChange}
            accept="image/*"
          />
        </label>
        <button type="submit">Submit Report</button>
      </form>
    </div>
  );
};

export default ReportMissing;
