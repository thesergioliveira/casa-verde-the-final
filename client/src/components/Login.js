import React, { useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { DataContext } from "./UserContext";
import { AuthContext } from "./AuthContext";
import { HiOutlineEyeOff, HiOutlineEye } from "react-icons/hi";

const Login = ({ history }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useContext(DataContext);
  const [token, setToken] = useContext(AuthContext);
  const [showEye, setShowEye] = useState(false);
  const [loginMessage, setLoginMessage] = useState("");
  axios.defaults.withCredentials = true;
  const loginUser = () => {
    axios
      .post("user/login", {
        username,
        password,
      })
      .then((res) => {
        if (!res.data.token) {
          setLoginMessage(res.data.message);
        } else {
          setToken(res.data.token);
          setData(res.data);
          localStorage.setItem("token", res.data.token);
          setLoginMessage("You are logged in");
          history.push("/");
        }
      })
      .catch((error) => {
        setLoginMessage(error.response.data.message);
      });
  };

  return (
    <div className="login-container">
      <input
        type="text"
        value={username}
        name="username"
        onChange={(e) => setUsername(e.target.value)}
        placeholder="enter your username or your email"
      />
      <div className="password">
        <input
          type={showEye ? "text" : "password"}
          value={password}
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="confirm your password"
        />
        <span className="iconPass" onClick={() => setShowEye(!showEye)}>
          {" "}
          {showEye ? <HiOutlineEye /> : <HiOutlineEyeOff />}
        </span>
      </div>

      <button className="button-dash" onClick={loginUser}>
        Login
      </button>
      <Link to="/forgetPassword">Passwort vergessen?</Link>
      <h4>OR</h4>
      <button className="button-dash">
        <Link to="/register">Register</Link>
      </button>
      <h2>{loginMessage}</h2>
    </div>
  );
};
export default Login;
