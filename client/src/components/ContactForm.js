import React from "react";
import { useForm, ValidationError } from '@formspree/react';
import Booking from "./Shop/Booking";

const ContactForm = () => {

  const [state, handleSubmit] = useForm("xdoyqjpn");
  if (state.succeeded) {
      return <p>Thanks for joining!</p>;
  }

  return (
    <div className="wrapper-contact">
      {/* Form */}
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">
            <h5>Name</h5>
            <input type="text" name="name" id="name" />
            <ValidationError 
            prefix="Name" 
            field="name"
            errors={state.errors}
            />
          </label>

          <label htmlFor="email">
            <h5>E-Mail </h5>
            <input type="email" name="email" id="email" />
            <ValidationError 
            prefix="Email" 
            field="email"
            errors={state.errors}
            />
          </label>

          <label htmlFor="phone">
            <h5>Tel</h5>
            <input type="number" name="phone" id="phone" />
            <ValidationError 
            prefix="Phone" 
            field="phone"
            errors={state.errors}
           />
          </label>

          <fieldset htmlFor="value">
            <h5>Date/Time</h5>
          <Booking type="date" name="value" id="value"/>
          <ValidationError 
           prefix="Value" 
           field="value"
           errors={state.errors}
          />
          </fieldset>
          <label>
            <h5>Message</h5>
            <textarea type="text" name="message" id="message"></textarea>
            <ValidationError 
        prefix="Message" 
        field="message"
        errors={state.errors}
      />
          </label>

          <input className="form-btn" type="submit" value="Send" disabled={state.submitting} />
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
