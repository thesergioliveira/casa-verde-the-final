import axios from "axios";
import React, { useState, createContext, useEffect } from "react";

export const DataContext = createContext();

export const DataProvider = (props) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const config = {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    };

    axios("/user/checkAuth", config)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err?.response?.data.message);
        localStorage.removeItem("token");
      });
  }, []);

  //JSON.parse(localStorage.getItem("data")
  return (
    <DataContext.Provider value={[data, setData]}>
      {props.children}
    </DataContext.Provider>
  );
};
