import React from "react";
import { Link } from "react-router-dom";
import EventsData from "../JSON/events.json";
import Workshops from "./Gallery/Workshops";
import Seminaries from "./Gallery/Seminaries";
import Artmarket from "./Gallery/Artmarket";
import ContactInformation from "./ContactInformation";
import ContactForm from "./ContactForm";
import Map from "./Map";

const Events = () => {
  const eventsMenu = EventsData.map((obj) => {
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
        <p>Events</p>
      </div>
      <ul>{eventsMenu}</ul>
      <a href="#contact">
        <button>Contact Now!</button>
      </a>
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
