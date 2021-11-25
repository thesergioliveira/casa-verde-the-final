import React, { useRef, useEffect } from "react";

export default function PayPal() {
  const paypal = useRef();
  useEffect(() => {
    window.paypal
      .Buttons({
        createOrder: function (data, actions, err) {
          return actions.order.create({
              intent: "CAPTURE",
              purchase_units: [
                {
                  description: "This is the payment transaction description.",
                  amount: {
                    total: "0.01",
                    currency_code: "EUR",
                  },
                },
              ],
            
          });
        },
        onApprove: async (data, actions)=>{
          const order = await actions.order.capture();
          console.log("succesuf ord",order);
        }, 
        onError: async (data, actions)=>{
            console.log("error",data,actions);
        }
      }).render(paypal.current);
      
  }, []);



  return <div ref={paypal}></div>;
}
