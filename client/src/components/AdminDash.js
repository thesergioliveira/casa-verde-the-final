import React from "react";
import axios from "axios";

import { useState, useEffect, useContext } from "react";
import { DataContext } from "./UserContext";
import ShopItem from "./Shop/ShopItem";
import { AuthContext } from "./AuthContext";

const AdminDash = () => {
  const [token] = useContext(AuthContext);
  const config = {
    headers: {
      authorization: token,
    },
  };

  // axios.defaults.withCredentials = true;
  const [data, setData] = useState([]);
  const [productData, setProductData] = useState([]);
  //const [userdata, setUserdata] = useContext(DataContext);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Gift baskets");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [description, setDescription] = useState("");
  const [delivery, setDelivery] = useState(false);
  const [image, setImage] = useState("");
 //control

 //userdata?.user.admin ? allow="none": allow="flex";
 


// get all products WE CAN GET THEM WITH USECONTEXT
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



  //control
  //let allow;
  //!userData?.user.admin ? allow="none": allow="flex";
  const obj = { name, category, price, quantity, description, delivery };
  //find users
  const displayUsers = () => {
    axios
      .get(`admin/users`, config)
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
    getAllProducts();
    
  }, []);
 // add a product
 const handleUpload = (e) => {
  
    setImage(e.target.files[0])
  }
  const handleSubmit = async (e) => {
    e.preventDefault();


    const newProductData = new FormData();
    newProductData.append("name", name);
    newProductData.append("category", category);
    newProductData.append("price", price);
    newProductData.append("quantity", quantity);
    newProductData.append("description", description);
    newProductData.append("delivery", delivery);
    newProductData.append("image", image);
   try {
const result = await axios
.post(
  `admin/product/`,
  newProductData,
  config
  , {
    header: {
      "Content-Type": "multipart/form-data",
    },
  }
)
console.log(result);
   }catch (err) {
    console.log("error", err.response.data.message);
  }
    
      
  };
  const handleSubmitForUpdate = () => {
    const updatedProductData = {
      category,
      description,
      price,
      delivery,
      quantity,
    };
    console.log(name);
    axios
      .put(`admin/product/${name}`, updatedProductData, config)
      .then((res) => {
        console.log(res.updatedProductData);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
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

  const handleStock = () => {
    setQuantity(quantity - 0);
    const updatedProductData = { quantity };
    console.log(name);
    axios
      .put(`admin/product/${name}`, updatedProductData, config)
      .then((res) => {
        console.log(res.updatedProductData);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div className="main-admin-dash-container">
      <div className="admin-dash-statistics-container">
        {/* <h1> welcome {userdata?.user.name}</h1>  */}
       <span className="statistics"> <p>statistics</p>
        <h2>Total Users: 👨‍👩‍👧‍👧 {data?.length}</h2>
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
        <span><h2>DELETE A PRODUCT</h2>
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

          <button className="button-dash" onClick={() => handleDelete(name)}>DELETE THE PRODUCT</button>
          <h2>QUICK STOCK UPDATE</h2>
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
        <button className="button-dash" onClick={handleStock}>MINUS ONE</button>
        <button className="button-dash" onClick={handleStock}>PLUS ONE</button>
</span>
      </div>
      <div className="admin-dash-add-products-container">
     
        <div className="add-product-wrapper">
        
        
          <h2>ADD A PRODUCT</h2>
          <form onSubmit={handleSubmit}>
          <input type="file" id="file" onChange={ handleUpload} />
          <p>name it:</p>
          <input
            type="text"
            value={name}
            name="name"
            onChange={(e) => setName(e.target.value)}
            placeholder="name of the product"
          />
          <p>category:</p>
          <select
            id="category"
            onChange={(e) => {
              setCategory(e.target.value);
            }}
          >
            <option value="Bouquet of flowers"> Bouquet of flowers </option>
            <option value="Flower and plants pots">
              {" "}
              Flower and plants pots{" "}
            </option>
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
          <p>how many in stock:</p>
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
          <select
            id="delivery"
            onChange={(e) => {
              setDelivery(e.target.value);
            }}
          >
            <option value={true}> deliverable </option>
            <option value={false}> not deliverable </option>
          </select>
          <input className="button-dash" type="submit" value="Add me" />
          </form>
        </div>
        
        <div className="preview">
          <p>preview</p>
          {/* <button className="button-dash" onClick={handleSubmit}>ADD ME</button> */}
          

          <ShopItem obj={obj} />
        </div>
      </div>

      <div className="admin-dash-add-products-container">
        
        <div>
        
        <h2>MODIFY PRODUCT</h2>
          <p>name of the product:</p>

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

          <p>category:</p>

          <select
            id="category"
            onChange={(e) => {
              setCategory(e.target.value);
            }}
          >
            <option value="Bouquet of flowers"> Bouquet of flowers </option>
            <option value="Flower and plants pots">
              {" "}
              Flower and plants pots{" "}
            </option>
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
          <select
            id="delivery"
            onChange={(e) => {
              setDelivery(e.target.value);
            }}
          >
            <option value={true}> deliverable </option>
            <option value={false}> not deliverable </option>
          </select>
         

          
        </div>
        <div className="preview">
          <p>preview</p>
          <button className="button-dash" onClick={handleSubmitForUpdate}>SAVE THE CHANGES</button>

          <ShopItem obj={obj} />
        </div>
      </div>
    </div>
  );
};

export default AdminDash;
