import React from "react";
import Map from "./Map";
import ContactForm from "./ContactForm";

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
      <ContactForm />
      <Map />
    </div>
  );
};

export default TechnicalConsulting;
