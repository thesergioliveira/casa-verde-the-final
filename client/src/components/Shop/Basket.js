import React from 'react'
import axios from "axios";
import { useState, useEffect } from "react";

const Basket = () => {
    const [data, setData] = useState([]);
    const displayBasket = () => {
        const config = {
          headers: {
            authorization: localStorage.getItem("token"),
          },
        };
 axios.get("user/616fecb8c07e23a17f5f1042", config)
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
      console.log(data);
    return (
        <div>
           <h1> ;D Basket</h1>

           <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
         > 
       {data.message},   {data.basket}
      </div> 




        </div>
    )
}

export default Basket
