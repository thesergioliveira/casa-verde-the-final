import React, { useState } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConf, setPasswordConf] = useState("");
  const [registerMessage, setRegisterMessage] = useState("");
  axios.defaults.withCredentials = true;

  const handleSubmit = () => {
    const data = { username, password, passwordConf, email };

    axios
      .post("user/register", data, {
        header: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res.data);
        redirect();
      })
      .catch((err) => {
        setRegisterMessage(err.response.data.message);
      });
  };
  // i used useHistory to redirect after registering to the login page
  let history = useHistory();
  const redirect = () => {
    history.push("/");
  };
  return (
    <div className="register-container">
      <h2>Ready to take a free trial?</h2>
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
        type="password"
        value={password}
        name="password"
        onChange={(e) => setPassword(e.target.value)}
        placeholder="password"
      />
      <input
        type="password"
        value={passwordConf}
        name="passwordConf"
        onChange={(e) => setPasswordConf(e.target.value)}
        placeholder="confirm your password"
      />

      <button onClick={handleSubmit}>Register</button>

      <h4>OR</h4>
      <Link to="/login">Login</Link>
      <h3>{registerMessage}</h3>
    </div>
  );
};
export default Register;
