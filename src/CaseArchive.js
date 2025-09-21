
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
                const response = await fetch('http://localhost:5000/api/cases');
                const data = await response.json();
                setCases(data);
            } catch (error) {
                console.error('Error fetching cases:', error);
            }
        };
        fetchCases();
    }, []);

    const statusOptions = ["", "open", "resolved", "closed"];
    const typeOptions = ["", "missing", "road-accident", "complaint", "request", "application"];

    const filteredCases = cases.filter(caseItem => {
        if (caseType && caseItem.caseType !== caseType) return false;
        if (filterType && caseItem.caseType !== filterType) return false;
        if (search) {
            const searchLower = search.toLowerCase();
            if (!(
                caseItem.name.toLowerCase().includes(searchLower) ||
                (caseItem._id && caseItem._id.toString().includes(searchLower)) ||
                (caseItem.description && caseItem.description.toLowerCase().includes(searchLower)) ||
                (caseItem.lastSeenLocation && caseItem.lastSeenLocation.toLowerCase().includes(searchLower)) ||
                (caseItem.location && caseItem.location.toLowerCase().includes(searchLower))
            )) return false;
        }
        if (filterStatus && caseItem.status !== filterStatus) return false;
        if (dateFrom && new Date(caseItem.dateSubmitted) < new Date(dateFrom)) return false;
        if (dateTo && new Date(caseItem.dateSubmitted) > new Date(dateTo)) return false;
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
                    placeholder="Search by resident name, case ID, or address"
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
                    filteredCases.map(caseItem => (
                        <div key={caseItem._id} className="case-item">
                            <img src={`http://localhost:5000/${caseItem.photo}`} alt={caseItem.name} />
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