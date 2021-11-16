import React from "react";
import RoomRental from "./Gallery/RoomRental";
import ContactInformation from "./ContactInformation";
import ContactForm from "./ContactForm";
import Map from "./Map";

const Rent = () => {
  return (
    // Main Wrapper
    <div className="home">
      {/* Roof */}
      <div className="home-top">
        <div className="roof"></div>
        <h1>Casa Verde</h1>
        <p>Rental Services</p>
      </div>

      <RoomRental />
      {/* to do- adding calendar */}
      <ContactInformation />
      <div className="form-map">
        <ContactForm />
        <Map />
      </div>
    </div>
  );
};

export default Rent;
