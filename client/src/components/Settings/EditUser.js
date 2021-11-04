import React, { useState, useContext } from "react";
import { DataContext } from "../Context";
import axios from "axios";
function EditUser() {
  //use the context
  const [data, setData] = useContext(DataContext);
  const userData = data?.user;
  const [username, setUsername] = useState(userData.username);
  const [email, setEmail] = useState(userData.email);
  const [password, setPassword] = useState("");
  const [NewPassword, setNewPassword] = useState("");
  const [phone, setPhone] = useState(userData.phone);
  const [address, setAddress] = useState(userData.address);
  const handleSubmit = () => {
    const data = { username, email, address, phone };
    let userId = data?.user.id;
    console.log(userId);
    axios
      .put(`user/update/${userId}`, data)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  };
  return (
    <div>
      <div>
        <h1>Profile</h1>
        <input
          type="text"
          value={username}
          name="username"
          onChange={(e) => setUsername(e.target.value)}
          placeholder="choose your username"
        />
        <input
          type="email"
          value={email}
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your email"
        />
        <input
          type="phone"
          value={phone}
          name="phone"
          onChange={(e) => setPhone(e.target.value)}
          placeholder="enter your phone number"
        />
        <input
          type="address"
          value={address}
          name="address"
          onChange={(e) => setAddress(e.target.value)}
          placeholder="enter your address"
        />
        <button onClick={handleSubmit}>update Your Profile</button>
      </div>
      <div>
        <input
          type="password"
          value={password}
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="enter your current password"
        />
        <input
          type="password"
          value={NewPassword}
          name="NewPassword"
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="enter your new password"
        />
        <button>change your new password</button>
      </div>
    </div>
  );
}

export default EditUser;
