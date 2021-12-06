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
            This website uses cookies<span className="the-cookie">🍪 </span>to
            give you an incredible experience.
          </p>
          <p>
            By using this website you agree to the{" "}
            <span className="datenschutz">
              <Link to="/datenschutzerklaerung">terms.</Link>
            </span>{" "}
          </p>
        </div>

        <div className="blur-cookies"></div>
      </div>
    </div>

    // <div className="coocie">
    //   <div className="container-cookies">
    //     <input className="checkbox-cb" id="checkbox-cb" type="checkbox" />
    //     <div className="cookie-bar">
    //       <span className="themessage">
    //         This website uses cookies🍪 to give you an incredible experience.
    //         By using this website you agree to the <a href="#">terms</a>
    //       </span>
    //       <span className="themobile">
    //         This website uses cookies,{" "}
    //         <span>
    //           <Link to="/datenschutzerklaerung">learn more</Link>
    //         </span>
    //       </span>
    //       <label for="checkbox-cb" className="close-cb">
    //         x
    //       </label>
    //     </div>
    //     <div className="blur-cookies"></div>
    //   </div>
    // </div>
  );
}
