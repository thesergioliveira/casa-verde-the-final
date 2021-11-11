import React from 'react';
import ContactForm from './ContactForm';
import ContactInformation from './ContactInformation';
import Map from "./Map";

const Contact = () => {
    return (
        <div>
            <ContactInformation />
      <div className="form-map">
        <ContactForm />
        <Map />
      </div>
        </div>
    );
}

export default Contact;
