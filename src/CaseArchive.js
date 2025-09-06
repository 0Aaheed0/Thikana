import React, { useEffect } from 'react';
import { useParams, Link, NavLink } from 'react-router-dom';
import './CaseArchive.css';
import articles from './articles';

const CaseArchive = () => {
    const { caseType } = useParams();
    const caseList = caseType ? articles.filter(article => article.caseType === caseType) : articles;

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

            <div className="filter-buttons">
                <NavLink to="/case-archive" end>All</NavLink>
                <NavLink to="/case-archive/missing">Missing</NavLink>
                <NavLink to="/case-archive/road-accident">Road Accidents</NavLink>
            </div>

            <div className="case-list">
                {caseList.length > 0 ? (
                    caseList.map(caseItem => (
                        <div key={caseItem.id} className="case-item">
                            <img src={caseItem.image} alt={caseItem.title} />
                            <h2>{caseItem.title}</h2>
                            <p>{caseItem.shortDescription}</p> 
                            {/* Changed to shortDescription for brevity */}
                        </div>
                    ))
                ) : (
                    <p>No cases found for this category.</p>
                )}
            </div>
            <Link to="/" className="back-button">Go Back</Link>
        </div>
    );
};

export default CaseArchive;