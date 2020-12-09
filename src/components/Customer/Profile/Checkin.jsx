/* eslint-disable camelcase */
import React, {
  useState, useEffect, useRef, useCallback,
} from 'react';
import axios from 'axios';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { useLoadScript } from '@react-google-maps/api';
import { Grid, Typography, Button } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import CheckinList from './CheckInList.jsx';
import Search from '../Create/Search.jsx';

const libraries = ['places'];

const searchBoxStyle = {
  boxSizing: 'border-box',
  border: '1px solid transparent',
  width: '240px',
  height: '32px',
  padding: '0 12px',
  borderRadius: '3px',
  boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
  fontSize: '14px',
  outline: 'none',
  textOverflow: 'ellipses',
  position: 'absolute',
  left: '50%',
  marginLeft: '-120px',
};
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  backBtn: {
    opacity: '60%',
  },
}));

export default function Checkin({ setView, customerId }) {
  const [currentPosition, setCurrentPosition] = useState({
    lat: 29.951065,
    lng: -90.071533,
  });
  const [address, setAddress] = useState('');
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [coordinates, setCoordinates] = useState([]);
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const [openSuccess, setOpenSuccess] = useState(false);

  const handleCloseSuccess = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSuccess(false);
  };

  const getPlaceInfo = useCallback((results) => {
    const {
      formatted_address,
      formatted_phone_number,
      name,
      geometry: { location },
    } = results;
    const lat = location.lat();
    const lng = location.lng();
    setAddress(formatted_address);
    setPhoneNumber(formatted_phone_number);
    setName(name);
    setCoordinates([lat, lng]);
  }, []);

  const addCheckIn = () => {
    const arr = address.split(', ');
    const stateZip = arr[2].split(' ');
    const barInfo = {
      barName: name,
      address: arr[0],
      city: arr[1],
      state: stateZip[0],
      zip: stateZip[1],
      number: phoneNumber,
      customerId,
      lat: coordinates[0],
      lng: coordinates[1],
    };
    axios.post('/db/cb/checkin/create', barInfo)
      .then(({ data }) => {
        if (data === 'Empty') {
          setOpen(true);
        }
        setOpenSuccess(true);
      })
      .catch((err) => console.warn(err));
  };
  // populates places drop down
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
    libraries,
  });

  if (loadError) {
    return 'Error loading maps';
  }
  if (!isLoaded) {
    return 'Loading maps';
  }

  return (
    <Grid
      container
      direction="column"
      justify="space-evenly"
      alignItems="center"
    >
      <Grid
        item
        container
        direction="column"
        justify="space-evenly"
        alignItems="center"
      >
        <Search
          currentPosition={currentPosition}
          searchBoxStyle={searchBoxStyle}
          getPlaceInfo={getPlaceInfo}
        />
      </Grid>
      <Grid />
      <Grid
        item
        container
        direction="row"
        justify="center"
        alignItems="center"
      >
        <Button
          variant="outlined"
          color="primary"
          onClick={() => {
            addCheckIn();
          }}
        >
          Check in
        </Button>
      </Grid>
      <Grid
        item
        container
        direction="row"
        justify="center"
        alignItems="center"
      >
        <CheckinList customerId={customerId} />
      </Grid>
      <Grid
        item
        container
        direction="row"
        justify="center"
        alignItems="center"
        className={classes.root}
      >
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error">
            Bar not found
          </Alert>
        </Snackbar>
      </Grid>
      <Grid
        item
        container
        direction="row"
        justify="center"
        alignItems="center"
        className={classes.root}
      >
        <Snackbar open={openSuccess} autoHideDuration={6000} onClose={handleCloseSuccess}>
          <Alert onClose={handleCloseSuccess} severity="success">
            Checked In!
          </Alert>
        </Snackbar>
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
}
