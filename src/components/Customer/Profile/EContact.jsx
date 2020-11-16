import React, { useState, useEffect } from 'react';
import {
  Grid, Typography, makeStyles, Button,
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  backBtn: {
    opacity: '60%',
  },
}));

const EContact = ({ setView, customerId, setFriendNumber }) => {
  const [contact, setContact] = useState(false);
  const classes = useStyles();

  const renderQrCodeView = () => {
    setFriendNumber(contact.phone_number);
    return (
      <img src={`https://api.qrserver.com/v1/create-qr-code/?data=tel:${contact.phone_number}&amp;size=100x100`} alt="" title="" />
    );
  };

  const getData = () => {
    fetch(`/db/eContact/customer/${customerId}`, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => {
        const [result] = data;
        setContact(result);
      })
      .catch((error) => {
        console.warn('Error:', error);
      });
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <Grid item container direction="row" justify="center" alignItems="center">
        <Typography variant="subtitle1">
          Name:
          {' '}
          {`${contact.first_name} ${contact.last_name}`}
        </Typography>
      </Grid>
      <Grid item container direction="row" justify="center" alignItems="center">
        <Typography variant="subtitle1">
          Phone Number:
          {' '}
          {contact.phone_number}
        </Typography>
      </Grid>
      <Grid item container direction="row" justify="center" alignItems="center">
        <Typography variant="subtitle1">
          Scan to Call
        </Typography>
      </Grid>
      <Grid item container direction="row" justify="center" alignItems="center">
        {renderQrCodeView()}
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

export default EContact;
