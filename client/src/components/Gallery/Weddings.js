import React, { useState } from "react";
import ServicesData from "../../JSON/services.json";
import { v4 as uuidv4 } from "uuid";

const Weddings = () => {
  const [images, setImages] = useState(5);

  const weddings = ServicesData.filter((obj) => obj.name === "Weddings");

  // Show more images onClick
  const showMoreImg = () => {
    setImages(images + 6);
  };

  // Show image gallery with header and button
  const weddingGallery = weddings.map((obj) => {
    const { id, name, linkId, imgs } = obj;

    return (
      <div className="container-gallery">
        {/* header image gallery */}
        <h3 key={uuidv4()}>{name}</h3>

        {/* show images */}
        <div className="container-img-outer">
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

        {/* button to show more images */}
        <button key={uuidv4()} onClick={showMoreImg}>
          Show more
        </button>
      </div>
    );
  });

  return <div className="wrapper-img-services">{weddingGallery}</div>;
};

export default Weddings;
