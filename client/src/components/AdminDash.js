import React from "react";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";
import StatisticsAndQuickUpdates from "./adminDash/StatisticsAndQuickUpdates";
import AddProduct from "./adminDash/AddProduct";
import UpdateProduct from "./adminDash/UpdateProduct";

const AdminDash = () => {
  const [token] = useContext(AuthContext);
  const config = {
    headers: {
      authorization: token,
    },
  };

  // axios.defaults.withCredentials = true;
  const [data, setData] = useState([]);

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
    //getAllProducts();
  }, []);
  return (
    <div className="main-admin-dash-container">
      <StatisticsAndQuickUpdates data={data} />
      <AddProduct />
      <UpdateProduct />
    </div>
  );
};

export default AdminDash;
