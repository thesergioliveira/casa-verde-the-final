import React, { useState } from "react";
import { Link } from "react-router-dom";
import ServicesData from "../JSON/services.json";
import Weddings from "../components/Gallery/Weddings";
import PlantIdeas from "../components/Gallery/PlantIdeas";
import GiftIdeas from "../components/Gallery/GiftIdeas";
import ContactInformation from "./ContactInformation";
import ContactForm from "./ContactForm";
import Map from "./Map";

const Services = () => {
  const servicesMenu = ServicesData.map((obj) => {
    const { id, name, link } = obj;
    return (
      <li key={id}>
        {/* the link is working only using anchor in this example */}
        {/* <Link to={link}>{name}</Link> */}
        <a href={link}>{name}</a>
      </li>
    );
  });

  return (
    <div className="home">
      <div className="home-top">
        <div className="roof"></div>
        <h1>Casa Verde</h1>
        <p>Decoration Services</p>
      </div>

      <ul>{servicesMenu}</ul>

      <a href="#contact">
        <button>Contact Now!</button>
      </a>

      {/* Weddings */}
      <Weddings />

      {/* Plant Ideas */}
      <PlantIdeas />

      {/* Gift Ideas */}
      <GiftIdeas />

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
