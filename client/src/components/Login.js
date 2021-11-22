import React, { useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { DataContext } from "./UserContext";
import { AuthContext } from "./AuthContext";
const Login = ({ history }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useContext(DataContext);
  const [token, setToken] = useContext(AuthContext);
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
          setToken(res.data.token)
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
      <input
        type="password"
        value={password}
        name="password"
        onChange={(e) => setPassword(e.target.value)}
        placeholder="confirm your password"
      />
      <button className="button-dash" onClick={loginUser}>Login</button>
      <Link to="/forgetPassword">Forget Password?</Link>
      <h4>OR</h4>
      <Link to="/register">Register</Link>
      <h2>{loginMessage}</h2>
    </div>
  );
};
export default Login;
