import React from "react";
import { Link } from "react-router-dom";
import HomeData from "../JSON/home.json";
import { v4 as uuidv4 } from "uuid";

const Home = () => {
  const homeElements = HomeData.map((obj) => {
    const { name, path } = obj;
    return (
      <div key={uuidv4()} className="container-btn-house">
        <Link to={path}>
          <button>{name}</button>
        </Link>
      </div>
    );
  });

  const cardElements = HomeData.map((obj) => {
    const { id, name, path, img } = obj;
    return (
      <div key={id} className="card-element">
        <div className="card-top">
          <h3>{name}</h3>
          <div>logo</div>
        </div>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <img src={img} alt="site images" />
        <div>
          <Link to={path}>
            <button>Go to {name}</button>
          </Link>
        </div>
      </div>
    );
  });

  return (
    <div className="home">
      <div className="home-top">
        <div className="roof"></div>
        <h1>Casa Verde</h1>
        <p>RAUM FÜR IDEEN</p>
      </div>
      <div className="wrapper-btn-house">{homeElements}</div>
      <div>{cardElements}</div>
    </div>
  );
};

export default Home;
