import React from 'react';
import { Link } from 'react-router-dom';
import HomeData from '../JSON/home.json';
import { v4 as uuidv4 } from 'uuid';
// import TextMe from "./TextMe";

const Home = () => {
  const homeElements = HomeData.map((obj) => {
    const { name, path } = obj;
    return (
      <div key={uuidv4()} className="container-btn-house">
        <Link to={path}>
          <div className="container-btn-blur"></div>
          <button
            className={
              name === 'Blumenstation und Bestellungen'
                ? 'btn-shop'
                : name === 'Dekorationen und Auftragsarbeiten'
                ? 'btn-deco'
                : name === 'Veranstaltungen'
                ? 'btn-events'
                : name === 'Raumvermietung'
                ? 'btn-rental'
                : name === 'Ballett/Pilates'
                ? 'btn-ballet'
                : 'btn-technical'
            }
          ></button>

          <div className="container-categorys">{name}</div>
        </Link>
      </div>
    );
  });

  const cardElements = HomeData.map((obj) => {
    const { name, path, img, description } = obj;
    return (
      <div key={uuidv4()} className="card-element">
        {/* blur effect */}
        <div className="container-blur"></div>
        {/* card top */}
        <div className="card-top">
          <h3>{name}</h3>
          {/* Card Logo */}
          <div className="container-card-logo">
            <div className="logo-colors orange"></div>
            <div className="logo-colors violet"></div>
            <div className="logo-colors green"></div>
            <div className="logo-colors blue"></div>
            <div className="logo-colors red"></div>
          </div>
        </div>
        {/* Description */}
        <div className="container-description">
          <p>{description}</p>
        </div>

        {/* Image */}
        <div className="container-image">
          <img src={img} alt="site images" />
        </div>

        <div
          className={
            name === 'Blumenstation und Bestellungen'
              ? 'container-bottom-btn bg-shop'
              : name === 'Dekorationen und Auftragsarbeiten'
              ? 'container-bottom-btn bg-deco'
              : name === 'Veranstaltungen'
              ? 'container-bottom-btn bg-events'
              : name === 'Raumvermietung'
              ? 'container-bottom-btn bg-rental'
              : name === 'Ballett/Pilates'
              ? 'container-bottom-btn bg-ballet'
              : 'container-bottom-btn bg-technical'
          }
        >
          <Link to={path}>
            <button>{name}</button>
          </Link>
        </div>
      </div>
    );
  });

  return (
    <div className="home">
      <div className="bg-home">
        <img
          src={process.env.PUBLIC_URL + '../images/bg-barrels.jpg'}
          alt="barrels"
        />
      </div>
      <div className="home-top">
        <div className="roof"></div>
        <h1>Casa Verde</h1>
        <p>RAUM FÜR IDEEN</p>
      </div>
      <div className="wrapper-btn-house">{homeElements}</div>
      <div className="wrapper-cards">{cardElements}</div>
      {/* <TextMe /> */}
    </div>
  );
};

export default Home;
