import React, { useState, useContext, useEffect } from "react";
import { DataContext } from "../UserContext";
import { AuthContext } from "../AuthContext";
import axios from "axios";
function EditUser() {
  //use the context
  const [data, setData] = useContext(DataContext);
  const userData = data?.user;

  const [username, setUsername] = useState(userData?.username);
  const [email, setEmail] = useState(userData?.email);
  const [password, setPassword] = useState("");
  const [NewPassword, setNewPassword] = useState("");
  const [phone, setPhone] = useState(userData?.phone);
  const [address, setAddress] = useState(userData?.address);
  const [updateMessage, setUpdateMessage] = useState("");
  const [token] = useContext(AuthContext);

  const config = {
    headers: {
      authorization: token,
    },
  };

  const updateUserInfo = () => {
    const newData = { username, email, address, phone };

    //edit user infos
    axios
      .put("user/update", newData, config)
      .then((res) => {
        console.log(res.data);
        setUpdateMessage(res.data.message);
      })
      .catch((err) => {
        console.log(err?.response?.data.message);
      });
  };
  //change password
  const changePassword = () => {
    const newPassword = { NewPassword, password, username };
    axios
      .put("user/updatePassword/", newPassword, config)
      .then((res) => {
        console.log(res.data);
        setUpdateMessage(res.data.message);
      })
      .catch((error) => {
        console.log(error?.response?.data.message);
        setUpdateMessage(error.response.data.message);
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
        <button onClick={updateUserInfo}>update Your Profile</button>
      </div>
      <div>
        <input
          type="password"
          value={password}
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="enter your current password"
        />
        <h4>{password}</h4>
        <input
          type="password"
          value={NewPassword}
          name="NewPassword"
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="enter your new password"
        />
        <button onClick={changePassword}>change your password</button>
      </div>
      <h5>{updateMessage}</h5>
    </div>
  );
}

export default EditUser;
