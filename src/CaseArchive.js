import React, { useEffect, useState } from 'react';
import { useParams, Link, NavLink } from 'react-router-dom';
import './CaseArchive.css';
import articles from './articles';

const CaseArchive = () => {
    const { caseType } = useParams();
    const [search, setSearch] = useState("");
    const [filterType, setFilterType] = useState("");
    const [filterStatus, setFilterStatus] = useState("");
    const [dateFrom, setDateFrom] = useState("");
    const [dateTo, setDateTo] = useState("");

    // Dummy status and date fields for demonstration
    // In real data, articles should have status and date fields
    const statusOptions = ["", "resolved", "closed"];
    const typeOptions = ["", "missing", "road-accident", "complaint", "request", "application"];

    // Filtering logic
    const filteredCases = articles.filter(article => {
        // Case Type filter (from URL or dropdown)
        if (caseType && article.caseType !== caseType) return false;
        if (filterType && article.caseType !== filterType) return false;
        // Search filter
        if (search) {
            const searchLower = search.toLowerCase();
            if (!(
                article.title.toLowerCase().includes(searchLower) ||
                (article.id + "").includes(searchLower) ||
                (article.address && article.address.toLowerCase().includes(searchLower))
            )) return false;
        }
        // Status filter (dummy, assumes article.status exists)
        if (filterStatus && article.status !== filterStatus) return false;
        // Date range filter (dummy, assumes article.dateSubmitted or article.dateClosed exists)
        if (dateFrom && article.dateSubmitted && article.dateSubmitted < dateFrom) return false;
        if (dateTo && article.dateSubmitted && article.dateSubmitted > dateTo) return false;
        return true;
    });

    // Create a display-friendly title
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
                        <div key={caseItem.id} className="case-item">
                            <img src={caseItem.image} alt={caseItem.title} />
                            <h2>{caseItem.title}</h2>
                            <p>{caseItem.shortDescription}</p>
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