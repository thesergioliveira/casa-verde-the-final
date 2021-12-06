import React, { useState } from "react";
import ServicesData from "../../JSON/services.json";
import { v4 as uuidv4 } from "uuid";

const PlantIdeas = () => {
  const [images, setImages] = useState(5);

  const plantIdeas = ServicesData.filter((obj) => obj.name === "Pflanzungen");

  // onClick show more images
  const showMoreImg = () => {
    setImages(images + 4);
  };

  // Category --> heading, images and button
  const plantIdeasGallery = plantIdeas.map((obj) => {
    const { name, linkId, imgs, description } = obj;

    return (
      <div key={uuidv4()} className="container-gallery">
        {/* Heading for category */}
        <h3 id={linkId} key={uuidv4()}>
          {name}
        </h3>

        {/* <div className="container-description">
          <p>{description}</p>
        </div> */}

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

        {/* blur effect */}
        <div className="container-more-blur"></div>

        {/* Button --> Show more */}
        <button key={uuidv4()} onClick={showMoreImg}>
          Mehr Bilder anzeigen
        </button>
      </div>
    );
  });

  return <div className="wrapper-img-services">{plantIdeasGallery}</div>;
};

export default PlantIdeas;
