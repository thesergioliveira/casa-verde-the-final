import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";

function Shopitem(props) {
    console.log(props.obj);
    const [count, setCount] = useState(0);  
    const [wishlist, setWishlist] = useState(true);
      // add to basket
    const addToBasket = (id) => {
        setCount(count + 1);
        axios.post("user/616fecb8c07e23a17f5f1042", {
          productId: id,
        })
      .then((res) => {
        console.log(res);
      
      });
      };
      //user/616fecb8c07e23a17f5f1042 is hard coded 
//make wishlist have only unique ids
      //https://stackoverflow.com/questions/50215619/axios-delete-method-not-working-in-react fix the delete operation
 const removeFromBasket = (id) => {
        setCount(count - 1);
        axios
          .delete("user/616fecb8c07e23a17f5f1042", {
            productId: id,
          })
          .then((res) => {
            console.log(res);
          });
      }
      const addToWishlist = (id) => {
        setWishlist(!wishlist);
        if (wishlist) {
          axios.post("user/wishlist/616fecb8c07e23a17f5f1042", {
            productId: id,})
        .then((res) => {
          console.log(res);
          
        });
        } else {
          axios.delete("user/wishlist/616fecb8c07e23a17f5f1042", {
            productId: id,
          }).then((res) => {
            console.log(res);
          });
        }
        
     
      };
    return (
        <div
          style={{ border: "1px solid red",
            backgroundColor: "green",
            fontSize: "18px",
          }}
        >
      <ul key={props.obj._id}>
            <li>category: {props.obj.category}</li>
            <li>name: {props.obj.name}</li>
            <li>price: {props.obj.price}</li>
            <li>description: {props.obj.description}</li>
            <li>only {props.obj.quantity} left</li>  
            <button disabled ={count>=props.obj.quantity} onClick={() => addToBasket(props.obj._id)}>Add (+)to basket</button> {count} <button disabled ={count==0} onClick={() => removeFromBasket(props.obj._id)}>remove(-) from basket</button>
            <button onClick={() => addToWishlist(props.obj._id)}>{wishlist?`Add to`:`added to the`} wishlist</button>
          </ul>
        </div>
    )
}



export default Shopitem

