import React, { useState } from "react";
import ServicesData from "../../JSON/services.json";
import { v4 as uuidv4 } from "uuid";

const GiftIdeas = () => {
  const [images, setImages] = useState(5);

  const giftIdeas = ServicesData.filter((obj) => obj.name === "Gift ideas");

  // onClick show more images
  const showMoreImg = () => {
    setImages(images + 6);
  };

  // Category --> heading, images and button
  const giftIdeasGallery = giftIdeas.map((obj) => {
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
                <div key={uuidv4()} className="container-img-inner">
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

  return <div className="wrapper-img-services">{giftIdeasGallery}</div>;
};

export default GiftIdeas;
