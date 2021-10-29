import React, { useState } from "react";
import ShopSlider from "../../shopSlider.json";

const ShopLandingpage = () => {
  return (
    <div className="slider-wrapper">
      <img
        src={process.env.PUBLIC_URL + ShopSlider[0].img}
        alt={ShopSlider[1].alt}
      />
    </div>
  );
};

export default ShopLandingpage;
