import {
  BraintreePayPalButtons,
  PayPalButtons,
  PayPalScriptProvider,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import { useState, useEffect } from "react";

export default function PayPal() {
  const [{ options }, dispatch] = usePayPalScriptReducer();
  const [currency, setCurrency] = useState(options.currency);

  function onCurrencyChange({ target: { value } }) {
    setCurrency(value);
    dispatch({
      type: "resetOptions",
      value: {
        ...options,
        currency: value,
      },
    });
  }


  return <>
  {/* {isPending ? <div className="spinner" /> : null} */}
  <PayPalButtons
        options={{
          clientId: "ASHvIIsd34uvS4b7vwdgtcxY7NXGyzyOuXa7YJaZj4cHpZpUtIfK13SCEntdkvK6o26tmNJ73BgDN6R3",
          currency: "EUR",
        }}
        amount="0.02"
        onSuccess={(details, data) => {
          alert("Transaction completed by " + details.payer.name.given_name);

          console.log({ details, data });
        }}
      />


</> ;
            
        
 

}
