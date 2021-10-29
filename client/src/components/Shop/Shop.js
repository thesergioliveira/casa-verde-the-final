// Test comment
import axios from "axios";
import { useState, useEffect } from "react";
import React from "react";
import { Link } from "react-router-dom";
import { get } from "mongoose";
import Shopitem from "./Shopitem";

function Shop() {
  const [data, setData] = useState([]);

  //show all products
  const getAllProducts = () => {
    const config = {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    };

    axios
      .get("user/products", config)
      .then((res) => {
        if (res.data) {
          setData(res.data);
          // console.log(res.data);
        } else {
          setData({ message: "user NOT Authenticated" });
        }
      })
      .catch((err) => {
        console.log("here", err.message);
      });
  };

  //localStorage.setItem("data", JSON.stringify(data));s
  const getBasket = localStorage.getItem("basket");
  console.log(getBasket);
  useEffect(() => {
    getAllProducts();
  }, []);

  if (data?.auth === false || data.length === 0) {
    return (
      <div>
        <h1>you are logged out </h1>
        <Link to="/login">Login</Link>
      </div>
    );
  }

  const getProducts = data?.map((obj) => {
    const { _id, category, name, price, description, quantity } = obj;

    return <Shopitem obj={obj} />;
  });
  console.log(typeof getBasket);
  return (
    <div>
      <nav>basket: you have {getBasket} in your basket</nav>
      {/* <p>
        Total: €
        {getProducts.reduce((sum, item) => sum + item.price * item.quantity, 0)}
      </p> */}
      <h1>Hi, I am the Shop Component!!!</h1>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        {getProducts}
      </div>
    </div>
  );
}

export default Shop;
