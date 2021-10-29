import React, { useState } from "react";
import ShopSlider from "../../shopSlider.json";

const ShopLandingpage = () => {
  const slider = ShopSlider.map((obj) => {
    const { id, name, alt, img } = obj;

    return (
      <div className="slide">
        <img src={process.env.PUBLIC_URL + img} alt={alt} />
      </div>
    );
  });

  return <div className="slider-wrapper">{slider}</div>;
};

export default ShopLandingpage;
