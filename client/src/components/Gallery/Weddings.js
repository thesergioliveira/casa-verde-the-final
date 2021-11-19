import React, { useState } from "react";
import ServicesData from "../../JSON/services.json";
import { v4 as uuidv4 } from "uuid";
import { IoMdClose } from "react-icons/io";

const Weddings = () => {
  const [images, setImages] = useState(5);

  const weddings = ServicesData.filter((obj) => obj.name === "Weddings");

  // onClick show more images
  const showMoreImg = () => {
    setImages(images + 6);
  };

  // Category --> heading, images and button
  const weddingGallery = weddings.map((obj) => {
    const { name, linkId, imgs, description } = obj;

    return (
      <div key={uuidv4()} className="container-gallery">
        {/* Heading for category */}
        <h3 id={linkId} key={uuidv4()}>
          {name}
        </h3>

        <div className="container-description">
          <p>{description}</p>
        </div>

        {/* Images gallery */}
        <div key={uuidv4()} className="container-img-outer">
          {imgs.map((img) => {
            if (imgs.indexOf(img) <= images) {
              return (
                // active-img-inner -------------------------------- onClick Image
                <div key={uuidv4()} className="container-img-inner ">
                  <IoMdClose className="img-close" />
                  <img src={process.env.PUBLIC_URL + img} alt={linkId} />
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

  return <div className="wrapper-img-services">{weddingGallery}</div>;
};

export default Weddings;
