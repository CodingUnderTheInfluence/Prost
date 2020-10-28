import React, {useState, useEffect, useLayoutEffect} from 'react';
import TextField from '@material-ui/core/TextField';
import { Grid, Typography, Button} from '@material-ui/core'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import FormControl from '@material-ui/core/FormControl';

export default function EContact({setView, customerId}) {
  const [contact, setContact] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [first_name, setFirstName] = useState(null);
  const [last_name, setLastName] = useState(null);
  const [phone_number, setPhoneNumber] = useState(null);
  const [email, setEmail] = useState(null);
  const [eContactId, setEContactId] = useState(contact.id);
  const [cView, setCView] = useState('add');

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