import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
//import { DataContext } from "../UserContext";
import { AuthContext } from "../AuthContext";

import { FiMinusCircle, FiPlusCircle, FiTrash2 } from "react-icons/fi";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  useParams,
} from "react-router-dom";
import ItemDetails from "./ItemDetails";

import { useSpring, animated } from 'react-spring';

const calc = (x, y) => [-(y - window.innerHeight / 2) / 20, (x - window.innerWidth / 2) / 20, 1.1];
const trans = (x, y, s) => `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;


function ShopItem(props) {
  const [count, setCount] = useState(0);

  const [quantity, setQuantity] = useState(0);
  const [wishlist, setWishlist] = useState(true);

  // const [prop, set] = useSpring(() => ({ xys: [0, 0, 1], config: { mass: 5, tension: 350, friction: 40 } }));
  const [prop, set] = useSpring(() => ({ xys: [0, 0, 1], config: { mass: 5, tension: 350, friction: 40 } }));


  useEffect(() => {
    const displayBasket = async () => {
      await axios
        .get("user/getTheBasket", config)
        .then((res) => {
          setCount(
            res.data.basket.filter((item) => item._id === props.obj._id).length
          );
          let dublicationCheck = res.data.wishlist.find(
            (item) => item._id.toString() === props.obj._id.toString()
          );
          //console.log(dublicationCheck)
          if (dublicationCheck) {
            setWishlist(false);
          }
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
        window.location.reload(false);
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
  const removeAllfromBasket = (id) => {
    setCount(0);
    axios
      .put(
        "user/toRemoveAll",
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
    // let dublicationCheck = user?.wishlist.find(item => item._id.toString() === id.toString())
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
          window.location.reload(true);
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
          console.log(res);
          window.location.reload(true);
        });
    }
  };
  let myimage;
  props.obj.image
    ? (myimage = `http://localhost:5005/${props.obj.image}`)
    : (myimage = "https://via.placeholder.com/150");
  return (
    <div key={props.obj._id} className="productCard-main-container">
      <div className="product-box">
        <animated.img classname="card"
          // ${process.env.PUBLIC_URL}
          src={myimage}
          alt={`img of ${props.obj.name}`}
          onMouseMove={({ clientX: x, clientY: y }) => set({ xys: calc(x, y) })}
      onMouseLeave={() => set({ xys: [0, 0, 1] })}
      style={{ transform: prop.xys.interpolate(trans) }}
        />
        <div className="product-infos">
          <p className="product-p">{props.obj.name}</p>
          <p>{props.obj.category}</p>
          <p>
            {props.obj.price} € <span>inkl. MwSt.</span>
          </p>

          <p>
            in Stock:{" "}
            <span
              className={props.obj.quantity <= 0 ? "product" : "product green"}
            >
              {props.obj.quantity - count}
            </span>
          </p>

          <p>{props.obj.delivery ? "DELIEVERABLE" : "NOT DELIEVERABLE"}</p>

          <p>
            <span>Produktbeschreibung:</span> <br />
            <span>{props.obj.description}</span>
          </p>
          <div className="product-buttons">
            <button
              disabled={count >= props.obj.quantity}
              onClick={() => addToBasket(props.obj._id)}
            >
              <FiPlusCircle className="icon" />
            </button>

            <p className={count === 0 ? "counter" : "counter counter-green"}>
              {count}
            </p>

            <button
              disabled={count === 0}
              onClick={() => removeFromBasket(props.obj._id)}
            >
              <FiMinusCircle className="icon" />
            </button>
            <button onClick={() => addToWishlist(props.obj._id)}>
              <p>{wishlist ? `💛` : `❤️`}</p>
            </button>
            <button
              disabled={count === 0}
              onClick={() => removeAllfromBasket(props.obj._id)}
            >
              <FiTrash2 className="icon" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ShopItem;
