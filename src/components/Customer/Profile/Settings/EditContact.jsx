import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Button, TextField } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

const EditContact = ({ setView, customerId }) => {
  const [first_name, setFirstName] = useState(null);
  const [last_name, setLastName] = useState(null);
  const [phone_number, setPhoneNumber] = useState(null);
  const [email, setEmail] = useState(null);
  const [eContactId, seteContactId] = useState(null);
  const editEContact = () => {
    const submitted = {
      eContactId,
      first_name,
      last_name,
      phone_number,
      email,
    };
    for (const key in submitted) {
      if (!submitted[key]) {
        delete submitted[key];
      }
    }
    axios.put('/db/eContact/edit', submitted)
      .catch((err) => console.warn(err));
  };
  useEffect(() => {
    axios.get(`/db/eContact/customer/${customerId}`)
      .then(({ data }) => {
        const [result] = data;
        seteContactId(result.id);
      })
      .catch((error) => {
        console.warn('Error:', error);
      });
  }, []);

  return (
    <Grid>
      <ArrowBackIosIcon color="primary" onClick={() => setView('Home')} />
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
      <Grid>
        <Button variant="outlined" type="submit" color="primary" onClick={editEContact}>Submit</Button>
      </Grid>
    </Grid>
  );
};

export default EditContact;
