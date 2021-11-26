import { BraintreePayPalButtons, PayPalButtons, PayPalScriptProvider, usePayPalScriptReducer } from "@paypal/react-paypal-js";
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
{/*   
        <BraintreePayPalButtons
                createOrder={(data, actions) => {
                    return actions.braintree.createPayment({
                        flow: "checkout",
                        amount: "0.01",
                        currency: "USD",
                        intent: "capture",
                    });
                }}
                onApprove={(data, actions) => {
                    return actions.braintree
                        .tokenizePayment(data)
                        .then((payload) => {
                            // call server-side endpoint to finish the sale
                        });
                }}
            /> */}

</> ;
            
        
 
}
