import React, { useState, useEffect } from "react";
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

  // Slider Dots
  // Slide to image when click on a dot
  const clickDot = (i) => {
    setSlideId(i);
  };

  // create the Dots based on the length of slides.json
  const dots = Array.from({ length: Slides.length }).map((el, i) => {
    return (
      <div
        key={i}
        onClick={() => clickDot(i + 1)}
        className={slideId === i + 1 ? "dot active" : "dot"}
      ></div>
    );
  });

  // Image is changed automatically every 3.5 seconds (there are still problems)
  // useEffect(() => {
  //   setTimeout(
  //     () => setSlideId((nextId) => (nextId === 5 ? 1 : nextId + 1)),
  //     7000
  //   );
  //   return () => {};
  // }, [slideId]);

  return (
    <div className="slider-wrapper">
      {/* Slider images */}
      {slider}

      {/* Icons for next && previous slide */}
      <MdArrowBackIos className="silder-icon left" onClick={prevSlide} />
      <MdArrowForwardIos className="silder-icon right" onClick={nextSlide} />

      {/* Slider dots */}
      <div className="container-dots">{dots}</div>

      {/* Buttons */}
      <div className="container-btn-slider">
        <button>Blumensträuße</button>
        <button>Deko nach Jahreszeit</button>
        <button>Topfpflanzen</button>
        <button>Geschenkideen</button>
        <button>Italienische Spezialitäten</button>
      </div>
    </div>
  );
};

export default ShopSlider;
