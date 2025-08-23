import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './Organizations.css';

const organizations = [
  {
    name: 'National Center for Missing & Exploited Children',
    logo: 'https://seeklogo.com/images/N/national-center-for-missing-and-exploited-children-logo-C420000000-seeklogo.com.png',
    description: 'The National Center for Missing & Exploited Children is a private, non-profit organization established in 1984 by the United States Congress. NCMEC serves as the national clearinghouse and resource center for information about missing and exploited children.',
    contact: '1-800-THE-LOST (1-800-843-5678)'
  },
  {
    name: 'National Association of Professional Accident Reconstruction Specialists',
    logo: 'https://www.napars.org/images/logo-napars-2017.png',
    description: 'NAPARS is a non-profit organization whose members are dedicated to the advancement of the art and science of traffic accident investigation and reconstruction. Their members are from both the private and public sectors.',
    contact: 'info@napars.org'
  },
  {
    name: 'The Doe Network',
    logo: 'https://brandfetch-prod.s3.amazonaws.com/34391b9d62334c8.png',
    description: 'The Doe Network is a 100% volunteer organization devoted to assisting investigating agencies in bringing closure to national and international cold cases for missing and unidentified persons.',
    contact: 'admin@doenetwork.org'
  },
  {
    name: 'Community United Effort (CUE)',
    logo: 'https://www.ncmissingpersons.org/wp-content/uploads/2019/11/cue-center-logo.png',
    description: 'CUE Center for Missing Persons is a 501(c)3 non-profit organization that provides advocacy for missing persons and their families. They offer a wide range of services, including search and rescue, victim support, and community education.',
    contact: '(910) 343-1131'
  },
  {
    name: 'Mothers Against Drunk Driving (MADD)',
    logo: 'https://www.madd.org/wp-content/uploads/2021/03/MADD_Logo_2021.png',
    description: 'Mothers Against Drunk Driving (MADD) is a non-profit organization in the United States, Canada and Brazil that seeks to stop drunk driving, support those affected by drunk driving, prevent underage drinking, and strive for stricter impaired driving policy, whether that impairment is caused by alcohol or any other drug.',
    contact: '1-877-ASK-MADD (1-877-275-6233)'
  }
];

function Organizations() {
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
    <section className="organizations-section">
      <h2>Organizations</h2>
      <Slider {...settings}>
        {organizations.map((org, index) => (
          <div key={index} className="organization-card">
            <img src={org.logo} alt={org.name} />
            <div className="organization-info">
              <h3>{org.name}</h3>
              <p>{org.description}</p>
              <p className="contact-info">Contact: {org.contact}</p>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
}

export default Organizations;
