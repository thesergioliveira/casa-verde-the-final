import React from "react";
import { Link } from "react-router-dom";
import TechnicData from "../JSON/technic.json";
import Technical from "./Gallery/Technical";
import ContactInformation from "./ContactInformation";
import ContactForm from "./ContactForm";
import Map from "./Map";

const TechnicalConsulting = () => {
  return (
    <div className="home">
      <div className="home-top absolut">
        {/* <div className="roof"></div> */}
        <h1>Casa Verde</h1>
        <p>Technische Beratung</p>
      </div>

      <div className="container-room-rental">
        <img
          src={process.env.PUBLIC_URL + "../images/technical.png"}
          alt="Aussenansicht Raumvermietung"
        />
      </div>

      <Technical />

      {/* to do- adding calendar and address */}
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
