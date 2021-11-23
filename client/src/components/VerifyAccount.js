import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const VerifyAccount = ({ history }) => {
  const [message, setMessage] = useState("");
  const { id } = useParams();
  //console.log(id);
  const verify = () => {
    const token = id;
    axios
      .put("user/verifyAccount", {
        token,
      })
      .then((res) => {
        setMessage(res.data.message)
        setTimeout(
          () => history.push("/"),
          3000
        );
        console.log(res.data.message);
      })
      .catch((error) => {
       setMessage(error.response.data.error)
        console.log(error.response.data.error);
      });
  };
  return (
    <div className="verify-container">
      <h3>Verify Your Account</h3>
      <h4 style={{ color: "green" }}>{message}</h4>
     <button className="button-dash" onClick={verify}>Verify</button>
    </div>
  );
};
export default VerifyAccount;
