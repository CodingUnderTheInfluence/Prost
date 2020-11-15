import React, { useState } from 'react';
import { Grid, Button, Textfield } from '@material-ui/core';

const EditContact = () => {
  const [first_name, setFirstName] = useState(null);
  const [last_name, setLastName] = useState(null);
  const [phone_number, setPhoneNumber] = useState(null);
  const [email, setEmail] = useState(null);
  return (
    <div>
      <TextField
        id="filled-basic"
        label="First Name"
        variant="filled"
        onChange={(e) => setFirstName(e.target.value)}
      />
      <TextField
        id="filled-basic"
        label="Last Name"
        variant="filled"
        onChange={(e) => setLastName(e.target.value)}
      />
      <TextField
        id="filled-basic"
        label="Phone Number"
        variant="filled"
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <TextField
        id="filled-basic"
        label="Email"
        variant="filled"
        onChange={(e) => setEmail(e.target.value)}
      />
      <div>
        <Button variant="outlined" type="submit" color="primary">Submit</Button>
      </div>
    </div>
  );
};

export default EditContact;
