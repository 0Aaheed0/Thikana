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

  useEffect(() => {
    const fetchCases = async () => {
      try {
        const [missingPersonsRes, accidentsRes, articlesRes] = await Promise.all([
          fetch('http://localhost:5000/api/missing-persons'),
          fetch('http://localhost:5000/api/accidents'),
          fetch('http://localhost:5000/api/articles'),
        ]);
        const missingPersons = await missingPersonsRes.json();
        const accidents = await accidentsRes.json();
        const articles = await articlesRes.json();

        const allCases = [
          ...missingPersons.map(c => ({
            ...c,
            caseType: 'missing',
            name: c.name,
            description: c.description,
            // ✅ prepend backend URL so <img> works
            photo: c.photo ? `http://localhost:5000${c.photo}` : null,
            createdAt: c.createdAt
          })),
          ...accidents.map(c => ({
            ...c,
            caseType: 'accident',
            name: c.name,
            description: c.description,
            photo: null,
            createdAt: c.createdAt
          })),
          ...articles.map(a => ({
            ...a,
            caseType: a.caseType,
            name: a.title,
            description: a.shortDescription,
            photo: a.image,
            createdAt: new Date().toISOString()
          }))
        ];
        setCases(allCases);
      } catch (error) {
        console.error("Error fetching cases:", error);
      }
    };
    fetchCases();
  }, []);

  const filteredCases = cases.filter(caseItem => {
    if (caseType && caseItem.caseType !== caseType) return false;
    if (filterType && caseItem.caseType !== filterType) return false;
    if (search) {
      const searchLower = search.toLowerCase();
      if (!(
        caseItem.name.toLowerCase().includes(searchLower) ||
        (caseItem._id && caseItem._id.toString().includes(searchLower)) ||
        (caseItem.location && caseItem.location.toLowerCase().includes(searchLower)) ||
        (caseItem.lastSeenLocation && caseItem.lastSeenLocation.toLowerCase().includes(searchLower)) ||
        (caseItem.description && caseItem.description.toLowerCase().includes(searchLower))
      )) return false;
    }
    if (filterStatus && caseItem.status !== filterStatus) return false;
    if (dateFrom && caseItem.createdAt && new Date(caseItem.createdAt) < new Date(dateFrom)) return false;
    if (dateTo && caseItem.createdAt && new Date(caseItem.createdAt) > new Date(dateTo)) return false;
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
          placeholder="Search by name, case ID, or location"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="search-bar"
        />
        <select value={filterType} onChange={e => setFilterType(e.target.value)} className="filter-dropdown">
          <option value="">All Types</option>
          <option value="missing">Missing</option>
          <option value="accident">Accident</option>
          <option value="complaint">Complaint</option>
          <option value="request">Request</option>
          <option value="application">Application</option>
        </select>
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="filter-dropdown">
          <option value="">All Status</option>
          <option value="resolved">Resolved</option>
          <option value="closed">Closed</option>
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
          filteredCases.map(caseItem => (
            <div key={caseItem._id || caseItem.id} className="case-item">
              {caseItem.photo && <img src={caseItem.photo} alt={caseItem.name} />}
              <h2>{caseItem.name}</h2>
              <p>{caseItem.description}</p>
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
