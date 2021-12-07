import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Cookies() {
  const [close, setClose] = useState(true);

  const closeBanner = () => {
    setClose(!close);
  };

  return (
    <div className={close ? "wrapper-cookies" : "closed"}>
      <div className="container-cookies">
        <div className="cookie-bar">
          <button onClick={closeBanner}>❎</button>
          <p>
            Diese Website verwendet Cookies.
            <span className="the-cookie">🍪</span>
          </p>
          <p>
            Durch die Nutzung dieser Website stimmen Sie der{" "}
            <span className="datenschutz">
              <Link to="/datenschutzerklaerung">DSGVO</Link>
            </span>{" "}
            zu.
          </p>
        </div>

        <div className="blur-cookies"></div>
      </div>
    </div>
  );
}
