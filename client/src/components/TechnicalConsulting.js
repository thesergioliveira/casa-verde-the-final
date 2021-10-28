import React from "react";
import Map from "./Map";
import ContactForm from "./ContactForm";
import ContactInformation from "./ContactInformation";

const TechnicalConsulting = () => {
  return (
    <div className="home">
      <div className="home-top">
        <div className="roof"></div>
        <h1>Casa Verde</h1>
        <p>Technical Consulting</p>
      </div>
      <div>???</div>
      <button>Contact Now!</button>
      <div> ??? not ready</div>

      {/* Info, Form && Map */}
      <ContactInformation />
      <div className="form-map">
        <ContactForm />
        <Map />
      </div>
    </div>
  );
};

export default TechnicalConsulting;
