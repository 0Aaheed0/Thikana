import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './CaseArchive.css';

const CaseArchive = () => {
  const { caseType } = useParams();
  const [cases, setCases] = useState([]);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const statusOptions = ["", "open", "resolved", "closed"];
  const typeOptions = ["", "missing", "road-accident", "complaint", "request", "application"];

  useEffect(() => {
    fetch("http://localhost:5000/api/reports")
      .then(res => res.json())
      .then(data => setCases(data))
      .catch(err => console.error("Error fetching cases:", err));
  }, []);

  const filteredCases = cases.filter(c => {
    if (caseType && c.caseType !== caseType) return false;
    if (filterType && c.caseType !== filterType) return false;
    if (search) {
      const s = search.toLowerCase();
      if (!(c.name.toLowerCase().includes(s) || c.lastSeenLocation.toLowerCase().includes(s))) {
        return false;
      }
    }
    if (filterStatus && c.status !== filterStatus) return false;
    if (dateFrom && new Date(c.dateSubmitted) < new Date(dateFrom)) return false;
    if (dateTo && new Date(c.dateSubmitted) > new Date(dateTo)) return false;
    return true;
  });

  const pageTitle = caseType ? `${caseType.replace('-', ' ')} Cases` : 'All Cases';
  const breadcrumbCategory = caseType ? caseType.replace('-', ' ') : 'Archive';

  useEffect(() => {
    document.title = `Case Archive - ${pageTitle}`;
  }, [pageTitle]);

  return (
    <div className="case-archive-container">
      <div className="breadcrumb">
        <Link to="/">Home</Link> &gt; <span>Cases</span> &gt; <span style={{textTransform: 'capitalize'}}>{breadcrumbCategory}</span>
      </div>
      <h1 style={{textTransform: 'capitalize'}}>{pageTitle}</h1>

      {/* Search & Filter Section */}
      <div className="search-filter-section">
        <input
          type="text"
          placeholder="Search by name or location"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="search-bar"
        />
        <select value={filterType} onChange={e => setFilterType(e.target.value)} className="filter-dropdown">
          <option value="">All Types</option>
          {typeOptions.map(type => (
            <option key={type} value={type}>{type ? type.replace('-', ' ') : 'All'}</option>
          ))}
        </select>
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="filter-dropdown">
          <option value="">All Status</option>
          {statusOptions.map(status => (
            <option key={status} value={status}>{status ? status.charAt(0).toUpperCase() + status.slice(1) : 'All'}</option>
          ))}
        </select>
        <label>
          From:
          <input type="date" value={dateFrom} onChange={e => setDateFrom(e.target.value)} />
        </label>
        <label>
          To:
          <input type="date" value={dateTo} onChange={e => setDateTo(e.target.value)} />
        </label>
      </div>

      <div className="case-list">
        {filteredCases.length > 0 ? (
          filteredCases.map(item => (
            <div key={item._id} className="case-item">
              {item.photo && <img src={`http://localhost:5000${item.photo}`} alt={item.name} />}
              <h2>{item.name}</h2>
              <p>{item.description}</p>
              <small>Location: {item.lastSeenLocation}</small>
            </div>
          ))
        ) : (
          <p>No cases found for this filter.</p>
        )}
      </div>
      <Link to="/" className="back-button">Go Back</Link>
    </div>
  );
};

export default CaseArchive;
