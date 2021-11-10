import React, { useState, useContext } from "react";
import { DataContext } from "../UserContext";
import { AuthContext } from "../AuthContext";
import axios from "axios";
function EditUser({ history }) {
  //use the context
  const [data] = useContext(DataContext);
  const userData = data?.user;
  const [token, setToken] = useContext(AuthContext);

  const config = {
    headers: {
      authorization: token,
    },
  };
  const [username, setUsername] = useState(userData?.username);
  const [email, setEmail] = useState(userData?.email);
  const [password, setPassword] = useState(null);
  const [passwordToD, setPasswordToD] = useState(null);
  const [passwordConf, setPasswordConf] = useState("");
  const [NewPassword, setNewPassword] = useState("");
  const [phone, setPhone] = useState(userData?.phone);
  const [address, setAddress] = useState(userData?.address);
  const [houseNumber,setHouseNumber]=useState(userData?.houseNumber);
  const [city, setCity] = useState(userData?.city);
  const [state, setState] = useState(userData?.state);
  const [country, setCountry] = useState(userData?.country);
  const [postalCode ,setPostalCode] = useState(userData?.postalCode);
  const [updateMessage, setUpdateMessage] = useState("");
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
    const newPassword = { passwordConf, NewPassword, password, username };
    const logoutAfterUpdate = () => {
      setTimeout(
        () =>
          setUpdateMessage(
            "your going to logout in 3s ,please login with the new password"
          ),
        3000
      );
      setTimeout(
        () => setToken(null) + localStorage.clear() + history.push("/login"),
        7500
      );
    };
    axios
      .put("user/updatePassword/", newPassword, config)
      .then((res) => {
        console.log(res.data);
        setUpdateMessage(res.data.message);
        logoutAfterUpdate();
      })
      .catch((error) => {
        console.log(error?.response?.data.message);
        setUpdateMessage(error.response.data.message);
      });
  };
  // delete user
  const deleteUser = () => {
    const logoutAfterDelete = () => {
      setTimeout(
        () => setUpdateMessage("you are not our client anymore 😔"),
        3000
      );
      setTimeout(
        () => setToken(null) + localStorage.clear() + history.push("/register"),
        7500
      );
    };
    const config = {
      headers: {
        authorization: token,
        pass: passwordToD,
      },
    };

    axios
      .delete("user/deleteUser", config)
      .then((res) => {
        logoutAfterDelete();
        setUpdateMessage(res.data.message);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err?.response?.data.message);
      });
  };

  return (
    <div style={{ height: "50vh" }}>
      <h1>Profile</h1>
      <div>
        <h3> User Information</h3>

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
        <input
        type="houseNumber"
        value={houseNumber}
        name="houseNumber"
        onChange={(e) => setHouseNumber(e.target.value)}
        placeholder="enter your houseNumber"
      /> 
      <input
        type="country"
        value={country}
        name="country"
        onChange={(e) => setCountry(e.target.value)}
        placeholder="enter your Country Name"
      />
      <input
        type="state"
        value={state}
        name="state"
        onChange={(e) => setState(e.target.value)}
        placeholder="enter your State Name"
      />
      <input
        type="city"
        value={city}
        name="city"
        onChange={(e) => setCity(e.target.value)}
        placeholder="enter your City Name"
      />
     
      <input
        type="postalCode"
        value={postalCode}
        name="postalCode"
        onChange={(e) => setPostalCode(e.target.value)}
        placeholder="enter your postalCode"
      />
        <button onClick={updateUserInfo}>update Your Profile</button>
      </div>
      <div>
        <h3> User Password</h3>
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
        <input
          type="password"
          value={passwordConf}
          name="passwordConf"
          onChange={(e) => setPasswordConf(e.target.value)}
          placeholder="confirm your password"
        />
        <button onClick={changePassword}>change your password</button>
      </div>
      <div>
        <h3>Delete your account</h3>
        <input
          type="password"
          value={passwordToD}
          name="passwordToD"
          onChange={(e) => setPasswordToD(e.target.value)}
          placeholder="enter your password"
        />
        <button onClick={deleteUser}>DELETE ACCOUNT</button>
      </div>
      <h2 style={{ color: "green" }}>{updateMessage}</h2>
    </div>
  );
}

export default EditUser;
