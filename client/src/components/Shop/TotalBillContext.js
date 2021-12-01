import React from "react";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../AuthContext";
import { Link } from "react-router-dom";
import ShopItem from "./ShopItem";
import ContactInformation from "../ContactInformation";


 // gmsouc   gmsouc
// I NEED THE TOTAL FROM BASKET COMPONENT
export const BillContext = React.createContext()

export default function ProviderComponent({ children }){
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
      let notAvailableCartItems = data.basket?.filter((item) => item.quantity <= 0);
    
      //no dublicated not available items
      let cartNotavAilableItems = notAvailableCartItems?.map((item) => {
        return [item._id, item];
      });
      let maparr2 = new Map(cartNotavAilableItems);
  
    
     
      //count total and allow checkout button
    // PASS IT TO THE TOTALBILLCONTEXT
      let total = data.basket?.map((item) => item.price).reduce((a, b) => a + b, 0) - cartNotavAilableItems?.map((item) => item[1].price).reduce((a, b) => a + b, 0)
     let menge =data?.basket
    
      const userContextTemplate ={ 
          "total":total,
          "menge": menge,

    } ;  









  return (
    <BillContext.Provider value={userContextTemplate}>
      {children}
    </BillContext.Provider>
  )
}