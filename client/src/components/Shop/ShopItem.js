import { useState, useContext, useEffect } from "react";
import axios from "axios";
import React from "react";
//import { DataContext } from "../UserContext";
import { AuthContext } from "../AuthContext";
import { FiMinusCircle, FiPlusCircle, FiTrash2 } from "react-icons/fi";

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
        //window.location.reload(false);
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
        window.location.reload(false);
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
        .put(
          "user/wishlist",
          {
            productId: id,
          },
          config
        )
        .then((res) => {
          console.log(res.data.message);
        });
    }
  };
  return (
    <div key={props.obj._id} className="product-basket">
      <div className="product-box">
        <img
          src={`${process.env.PUBLIC_URL}/${props.obj.image}`}
          alt={`img of ${props.obj.name}`}
        />
        <div className="product-infos">
          <p>{props.obj.name}</p>
          <p>{props.obj.category}</p>
          <p>{props.obj.price} $</p>
          <p>description: {props.obj.description}</p>
          <p>only {props.obj.quantity - count} left</p>
          <div>
            <button
              disabled={count >= props.obj.quantity}
              onClick={() => addToBasket(props.obj._id)}
            >
              <FiPlusCircle />
            </button>{" "}
            {count}{" "}
            <button
              disabled={count === 0}
              onClick={() => removeFromBasket(props.obj._id)}
            >
              <FiMinusCircle />
            </button>
            <button onClick={() => addToWishlist(props.obj._id)}>
              {wishlist ? `🤍` : `❤️`}
            </button>
            <button onClick={() => removeFromBasket(props.obj_id)}>
              <FiTrash2 />
            </button>
          </div>
        </div>
      </div>
      <div className="total-price">
        <h2>{props.obj.price * count} $</h2>&nbsp;
        <p>incl.VAT</p>
      </div>
    </div>
  );
}
export default ShopItem;
