import React from 'react';
import { Link } from "react-router-dom";
import ServicesData from "../services.json";
import ContactForm from './ContactForm';
import Map from "./Map";

const Services = () => {

  const servicesMenu = ServicesData.map((obj) => {
    const { id, name, link } = obj;
    return (
      <li key={id}>
        <Link to={link}>{name}</Link>
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
      <div>Images- not ready</div>
      <ContactForm />
     <Map />
    </div>
  );
}

export default Services;
