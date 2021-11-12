import { useState, useContext, useEffect } from "react";
import axios from "axios";
import React from "react";
//import { DataContext } from "../UserContext";
import { AuthContext } from "../AuthContext";

function ShopItem(props) {
  // console.log(props.obj);
  const [count, setCount] = useState(0);

  const [quantity, setQuantity] = useState(0);
  const [wishlist, setWishlist] = useState(true);
  //const [userData, setUserData] = useContext(DataContext);
  useEffect(() => {
    const displayBasket = async () => {
      await axios
        .get("user/getTheBasket", config)
        .then((res) => {
          setCount(
            res.data.basket.filter((item) => item._id === props.obj._id).length
          );
        })
        .catch((err) => {
          console.log("SOS SOS SOS SOS", err.message);
        });
    };

    displayBasket();
  }, []);
  const [token] = useContext(AuthContext);
  const config = {
    headers: {
      authorization: token,
    },
  };
  // add to basket
  const addToBasket = (id) => {
    if (count > 0) {
      setQuantity(count);
    }
    setCount(count + 1);
    axios
      .post(
        "user/addToBasket",
        {
          productId: id,
        },
        config
      )
      .then((res) => {
        console.log(res.data.message);
      });
  };
  const removeFromBasket = (id) => {
    setCount(count - 1);
    axios
      .put(
        "user/removeFromTheBasket",
        {
          productId: id,
        },
        config
      )
      .then((res) => {
        console.log(res.data.message);
      });
  };
  const addToWishlist = (id) => {
    setWishlist(!wishlist);
    if (wishlist) {
      axios
        .post(
          "user/wishlist",
          {
            productId: id,
          },
          config
        )
        .then((res) => {
          console.log(res.data.message);
        });
    } else {
      axios
        .delete(
          "user/wishlist",
          {
            productId: id,
          },
          config
        )
        .then((res) => {
          console.log(res);
        });
    }
  };
  return (
    <div key={props.obj._id} className="product">
      {/* <img src={props.obj.image} alt="logo" />*/}
      <img
        src="https://s3.amazonaws.com/mentoring.redesign/s3fs-public/900product.jpg"
        alt="product img"
      />
      <p>{props.obj.category}</p>
      <p>name: {props.obj.name}</p>
      <p>description: {props.obj.description}</p>
      <p>only {props.obj.quantity - count} left</p>
      <p>price: {props.obj.price} $</p>
      <button
        disabled={count >= props.obj.quantity}
        onClick={() => addToBasket(props.obj._id)}
      >
        Add (+)to basket
      </button>{" "}
      {count}{" "}
      <button
        disabled={count === 0}
        onClick={() => removeFromBasket(props.obj._id)}
      >
        remove(-) from basket
      </button>
      <button onClick={() => addToWishlist(props.obj._id)}>
        {wishlist ? `🤍` : `❤️`} wishlist
      </button>
    </div>
  );
}
export default ShopItem;
