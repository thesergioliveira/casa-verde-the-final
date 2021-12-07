import React from "react";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../AuthContext";
import { Link } from "react-router-dom";
import ShopItem from "./ShopItem";
import ContactInformation from "../ContactInformation";
import { BillContext } from "./TotalBillContext";
import Flowershop from "./Flowershop";
const Basket = ({ history }) => {
  const [data, setData] = useState([]);
  const [token] = useContext(AuthContext);
  const value = useContext(BillContext);
  const config = {
    headers: {
      authorization: token,
    },
  };
  if (!token) {
    history.push("/");
  }
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

  let displa = "none";

  // already bought from someone else
  let notAvailableCartItems = data.basket?.filter((item) => item.quantity <= 0);

  //no dublicated items
  let cartItems = data.basket?.map((item) => {
    return [item._id, item];
  });
  let maparr = new Map(cartItems);

  let result = [...maparr.values()].filter((item) => item.quantity > 0);

  //no dublicated not available items
  let cartNotavAilableItems = notAvailableCartItems?.map((item) => {
    return [item._id, item];
  });
  let maparr2 = new Map(cartNotavAilableItems);
  let resultNotAvailable = [...maparr2.values()].filter(
    (item) => item.quantity == 0
  );

  // not delieverable items
  let notDeliverable = result?.filter((item) => item.delivery == false);

  //count total and allow checkout button
  // PASS IT TO THE TOTALBILLCONTEXT
  let total =
    data.basket?.map((item) => item.price).reduce((a, b) => a + b, 0) -
    cartNotavAilableItems
      ?.map((item) => item[1].price)
      .reduce((a, b) => a + b, 0);
  {
    total > 0 ? (displa = "inline") : (displa = "none");
  }

  const clearSoldout = async () => {
    if (notAvailableCartItems.length > 0) {
      await notAvailableCartItems?.map((item) => {
        console.log("CHAO");

        axios
          .put(
            "user/removeFromTheBasket",
            {
              productId: item._id,
            },
            config
          )
          .then((res) => {
            console.log(res.data.message);
          });
      });
    } else {
      console.log("no items to remove");
    }
  };
  return (
    <div className="main-basket-container">
      <div className="lists-container">
        <p className="shipping-msg">
          ❗ Bitte beachten Sie, dass nicht alle Artikel versendet werden können
          ❗
          {notAvailableCartItems?.length ? (
            <h2>
              Artikel {notAvailableCartItems?.map((item) => `${item.name}, `)}{" "}
              ist leider ausverkauft und aktuell nicht mehr erhältlich!
            </h2>
          ) : null}
        </p>
        <h1>Warenkorb</h1>

        <ul className="basket-list">
          <li>
            <h3>Artikel Warenkorb</h3>
          </li>
          {result?.map((obj, index) => (
            <li key={index}>
              <ShopItem obj={obj} />
            </li>
          ))}
          {resultNotAvailable?.map((obj, index) => (
            <li style={{ color: "red" }} key={index}>
              <ShopItem obj={obj} />
            </li>
          ))}
        </ul>

        <ul className="wishlist-list">
          <li>
            <h3>Artikel Merkliste</h3>
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
          <h2 className="shipping-msg">
            Artikel{" "}
            <span>{notDeliverable?.map((item) => `${item.name},`)}</span> kann
            aus logistischen Gründen nicht versendet werden. Eine Abholung ist
            zu den unten angegebenen Öffnungszeiten möglich.
          </h2>
        ) : null}

        <h4 className="mobile-abholungs">Abholung</h4>

        <ul className="mobile-abholungs">
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
        <div className="flowershopclass">
          <Flowershop />
        </div>
      </aside>

      <Link
        style={{ display: `${displa}` }}
        total={total}
        to="/basket/checkout"
      >
        <h3>
          Gesamt: <span> {total} €</span>
        </h3>
        <p onClick={clearSoldout}>Bestellung abschließen</p>
      </Link>
    </div>
  );
};

export default Basket;
