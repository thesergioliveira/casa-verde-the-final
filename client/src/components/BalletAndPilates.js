import React from 'react';
import { Link } from 'react-router-dom';
import Ballet from './Gallery/Ballet';
import Pilates from './Gallery/Pilates';
import ContactForm from './ContactForm';
import ContactInformation from './ContactInformation';
import Map from './Map';

const BalletAndPilates = () => {
  return (
    <div className="home">
      <div className="home-top absolut">
        {/* <div className="roof"></div> */}
        <h1>Casa Verde</h1>
        <p>Courses</p>
      </div>

      <div className="container-courses">
        <img
          src={process.env.PUBLIC_URL + '../images/ballet_pilates.png'}
          alt="Aussenansicht Raumvermietung"
        />
      </div>

      <div className="h3-description">
        <h3>
          Here are some of the courses we provide, please feel free to contact
          us for any further information
        </h3>
      </div>

      <Ballet />
      <Pilates />
      <ContactInformation />
      <div className="form-map">
        <ContactForm />
        <Map />
      </div>
    </div>
  );
};

export default BalletAndPilates;
