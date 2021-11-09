import React from 'react'
import axios from "axios";

import { useState, useEffect, useContext } from "react";
import {DataContext} from "./Context";
import { Link, useHistory } from "react-router-dom";
const AdminDash = () => {
  
  
  // axios.defaults.withCredentials = true;
    const [data, setData] = useState([]);
    
    const [userdata, setUserdata] = useContext(DataContext);
    const indUserId= userdata?.user.id;
    
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Gift baskets");
  const [price, setPrice] = useState(1);
  const [quantity, setQuantity] = useState(1);
  const [description, setDescription] = useState("");
  const [delivery, setDelivery] = useState(false);
 
    //control
let allow
 userdata?.user.admin ? allow="flex": allow="none";
 
//find users
 const displayUsers = () => {
  const config = {
    headers: {
      authorization: localStorage.getItem("token"),
    },
  };
  
axios.get(`admin/users`, config)
    .then((res) => {
      if (res.data) {
        setData(res.data);
       
      } else {
        setData({ message: "user NOT Authenticated" });
      }
    })
    .catch((err) => {
      console.log("SOS SOS SOS SOS", err.message);
    });
};
useEffect(() => {
    displayUsers();
},  []);

//console.log("userdata", userdata);
// add a product 

const handleSubmit = () => {
  const newProductData = { name, category,  description, price, delivery, quantity };

  axios
    .post(`admin/product/${indUserId}`, newProductData
    // , {
    //   header: {
    //     "Content-Type": "multipart/form-data",
    //   },
    // }
    )
    .then((res) => {
      console.log(res.newProductData);
     
    })
    .catch((err) => {
      console.log(err.message);
    });
};


    return <div 
    style={{
        display:`${allow}`,
        backgroundColor:`#f5f5f5`,
      }}
    >
           <h1> welcome {userdata?.user.name}</h1> 
            <h2>Total Users: {data?.length}</h2>
            <div >
              
      <h2>ADD A PRODUCT</h2>
      <p>name it:</p>
      <input
        type="text"
        value={name}
        name="name"
        onChange={(e) => setName(e.target.value)}
        placeholder="name of the product"
      />
      <p>category:</p>
      
      <select id="category"
   onChange={(e) =>{
    setCategory(e.target.value)
   } }
      > 
   <option value="Bouquet of flowers"> Bouquet of flowers </option>
  <option value="Flower and plants pots"> Flower and plants pots </option>
  <option value="Gift baskets"> Gift baskets </option>
  <option value="Italian Products"> Italian Products</option>
   </select>
   <p>price it:</p>
      <input
        type="number"
        value={price}
        name="price"
        onChange={(e) => setPrice(e.target.value)}
        placeholder="price"
      />
      <p>how many:</p>
       <input
        type="number"
        value={quantity}
        name="quantity"
        onChange={(e) => setQuantity(e.target.value)}
        placeholder="quantity"
      />
      <p>describe it:</p>
       <input
        type="text"
        value={description}
        name="description"
        onChange={(e) => setDescription(e.target.value)}
        placeholder="description"
      />
       <p>deliverable or zum abholung?:</p>
      <select id="delivery"
   onChange={(e) =>{
    setDelivery(e.target.value)
   } }
      > 
   <option value={true}> deliverable </option>
  <option value={false}> not deliverable </option>
   </select>
      <button onClick={handleSubmit}>Add the product</button>
 </div>
 <h2>modify A PRODUCT</h2>
  <div>
 <input
        type="text"
        value={name}
        name="name"
        onChange={(e) => setName(e.target.value)}
        placeholder="CHOOSE ONE UPON THE NAME"
      />

      <input
        type="text"
        value={category}
        name="category"
        onChange={(e) => setCategory(e.target.value)}
        placeholder="category"
      />
      <input
        type="number"
        value={price}
        name="price"
        onChange={(e) => setPrice(e.target.value)}
        placeholder="price"
      />
       <input
        type="number"
        value={quantity}
        name="quantity"
        onChange={(e) => setQuantity(e.target.value)}
        placeholder="quantity"
      />
       <input
        type="text"
        value={description}
        name="description"
        onChange={(e) => setDescription(e.target.value)}
        placeholder="description"
      />
       <input
        type="text"
        value={delivery}
        name="delivery"
        onChange={(e) => setDelivery(e.target.value)}
        placeholder="true or false"
      />
      <button onClick={handleSubmit}>Add the product</button>

      </div>
          </div>
    
}

export default AdminDash


