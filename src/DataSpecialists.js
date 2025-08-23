import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './DataSpecialists.css';

const specialists = [
  {
    name: 'Dr. Jane Doe',
    title: 'Criminal Data Analyst',
    image: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'Dr. Doe is a leading expert in criminal data analysis, with over 15 years of experience in the field. She specializes in predictive modeling and crime pattern analysis.',
    contact: 'jane.doe@gmail.com'
  },
  {
    name: 'John Smith',
    title: 'Missing Persons Specialist',
    image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'John Smith is a retired detective who now works as a consultant on missing person cases. He has a deep understanding of investigation techniques and data analysis.',
    contact: 'john.smith@gmail.com'
  },
  {
    name: 'Dr. Emily White',
    title: 'Road Accident Analyst',
    image: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'Dr. White is a data scientist who specializes in analyzing road accident data. Her work helps to identify dangerous intersections and develop strategies to improve road safety.',
    contact: 'emily.white@gmail.com'
  },
  {
    name: 'David Chen',
    title: 'Cybercrime Investigator',
    image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'David Chen is a cybercrime investigator with a focus on online fraud and data breaches. He has a background in computer science and digital forensics.',
    contact: 'david.chen@gmail.com'
  },
  {
    name: 'Maria Garcia',
    title: 'Forensic Anthropologist',
    image: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'Maria Garcia is a forensic anthropologist who assists in the identification of human remains. Her work is crucial in solving cold cases and bringing closure to families.',
    contact: 'maria.garcia@gmail.com'
  }
];

function DataSpecialists() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000
  };

  return (
    <section className="data-specialists-section">
      <h2>Data Specialists</h2>
      <Slider {...settings}>
        {specialists.map((specialist, index) => (
          <div key={index} className="specialist-card">
            <img src={specialist.image} alt={specialist.name} />
            <div className="specialist-info">
              <h3>{specialist.name}</h3>
              <h4>{specialist.title}</h4>
              <p>{specialist.description}</p>
              <p className="contact-info">Contact: {specialist.contact}</p>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
}

export default DataSpecialists;
