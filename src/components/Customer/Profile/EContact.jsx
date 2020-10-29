import React, {useState, useEffect, useLayoutEffect} from 'react';
import { Grid, Typography, Button, Form} from '@material-ui/core'


export default function EContact({setView, customerId}) {
  const [contact, setContact] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const addContact = async () => {
    const result = await fetch(`${process.env.REDIRECT}/db/eContact/add}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        customerId,
        first_name,
        last_name,
        phone_number,
        email
      }),
    })
    console.log(result)
  }
  useEffect(() => {
    fetch(`${process.env.REDIRECT}/db/eContact/customer/${customerId}`, {
      method: 'GET',
    })
    .then(response => response.json())
    .then(data => {
      const [result] = data
      if (result !== 'Empty') setContact(data[0])
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
      {contact ? (<div>
        <p>Name: {`${contact.first_name} ${contact.last_name}`}</p>
        <p>Phone Number: {contact.phone_number}</p>
        <p>QR Code: {contact.qrcode}</p>
      </div>)
      :
      (<div>
        <Button variant="outlined" color="primary" onClick={()=> setShowForm(true)}>Add</Button>
      </div>)
      }
      {showForm && <div>
        <p>Form</p>
        <Button variant="outlined" color="primary" onClick={() => setShowForm(false)}>Submit</Button>
        </div>}
      </div>
    )
}