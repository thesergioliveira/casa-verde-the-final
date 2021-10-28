import React from 'react'
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import {DataContext} from "../Context";
const Basket = () => {
  // Warning: Encountered two children with the same key, `616ec71db7d4def05aa683d5`. Keys should be unique so that components maintain their identity across updates. Non-unique keys may cause children to be duplicated and/or omitted — the behavior is unsupported and could change in a future version.
  //   at ul
  //   at div
  //   at div
  //   at Basket (http://localhost:3000/main.8cb60394bdeb60296745.hot-update.js:34:91)
  //   at Route (http://localhost:3000/static/js/vendors~main.chunk.js:84153:29)
  //   at Switch (http://localhost:3000/static/js/vendors~main.chunk.js:84355:29)
  //   at main
  //   at Router (http://localhost:3000/static/js/vendors~main.chunk.js:83784:30)
  //   at BrowserRouter (http://localhost:3000/static/js/vendors~main.chunk.js:83307:35)
  //   at DataProvider (http://localhost:3000/static/js/main.chunk.js:754:81)
  //   at App
  const [userdata, setUserdata] = useContext(DataContext);
  const indUserId= userdata.user.id;
  // console.log(userdata.token)
   console.log(indUserId)
    const [data, setData] = useState([]);
    const displayBasket = () => {
        const config = {
          headers: {
            authorization: localStorage.getItem("token"),
          },
        };
        //616fecb8c07e23a17f5f1042
 axios.get(`user/${indUserId}`, config)
          .then((res) => {
            if (res.data) {
              setData(res.data);
             
            } else {
              setData({ message: "user NOT Authenticated" });
            }
          })
          .catch((err) => {
            console.log("here", err.message);
          });
      };
      useEffect(() => {
        displayBasket();
      }, []);
       console.log(data.basket.map(item=>item.name))
    
    return (
        <div>
           <h1> ;D Basket</h1>
           <div>
<h1>Total: $</h1>
<button>Checkout</button>
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
         <h3>Items in your basket</h3>
          {data.basket.map(item=>  
        <li key={item._id}>
          <p>{item.name}</p>
          <p>${item.price}</p>
          <p>only {item.quantity} left </p>
        </li>
        )}
         </ul>
         <ul>
         <h3>wishlist</h3>
          {data.basket.map(item=>  
        <li key={item._id}>
          <p>{item.name}</p>
          <p>${item.price}</p>
          <p>only {item.quantity} left </p>
        </li>
        )}
         </ul>
       {/* map((item) => ` NAME:${item.name}, PRICE:${item.price}, DESCR:${item.description},AVAILABLE ${item.quantity}`) */}
      </div> 
     



        </div>
    )
}

export default Basket
