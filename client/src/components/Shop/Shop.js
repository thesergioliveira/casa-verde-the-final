import axios from "axios";
import { useState, useEffect } from "react";
import React from "react";
//import { Link } from "react-router-dom";
//import { get } from "mongoose";
import ShopItem from "./ShopItem";
import ShopSlider from "./ShopSlider";
import { FaSearch } from "react-icons/fa";
import { ImEnlarge } from "react-icons/im";
import ItemDetails from "./ItemDetails";
function Shop({ history }) {
  const [data, setData] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [priceInput, setPriceInput] = useState("");
  const [deliveryInput, setDeliveryInput] = useState(1);
  //to get all products
  const getAllProducts = () => {
    axios
      .get("user/products")
      .then((res) => {
        if (res.data) {
          //console.log(res.data)
          setData(res.data);
          localStorage.setItem("product", JSON.stringify(res.data));
        } else {
          setData({ auth: false });
        }
      })
      .catch((err) => {
        console.log("here", err.response?.data);
      });
  };
  const productFromStorage = JSON.parse(localStorage.getItem("product"));
  //console.log(productFromStorage)
  useEffect(() => {
    getAllProducts();
  }, [deliveryInput]);

  //searchbar setup here
  const changeHandle = (e) => {
    setUserInput(e.target.value);
  };
  const userText = userInput.toLocaleLowerCase().trim();
  let searchResult = productFromStorage
    ?.filter(
      (el) =>
        el.name.toLocaleLowerCase().includes(userText) ||
        el.description.toLocaleLowerCase().includes(userText) ||
        el.category.toLocaleLowerCase().includes(userText)
    )
    .map((obj) => {
      return <ShopItem obj={obj} />;
    });
  // products price filter
  priceInput === "high"
    ? data.sort((a, b) => b.price - a.price)
    : data.sort((a, b) => a.price - b.price);

  const getFlowerAndPlantsPots = data
    ?.filter((el) => el.category === "Blumen und Topfpflanzen")
    .map((obj) => {
      return (
        <div className="container-product">
          <div
            className="product-icon"
            onClick={() => {
              history.push(`/shop/product/${obj._id}`);
            }}
          >
            Zum Produkt
          </div>

          <ShopItem obj={obj} />
        </div>
      );
    });
  //getBouquetOfFlowers
  const getBouquetOfFlowers = data
    ?.filter((el) => el.category === "Blumen und Sträuße")
    .map((obj) => {
      return (
        <div className="container-product">
          <div
            className="product-icon"
            onClick={() => {
              history.push(`/shop/product/${obj._id}`);
            }}
          >
            Zum Produkt
          </div>
          <ShopItem obj={obj} />{" "}
        </div>
      );
    });
  //getGiftBaskets
  const getGiftBaskets = data
    ?.filter((el) => el.category === "Geschenkideen")
    .map((obj) => {
      return (
        <div className="container-product">
          <div
            className="product-icon"
            onClick={() => {
              history.push(`/shop/product/${obj._id}`);
            }}
          >
            Zum Produkt
          </div>
          <ShopItem obj={obj} />{" "}
        </div>
      );
    });
  //italianProducts
  const italianProducts = data
    ?.filter((el) => el.category === "Italienische Spezialitäten")
    .map((obj) => {
      return (
        <div className="container-product">
          <div
            className="product-icon"
            onClick={() => {
              history.push(`/shop/product/${obj._id}`);
            }}
          >
            Zum Produkt
          </div>
          <ShopItem obj={obj} />{" "}
        </div>
      );
    });
  // get all products
  const getProducts = data?.map((obj) => {
    return (
      <div className="container-product">
        <div
          className="product-icon"
          onClick={() => {
            history.push(`/shop/product/${obj._id}`);
          }}
        >
          Zum Produkt
        </div>
        <ShopItem obj={obj} />{" "}
      </div>
    );
  });
  return (
    <div className="shop">
      {/* Slider */}
      <ShopSlider />

      <div className="search-container">
        <div className="search-bar">
          <FaSearch className="search-icon" />
          <input
            type="search"
            name="search"
            onChange={changeHandle}
            value={userInput}
            className="searchInput"
            placeholder="Suche..."
          />
        </div>
        <div className="filters">
          <div>
            Preis:
            <select
              id="price"
              onChange={(e) => {
                setPriceInput(e.target.value);
              }}
            >
              <option value="low">Aufsteigend</option>
              <option value="high">Absteigend</option>
            </select>
          </div>
          <div>
            Versandmethode:
            <select
              id="delivery"
              onChange={(e) => {
                // setDeliveryInput(e.target.value)
                setDeliveryInput(deliveryInput + 1);
                let newdata = data.filter(
                  (el) => el.delivery.toString() === e.target.value
                );
                setData(newdata);
                console.log(typeof e.target.value, e.target.value);

                //
              }}
            >
              <option value={true}>Nur Abholung möglich</option>
              <option value={false}>Lieferbar</option>
              <option value={null}>Alle</option>
            </select>
          </div>
        </div>
      </div>
      <div className="search-result">
        <div className="space-for-results">
          {userInput.length ? searchResult : null}
        </div>

        <div className="products-container">
          <h2 id="plants">Blumen und Topfpflanzen</h2>
          <div className="products">{getFlowerAndPlantsPots}</div>
          <h2 id="flowers">Blumensträuße</h2>
          <div className="products">{getBouquetOfFlowers}</div>
          <h2 id="gifts">Geschenkideen</h2>
          <div className="products">{getGiftBaskets}</div>
          <h2 id="italian">Italienische Spezialitäten</h2>
          <div className="products">{italianProducts}</div>
          <h2>Alle Produkte</h2>
          <div className="products">{getProducts}</div>
        </div>
        {/* version with ul */}
        {/* <ul>{getProducts}</ul> */}
      </div>
    </div>
  );
}
export default Shop;
