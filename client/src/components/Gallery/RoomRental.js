import React, { useState } from "react";
import ServicesData from "../../JSON/rent.json";
import { v4 as uuidv4 } from "uuid";

const RoomRental = () => {
  const [images, setImages] = useState(5);

  // onClick show more images
  const showMoreImg = () => {
    setImages(images + 6);
  };

  // Category --> heading, images and button
  const rentalGallery = ServicesData.map((obj) => {
    const { name, linkId, imgs } = obj;

    return (
      <div key={uuidv4()} className="container-gallery">
        {/* Heading for category */}
        <h3 id={linkId} key={uuidv4()}>
          {name}
        </h3>

        {/* Images gallery */}
        <div key={uuidv4()} className="container-img-outer">
          {imgs.map((img) => {
            if (imgs.indexOf(img) <= images) {
              return (
                <div key={uuidv4()} className="container-img-inner">
                  <img src={img} alt={linkId} />
                </div>
              );
            }
          })}
        </div>

        {/* Button --> Show more */}
        <button key={uuidv4()} onClick={showMoreImg}>
          Show more
        </button>
      </div>
    );
  });

  return <div className="wrapper-img-services">{rentalGallery}</div>;
};

export default RoomRental;
