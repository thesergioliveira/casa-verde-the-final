import React from "react";
import { Link } from "react-router-dom";
import LogoData from "../../JSON/logo.json";
import FooterData from "../../JSON/footer.json";
import { v4 as uuidv4 } from "uuid";
import Cookies from "./Cookies";

// Only About and Contact pages links are working for the moment
// The other are not created

const Footer = () => {
  // Year inside footer
  let now = new Date();
  let year = now.getFullYear();

  // Logo setup
  const logo = LogoData.map((obj) => {
    const { name, path, img } = obj;
    return (
      <Link to={path} key={uuidv4()}>
        <img src={img} alt={name} key={uuidv4()} className={name} />
      </Link>
    );
  });

  const footerMenu = FooterData.map((obj) => {
    const { name, path } = obj;
    return (
      <li key={uuidv4()}>
        <Link to={path} key={uuidv4()}>{name}</Link>
      </li>
    );
  });

  return (
    <>
      <footer>
        {/* Need to add public.env */}
        <div className="logo-container">{logo}</div>
          <ul>
          {footerMenu}
          </ul>
        <div className="footer-main">
          <p>Made by "Team Casa Verde"</p>
        </div>
        <div className="footer-secondary">
          <p>Copyrights reserved Ⓒ {year} Casa Verde</p>
        </div>
      </footer>
      <Cookies />
    </>
  );
};

export default Footer;
