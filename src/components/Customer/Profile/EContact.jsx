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

  const getData = () => {
    fetch(`${process.env.REDIRECT}/db/eContact/customer/${customerId}`, {
      method: 'GET',
    })
    .then(response => response.json())
    .then(data => {
      const [result] = data;
      console.log('Contact Success :', result)
      if (result !== 'Empty') {
        setContact(result)
        setEContactId(result.id)
        setCView('edit');
      } else {
        setCView('add');
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }
  useEffect(() => {
    getData();
  }, []);

  const editEContact = () => {
    const obj = {
      eContactId,
      first_name,
      last_name,
      phone_number,
      email
    }
    for(let key in obj){
      if(!obj[key]) {
        delete obj[key];
      }
    }
    fetch(`${process.env.REDIRECT}/db/eContact/edit`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(obj),
    })
    .then(result => {
      if(result.status === 200) {
        getData()
      }
    })
    setShowForm(false);
  }
    
  const addContact = async () => {
    const result = await fetch(`${process.env.REDIRECT}/db/eContact/add`, {
      method: 'POST',
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
    getData();
    setShowForm();
  }

  const context = (e) => {
    e.preventDefault();
    console.log(cView);
    return cView === 'edit' ? editEContact() : addContact()
  }

  return (
    <div>
      <div>
      <ArrowBackIosIcon color="primary" onClick={()=> setView('Home')} />
      </div>
      <br/>
      Hello from EContact 
      { contact ? (<div>
        <p>Name: {`${contact.first_name} ${contact.last_name}`}</p>
        <p>Phone Number: {contact.phone_number}</p>
        <p>QR Code: {contact.qrcode}</p>
        <Fab color="secondary" aria-label="edit">
          <EditIcon onClick={()=> setShowForm(true)}/>
        </Fab>
      </div>
      )
      :
      (<div>
        <Fab color="primary" aria-label="add">
          <AddIcon onClick={()=> setShowForm(true)}/>
        </Fab>
      </div>)}
      {showForm && 
        <form className="EContact" noValidate autoComplete="off" onSubmit={(e) => context(e)}>
          <TextField id="filled-basic" label="First Name" variant="filled" onChange={(e)=> setFirstName(e.target.value)}/>
          <TextField id="filled-basic" label="Last Name" variant="filled" onChange={(e)=> setLastName(e.target.value)}/>
          <TextField id="filled-basic" label="Phone Number" variant="filled" onChange={(e)=> setPhoneNumber(e.target.value)}/>
          <TextField id="filled-basic" label="Email" variant="filled" onChange={(e)=> setEmail(e.target.value)}/>
          <div>
            <Button variant="outlined" type="submit" color="primary">Submit</Button>
          </div>
          </form>
        }
      </div>
    )
}