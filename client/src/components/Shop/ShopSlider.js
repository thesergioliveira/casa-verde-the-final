import React, { useState } from "react";
import Slides from "../../JSON/slides.json";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";

const ShopSlider = () => {
  // useState for ID
  const [slideId, setSlideId] = useState(1);

  // next slide function

  const nextSlide = () => {
    if (slideId !== Slides.length) {
      setSlideId(slideId + 1);
    }
    if (slideId === Slides.length) {
      setSlideId(1);
    }
  };

  // previous slide function

  const prevSlide = () => {
    if (slideId !== 1) {
      setSlideId(slideId - 1);
    }
    if (slideId === 1) {
      setSlideId(Slides.length);
    }
  };

  // Map the images
  const slider = Slides.map((obj) => {
    const { id, alt, img } = obj;

    return (
      <div key={id} className={slideId === id ? "slide active-slide" : "slide"}>
        <img src={process.env.PUBLIC_URL + img} alt={alt} />
      </div>
    );
  });

  // create the Dots based on the length of slides.json
  const dots = Array.from({ length: Slides.length }).map((el, i) => {
    return (
      <div key={i} className={slideId === i + 1 ? "dot active" : "dot"}></div>
    );
  });

  return (
    <div className="slider-wrapper">
      {/* Slider images */}
      {slider}

      {/* Icons for next && previous slide */}
      <MdArrowBackIos className="silder-icon left" onClick={prevSlide} />
      <MdArrowForwardIos className="silder-icon right" onClick={nextSlide} />

      {/* Slider dots */}
      <div className="container-dots">{dots}</div>
    </div>
  );
};

export default ShopSlider;
