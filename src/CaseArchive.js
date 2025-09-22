import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CaseArchive.css';
import articles from './articles'; // Your homepage articles

const CaseArchive = () => {
  const [cases, setCases] = useState([]);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("");

  useEffect(() => {
    const fetchCases = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/reports');
        // Map missing and accident reports to have a "caseType" field
        const mappedReports = res.data.map(item => {
          if (item.lastSeenLocation) return { ...item, caseType: 'missing' };
          if (item.location) return { ...item, caseType: 'road-accident' };
          return { ...item };
        });

        // Merge homepage articles (give them a type if needed)
        const mergedCases = [...articles.map(a => ({ ...a, caseType: a.caseType || "article" })), ...mappedReports];

        // Sort by dateSubmitted if exists
        mergedCases.sort((a, b) => new Date(b.dateSubmitted || 0) - new Date(a.dateSubmitted || 0));

        setCases(mergedCases);
      } catch (err) {
        console.error("Error fetching cases:", err);
      }
    };
    fetchCases();
  }, []);

  // Filtering logic
  const filteredCases = cases.filter(c => {
    // Filter by type dropdown
    if (filterType && c.caseType !== filterType) return false;

    // Filter by search
    if (search) {
      const s = search.toLowerCase();
      return (
        (c.name?.toLowerCase().includes(s)) ||
        (c.lastSeenLocation?.toLowerCase().includes(s)) ||
        (c.location?.toLowerCase().includes(s)) ||
        (c.title?.toLowerCase().includes(s))
      );
    }
    return true;
  });

  return (
    <div className="case-archive-container">
      <h2>Case Archive</h2>

      <div className="search-filter-section">
        <input
          type="text"
          placeholder="Search by name, location, or title"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="search-bar"
        />
        <select
          value={filterType}
          onChange={e => setFilterType(e.target.value)}
          className="filter-dropdown"
        >
          <option value="">All Types</option>
          <option value="missing">Missing</option>
          <option value="road-accident">Road Accident</option>
          <option value="article">Article</option>
        </select>
      </div>

      <div className="case-list">
        {filteredCases.length === 0 ? (
          <p>No cases found.</p>
        ) : (
          filteredCases.map(item => (
            <div key={item._id || item.id} className="case-item">
              {(item.photo || item.image) && (
                <img
                  src={(item.photo || item.image)?.startsWith('http')
                    ? (item.photo || item.image)
                    : `http://localhost:5000${item.photo || item.image}`}
                  alt={item.name || item.title}
                />
              )}
              <h3>{item.title || item.name}</h3>
              <p>{item.description || item.article}</p>
              {item.lastSeenLocation && <small>Location: {item.lastSeenLocation}</small>}
              {item.location && <small>Accident Location: {item.location}</small>}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CaseArchive;
