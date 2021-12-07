import React, { useState } from "react";
import axios from "axios";

const ForgetPassword = () => {
  // const [data, setData] = useContext(DataContext);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const forgetPassword = () => {
    axios
      .put("user/forgotPassword", {
        email,
      })
      .then((res) => {
        setMessage(res.data.message);
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  };
  return (
    <div className="forget-container">
      <h3>Passwort vergessen</h3>
      <h4 style={{ color: "green" }}>{message}</h4>
      <input
        type="email"
        value={email}
        name="email"
        onChange={(e) => setEmail(e.target.value)}
        placeholder="enter your your email"
      />
      <button className="button-dash" onClick={forgetPassword}>
        Bestätigen
      </button>
    </div>
  );
};
export default ForgetPassword;
