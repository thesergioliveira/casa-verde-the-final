import React from 'react'
import axios from "axios";

import { useState, useEffect, useContext } from "react";
import {DataContext} from "./Context";
import { Link, useHistory } from "react-router-dom";
const AdminDash = () => {
  
  
  // axios.defaults.withCredentials = true;
  const [data, setData] = useState([]);
  const [productData, setProductData] = useState([]);
  const [userdata, setUserdata] = useContext(DataContext);
  const indUserId= userdata?.user.id;
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Gift baskets");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [description, setDescription] = useState("");
  const [delivery, setDelivery] = useState(false);
 
    //control
let allow
 userdata?.user.admin ? allow="none": allow="flex";
 
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
// get all products WE CAN GET THEM WITH USECONTEXT
const getAllProducts = () => {
 axios
    .get("user/products")
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
const handleSubmitForUpdate = () => {
  
  const updatedProductData = { category, description, price, delivery, quantity};
  console.log(name);
  axios
  .put(`admin/product/${name}`, updatedProductData)
  .then((res) => {
    console.log(res.updatedProductData);
   
   })
  .catch((err) => {
    console.log(err.message);
    
  });
}
const handleDelete = (id) => {
  if (window.confirm('Are you sure you want to delete this thing from the database?')) {
    axios.delete(`admin/product/${id}`)
    .then((res) => {
      console.log(res.data);
  
    })
    .catch((err) => {
      console.log(err.message);
    });
  } else {
    
    console.log('Twe didnt delete it.');
  }
  

}
  
    return <div 
    style={{
        display:`${allow}`,
        backgroundColor:`#f5f5f5`,
      }}
    >
           <h1> welcome {userdata?.user.name}</h1> 
            <h2>Total Users: {data?.length}</h2>
            <h2>Total Products: {productData?.length}</h2>
            <h2>Total items in wishlists {data?.map((item) => item.wishlist.length).reduce((a, b) => a + b, 0)}</h2>
            <h2>Total items in baskets {data?.map((item) => item.basket.length).reduce((a, b) => a + b, 0)}</h2>
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

<p>name of the product:</p>

<select id="name"
   onChange={(e) =>{
    setName(e.target.value)
    console.log(name)
   } }
      > 
    {productData.map((item) => <option value={item._id}> {item.name} </option>)}
      </select>


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
   <p>RE-price it:</p>
      <input
        type="number"
        value={null}
        name="price"
        onChange={(e) => setPrice(e.target.value)}
        placeholder="value it"
      />
     
      <p>chance ammount:</p>
  
       <input
        type="number"
        value={null}
        name="quantity"
        onChange={(e) => setQuantity(e.target.value)}
        placeholder="remaining amount"
      />
      
      <p>write an other description:</p>
       <input
        type="text"
        value={null}
        name="description"
        onChange={(e) => setDescription(e.target.value)}
        placeholder="new description"
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
      <button onClick={handleSubmitForUpdate}>SAVE THE CHANGES</button>

      <h2>DELETE A PRODUCT</h2>
      <select id="name"
   onChange={(e) =>{
    setName(e.target.value)
    console.log(name)
   } }
      > 
    {productData.map((item) => <option value={item._id}> {item.name} </option>)}
      </select>


      <button onClick={() => handleDelete(name)}>DELETE THE PRODUCT</button>

      </div>
      
          </div>
    
}

export default AdminDash


