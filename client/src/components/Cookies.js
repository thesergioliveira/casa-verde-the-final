import React from "react";

export default function Cookies() {
  return (
    <div className="coocie">
      <input className="checkbox-cb" id="checkbox-cb" type="checkbox" />
      <div className="cookie-bar">
        <span className="themessage">
          This website uses 🍪cookies🍪 to give you an incredible experience. By
          using this website you agree to the <a href="#">terms</a>
        </span>
        <span className="themobile">
          This website uses cookies, <a href="#">learn more</a>
        </span>
        <label for="checkbox-cb" className="close-cb">
          x
        </label>
      </div>
    </div>
  );
}
