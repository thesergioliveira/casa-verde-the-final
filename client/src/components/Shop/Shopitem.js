import { useState, useEffect, useContext } from "react";
import axios from "axios";
import React from "react";
import {DataContext} from "../Context";
    //to dos
//FIX THE DELIVERY 
//FIX THE CHECKOUT
   
//FIX THE FCKING DELETE
function Shopitem(props) {
    // console.log(props.obj);
    const [count, setCount] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [wishlist, setWishlist] = useState(true);
    const [data, setData] = useContext(DataContext);
    
    let indUserId=data?.user.id
    //61794db8beb58d52f8cc22f3
    //console.log(indUserId);
      // add to basket
    const addToBasket = (id) => {
     if (count>0) {setQuantity(count)}
        setCount(count + 1);
        axios.post(`user/${indUserId}`, {
          productId: id,
        })
      .then((res) => {
        console.log(res);
      });
      
      };
   

  
 const removeFromBasket = (id) => {
        setCount(count - 1);
        axios
          .delete(`user/${indUserId}`, {
            productId: id,

          })
          .then((res) => {
            console.log(res);
            
          });
      }
      const addToWishlist = (id) => {
        setWishlist(!wishlist);
        if (wishlist) {
          axios.post(`user/wishlist/${indUserId}`, {
            productId: id,})
        .then((res) => {
          console.log(res);
        });
        } else {
          axios.delete(`user/wishlist/${indUserId}`, {
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
            <li>only {props.obj.quantity- count} left</li>  
            <li><img src={props.obj.image} alt="logo" width="200px" height="200px"/> </li>
            <button disabled ={count>=props.obj.quantity} onClick={() => addToBasket(props.obj._id)}>Add (+)to basket</button> {count} <button disabled ={count==0} onClick={() => removeFromBasket(props.obj._id)}>remove(-) from basket</button>
            <button onClick={() => addToWishlist(props.obj._id)}>{wishlist?`🤍`:`❤️`} wishlist</button>
          </ul>
        </div>
    )
}

export default Shopitem;
