import React from 'react';

const Map = () => {
    return (
        <div  width="100vw"
          height="100vh">
        <h3>Practice embaded Google map with iframe</h3>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d20091.800526890445!2d12.429081749999998!3d50.9888928!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x273771de9542a0e6!2sBahnhof%20Center!5e0!3m2!1sro!2sde!4v1635252779526!5m2!1sro!2sde"
          width="100%"
          height="100%" title="map location"/>
      </div>
    );
}

export default Map;
