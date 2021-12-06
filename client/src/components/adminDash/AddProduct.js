import React from "react";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import ShopItem from "../Shop/ShopItem";
import { AuthContext } from "../AuthContext";

export default function AddProduct() {
  //let productData = props.productData;
  const [token] = useContext(AuthContext);
  const config = {
    headers: {
      authorization: token,
    },
  };

  const [productData, setProductData] = useState([]);
  
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Gift baskets");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [description, setDescription] = useState("");
  const [delivery, setDelivery] = useState(false);
  const [image, setImage] = useState("");

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
  
  const obj = { name, category, price, quantity, description, delivery, image };
  useEffect(() => {
    getAllProducts();
   
  }, []);

  const handleUpload = (e) => {
    setImage(e.target.files[0]);
  };
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
      const result = await axios.post(
        `admin/product/`,
        newProductData,
        config,
        {
          header: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(result);
    } catch (err) {
      console.log("error", err.response.data.message);
    }
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
  return (
    <div className="admin-dash-add-products-container">
      <div className="add-product-wrapper">
        <h2>ADD A PRODUCT</h2>
        <form onSubmit={handleSubmit}>
         
          <input class="custom-file-input" type="file" id="file" onChange={handleUpload} />
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
        <div className="delete-container">
        <h2>DELETE A PRODUCT</h2>
        <select
          id="name"
          onChange={(e) => {
            setName(e.target.value);
            console.log(name);
          }}
        >
          {" "}
          <option value={null}> choose one</option>
          {productData.map((item) => (
            <option value={item._id}> {item.name} </option>
          ))}
        </select>
        <button className="button-dash" onClick={() => handleDelete(name)}>
          DELETE THE PRODUCT
        </button>
      </div>
      </div>
      

      <div className="preview">
        <p>preview</p>
        <ShopItem obj={obj} />
      </div>
    </div>
  );
}
