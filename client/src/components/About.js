import React from "react";

const About = () => {
  return (
    <div className="home">
      <div className="home-top absolut">
        {/* <div className="roof"></div> */}
        <h1>Casa Verde</h1>
        <p>Über Uns</p>
      </div>

      <div className="container-room-rental">
        <img
          src={process.env.PUBLIC_URL + "../images/wir.png"}
          alt="About Bild"
        />
      </div>
      <h2>Über Uns und das Projekt</h2>
      <p>
        Das Casa Verde ist seit 2001 weithin bekannt für sein mediterranes
        Flair, außergewöhnliche Blumengestaltung sowie für stilvolle
        Hochzeitsdekorationen und mitfühlenden Trauerschmuck.
      </p>
      <p>
        Der ursprüngliche Geschäftsraum wurde inzwischen zu einem
        multifunktionalen Raum mit Schwingboden ausgebaut und läd zu Aktivitäten
        für Körper, Geist und Seele ein.
      </p>
      <p>
        Außergewöhnliche Blumenarrangements, Geschenkideen und Pflanzungen gibt
        es fertig in der neu entstandenen Blumenstation oder auf Bestellung und
        Abholung.
      </p>
      <br></br>
    </div>
  );
};

export default About;
