import React, { useState, useContext } from "react";
import { DataContext } from "./UserContext";
import { AuthContext } from "./AuthContext";
import axios from "axios";

const ReVerify = () => {
  const [message, setMessage] = useState("");

  //use the context
  const [data] = useContext(DataContext);
  const [token] = useContext(AuthContext);
  const config = {
    headers: {
      authorization: token,
    },
  };
  const resentConf = () => {
    axios
      .get("user/resentConf", config)
      .then((res) => {
        setMessage(res.data.message);
        console.log(res.data.message);
      })
      .catch((error) => {
        setMessage(error.response?.data?.error);
        console.log(error.response?.data?.error);
      });
  };
  return (
    <div className="verify-container">
      <h3>Verify your email to activate your account</h3>
      <h4 style={{ color: "green" }}>{message}</h4>
      <p>
        An email with a verification code has been sent to{" "}
        {data?.userData?.email}. The code will expire in 10 minutes. If you
        would like a new code, or you haven’t received the email, click on the
        button
      </p>
      <button className="button-dash" onClick={resentConf}>
        Send a new One
      </button>
    </div>
  );
};
export default ReVerify;
