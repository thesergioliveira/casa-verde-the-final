import React from 'react';

const ContactInformation = () => {
  return (
    <div className="info-container">
      {/* Header */}
      <div className="info-header">
        <h4 id="contact">Kontakt</h4>
      </div>

      {/* Phone && Mail && Address*/}
      <div className="contact-info">
        <div className="phone">
          <h5>Tel.</h5>
          <a href="tel:+49 (0) 177 55226841">+49 (0) 176 411 631 71</a>
        </div>
        <div className="mail">
          <h5>E-Mail</h5>
          <a href="mailto:test@example.com">casa-verde@t-online.de</a>
        </div>
        <div className="location">
          <h5>Anschrift</h5>
          <p>Hauptstraße 28A</p>
          <p>67304 Eisenberg (Pfalz)</p>
        </div>
      </div>
    </div>
  );
};

export default ContactInformation;
