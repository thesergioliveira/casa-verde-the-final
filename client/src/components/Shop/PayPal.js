import {
  BraintreePayPalButtons,
  PayPalButtons,
  PayPalScriptProvider,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import { PayPalButton } from "react-paypal-button-v2";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../AuthContext";

export default function PayPal() {
  const [{ options }, dispatch] = usePayPalScriptReducer();
  const [currency, setCurrency] = useState(options.currency);
  const [token] = useContext(AuthContext);
  const config = {
    headers: {
      authorization: token,
    },
  };
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

  const { REACT_APP_CLIENT_ID } = process.env;
  
  return (
    <>
      {/* <form
        action="https://www.paypal.com/cgi-bin/webscr"
        method="post"
        target="_top"
      >
        <input
          type="image"
          src="https://www.paypalobjects.com/de_DE/DE/i/btn/btn_buynow_LG.gif"
          border="0"
          name="submit"
          alt="Jetzt einfach, schnell und sicher online bezahlen – mit PayPal."
        >
          
        </input>
        <input type="hidden" name="cmd" value="_s-xclick"></input>
        <input
          type="hidden"
          name="hosted_button_id"
          value="UR66GKBJYJH5C"
        ></input>
        <img
          alt=""
          border="0"
          src="https://www.paypalobjects.com/de_DE/i/scr/pixel.gif"
          width="1"
          height="1"
        />
      </form> */}

      <button onClick={() =>
      {
        axios
            .post("https://api-m.sandbox.paypal.com/v2/checkout/orders", config)
            .then((res) => {
              console.log("new data", res.data);
            })
            .catch((err) => {
              console.log("SOS SOS SOS SOS", err.message);
            });
       

      }
     }>paypal</button>
    </>
  );
}

{
  /* <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
<input type="hidden" name="cmd" value="_s-xclick">
<input type="hidden" name="hosted_button_id" value="UR66GKBJYJH5C">
<input type="image" src="https://www.paypalobjects.com/de_DE/DE/i/btn/btn_buynow_LG.gif" border="0" name="submit" alt="Jetzt einfach, schnell und sicher online bezahlen – mit PayPal.">
<img alt="" border="0" src="https://www.paypalobjects.com/de_DE/i/scr/pixel.gif" width="1" height="1">
</form>  */
}
