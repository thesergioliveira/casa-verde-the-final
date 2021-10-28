import React from 'react';
import { Link } from 'react-router-dom';
import FooterData from '../footer.json';

// Only About and Contact pages links are working for the moment
// The other are not created

const Footer = () => {

  let now = new Date();
  let year = now.getFullYear();

  const footerMenu = FooterData.map((obj) => {
    const { id, name, path } = obj;
    return (
      <li key={id}>
        <Link  to={path}>
          {name}
        </Link>
      </li>
    );
  });

  return (
    <footer>
      {/* Need to add public.env */}
      <ul>
        {footerMenu}
      </ul>
      <p>Social Media (???)</p>
      <div className="footer-main">
        Made with ❤️ by team Casa Verde
      </div>
      <div className="footer-secondary">
        Copyrights reserved Ⓒ {year} Casa Verde
      </div>
    </footer>
  );
};

export default Footer;
