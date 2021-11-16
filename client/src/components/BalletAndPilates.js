import React from "react";
import { Link } from "react-router-dom";
import CoursesData from "../JSON/courses.json";
import Ballet from "./Gallery/Ballet";
import ContactForm from "./ContactForm";
import ContactInformation from "./ContactInformation";
import Map from "./Map";

const BalletAndPilates = () => {
  const coursesMenu = CoursesData.map((obj) => {
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
        <p>Courses</p>
      </div>
      <ul>{coursesMenu}</ul>
      <a href="#contact">
        <button>Contact Now!</button>
      </a>
      <Ballet />
      <ContactInformation />
      <div className="form-map">
        <ContactForm />
        <Map />
      </div>
    </div>
  );
};

export default BalletAndPilates;
