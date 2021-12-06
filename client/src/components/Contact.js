import React from "react";
import ContactForm from "./ContactForm";
import ContactInformation from "./ContactInformation";
import Map from "./Map";

const Contact = () => {
  return (
    <div>
      <div className="animated-envelope">
      <iframe src="https://embed.lottiefiles.com/animation/37147" />
      </div>
      <ContactInformation />
      <div className="form-map">
        <ContactForm />
        <Map />
      </div>
    </div>
  );
};

export default Contact;
