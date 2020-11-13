import React, { useState, useEffect } from 'react';
import { Grid, Button, Typography, TextField, FormControl, FormControlLabel, FormLabel, IconButton, Input, InputLabel, InputAdornment, } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import axios from 'axios';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    margin: {
        margin: theme.spacing(1),
    },
    withoutLabel: {
        marginTop: theme.spacing(3),
    },
    textField: {
        width: '25ch',
    },
}));
const OwnerInfo = ({
    setCounter,
    setViewValue,
    barName,
    address,
    city,
    state,
    zip,
    number,
    lat,
    lng,
    image,
    capacity,
    setBarId
}) => {
    const classes = useStyles();
    const [username, setUsername] = useState('');
    const [firstName, setFirst] = useState('');
    const [lastName, setLast] = useState('');
    const [email, setEmail] = useState('');
    const [values, setValues] = useState({
        password: '',
        showPassword: false,
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const submitOwnerInfo = () => {
        const params = {
            username,
            firstName,
            lastName,
            email,
            password: values.password,
        }
        axios.post('/db/owner/register', { params })
            .then(({ data }) => {
                const bparams = {
                    ownerId: data.owner.id,
                    barName,
                    address,
                    city,
                    state,
                    zip,
                    number,
                    lat,
                    lng,
                    image,
                    capacity
                };
                axios.post('/db/bar/create', { bparams })
                    .then(({ data }) => {
                        console.log(data, 'BAR MADE')
                        setBarId(data.id)
                    })
                    .catch((err) => { console.warn(err) })
            })
            .catch((err) => { console.warn(err) })

    }

    return (
        <Grid container direction="column" justify="center" column="center">
            <Grid item container direction="row" justify="center" column="center">
                <Typography variant="subtitle1">
                    Owner Information
            </Typography>
            </Grid>
            <Grid item container direction="row" justify="center" column="center">
                <TextField id="standard-basic" label="User Name" onChange={(e) => { setUsername(e.target.value) }} />
            </Grid>
            <Grid item container direction="row" justify="center" column="center">
                <TextField id="standard-basic" label="First Name" onChange={(e) => { setFirst(e.target.value) }} />
                <TextField id="standard-basic" label="Last Name" onChange={(e) => { setLast(e.target.value) }} />
            </Grid>
            <Grid item container direction="row" justify="center" column="center">
                <TextField id="standard-basic" label="Email" onChange={(e) => { setEmail(e.target.value) }} />
            </Grid>
            <Grid item container direction="row" justify="center" alignItems="center">
                <FormControl className={clsx(classes.margin, classes.textField)}>
                    <InputLabel htmlFor="standard-adornment-password"> Choose Password</InputLabel>
                    <Input
                        id="standard-adornment-password"
                        type={values.showPassword ? 'text' : 'password'}
                        value={values.password}
                        onChange={handleChange('password')}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                >
                                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
            </Grid>
            <Button variant="outlined"
                onClick={() => {
                    submitOwnerInfo();
                    setViewValue('OwnerView')
                }}>
                Submit
            </Button>
        </Grid>
    )
}

export default OwnerInfo
