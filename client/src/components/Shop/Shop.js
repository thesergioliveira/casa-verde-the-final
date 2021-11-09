import axios from "axios";
import { useState, useEffect } from "react";
import React from "react";
//import { Link } from "react-router-dom";
//import { get } from "mongoose";
import ShopItem from "./ShopItem";
import ShopSlider from "./ShopSlider";
function Shop() {
  const [data, setData] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [priceInput, setPriceInput] = useState("");
  const [deliveryInput, setDeliveryInput] = useState(1);
  //to get all products
  const getAllProducts = () => {
    // the config will use it when add to the basket to check if its the right user or not
    /*const config = {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    };*/
    axios
      .get("user/products")
      .then((res) => {
        if (res.data) {
          //console.log(res.data)
          setData(res.data);
          localStorage.setItem("product", JSON.stringify(res.data));
        } else {
          setData({ auth: false });
        }
      })
      .catch((err) => {
        console.log("here", err.response?.data);
      });
  };
  const productFromStorage = JSON.parse(localStorage.getItem("product"));
  //console.log(productFromStorage)
  useEffect(() => {
    getAllProducts();
  }, [deliveryInput]);

  //searchbar setup here
  const changeHandle = (e) => {
    setUserInput(e.target.value);
  };
  const userText = userInput.toLocaleLowerCase().trim();
  let searchResult = productFromStorage
    ?.filter(
      (el) =>
        el.name.includes(userText) ||
        el.description.includes(userText) ||
        el.category.includes(userText)
    )
    .map((obj) => {
      // const {
      //   id,
      //   category,
      //   name,
      //   price,
      //   description,
      //   delivery,
      //   image,
      //   quantity,
      // } = obj;
      return <ShopItem obj={obj} />;
    });
  // products price filter
  priceInput === "high"
    ? data.sort((a, b) => b.price - a.price)
    : data.sort((a, b) => a.price - b.price);
  //delivery filter  WE NEED NEW SCHEMA PLZ DONT DELETE
  // if (deliveryInput=="yes"){
  // data && setData(data.filter(el => el.delivery === true))
  // }else if (deliveryInput=="no"){
  //   data && setData(data.filter(el => el.delivery === false))
  // }
  //console.log(priceInput , deliveryInput)
  //getFlowerAndPlantsPots
  const getFlowerAndPlantsPots = data
    ?.filter((el) => el.category === "Flower and plants pots")
    .map((obj) => {
      // const { id, category, name, price, description, quantity } = obj;
      return <ShopItem obj={obj} />;
    });
  //getBouquetOfFlowers
  const getBouquetOfFlowers = data
    ?.filter((el) => el.category === "Bouquet of flowers")
    .map((obj) => {
      // const { id, category, name, price, description, quantity } = obj;
      return <ShopItem obj={obj} />;
    });
  //getGiftBaskets
  const getGiftBaskets = data
    ?.filter((el) => el.category === "Gift baskets")
    .map((obj) => {
      // const { id, category, name, price, description, quantity } = obj;
      return <ShopItem obj={obj} />;
    });
  //italianProducts
  const italianProducts = data
    ?.filter((el) => el.category === "Italian Products")
    .map((obj) => {
      // const { id, category, name, price, description, quantity } = obj;
      return <ShopItem obj={obj} />;
    });
  // get all products
  const getProducts = data?.map((obj) => {
    // const { _id, category, name, price, description, quantity } = obj;
    // version with ul
    // return <li><ShopItem obj ={obj} /></li>
    return <ShopItem obj={obj} />;
  });
  return (
    <div className="shop">
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
      <select
        id="price"
        onChange={(e) => {
          setPriceInput(e.target.value);
        }}
      >
        <option value="low"> low to high </option>
        <option value="high"> high to low </option>
      </select>
      delivery method:{" "}
      <select
        id="delivery"
        onChange={(e) => {
          // setDeliveryInput(e.target.value)
          setDeliveryInput(deliveryInput + 1);
          let newdata = data.filter(
            (el) => el.delivery.toString() === e.target.value
          );
          setData(newdata);
          console.log(typeof e.target.value, e.target.value);
          console.log(newdata);
          //
        }}
      >
        <option value={true}> pick up from store </option>
        <option value={false}> shipping </option>
        <option value={null}> all </option>
      </select>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
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
        {/* Slider */}
        <ShopSlider />
        <div className="products-container">
          <h2>Flower and plants pots</h2>
          <div className="products">{getFlowerAndPlantsPots}</div>
          <h2>Bouquet of flowers</h2>
          <div className="products">{getBouquetOfFlowers}</div>
          <h2>Gift baskets</h2>
          <div className="products">{getGiftBaskets}</div>
          <h2>Italian Products</h2>
          <div className="products">{italianProducts}</div>
          <h2>View All </h2>
          <div className="products">{getProducts}</div>
        </div>
        {/* version with ul */}
        {/* <ul>{getProducts}</ul> */}
      </div>
    </div>
  );
}
export default Shop;
