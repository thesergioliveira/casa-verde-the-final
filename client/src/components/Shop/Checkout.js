import React from "react";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { DataContext } from "../UserContext";
import { AuthContext } from "../AuthContext";

export default function Checkout() {
    const [city, setCity] = useState("");
    const [address, setAddress] = useState("");
    const [country, setCountry] = useState("");
    const [state, setState] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [phone, setPhone] = useState();


    //
    const [data, setData] = useState([]);
    const [total, setTotal] = useState(0);
    const [UserData] = useContext(DataContext);
    const [token] = useContext(AuthContext);
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
    
        displayBasket();
        
      }, []);
      console.log(data)
    const checkout = () => {
        console.log("checkout!!!!!!!!!!!!!!")
        axios.put(`user/checkout`,data, config)
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          console.log("front end works");
          setTotal(res.data);
          console.log(res.data);
        } else {
          setTotal({ message: "user NOT Authenticated" });
        }
      })
      .catch((err) => {
       
        console.log("failed checkout", err.message);
      });
  };

console.log(UserData.user.username)
let shipping = 5

    return (
        <div>
            
        <div>
           <p> hello {UserData?.user?.username}, your order will be sent to:</p> 
           your current address:
              <p>..{UserData.user.address}</p>
                <p>..{UserData.user.city}</p>
                <p>..{UserData.user.state}</p>
                <p>..{UserData.user.country}</p>
                <p>..{UserData.user.postalCode}</p>
                <p>..{UserData.user.phone}</p>
                <h3>Do you have a new address? fill up the form</h3>
                <input
        type="text"
        value={address}
        name="address"
        onChange={(e) => setAddress(e.target.value)}
        placeholder="address"
      />
      <p>City:</p>
       <input
        type="text"
        value={city}
        name="city"
        onChange={(e) => setCity(e.target.value)}
        placeholder="city"
      />
      <p>Country:</p>
       <input
        type="text"
        value={country}
        name="country"
        onChange={(e) => setCountry(e.target.value)}
        placeholder="country"
      />
        <p>state:</p>
       <input
        type="text"
        value={state}
        name="state"
        onChange={(e) => setState(e.target.value)}
        placeholder="state"
      />
        <p>postalCode:</p>
       <input
        type="text"
        value={postalCode}
        name="postalCode"
        onChange={(e) => setPostalCode(e.target.value)}
        placeholder="postalCode"
      />
         <p>phone:</p>
       <input
        type="text"
        value={phone}
        name="phone"
        onChange={(e) => setPhone(e.target.value)}
        placeholder="phone"
      />
                
               
   </div>
   <h3>
          items: {data.basket?.map((item) => item.price).reduce((a, b) => a + b, 0)}$ <h4>shipping: {shipping}$ </h4> 
           <h3>Total :{data.basket?.map((item) => item.price).reduce((a, b) => a + b, 0) + shipping}$</h3> 
        </h3>
            <button 
            disabled={
                !UserData.user.address || 
                !UserData.user.city ||
                !UserData.user.state ||
                !UserData.user.country ||
                !UserData.user.postalCode ||
                !UserData.user.phone

            } onClick={checkout} >PAY</button>

        </div>
    )
}
