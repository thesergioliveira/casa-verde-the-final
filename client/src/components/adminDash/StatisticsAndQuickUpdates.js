import React from "react";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../AuthContext";

export default function StatisticsAndQuickUpdates(props) {
  //get token
  const [token] = useContext(AuthContext);
  const config = {
    headers: {
      authorization: token,
    },
  };
  const [id, setId] = useState("");
  const [data, setData] = useState([]);
  const [productData, setProductData] = useState([]);
  const [name, setName] = useState("");
  const [userData, setUserData] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const [count, setCount] = useState(0);
  const getAllProducts = () => {
    axios
      .get("user/products", config)
      .then((res) => {
        if (res.data) {
          setProductData(res.data);
          localStorage.setItem("product", JSON.stringify(res.data));
        } else {
          setProductData({ auth: false });
        }
      })
      .catch((err) => {
        console.log("here", err.response?.data);
      });
  };
  const getAllUsers = () => {
    axios
      .get("admin/users", config)
      .then((res) => {
        if (res.data) {
          setUserData(res.data);
          
          localStorage.setItem("product", JSON.stringify(res.data));
        } else {
          setProductData({ auth: false });
        }
      })
      .catch((err) => {
        console.log("here", err.response?.data);
      });
  };
  useEffect(() => {
    getAllProducts();
    getAllUsers();
  }, []);
 
  //detect quantity from id
  let detectproduct = 0;
  detectproduct = productData.map((item) => item._id).indexOf(id);
  const handleStockplus = () => {
    setCount(count + 1);
  };
  const handleStockminus = () => {
    setCount(count - 1);
  };
  //console.log(productData.map(item => item._id))
  const updateStock = () => {
    const updatedProductData = {
      quantity: productData[detectproduct]?.quantity + count,
    };

    axios
      .put(`admin/product/quantitycheck/${id}`, updatedProductData, config)
      .then((res) => {
        console.log(res.updatedProductData);
        alert("Stock updated, please refresh the page");
        window.location.reload(false);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  //securing the image 
  let myimage;
  productData[detectproduct]?.image
    ? (myimage = `http://localhost:5005/${productData[detectproduct]?.image}`)
    : (myimage = "https://via.placeholder.com/150");
    console.log(userData.map(item => item.wishlist.length).reduce((a, b) => a + b, 0))
  return (
    <div className="admin-dash-statistics-container">
      {/* <h1> welcome {userdata?.user.name}</h1>  */}
      <span className="statistics">
        <p>statistics</p>
        <h2>
          Total Users: <i style={{ fontStyle: "normal" }}>👨‍👩‍👧‍👧</i>{" "}
          {props.data?.length}
        </h2>
        <h2>
          Total Products: <i style={{ fontStyle: "normal" }}>💐</i>{" "}
          {productData?.length}
        </h2>
        <h2>
          Total items in wishlists: <i style={{ fontStyle: "normal" }}>💗</i>
          {userData.map(item => item.wishlist.length).reduce((a, b) => a + b, 0)}
        </h2>
        <h2>
          Total items in baskets: <i style={{ fontStyle: "normal" }}> 🛍</i>
          {userData?.map((item) => item.basket.length).reduce((a, b) => a + b, 0)}
        </h2>
      </span>
      <span>
        <h2>QUICK STOCK UPDATE</h2>
        <select
          id="name"
          onChange={(e) => {
            setId(e.target.value);
          }}
        >
          {/* 🎁/🪴/🌹/🍝 */}
          <option value={null}>choose one</option>
          {productData.map((item) => (
            <option value={item._id}> {item.name} </option>
          ))}
        </select>
        <div className="quick-update-view">
          <p>
            you have: {productData[detectproduct]?.quantity} from
            {productData[detectproduct]?.name}
          </p>
          <img src={myimage} alt="product" />
        </div>
        <button
          disabled={productData[detectproduct]?.quantity + count < 1}
          className="button-dash"
          onClick={handleStockminus}
        >
          MINUS {count}
        </button>
        <button className="button-dash" onClick={handleStockplus}>
          PLUS {count}
        </button>
        <button className="button-dash" onClick={() => updateStock()}>
          UPDATE IT
        </button>
      </span>
    </div>
  );
}
