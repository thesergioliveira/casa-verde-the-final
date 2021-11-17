import React, { useState } from 'react';
import DateTimePicker from 'react-datetime-picker';

function Booking() {
  const [value, onChange] = useState(new Date());

  return (
    <div>
      <DateTimePicker
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default Booking;