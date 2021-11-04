// Test comment
import axios from "axios";
import { useState, useEffect } from "react";
import React from "react";
import { Link } from "react-router-dom";
//import { get } from "mongoose";

import Shopitem from "./Shopitem";
//import { set } from "mongoose";

function Shop() {
  const [data, setData] = useState([]);
  const [userInput, setUserInput] = useState("");

  //to get all products
  const getAllProducts = () => {
    const config = {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    };
    //console.log(config);
    axios
      .get("user/products", config)
      .then((res) => {
        if (res.data) {
          localStorage.setItem("product", JSON.stringify(res.data));
          setData(res.data);
        } else {
          setData({ auth: false });
        }
      })
      .catch((err) => {
        console.log("here", err.response?.data.message);
      });
  };
  /* if(data===undefined){
    setData(localStorage.getItem("product"))
  }
  console.log("product",localStorage.getItem("product"))*/

  useEffect(() => {
    getAllProducts();
  }, []);
  const dataFromStorage = JSON.parse(localStorage.getItem("product"));
  //console.log(dataFromStorage);
  //console.log("dataFromStorage", JSON.parse(dataFromStorage));

  if (dataFromStorage === null || dataFromStorage?.auth === false) {
    return (
      <div>
        <h1>you are logged out</h1>
        <Link to="/login">Login</Link>
      </div>
    );
  }
  //searchbar setup here
  const changeHandle = (e) => {
    setUserInput(e.target.value);
    console.log(e.target.value);
  };

  /* const handleSubmit = (e) => {
    e.preventDefault();
  };*/
  const userText = userInput.toLocaleLowerCase().trim();
  var searchResult = dataFromStorage
    ?.filter(
      (el) =>
        el.name.includes(userText) ||
        el.description.includes(userText) ||
        el.category.includes(userText)
    )
    .map((obj) => {
      const { _id, category, name, price, description, quantity } = obj;
      return <Shopitem obj={obj} />;
    });
  console.log(userText);
  //getFlowerAndPlantsPots
  const getFlowerAndPlantsPots = dataFromStorage
    ?.filter((el) => el.category === "Flower and plants pots")
    .map((obj) => {
      const { _id, category, name, price, description, quantity } = obj;
      return <Shopitem obj={obj} />;
    });

  //getBouquetOfFlowers
  const getBouquetOfFlowers = dataFromStorage
    ?.filter((el) => el.category === "Bouquet of flowers")
    .map((obj) => {
      const { _id, category, name, price, description, quantity } = obj;

      return <Shopitem obj={obj} />;
    });

  //getGiftBaskets
  const getGiftBaskets = dataFromStorage
    ?.filter((el) => el.category === "Gift baskets")
    .map((obj) => {
      const { _id, category, name, price, description, quantity } = obj;
      return <Shopitem obj={obj} />;
    });

  //italianProducts
  const italianProducts = dataFromStorage
    ?.filter((el) => el.category === "Italian Products")
    .map((obj) => {
      const { _id, category, name, price, description, quantity } = obj;
      return <Shopitem obj={obj} />;
    });

  // get all products
  const getProducts = dataFromStorage?.map((obj) => {
    const { _id, category, name, price, description, quantity } = obj;

    return <Shopitem obj={obj} />;
  });
  return (
    <div>
      <h1>WELCOME TO OUR CASA VERDE SHOP</h1>
      <input
        type="search"
        name="search"
        onChange={changeHandle}
        value={userInput}
        className="searchInput"
        placeholder="search ..."
      />
      price:{" "}
      <select id="price">
        <option value="high"> high to low </option>
        <option value="low"> low to high </option>
      </select>
      delivery method:{" "}
      <select id="delivery">
        <option value="all"> all </option>
        <option value="notshipped"> pick up from store </option>
        <option value="shipped"> shipping </option>
      </select>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        <div
          className="space-for-results"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexWrap: "wrap",
            backgroundColor: "red",
          }}
        >
          {userInput.length ? searchResult : null}
        </div>

        <h2>Flower and plants pots</h2>
        {getFlowerAndPlantsPots}
        <h2>Bouquet of flowers</h2>
        {getBouquetOfFlowers}
        <h2>Gift baskets</h2>
        {getGiftBaskets}
        <h2>Italian Products</h2>
        {italianProducts}
        <h2>View All </h2>
        {getProducts}
      </div>
    </div>
  );
}

export default Shop;
