import React from "react";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../AuthContext";
import { Link } from "react-router-dom";
import ShopItem from "./ShopItem";
import ContactInformation from "../ContactInformation";
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
  // already bought from someone else
  let notAvailablecartItems = data.basket?.filter((item) => item.quantity <= 0);

  //no dublicated items
  let cartItems = data.basket?.map((item) => {
    return [item._id, item];
  });
  let maparr = new Map(cartItems);

  let result = [...maparr.values()].filter((item) => item.quantity > 0);

  // not delieverable items
  let notDeliverable = result?.filter((item) => item.delivery == false);
  console.log(notDeliverable);
  let displa = "none";

  //count total and allow checkout button
  let total = result?.map((item) => item.price).reduce((a, b) => a + b, 0);
  {
    total > 0 ? (displa = "inline") : (displa = "none");
  }
  return (
    <div className="main-basket-container">
      <h1>Shopping Basket</h1>
      <div className="lists-container">
        <p className="shipping-msg">
          ❗ Please take a note that not articles can be send !
          {notAvailablecartItems?.length ? (
            <h4>
              the {notAvailablecartItems?.map((item) => `${item.name}, `)} are
              unfortunately already sold out and not available anymore !
            </h4>
          ) : null}
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
      </div>
      <aside>
        {notDeliverable?.length ? (
          <h4>
            the {notDeliverable?.map((item) => `${item.name}, `)} are too
            sensitive to be delivered. Feel free to come from our shop
          </h4>
        ) : null}

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
        <ContactInformation />
        {/* <h4>Adresse</h4>

        <p>Casa Verde</p>
        <p>Hauptstr. 253 12345 Stadt</p> */}
      </aside>

      <Link style={{ display: `${displa}` }} to="/basket/checkout">
        <h3>
          Total:
          {total} $
        </h3>
        <p> proceed to Checkout</p>
      </Link>
    </div>
  );
};

export default Basket;
