import React from "react";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../AuthContext";
import {Link} from "react-router-dom"
import ShopItem from "./ShopItem";
const Basket = () => {
  //
  // console.log(UserData.token)
  // console.log(userdata.user.wishlist.map(item => item._id))
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [token] = useContext(AuthContext);
  const config = {
    headers: {
      authorization: token,
    },
  }; 
  useEffect(() => {
    const displayData = async () => {
      await axios
        .get("user/getTheBasket", config)
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => {
          console.log("SOS SOS SOS SOS", err.message);
        });
    };

    displayData();
  }, []);

  
 return (
    <div className="main-basket-container">
      <span>
      <h1> welcome {data?.username} </h1>
      <h2> Shopping Basket</h2>
     </span>
     <Link className="checkout-link" to="/basket/checkout">
        <h3>
          Total:
          {data.basket?.map((item) => item.price).reduce((a, b) => a + b, 0)} $
        </h3>
        proceed to Checkout </Link>
      <div className="lists-container">
      
        
        <ul className="basket-list">
        <li> <h3> basket </h3></li>
          {data.basket?.map((obj, index) => (
            
            <li key={index}>
              
           <ShopItem obj={obj}/>

            </li>
          ))}
        </ul>
       
        <ul className="wishlist-list">
          <li> <h3> wishlist </h3></li>
          
          {data.wishlist?.map((obj, index) => (
            <li key={index}>
            <ShopItem obj={obj}/>
            </li>
          ))}
        </ul>
       
      </div>
    </div>
  );
};

export default Basket;
