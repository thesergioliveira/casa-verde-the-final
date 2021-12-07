import React, { useState, useContext } from "react";
import { DataContext } from "./UserContext";
import { AuthContext } from "./AuthContext";
import axios from "axios";
import { FaUserEdit } from "react-icons/fa";
import { HiOutlineEyeOff, HiOutlineEye } from "react-icons/hi";
function EditUser({ history }) {
  //use the context
  const [data] = useContext(DataContext);
  const userData = data.user;
  //console.log(userData);
  const [token, setToken] = useContext(AuthContext);
  const config = {
    headers: {
      authorization: token,
    },
  };
  const [closeUser, setCloseUser] = useState(true);
  const [show, setShow] = useState(true);
  const [password, setPassword] = useState(null);
  const [passwordToD, setPasswordToD] = useState(null);
  const [passwordConf, setPasswordConf] = useState(null);
  const [NewPassword, setNewPassword] = useState(null);
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [updateMessage, setUpdateMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showEye, setShowEye] = useState(false);
  const [showEyeConf, setShowEyeConf] = useState(false);
  const updateUserInfo = () => {
    const newData = {
      address,
      phone,
      houseNumber,
      city,
      state,
      country,
      postalCode,
    };

    //edit user infos
    axios
      .put("user/updateUserInfos", newData, config)
      .then((res) => {
        console.log(res.data);
        setUpdateMessage(res.data.message);
        window.location.reload(false);
      })
      .catch((err) => {
        console.log(err?.response?.data.message);
        setErrorMessage(err?.response?.data.message);
        setShow(false);
      });
  };
  //
  const showEditUser = () => {
    setShow(!show);
    setCloseUser(!closeUser);
  };
  //change password
  const changePassword = () => {
    const newPasswordData = { passwordConf, NewPassword, password };
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
      .put("user/updatePassword/", newPasswordData, config)
      .then((res) => {
        console.log(res.data);
        setUpdateMessage(res.data.message);
        logoutAfterUpdate();
      })
      .catch((error) => {
        console.log(error?.response?.data.message);
        setErrorMessage(error?.response?.data.message);
      });
  };
  // delete user
  const deleteUser = () => {
    const logoutAfterDelete = () => {
      setTimeout(
        () => setUpdateMessage("Dein Profil wurde gelöscht. 😔"),
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
      })
      .catch((err) => {
        setErrorMessage(err?.response?.data.message);
      });
  };

  return (
    <div className="edit-user-box">
      <div className="edit-user-container">
        <h1>Profil</h1>
        <h2 style={{ color: "green" }}>{updateMessage}</h2>
        <h3 style={{ color: "red" }}>{errorMessage}</h3>
        <div>
          <h3>Benutzerdaten</h3>
          <p>{userData?.username}</p>
          <p>{userData?.email}</p>
          <p>{userData?.phone}</p>
          <p>
            {userData?.address} {userData?.houseNumber}
          </p>
          <p>{userData?.city}</p>
          <p> {userData?.state}</p>
          <p> {userData?.country}</p>
          <p> {userData?.postalCode}</p>
          <div className="editIcon" onClick={showEditUser}>
            <FaUserEdit />
          </div>
          <div className={show ? "edit-none" : "edit-show"}>
            <input
              type="phone"
              value={phone}
              name="phone"
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Telefonnummer"
            />
            <input
              type="address"
              value={address}
              name="address"
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Straße"
            />
            <input
              type="number"
              value={houseNumber}
              name="houseNumber"
              onChange={(e) => setHouseNumber(e.target.value)}
              placeholder="Hausnummer"
            />
            <input
              type="country"
              value={country}
              name="country"
              onChange={(e) => setCountry(e.target.value)}
              placeholder="Land"
            />
            <input
              type="state"
              value={state}
              name="state"
              onChange={(e) => setState(e.target.value)}
              placeholder="Bundesland"
            />
            <input
              type="city"
              value={city}
              name="city"
              onChange={(e) => setCity(e.target.value)}
              placeholder="Stadt"
            />
            <input
              type="postalCode"
              value={postalCode}
              name="postalCode"
              onChange={(e) => setPostalCode(e.target.value)}
              placeholder="Postleitzahl"
            />
          </div>
          <button className="button-dash" onClick={updateUserInfo}>
            Update Your Profile
          </button>
        </div>
        <div>
          <h3>Passwort</h3>
          <span className="password">
            <input
              type={showEye ? "text" : "password"}
              value={password}
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="aktuelles Passwort"
            />
            <span className="iconPass" onClick={() => setShowEye(!showEye)}>
              {" "}
              {showEye ? <HiOutlineEye /> : <HiOutlineEyeOff />}
            </span>
          </span>
          <span className="password">
            <input
              type={showEyeConf ? "text" : "password"}
              value={NewPassword}
              name="NewPassword"
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="neues Passwort"
            />
            <span
              className="iconPass"
              onClick={() => setShowEyeConf(!showEyeConf)}
            >
              {" "}
              {showEyeConf ? <HiOutlineEye /> : <HiOutlineEyeOff />}
            </span>
          </span>
          <input
            type={showEyeConf ? "text" : "password"}
            value={passwordConf}
            name="passwordConf"
            onChange={(e) => setPasswordConf(e.target.value)}
            placeholder="Passwort bestätigen"
          />
          <button onClick={changePassword}>Passwort ändern</button>
        </div>
        <div>
          <h3>Profil löschen</h3>
          <input
            type="password"
            value={passwordToD}
            name="passwordToD"
            onChange={(e) => setPasswordToD(e.target.value)}
            placeholder="Passwort eingeben"
          />
          <button onClick={deleteUser}>PROFIL LÖSCHEN</button>
        </div>
      </div>
    </div>
  );
}

export default EditUser;
