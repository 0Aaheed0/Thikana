import React, { useEffect, useState } from "react";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  const [reports, setReports] = useState([]);
  const [editing, setEditing] = useState(null);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    fetch("http://localhost:5000/api/reports")
      .then((res) => res.json())
      .then((data) => setReports(data));
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this report?")) return;
    await fetch(`http://localhost:5000/api/reports/${id}`, { method: "DELETE" });
    setReports(reports.filter((r) => r._id !== id));
  };

  const handleEdit = (report) => {
    setEditing(report._id);
    setEditData(report);
  };

  const handleSave = async () => {
    await fetch(`http://localhost:5000/api/reports/${editing}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editData),
    });
    setReports(reports.map((r) => (r._id === editing ? editData : r)));
    setEditing(null);
  };

  return (
    <div className="admin-dashboard">
      <h2 className="dashboard-title">📊 Admin Dashboard</h2>

      <div className="reports-list">
        {reports.map((report, index) => (
          <div key={report._id} className="report-card">
            <div className="report-header">
              <span className="report-index">#{index + 1}</span>
              {editing === report._id ? (
                <input
                  value={editData.name}
                  onChange={(e) =>
                    setEditData({ ...editData, name: e.target.value })
                  }
                />
              ) : (
                <h3>{report.title || report.name}</h3>
              )}
            </div>

            <div className="report-body">
              {editing === report._id ? (
                <textarea
                  value={editData.description}
                  onChange={(e) =>
                    setEditData({ ...editData, description: e.target.value })
                  }
                />
              ) : (
                <p>{report.description}</p>
              )}
            </div>

            <div className="report-actions">
              {editing === report._id ? (
                <>
                  <button className="btn save" onClick={handleSave}>
                    Save
                  </button>
                  <button
                    className="btn cancel"
                    onClick={() => setEditing(null)}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button className="btn edit" onClick={() => handleEdit(report)}>
                    Edit
                  </button>
                  <button
                    className="btn delete"
                    onClick={() => handleDelete(report._id)}
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
