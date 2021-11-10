import React from "react";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../AuthContext";
import { Link } from "react-router-dom";
import Checkout from "./Checkout";
const Basket = () => {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [token] = useContext(AuthContext);
  const config = {
    headers: {
      authorization: token,
    },
<<<<<<< HEAD
  };
<<<<<<< HEAD
 useEffect(() => {
    const displayBasket = async () => {
      
=======
=======
  }; 
>>>>>>> 26ed61bdab1ed392c84f85097a4a6c560e0e669d
  useEffect(() => {
    const displayData = async () => {
>>>>>>> cd3a6e9955bff705a4645ffb8c05c33eed39d205
      await axios
        .get("user/getTheBasket", config)
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => {
          console.log("SOS SOS SOS SOS", err.message);
        });
    };

<<<<<<< HEAD
    displayBasket();
    
=======
    displayData();
>>>>>>> cd3a6e9955bff705a4645ffb8c05c33eed39d205
  }, []);

  
  return (
    <div>
      <h1> welcome {data?.username} </h1>
      <h2> Shopping Basket</h2>
      <div></div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        <ul>
          <h3> wishlist </h3>
          {data.wishlist?.map((item, index) => (
            <li key={index}>
              <p>{item.name}</p>
              <p>${item.price}</p>
              <p>only {item.quantity} left </p>
            </li>
          ))}
        </ul>
        <ul>
          <h3>basket</h3>
          {data.basket?.map((item, index) => (
            <li key={index}>
              <p>{item.name}</p>
              <p>${item.price}</p>
              <p>only {item.quantity} left </p>
            </li>
          ))}
        </ul>
        
        <Link to="/basket/checkout">
        <h3>
          Total:
          {data.basket?.map((item) => item.price).reduce((a, b) => a + b, 0)} $
        </h3>   
        proceed to Checkout </Link>
                   
                  
      </div>
    </div>
  );
};

export default Basket;
