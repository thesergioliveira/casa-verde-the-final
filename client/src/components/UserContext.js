import axios from "axios";
import React, { useState, createContext, useEffect } from "react";

export const DataContext = createContext();

export const DataProvider = (props) => {
  const [data, setData] = useState();

  useEffect(() => {
    // the config will use it when add to the basket to check if its the right user or not
    const config = {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    };

    axios("/user/checkAuth", config)
      .then((res) => {
        // console.log(res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err?.response?.data.message);
      });
  }, []);

  //JSON.parse(localStorage.getItem("data")
  return (
    <DataContext.Provider value={[data, setData]}>
      {props.children}
    </DataContext.Provider>
  );
};
