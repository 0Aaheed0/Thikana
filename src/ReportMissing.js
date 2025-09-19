import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ReportMissing.css";

const ReportMissing = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    lastSeenLocation: "",
    description: "",
    photo: null,
  });
  const [status, setStatus] = useState(null); // success | error

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, photo: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);

    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        if (formData[key]) {
          data.append(key, formData[key]);
        }
      });

      const res = await fetch("http://localhost:5000/api/report-missing", {
        method: "POST",
        body: data, // ✅ don't set headers manually
      });

      if (res.ok) {
        setStatus("success");
        setTimeout(() => navigate("/"), 2000);
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error("Error submitting report:", err);
      setStatus("error");
    }
  };

  return (
    <div className="report-missing-container">
      <h2>Report Missing Person</h2>
      <form onSubmit={handleSubmit} className="report-missing-form">
        {status === "success" && (
          <p className="submission-success">
            ✅ Report submitted! Redirecting...
          </p>
        )}
        {status === "error" && (
          <p className="submission-error">
            ❌ Error submitting report. Please try again.
          </p>
        )}

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
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
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
            accept="image/*"
            onChange={handleFileChange}
          />
        </label>

        <button type="submit">Submit Report</button>
      </form>
    </div>
  );
};

export default ReportMissing;
