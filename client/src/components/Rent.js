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
      <div className="home-top absolut">
        {/* <div className="roof"></div> */}
        <h1 className="header-rental">Casa Verde</h1>
        <p className="subheader-rental">Raumvermietung</p>
      </div>

      <div className="container-room-rental">
        <img
          src={process.env.PUBLIC_URL + "../images/room-rental.jpg"}
          alt="Aussenansicht Raumvermietung"
        />
      </div>

      <div className="h3-description">
        <h3>Text für Raumvermietung hier</h3>
      </div>

      <div className="wrapper-gallery">
        <RoomRental />
      </div>

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
