import React from 'react'
import axios from "axios";
import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import {DataContext} from "../Context";

const Basket = () => {
  // console.log(userdata.token)
  // console.log(userdata.user.wishlist.map(item => item._id))
    const [data, setData] = useState([]);
    const [total, setTotal] = useState(0);
    const [userdata, setUserdata] = useContext(DataContext);
    const indUserId= userdata?.user.id;

//console.log(indUserId)
    const displayBasket = () => {
        const config = {
          headers: {
            authorization: localStorage.getItem("token"),
          },
        };
        //
 axios.get(`user/${indUserId}`, config)
          .then((res) => {
            if (res.data) {
              setData(res.data);
             
            } else {
              setData({ message: "user NOT Authenticated" });
            }
          })
          .catch((err) => {
            console.log("SOS SOS SOS SOS", err.message);
          });
      };
      useEffect(() => {
          displayBasket();
   },  []);
      if (data?.auth === false || data.length === 0) {
        return (
          <div>
            <h1>you are logged out </h1>
            <Link to="/login">Login</Link>
          </div>
        );
      }
     console.log()
    const Checkout = () => {
        const config = {
          headers: {
            authorization: localStorage.getItem("token"),
           
          },
        };
        axios
          .put(`user/checkout/${indUserId}`, config)
          .then((res) => {
            if (res.data) {
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

    return (
        <div>
           <h1> welcome {userdata?.user.username} </h1>
           <h2> Shopping Basket</h2>
           <div>

</div>
           <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
         > 
             <ul>
         <h3> wishlist  </h3>
          {userdata.user.wishlist.map((item,index)=>  
        <li key={index}>
          <p>{item.name}</p>
          <p>${item.price}</p>
          <p>only {item.quantity} left </p>
        </li>
        )}
       </ul>
          <ul>
         <h3>basket</h3>
          {data.basket.map((item,index)=>  
        <li key={index}>
          <p>{item.name}</p>
          <p>${item.price}</p>
          <p>only {item.quantity} left </p>
        </li>
        )}
         </ul>  
         <h3>Total: {data.basket.map(item => item.price).reduce((a, b) => a + b, 0)} $</h3>
<button onClick={Checkout}>Checkout</button>
               </div> 
          </div>
    )
}

export default Basket
