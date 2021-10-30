import React from "react";
import ContactInformation from "./ContactInformation";
import ShopSlider from "./Shop/ShopSlider";
import ContactForm from "./ContactForm";
import Map from "./Map";

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

      {/* Slider */}
      <ShopSlider />

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
