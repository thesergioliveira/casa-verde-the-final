import React from 'react'
import axios from "axios";
import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import {DataContext} from "./Context";

const AdminDash = () => {
  
    const [data, setData] = useState([]);
    const [total, setTotal] = useState(0);
    const [userdata, setUserdata] = useContext(DataContext);
    const indUserId= userdata?.user.id;
    //control
let allow
 userdata?.user.admin ? allow="flex": allow="none";
 
    return <div 
    style={{
        display:`${allow}`,
        backgroundColor:`#f5f5f5`,
      }}
    >
           <h1> welcome rf{userdata?.user.username}</h1> 

          </div>
    
}

export default AdminDash
