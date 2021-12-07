import React from "react";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import ShopItem from "../Shop/ShopItem";
import { AuthContext } from "../AuthContext";

export default function UpdateProduct() {
  const [token] = useContext(AuthContext);
  const config = {
    headers: {
      authorization: token,
    },
  };

  const [productData, setProductData] = useState([]);
  const [id, setId] = useState();
  const [name, setName] = useState("any name");
  const [category, setCategory] = useState("Blumen und Sträuße");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [description, setDescription] = useState();
  const [delivery, setDelivery] = useState(false);
  const [image, setImage] = useState();
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
  const obj = { name, id, category, price, quantity, description, delivery };

  useEffect(() => {
    getAllProducts();
  }, []);
  const handleUpload = (e) => {
    setImage(e.target.files[0]);
  };
  const handleSubmitForUpdate = async (e) => {
    e.preventDefault();
    if (name === "" || category === "bitte auswählen" || price === 0 || quantity === 0 || description === "" || image === "") {
      setErrormsg("❗❗❗please complete all the fields");
    } else {
    const updatedProductData = new FormData();

    updatedProductData.append("category", category);
    updatedProductData.append("price", price);
    updatedProductData.append("quantity", quantity);
    updatedProductData.append("description", description);
    updatedProductData.append("delivery", delivery);
    updatedProductData.append("image", image);
    console.log(id);
    try {
      const result = await axios.put(
        `admin/product/${id}`,
        updatedProductData,
        config,
        {
          header: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(result);
      alert("Product updated successfully");
    } catch (err) {
      console.log("error", err.response.data.message);
    }}
  };

  return (
    <div className="admin-dash-add-products-container">
      <div className="add-product-wrapper">
        <h2>Produkt ändern</h2>
        <form onSubmit={handleSubmitForUpdate}>
          <input class="custom-file-input" type="file" id="file" onChange={handleUpload} />
          <p>Name des Produkts:</p>
          <select
            id="name"
            onChange={(e) => {
              setId(e.target.value);
            }}
          > <option value={null}> bitte auswählen </option>
            {productData.map((item) => (
              <option value={item._id}> {item.name} </option>
            ))}
          </select>

          <p>Kategorie:</p>

          <select
            id="category"
            onChange={(e) => {
              setCategory(e.target.value);
            }}
          >
             <option value={null}> bitte auswählen </option>
            <option value="Blumen und Sträuße"> Blumen und Sträuße </option>
            <option value="Blumen und Topfpflanzen"> Pflanzungen </option>
            <option value="Geschenkideen"> Geschenke </option>
            <option value="Italienische Spezialitäten"> Italienische Produkte</option>
          </select>
          <p>Neuer Preis:</p>
          <input
            type="number"
            value={null}
            name="price"
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Neuer Preis"
          />

          <p>Anzahl ändern:</p>

          <input
            type="number"
            value={null}
            name="quantity"
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="Anzahl"
          />

          <p>Andere Beschreibung:</p>
          <input
            type="text"
            value={null}
            name="description"
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Neue Beschreibung"
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
          <input className="button-dash" type="submit" value="Änderungen speichern" />
        </form>
      </div>
      <div className="preview">
        <p>Vorschau</p>
        <ShopItem obj={obj} />
      </div>
    </div>
  );
}
