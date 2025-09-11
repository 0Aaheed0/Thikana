import React from 'react';
import './HelpBoard.css';

const HelpBoard = () => {
    const contacts = [
        { name: 'John Doe', phone: '123-456-7890', email: 'john.doe@example.com' },
        { name: 'Jane Smith', phone: '098-765-4321', email: 'jane.smith@example.com' },
        { name: 'Peter Jones', phone: '111-222-3333', email: 'peter.jones@example.com' }
    ];

    return (
        <div className="help-board-container">
            <h1>HELP BOARD</h1>
            <div className="contact-list">
                {contacts.map((contact, index) => (
                    <div key={index} className="contact-card">
                        <h2>{contact.name}</h2>
                        <p>Phone: {contact.phone}</p>
                        <p>Email: {contact.email}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HelpBoard;
