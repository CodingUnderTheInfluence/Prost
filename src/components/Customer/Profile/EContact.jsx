import React, {useState, useEffect, useLayoutEffect} from 'react';
import { Grid, Typography, Button } from '@material-ui/core'


export default function EContact({setView, customerId}) {
  const [contact, setContact] = useState(false);

  useEffect(() => {
    fetch(`${process.env.REDIRECT}/db/eContact/customer/${customerId}`, {
      method: 'GET',
      // headers: {
      //   'Content-Type': 'application/json',
      // },
      // body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data); // change user
      setContact(data[0])
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }, []);
  return(
    <div>
      <div>
      <Button variant="outlined" color="primary" onClick={()=> setView('Home')}>
      Back
      </Button>
      </div>
      <br/>
      Hello from EContact 
        <p>Name: {`${contact.first_name} ${contact.last_name}`}</p>
        <p>Phone Number: {contact.phone_number}</p>
        <p>QR Code: {contact.qrcode}</p>
      </div>
    )
}