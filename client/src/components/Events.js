import React from "react";
import { Link } from "react-router-dom";
import EventsData from "../JSON/events.json";
import Workshops from "./Gallery/Workshops";
import Seminaries from "./Gallery/Seminaries";
import Artmarket from "./Gallery/Artmarket";
import ContactInformation from "./ContactInformation";
import ContactForm from "./ContactForm";
import Map from "./Map";
import { v4 as uuidv4 } from "uuid";

const Events = () => {
  const eventsMenu = EventsData.map((obj) => {
    const { name, link } = obj;
    return (
      <div key={uuidv4()} className="container-btn-house container-events">
        <div className="container-btn-blur"></div>
        <button
          className={
            name === "Workshops"
              ? "btn-rental"
              : name === "Seminaries"
              ? "btn-events"
              : "btn-ballet"
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
        <div className="bg-events">
          <img
            src={process.env.PUBLIC_URL + "../images/bg-barrels.jpg"}
            alt="barrels"
          />
        </div>

        <div className="container-buttons-roof">
          <div className="home-top">
            <div className="roof tablet-width laptop-width"></div>
            <h1>Casa Verde</h1>
            <p>Veranstaltungen</p>
          </div>
          <div className="wrapper-btn-house events">{eventsMenu}</div>

          {/* Contact Button */}
          <div className="container-contact-btn">
            <a href="#contact">
              <div className="container-contact-blur"></div>
              <button>Kontaktieren Sie uns!</button>
            </a>
          </div>
        </div>
      </div>

      <div className="h3-description">
        <h3>Text für Events hier</h3>
      </div>

      <Workshops />
      <Seminaries />
      <Artmarket />

      <ContactInformation />
      <div className="form-map">
        <ContactForm />
        <Map />
      </div>
    </div>
  );
};

export default Events;
