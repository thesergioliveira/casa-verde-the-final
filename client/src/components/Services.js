import React from 'react';
import { Link } from "react-router-dom";
import ServicesData from "../JSON/services.json";
import ContactForm from './ContactForm';
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
    const { id, name, linkId, img1, img2, img3, img4, img5, img6 } = obj;
    // tried to put the images into an array and map them, is not working for the  moment
    // const img = images.map((image) => {
    //   return (<img src={image} alt="details" width="100" height="100" />
        
    //   )
    //});
    //console.log(img);
    return (
      <li key={id}>
        <h2 id={linkId}>{name}</h2>
        <div>
        <img src={img1} alt="details" width="100" height="100" />
        <img src={img2} alt="details" width="100" height="100" />
        </div>
        <div>
        <img src={img3} alt="details" width="100" height="100" />
        <img src={img4} alt="details" width="100" height="100" />
        </div>
        <div>
        <img src={img5} alt="details" width="100" height="100" />
        <img src={img6} alt="details" width="100" height="100" />
        </div>
        {/* to do- create pages and adding links to them */}
        <Link to="/{linkId}"><button>Show more</button></Link>
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
      <a href="#contact"><button>Contact Now!</button></a>
      <div>
        {componentsMenu}
      </div>
      {/* to do- adding address */}
      <ContactForm />
     <Map />
    </div>
  );
}

export default Services;
