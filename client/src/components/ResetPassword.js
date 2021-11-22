import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ResetPassword = ({ history }) => {
  // const [data, setData] = useContext(DataContext);
  const [newPassword, setPassword] = useState("");
  const [passwordConf, setPasswordConf] = useState("");
  const [message, setMessage] = useState("");
  const { id } = useParams();
  console.log(id);
  const resetPass = () => {
    const resetLink = id;
    axios
      .put("user/resetPassword", {
        resetLink,
        newPassword,
      })
      .then((res) => {
        setMessage(res.data.message)
        setTimeout(
          () => history.push("/login"),
          3000
        );
        console.log(res.data.message);
      })
      .catch((error) => {
        setMessage(error.data.message)
        console.log(error.response.data);
      });
  };
  return (
    <div className="reset-container">
      <h3>Reset Password</h3>
      <h4 style={{ color: "green" }}>{message}</h4>
      <input
        type="password"
        value={newPassword}
        name="newPassword"
        onChange={(e) => setPassword(e.target.value)}
        placeholder="enter your password"
      />
       <input
        type="password"
        value={passwordConf}
        name="passwordConf"
        onChange={(e) => setPasswordConf(e.target.value)}
        placeholder="enter your password confirmation"
      />
      <button className="button-dash" onClick={resetPass}>Submit</button>
    </div>
  );
};
export default ResetPassword;
