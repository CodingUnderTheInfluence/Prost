/* eslint-disable camelcase */
import React, {
  useState, useEffect, useRef, useCallback,
} from 'react';
import axios from 'axios';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { useLoadScript } from '@react-google-maps/api';
import { Grid, Typography, Button } from '@material-ui/core';
import Search from '../Create/Search.jsx';
import CheckinList from './CheckInList.jsx';

const libraries = ['places'];

const searchBox = {
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

export default function Checkin({ setView, customerId }) {
  const [currentPosition, setCurrentPosition] = useState({
    lat: 29.951065,
    lng: -90.071533,
  });
  const [address, setAddress] = useState('');
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [coordinates, setCoordinates] = useState([]);

  const getPlaceInfo = useCallback((results) => {
  /*
  formatted_address: "701 W Judge Perez Dr, Chalmette, LA 70043, USA"
  name: "Lacy's Cue Sports Bar"
  */
    // get places info from search bar
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
    console.log('results', results);
  }, []);

  // Check in
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
    console.log('barInfo', barInfo);
    fetch('/db/cb/checkin/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(barInfo),
    })
      .then(({ data }) => { console.log(data); })
      .catch((err) => console.error(err));
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
    <div>
      <ArrowBackIosIcon color="primary" onClick={() => setView('Home')} />
      <div>
        <Search
          currentPosition={currentPosition}
          searchBox={searchBox}
          getPlaceInfo={getPlaceInfo}
        />
      </div>
      <div />
      <div style={{ padding: '70px' }}>
        <Button variant="outlined" color="primary" onClick={addCheckIn}>Check in</Button>
      </div>
      <div>
        <CheckinList customerId={customerId} />
      </div>
    </div>
  );
}
