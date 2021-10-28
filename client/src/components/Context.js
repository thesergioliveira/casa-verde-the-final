import React, { useState, createContext } from "react";

export const DataContext = createContext();

export const DataProvider = (props) => {
   const [token, setToken] = useState();

  
  return (
    <DataContext.Provider value={[token, setToken]}>
      {props.children}
    </DataContext.Provider>
  );
};
