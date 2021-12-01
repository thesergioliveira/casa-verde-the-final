// Import area
import React from "react";
// About function
const About = () => {
  return (
    <div className="about-container">
      {/*Image of us*/}
      <img className="about-us-picture" src="./images/about-us/wichtel.jpg" alt="Sven and Maria" />
      <h2>Über Uns und das Projekt</h2>
      {/* Text */}
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
    </div>
  );
};

export default About;
