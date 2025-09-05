import React from 'react';
import { useParams, Link } from 'react-router-dom';
import './CaseArchive.css';
import articles from './articles';

const CaseArchive = () => {
    const { caseType } = useParams();
    const caseList = articles.filter(article => article.caseType === caseType);

    return (
        <div className="case-archive-container">
            <h1>{caseType.replace('-', ' ').toUpperCase()} Cases</h1>
            <div className="case-list">
                {caseList.length > 0 ? (
                    caseList.map(caseItem => (
                        <div key={caseItem.id} className="case-item">
                            <img src={caseItem.image} alt={caseItem.title} />
                            <h2>{caseItem.title}</h2>
                            <p>{caseItem.description}</p>
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
