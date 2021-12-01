import React from "react";
import axios from "axios";
import ShopItem from "./ShopItem";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { FiArrowLeft } from "react-icons/fi";

export default function ItemDetails(props) {
  const [obj, setObj] = useState();
  const [count, setCount] = useState(0);
  useEffect(() => {
    console.log(props.match.params.id);

    axios
      .get(`http://localhost:5005/user/oneproduct/${props.match.params.id}`)
      .then((res) => {
        setObj(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="single-page-product-details">
      <Link to="/shop">
        <div className="link-back">
          <FiArrowLeft />
          <p>zurück</p>
        </div>
      </Link>

      {obj && <ShopItem obj={obj} />}
    </div>
  );
}
