import React from "react";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
//import { DataContext } from "../UserContext";
import { AuthContext } from "../AuthContext";
import PayPal from "./PayPal";
import { PayPalScriptProvider, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { BillContext } from "./TotalBillContext"
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
    setCheckout(true);
   

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
const {REACT_APP_CLIENT_ID} = process.env;
  
const initialOptions = {
  "clientId": REACT_APP_CLIENT_ID,
  currency: "EUR",
  intent: "capture",
  "data-client-token": `abc123xyz==`,
};
  //console.log(UserData?.user);
  let shipping = 5;

  return (<PayPalScriptProvider deferLoading={true}  options={{ initialOptions}}>
    <div className="main-checkout-container">
      <div>
        <p className="shipping-msg">
          ❗ Please take a note that not articles can be send !
        </p>
        <h3> hello {UserData?.user?.username}, your order will be sent to:</h3>
        your current address:
        <p>
          {UserData.user?.address ? UserData.user?.address : "add address..."},
          {UserData.user?.houseNumber
            ? UserData.user?.houseNumber
            : "add address..."}
        </p>
        <p>{UserData.user?.city ? UserData.user?.city : "add City..."}</p>
        <p>{UserData.user?.state ? UserData.user?.state : "add state..."}</p>
        <p>
          {UserData.user?.country ? UserData.user?.country : "add Country..."}
        </p>
        <p>
          {UserData.user?.postalCode
            ? UserData.user?.postalCode
            : "add Postal code..."}
        </p>
        <p>{UserData.user?.phone ? UserData.user?.phone : "add Phone..."}</p>
        <h3>Do you have a new address? fill up the form</h3>
        <p>
          <aside>Address*</aside>
          <input
            type="text"
            value={address}
            name="address"
            onChange={(e) => setAddress(e.target.value)}
            placeholder="address..."
          />
        </p>
        <p>
          <aside>HouseNumber*</aside>
          <input
            type="text"
            value={houseNumber}
            name="houseNumber"
            onChange={(e) => setHouseNumber(e.target.value)}
            placeholder="HouseNumber..."
          />
        </p>
        <p>
          <aside>City*</aside>
          <input
            type="text"
            value={city}
            name="city"
            onChange={(e) => setCity(e.target.value)}
            placeholder="city..."
          />
        </p>
        <p>
          <aside>state*</aside>
          <input
            type="text"
            value={state}
            name="state"
            onChange={(e) => setState(e.target.value)}
            placeholder="state..."
          />
        </p>
        <p>
          <aside>Country*</aside>
          <input
            type="text"
            value={country}
            name="country"
            onChange={(e) => setCountry(e.target.value)}
            placeholder="country..."
          />
        </p>
        <p>
          <aside>postalCode*</aside>
          <input
            type="text"
            value={postalCode}
            name="postalCode"
            onChange={(e) => setPostalCode(e.target.value)}
            placeholder="postalCode..."
          />
        </p>
        <p>
          <aside>phone:</aside>
          <input
            type="text"
            value={phone}
            name="phone"
            onChange={(e) => setPhone(e.target.value)}
            placeholder="phone..."
          />
        </p>
        <button className="button-dash" onClick={updateUserAddress}>
          Update Address
        </button>
      </div>
      <ul>
        <li>menge: {value?.menge?.length} </li>
        <li>
          Zwischensumme:
          {value?.total}$
        </li>
        <li>Versand: {shipping}$ </li>
        <li>
          Gesamt:
          {value.total +
            shipping}
          $
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
        PAY
      </button><PayPal/>





    </div>
    </PayPalScriptProvider>);
}
