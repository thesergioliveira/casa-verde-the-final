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
  const [quantity, setQuantity] = useState(0);

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
  useEffect(() => {
    getAllProducts();
  }, []);
  const handleDelete = (id) => {
    if (
      window.confirm(
        "Are you sure you want to delete this thing from the database?"
      )
    ) {
      axios
        .delete(`admin/product/${id}`, config)
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err.message);
        });
    } else {
      console.log("Twe didnt delete it.");
    }
  };
  let detectproduct = 0
  detectproduct = productData.map(item => item._id).indexOf(id)
console.log(productData[detectproduct]?.quantity);
  const handleStockplus = () => {
    
    setQuantity(productData[detectproduct]?.quantity + 1);
    const updatedProductData = {quantity };
    console.log(id);
    axios
      .put(`admin/product/quantitycheck/${id}`, updatedProductData, config)
      .then((res) => {
        console.log(res.updatedProductData);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  
  const handleStockminus = () => {
    let detectproduct = 0
  detectproduct = productData.map(item => item._id).indexOf(id)
console.log(productData[detectproduct]?.quantity);
setQuantity(productData[detectproduct]?.quantity);
    setQuantity(quantity - 1);
    const updatedProductData = {quantity };
    console.log(id);
    axios
      .put(`admin/product/quantitycheck/${id}`, updatedProductData, config)
      .then((res) => {
        console.log(res.updatedProductData);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  //console.log(productData.map(item => item._id))
  

  return (
    <div className="admin-dash-statistics-container">
      {/* <h1> welcome {userdata?.user.name}</h1>  */}
      <span className="statistics">
        <p>statistics</p>
        <h2>Total Users: 👨‍👩‍👧‍👧 {props.data?.length}</h2>
        <h2>Total Products: 💐 {productData?.length}</h2>
        <h2>
          Total items in wishlists: 💗
          {data?.map((item) => item.wishlist.length).reduce((a, b) => a + b, 0)}
        </h2>
        <h2>
          Total items in baskets: 🛍
          {data?.map((item) => item.basket.length).reduce((a, b) => a + b, 0)}
        </h2>
      </span>
      <span>
        <h2>DELETE A PRODUCT</h2>
        <select
          id="name"
          onChange={(e) => {
            setName(e.target.value);
            console.log(name);
          }}
        >
          {productData.map((item) => (
            <option value={item._id}> {item.name} </option>
          ))}
        </select>

        <button className="button-dash" onClick={() => handleDelete(name)}>
          DELETE THE PRODUCT
        </button>
        <h2>QUICK STOCK UPDATE</h2>
        <select
          id="name"
          onChange={(e) => {
            setId(e.target.value);
            
          }}
        >
          {productData.map((item) => (
            <option value={item._id}> {item.name} </option>
          ))}
        </select>
        <button className="button-dash" onClick={handleStockminus}>
          MINUS ONE
        </button>
        {productData[detectproduct]?.quantity}
        <button className="button-dash" onClick={handleStockplus}>
          PLUS ONE
        </button>
      </span>
    </div>
  );
}
