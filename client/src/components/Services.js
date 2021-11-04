import React from "react";
import { Link } from "react-router-dom";
import ServicesData from "../JSON/services.json";
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

  const componentsMenu = ServicesData.map((obj) => {
    const { id, name, linkId, imgs } = obj;

    return (
      <div className="container-test">
        <h3 key={id}>{name}</h3>
        <div className="container-two">
          {imgs.map((img) => {
            if (imgs.indexOf(img) <= 5) {
              return (
                <div key={id} className="img-container">
                  <img src={img} alt={linkId} />
                </div>
              );
            }
          })}
        </div>
        <button key={id}>Show more</button>
      </div>
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

      {/* Display images */}
      <div className="wrapper-img-services">{componentsMenu}</div>

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
