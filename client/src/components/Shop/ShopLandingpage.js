import React, { useState } from "react";
import ShopSlider from "../../shopSlider.json";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";

const ShopLandingpage = () => {
  const slider = ShopSlider.map((obj) => {
    const { id, name, alt, img } = obj;

    return (
      <div key={id} className="slide">
        <img src={process.env.PUBLIC_URL + img} alt={alt} />
      </div>
    );
  });

  return (
    <div className="slider-wrapper">
      {slider}
      <MdArrowBackIos className="silder-icon left" />
      <MdArrowForwardIos className="silder-icon right" />
    </div>
  );
};

export default ShopLandingpage;
