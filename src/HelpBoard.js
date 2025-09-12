import React from 'react';
import './HelpBoard.css';

const HelpBoard = () => {
  const faqs = [
    {
      question: "What should I do first if I witness a road accident?",
      answer: "Call emergency services immediately and ensure your own safety before assisting others."
    },
    {
      question: "How can I report a missing person?",
      answer: "Contact your local police station with details such as name, age, last seen location, and a recent photograph."
    },
    {
      question: "Who should I contact for immediate medical help after an accident?",
      answer: "Dial the national emergency number (like 999) or call an ambulance service directly."
    },
    {
      question: "What information is most useful when reporting a road accident?",
      answer: "Provide the location, number of vehicles involved, severity of injuries, and any hazards at the scene."
    },
    {
      question: "How long should I wait before reporting someone missing?",
      answer: "Report a missing person as soon as you suspect they are missing, especially if they are a child or vulnerable adult."
    }
  ];

  return (
    <div className="help-board-container">
      <h1>HELP BOARD - FAQ</h1>
      <div className="faq-list">
        {faqs.map((faq, index) => (
          <div key={index} className="faq-card">
            <h2>Q: {faq.question}</h2>
            <p><strong>A:</strong> {faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HelpBoard;
