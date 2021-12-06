import React from "react";

const ContactSven = () => {
  return (
    <div className="info-container">
      {/* Header */}
      <div className="info-header">
        <h4 id="contact">Kontakt</h4>
      </div>

      {/* Phone && Mail */}
      <div className="contact-info">
        <div className="phone">
          <h5>Tel.</h5>
          <a href="tel:+49 (0) 177 55226841">+49 (0) 176 207 233 53</a>
        </div>
        <div className="mail">
          <h5>E-Mail</h5>
          <a href="mailto:s.u.wacker@outlook.de">s.u.wacker@outlook.de</a>
        </div>

        {/* Address */}
      </div>
      <div className="location">
        <h5>Dipl.-Ing.(FH)</h5>
        <h5>Sven Wacker</h5>
        <p>Hauptstraße 28A</p>
        <p>67304 Eisenberg (Pfalz)</p>
      </div>
    </div>
  );
};

export default ContactSven;
