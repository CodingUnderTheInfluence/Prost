import React, { useState, useEffect } from 'react';
import { Grid, Button, Typography, TextField, Radio, RadioGroup, FormControl, FormControlLabel, FormLabel } from '@material-ui/core';
import SafetyDialog from './Dialog.jsx';
import axios from 'axios';

const CustomerForm = ({ setViewValue, gId, profileImage, username }) => {
    const [counter, setCounter] = useState(0);

    //PERSONAL INFORMATION FIELDS
    const [personalFirst, setPersonalFirst] = useState('');
    const [personalLast, setPersonalLast] = useState('');
    const [personalEmail, setPersonalEmail] = useState('');
    const [personalNumber, setPersonalNumber] = useState();
    const [personalGender, setPersonalGender] = useState('');
    //PERSONAL INFORMATION DATABASE SUBMIT
    const personalInformationSubmit = () => {
        const personalParams = {
            first: personalFirst,
            last: personalLast,
            email: personalEmail,
            number: personalNumber,
            gender: personalGender,
            image: profileImage,
            googleId: gId,
            username,
        }
        axios.post('/db/customer/create', { personalParams })
    }

    //LOCATION INFORMATION FIELDS
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zip, setZip] = useState();
    //LOCATION INFORMATION SUBMIT
    const locationInformationSubmit = () => {
        const locationParams = {
            address: address,
            city: city,
            state: state,
            zip: zip,
            googleId: gId,
        }
        axios.post('/db/customer/location', { locationParams })
            .then(() => {
                console.log(` Successfully posted ${personalFirst}'s Location Information to the server`)
            })
    }

    //EMERGENCY CONTACT INFORMATION FIELDS
    const [emFirst, setEmFirst] = useState('');
    const [emLast, setEmLast] = useState('');
    const [emEmail, setEmEmail] = useState('');
    const [emNumber, setEmNumber] = useState();
    //EMERGENCY CONTACT INFORMATION SUBMIT
    const eContactInformationSubmit = () => {
        console.log('add econtact', {
            first: emFirst,
            last: emLast,
            email: emEmail,
            number: emNumber,
            id: gId
        })
        const emergencyParams = {
            first: emFirst,
            last: emLast,
            email: emEmail,
            number: emNumber,
            id: gId
        }
        axios.post('/db/eContact/add', emergencyParams)
            .then((res) => {
                // console.log(res)
                console.log(` Successfully posted ${personalFirst}'s Emergency Contact Information to the server`)
            })
    }

    const handleChange = (e) => {
        setValue(e.target.value);
        setPersonalGender(value)
    };


    const renderCustomerFormView = () => {
        if (counter === 1) {

            /////////////////////////////////
            // Personal CONTACT INFORMATION//
            /////////////////////////////////

            return (
                <div>
                    <Grid item container direction="row" justify="center" alignItems="center">
                        <Typography variant="subtitle1">
                            Personal Information
                        </Typography>
                    </Grid>
                    <Grid item container direction="row" style={{ border: 'solid black 1px', padding: '10px', margin: '5px 0 5px 0' }}>
                        <TextField id="standard-basic" label="First Name" onChange={(e) => { setPersonalFirst(e.target.value) }} />
                        <TextField id="standard-basic" label="Last Name" onChange={(e) => { setPersonalLast(e.target.value) }} />
                    </Grid>
                    <Grid item container direction="row" style={{ border: 'solid black 1px', padding: '10px', margin: '5px 0 5px 0' }}>
                        <TextField id="standard-basic" label="Email" onChange={(e) => { setPersonalEmail(e.target.value) }} />
                    </Grid>
                    <Grid item container direction="row" style={{ border: 'solid black 1px', padding: '10px', margin: '5px 0 5px 0' }}>
                        <TextField id="standard-basic" label="Phone Number" onChange={(e) => { setPersonalNumber(Number(e.target.value)) }} />
                    </Grid>
                    <Button variant="outlined"
                        onClick={() => {
                            setCounter(2);
                            personalInformationSubmit();
                        }}
                    >
                        Next
                    </Button>
                </div>
            )
        }
        if (counter === 2) {

            /////////////////////////////////
            // Location CONTACT INFORMATION//
            /////////////////////////////////

            return (
                <div>
                    <Grid item container direction="row" justify="center" alignItems="center">
                        <Typography variant="subtitle1">
                            Location Information
                       </Typography>
                    </Grid>
                    <Grid item container direction="row" style={{ border: 'solid black 1px', padding: '10px', margin: '5px 0 5px 0' }}>
                        <TextField id="standard-basic" label="Address" onChange={(e) => { setAddress(e.target.value) }} />
                    </Grid>
                    <Grid item container direction="row" justify="center" alignItems="center" style={{ border: 'solid black 1px', padding: '10px', margin: '5px 0 5px 0' }}>
                        <Grid item container direction="column">
                            <TextField id="standard-basic" label="City" onChange={(e) => { setCity(e.target.value) }} />
                        </Grid>
                        <Grid item container direction="column">
                            <TextField id="standard-basic" label="State" onChange={(e) => { setState(e.target.value) }} />
                        </Grid>
                        <Grid item container direction="column">
                            <TextField id="standard-basic" label="Zip Code" onChange={(e) => { setZip(Number(e.target.value)) }} />
                        </Grid>
                    </Grid>
                    <Button variant="outlined"
                        onClick={() => {
                            setCounter(3);
                            locationInformationSubmit();
                        }}
                    >
                        Next
                    </Button>
                </div>
            )
        }
        if (counter === 3) {

            /////////////////////////////////
            //EMERGENCY CONTACT INFORMATION//
            /////////////////////////////////

            return (
                <div>
                    <Grid item container direction="row" justify="center" alignItems="center">
                        <Typography variant="subtitle1">
                            Emergency Contact Information
                        </Typography>
                    </Grid>
                    <Grid item container direction="row" style={{ border: 'solid black 1px', padding: '10px', margin: '5px 0 5px 0' }}>
                        <TextField id="standard-basic" label="First Name" onChange={(e) => { setEmFirst(e.target.value) }} />
                        <TextField id="standard-basic" label="Last Name" onChange={(e) => { setEmLast(e.target.value) }} />
                    </Grid>
                    <Grid item container direction="row" style={{ border: 'solid black 1px', padding: '10px', margin: '5px 0 5px 0' }}>
                        <TextField id="standard-basic" label="Email" onChange={(e) => { setEmEmail(e.target.value) }} />
                    </Grid>
                    <Grid item container direction="row" style={{ border: 'solid black 1px', padding: '10px', margin: '5px 0 5px 0' }}>
                        <TextField id="standard-basic" label="Phone Number" onChange={(e) => { setEmNumber(Number(e.target.value)) }} />
                    </Grid>
                    <Button variant="outlined"
                        onClick={() => {
                            eContactInformationSubmit();
                            setViewValue('CustomerView')
                        }}
                    >
                        Submit
                    </Button>
                </div>
            )
        }
        return (
            <SafetyDialog setViewValue={setViewValue} setCounter={setCounter} />
        )
    }

    return (
        <Grid container direction="column" justify="center" alignItems="center">
            <Grid item container direction="row" justify="center" alignItems="center">
                {renderCustomerFormView()}
            </Grid>
        </Grid>
    )
}

export default CustomerForm;
