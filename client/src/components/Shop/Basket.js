import React from "react";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../AuthContext";
import { Link } from "react-router-dom";
import ShopItem from "./ShopItem";
const Basket = () => {
  //
  // console.log(UserData.token)
  // console.log(userdata.user.wishlist.map(item => item._id))
  const [data, setData] = useState([]);
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
  //no dublicated items
  let cartItems = data.basket?.map((item) => {
    return [item._id, item];
  });
  let maparr = new Map(cartItems);

  let result = [...maparr.values()];

  return (
    <div className="main-basket-container">
<<<<<<< HEAD
      <span>
        <h1> Shopping Basket</h1>
        <p className="popup-message">
          {" "}
          <i>&nbsp;&nbsp;!&nbsp;&nbsp;</i>&nbsp;
          Bitte beachte das nicht alle Artikel versendet werden können!
        </p>
        <h2> welcome {data?.username} </h2>
      </span>
=======
      <h1>Shopping Basket</h1>
>>>>>>> cd274e9fce30fdf01da27766eea4155f9e24bf22
      <div className="lists-container">
        <p className="shipping-msg">
          ❗ Please take a note that not articles can be send !
        </p>
        <ul className="basket-list">
          <li>
            <h3> Basket </h3>
          </li>
          {result?.map((obj, index) => (
            <li key={index}>
              <ShopItem obj={obj} />
            </li>
          ))}
        </ul>

        <ul className="wishlist-list">
          <li>
            
            <h3> Wishlist </h3>
          </li>

          {data.wishlist?.map((obj, index) => (
            <li key={index}>
              <ShopItem obj={obj} />
            </li>
          ))}
        </ul>
<<<<<<< HEAD
      </div>
      <aside>
        <h4>Abholung</h4>

        <ul>
          <li>
            <p>Mo. - Fr. </p> <p>8:00 - 18:00Uhr</p>
          </li>
          <li>
            <p>Sa. </p> <p>9:00 - 14:00Uhr</p>
          </li>
          <li>
            <p>So./Feiertage</p> <p> 9:00 - 13:00Uhr</p>
          </li>
        </ul>
      </aside>
      <aside>
        <h4>Adresse</h4>

        <p>Casa Verde</p>
        <p>Hauptstr. 253 12345 Stadt</p>
      </aside>
      
      <Link  to="/basket/checkout">
        
        <h3>
          Total:
          {data.basket?.map((item) => item.price).reduce((a, b) => a + b, 0)} $
        </h3>
       <p> proceed to Checkout</p>
       
      </Link> 
=======
      </div>{" "}
      <h3>
        Total:
        {data.basket?.map((item) => item.price).reduce((a, b) => a + b, 0)} $
      </h3>
      <Link className="checkout-link" to="/basket/checkout">
        Proceed to Checkout{" "}
      </Link>
>>>>>>> cd274e9fce30fdf01da27766eea4155f9e24bf22
    </div>
  );
};

export default Basket;
