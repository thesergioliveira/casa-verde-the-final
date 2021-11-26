import { BraintreePayPalButtons, PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import React, { useRef, useEffect } from "react";


export default function PayPal() {
 // const [{ isPending }] = usePayPalScriptReducer();


  return <>
  {/* {isPending ? <div className="spinner" /> : null} */}
  <PayPalButtons />

</> ;
            
        
 
}
