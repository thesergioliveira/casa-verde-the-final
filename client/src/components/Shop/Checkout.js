import React from "react";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
//import { DataContext } from "../UserContext";
import { AuthContext } from "../AuthContext";
import PayPal from "./PayPal";
import {
  PayPalScriptProvider,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import { BillContext } from "./TotalBillContext";
require("dotenv").config();

export default function Checkout() {
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [phone, setPhone] = useState();
  const [houseNumber, setHouseNumber] = useState("");
  const [checkout, setCheckout] = useState(false);

  //
  const [data, setData] = useState([]);

  const [UserData, setUserData] = useState([]);
  const [token] = useContext(AuthContext);

  const value = useContext(BillContext);

  const config = {
    headers: {
      authorization: token,
    },
  };
  useEffect(() => {
    const displayBasket = async () => {
      await axios
        .get("user/getTheBasket", config)
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => {
          console.log("SOS SOS SOS SOS", err.message);
        });
    };
    const GetUserData = () => {
      axios
        .get("user/checkAuth", config)
        .then((res) => {
          setUserData(res.data);
        })
        .catch((err) => {
          console.log("SOS SOS SOS SOS", err.message);
        });
    };

    GetUserData();
    displayBasket();
  }, []);

  // update user Address
  const updateUserAddress = () => {
    const newData = {
      address,
      phone,
      city,
      country,
      state,
      postalCode,
      houseNumber,
    };

    axios
      .put("user/updateUserInfos", newData, config)
      .then((res) => {
        console.log(res.data);
        window.location.reload(false);
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  };
  const handleCheckout = () => {
    console.log("checkout!!!!!!!!!!!!!!");
    setCheckout(!checkout);

    // axios
    //   .put(`user/checkout`, data, config)
    //   .then((res) => {
    //     console.log(res.data);
    //     if (res.data) {
    //       console.log("front end works");
    //       setTotal(res.data);
    //       console.log(res.data);
    //     } else {
    //       setTotal({ message: "user NOT Authenticated" });
    //     }
    //   })
    //   .catch((err) => {
    //     console.log("failed checkout", err.message);
    //   });
  };
  const { REACT_APP_CLIENT_ID } = process.env;

  const initialOptions = {
    clientId: REACT_APP_CLIENT_ID,
    currency: "EUR",
    intent: "capture",
    "data-client-token": `abc123xyz==`,
  };
  //console.log(UserData?.user);
  let shipping = 5;

  return (
    <PayPalScriptProvider deferLoading={true} options={{ initialOptions }}>
      <div className="main-checkout-container">
        <div>
          <p className="shipping-msg">
            ❗ Bitte beachten Sie, dass nicht alle Artikel versendet werden
            können ❗
          </p>
          <h3>
            {" "}
            Hallo {UserData?.user?.username}, deine Bestellung wird versendet
            an:
          </h3>
          Adresse:
          <p>
            {UserData.user?.address ? UserData.user?.address : "Straße..."},
            {UserData.user?.houseNumber
              ? UserData.user?.houseNumber
              : " Hausnummer..."}
          </p>
          <p>{UserData.user?.city ? UserData.user?.city : "Stadt..."}</p>
          <p>{UserData.user?.state ? UserData.user?.state : "Bundesland..."}</p>
          <p>{UserData.user?.country ? UserData.user?.country : "Land..."}</p>
          <p>
            {UserData.user?.postalCode
              ? UserData.user?.postalCode
              : "Postleitzahl..."}
          </p>
          <p>{UserData.user?.phone ? UserData.user?.phone : "Telefon..."}</p>
          <h3>Adresse nicht mehr aktuell? Bitte gib deine neue Adresse an.</h3>
          <p>
            <aside>Straße*</aside>
            <input
              type="text"
              value={address}
              name="address"
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Straße..."
            />
          </p>
          <p>
            <aside>Hausnummer*</aside>
            <input
              type="text"
              value={houseNumber}
              name="houseNumber"
              onChange={(e) => setHouseNumber(e.target.value)}
              placeholder="Hausnummer..."
            />
          </p>
          <p>
            <aside>Stadt*</aside>
            <input
              type="text"
              value={city}
              name="city"
              onChange={(e) => setCity(e.target.value)}
              placeholder="Stadt..."
            />
          </p>
          <p>
            <aside>Bundesland*</aside>
            <input
              type="text"
              value={state}
              name="state"
              onChange={(e) => setState(e.target.value)}
              placeholder="Bundesland..."
            />
          </p>
          <p>
            <aside>Land*</aside>
            <input
              type="text"
              value={country}
              name="country"
              onChange={(e) => setCountry(e.target.value)}
              placeholder="Land..."
            />
          </p>
          <p>
            <aside>Postleitzahl*</aside>
            <input
              type="text"
              value={postalCode}
              name="postalCode"
              onChange={(e) => setPostalCode(e.target.value)}
              placeholder="Postleitzahl..."
            />
          </p>
          <p>
            <aside>Telefon</aside>
            <input
              type="text"
              value={phone}
              name="phone"
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Telefon..."
            />
          </p>
          <button className="button-dash" onClick={updateUserAddress}>
            Adresse aktualisieren
          </button>
        </div>
        <ul>
          <li>
            menge: <span>{value?.menge?.length}</span>
          </li>
          <li>
            Zwischensumme:
            <span>{value?.total} €</span>
          </li>
          <li>
            Versand: <span>{shipping} €</span>
          </li>
          <li>
            Gesamt: <span>{value.total + shipping}€</span>
          </li>
        </ul>
        <button
          className="button-dash"
          disabled={
            !UserData.user?.address ||
            !UserData.user?.city ||
            !UserData.user?.state ||
            !UserData.user?.country ||
            !UserData.user?.postalCode
          }
          onClick={handleCheckout}
        >
          BEZAHLEN
        </button>
        {checkout ? <PayPal value={value} /> : null}
      </div>
    </PayPalScriptProvider>
  );
}
