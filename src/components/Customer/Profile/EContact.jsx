import React, { useState, useEffect } from 'react';
import { Grid, Typography } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

const EContact = ({ setView, customerId, setFriendNumber }) => {
  const [contact, setContact] = useState(false);

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
    <Grid>
      <Grid>
        <ArrowBackIosIcon color="primary" onClick={() => setView('Home')} />
      </Grid>
      <Grid>
        <p>
          Name:
          {`${contact.first_name} ${contact.last_name}`}
        </p>
        <p>
          Phone Number:
          {contact.phone_number}
        </p>
        <Grid container direction="column" justify="center" alignItems="center">
          <Grid item container direction="row" justify="center" alignItems="center">
            <Typography variant="subtitle1">
              Scan to Call
            </Typography>
          </Grid>
          <Grid item container direction="row" justify="center" alignItems="center">
            {renderQrCodeView()}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default EContact;
