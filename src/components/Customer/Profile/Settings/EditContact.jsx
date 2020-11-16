import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Grid, Button, TextField, makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  field: {
    margin: '5px 0 0 0',
  },
  backBtn: {
    opacity: '60%',
  },
}));

const EditContact = ({ setView, customerId }) => {
  const classes = useStyles();
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
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      className={classes.field}
    >
      <Grid
        item
        container
        direction="row"
        justify="center"
        alignItems="center"
        className={classes.field}
      >
        <TextField
          id="outlined-basic"
          label="First Name"
          variant="outlined"
          onChange={(e) => setFirstName(e.target.value)}
        />
      </Grid>
      <Grid
        item
        container
        direction="row"
        justify="center"
        alignItems="center"
        className={classes.field}
      >
        <TextField
          id="outlined-basic"
          variant="outlined"
          label="Last Name"
          onChange={(e) => setLastName(e.target.value)}
        />
      </Grid>
      <Grid
        item
        container
        direction="row"
        justify="center"
        alignItems="center"
        className={classes.field}
      >
        <TextField
          id="outlined-basic"
          variant="outlined"
          label="Phone Number"
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </Grid>
      <Grid
        item
        container
        direction="row"
        justify="center"
        alignItems="center"
        className={classes.field}
      >
        <TextField
          id="outlined-basic"
          variant="outlined"
          label="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </Grid>
      <Grid>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            editEContact();
            setView('Home');
          }}
          className={classes.field}
        >
          Submit
        </Button>
      </Grid>
      <Button
        size="small"
        color="primary"
        className={classes.backBtn}
        onClick={() => setView('Home')}
      >
        Back
      </Button>
    </Grid>
  );
};

export default EditContact;
