import { useState, useContext } from "react";
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

  //i hard coded the user id so that you can work further, ill redirect it to login before its crushed ,it will be done tomorrow
  //the id 61794db8beb58d52f8cc22f3 is for the user salim

  //let indUserId ="61794db8beb58d52f8cc22f3";
  let indUserId = "61794db8beb58d52f8cc22f3";
  //indUserId ? indUserId :indUserId===;
  //console.log(indUserId);

  // add to basket

  const addToBasket = (id) => {
    if (count > 0) {
      setQuantity(count);
    }
    setCount(count + 1);
    axios
      .post(`user/${indUserId}`, {
        productId: id,
      })
      .then((res) => {
        console.log(res.data.message);
      });
  };

  const removeFromBasket = (id) => {
    setCount(count - 1);
    axios
      .delete(`user/${indUserId}`, {
        productId: id,
      })
      .then((res) => {
        console.log(res.data.message);
      });
  };
  const addToWishlist = (id) => {
    setWishlist(!wishlist);
    if (wishlist) {
      axios
        .post(`user/wishlist/${indUserId}`, {
          productId: id,
        })
        .then((res) => {
          console.log(res.data.message);
        });
    } else {
      axios
        .delete(`user/wishlist/${indUserId}`, {
          productId: id,
        })
        .then((res) => {
          console.log(res);
        });
    }
  };

  return (
    <div key={props.obj._id} className="product">
            {/* <img src={props.obj.image} alt="logo" />*/}
            <img src="https://s3.amazonaws.com/mentoring.redesign/s3fs-public/900product.jpg" alt="product img" />
            <p>{props.obj.category}</p>
            <p>name: {props.obj.name}</p>
            <p>description: {props.obj.description}</p>
            <p>only {props.obj.quantity- count} left</p> 
            <p>price: {props.obj.price} $</p>
            <button disabled ={count>=props.obj.quantity} onClick={() => addToBasket(props.obj._id)}>Add (+)to basket</button> {count} <button disabled ={count==0} onClick={() => removeFromBasket(props.obj._id)}>remove(-) from basket</button>
            <button onClick={() => addToWishlist(props.obj._id)}>{wishlist?`🤍`:`❤️`} wishlist</button>
        </div>
    )
}

export default Shopitem;
