import React from 'react';
import ContactForm from './ContactForm';
import Map from "./Map";

const Rent = () => {
    return (
        <div className="home">
      <div className="home-top">
        <div className="roof"></div>
        <h1>Casa Verde</h1>
        <p>Rental Services</p>
      </div>
      <div>image???</div>
      <button>Contact Now!</button>
      <div>Images- not ready</div>
      <ContactForm />
      <Map />
    </div>
    );
}

export default Rent;
