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
  const [category, setCategory] = useState("bitte auswählen");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [description, setDescription] = useState("");
  const [delivery, setDelivery] = useState(false);
  const [image, setImage] = useState("");
  const [errormsg, setErrormsg] = useState("");
  

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
if (name === "" || category === "bitte auswählen" || price === 0 || quantity === 0 || description === "" || image === "") {
  setErrormsg("❗❗❗please complete all the fields");
} else {

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
      setErrormsg("❗❗❗versuch nochmals");
    }}
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
        <h2>Produkt hinzufügen</h2>
        <form onSubmit={handleSubmit}>
          <input
            class="custom-file-input"
            type="file"
            id="file"
            onChange={handleUpload}
          />
          <p>Name des Produkts:</p>
          <input
            type="text"
            value={name}
            name="name"
            onChange={(e) => setName(e.target.value)}
            placeholder="Produktname"
          />
          <p>Kategorie:</p>
          <select
            id="category"
            onChange={(e) => {
              setCategory(e.target.value);
            }}
          >
             <option value={null}> bitte auswählen </option>
            <option value="Bouquet of flowers"> Blumen und Sträuße </option>
            <option value="Flower and plants pots">Bepflanzungen </option>
            <option value="Gift baskets"> Geschenke </option>
            <option value="Italian Products"> Italienische Produkte</option>
            </select>
          <p>Preis:</p>
          <input
            type="number"
            value={price}
            name="price"
            onChange={(e) => setPrice(e.target.value)}
            placeholder="price"
          />
          <p>Lagermenge:</p>
          <input
            type="number"
            value={quantity}
            name="quantity"
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="quantity"
          />
          <p>Beschreibung:</p>
          <input
            type="text"
            value={description}
            name="description"
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Beschreibung"
          />
          <p>Lieferung oder Abholung?:</p>
          <select
            id="delivery"
            onChange={(e) => {
              setDelivery(e.target.value);
            }}
          >
             <option value={null}> bitte auswählen </option>
            <option value={true}> Lieferung </option>
            <option value={false}> Abholung </option>
          </select>
          <input className="button-dash" type="submit" value="Hinzufügen" />
          {errormsg && <p className="error-msg">{errormsg}</p>}
        </form>
        <div className="delete-container">
          <h2>Löschen eines Produktes</h2>
          <select
            id="name"
            onChange={(e) => {
              setName(e.target.value);
              console.log(name);
            }}
          >
            {" "}
            <option value={null}>Auswahl</option>
            {productData.map((item) => (
              <option value={item._id}> {item.name} </option>
            ))}
          </select>
          <button className="button-dash" onClick={() => handleDelete(name)}>
            Produkt löschen
          </button>
        </div>
      </div>

      <div className="preview">
        <p>Vorschau</p>
        <ShopItem obj={obj} />
      </div>
    </div>
  );
}
