import React from "react";
//import { Link } from "react-router-dom";
import ServicesData from "../JSON/services.json";
import Weddings from "../components/Gallery/Weddings";
import PlantIdeas from "../components/Gallery/PlantIdeas";
import GiftIdeas from "../components/Gallery/GiftIdeas";
import Funerals from "../components/Gallery/Funerals";
import ContactInformation from "./ContactInformation";
import ContactForm from "./ContactForm";
import Map from "./Map";
import { v4 as uuidv4 } from "uuid";

const Services = () => {
  const servicesMenu = ServicesData.map((obj) => {
    const { id, name, link } = obj;

    return (
      <div
        key={uuidv4()}
        className="container-btn-house container-deco-services"
      >
        <div className="container-btn-blur"></div>
        <button
          className={
            name === "Weddings"
              ? "btn-rental"
              : name === "Plant ideas"
              ? "btn-events"
              : name === "Gift ideas"
              ? "btn-ballet"
              : "btn-deco"
          }
        ></button>

        <a href={link}>
          <div className="container-categorys">{name}</div>
        </a>
      </div>
    );
  });

  return (
    <div className="home">
      <div className="wrapper-event-section">
        <div className="bg-services">
          <img
            src={process.env.PUBLIC_URL + "../images/bg-barrels.jpg"}
            alt="barrels"
          />
        </div>

        <div className="container-buttons-roof">
          <div className="home-top">
            <div className="roof tablet-width"></div>
            <h1>Casa Verde</h1>
            <p>Dekorationen</p>
          </div>

          <div className="wrapper-btn-house deco-services">{servicesMenu}</div>

          <div className="container-contact-btn">
            <a href="#contact">
              <div className="container-contact-blur"></div>
              <button>Contact Now!</button>
            </a>
          </div>
        </div>
      </div>
      <h3>
        Blumen sind die schönsten Worte der Natur, diese für Ihre wichtigen
        Anlässe persönlich abzustimmen liegt uns am Herzen.
      </h3>
      <div className="wrapper-gallery">
        {/* Weddings */}
        <Weddings />

        {/* Plant Ideas */}
        <PlantIdeas />

        {/* Gift Ideas */}
        <GiftIdeas />

        {/* Funerals */}
        <Funerals />
      </div>

      {/* Info, Form && Map */}
      <ContactInformation />
      <div className="form-map">
        <ContactForm />
        <Map />
      </div>
    </div>
  );
};

export default Services;
