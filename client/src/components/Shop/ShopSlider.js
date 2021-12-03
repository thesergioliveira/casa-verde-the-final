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
  // setTimeout(
  //   () => setSlideId((nextId) => (nextId === 5 ? 1 : nextId + 1)),
  //   3000
  // );
  //   return () => {};
  // });

  return (
    <div className="slider-wrapper">
      {/* Slider images */}
      {slider}

      <div className="wrapper-dots-icons">
        {/* Icons for next && previous slide */}
        <MdArrowBackIos className="silder-icon left" onClick={prevSlide} />

        {/* Slider dots */}
        <div className="container-dots">{dots}</div>

        <MdArrowForwardIos className="silder-icon right" onClick={nextSlide} />
      </div>
      {/* Buttons */}
      <div className="container-btn-slider">
        <div className="container-shop-header">
          <h1>WILLKOMMEN IM</h1>
          <h2>CASA VERDE SHOP</h2>
        </div>
        {/* React-Router is missing */}
        <div className="container-btn">
          <a href="#flowers">
            <div className="blur-btn"></div>
            <button href="#flowers" className="flowers">
              Blumensträuße
            </button>
          </a>
        </div>
        <div className="container-btn">
          <a href="#gifts">
            <div className="blur-btn"></div>
            <button className="deco">Deko nach Jahreszeit</button>
          </a>
        </div>
        <div className="container-btn">
          <a href="#plants">
            <div className="blur-btn"></div>
            <button className="plants">Topfpflanzen</button>
          </a>
        </div>
        <div className="container-btn">
          <a href="#gifts">
            <div className="blur-btn"></div>
            <button className="gifts">Geschenkideen</button>
          </a>
        </div>
        <div className="container-btn">
          <a href="#italian">
            <div className="blur-btn"></div>
            <button className="italy">Italienische Spezialitäten</button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ShopSlider;
