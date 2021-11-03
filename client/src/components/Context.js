import React, { useState, createContext } from "react";

export const DataContext = createContext();

export const DataProvider = (props) => {
<<<<<<< HEAD
   const [data, setData] = useState();

  
  return (
=======
  const [data, setData] = useState();
  
return (
>>>>>>> caa0a87e122caec20e24bec41fe745262563e08c
    <DataContext.Provider value={[data, setData]}>
      {props.children}
    </DataContext.Provider>
  );
};
