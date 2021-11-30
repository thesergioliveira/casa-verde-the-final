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

const {REACT_APP_CLIENT_ID} = process.env;

  return <>
  {/* {isPending ? <div className="spinner" /> : null} */}
  <PayPalButtons
        options={{
          "clientId": REACT_APP_CLIENT_ID,
          currency: "EUR",
          intent: "capture",
           "data-client-token": `abc123xyz==`,
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
