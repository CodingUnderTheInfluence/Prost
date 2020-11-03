import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Search from '../Create/Search.jsx'
import { useLoadScript } from '@react-google-maps/api';
import { Grid, Typography, Button } from '@material-ui/core';


const libraries = ['places'];

const searchBox = {
  boxSizing: `border-box`,
  border: `1px solid transparent`,
  width: `240px`,
  height: `32px`,
  padding: `0 12px`,
  borderRadius: `3px`,
  boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
  fontSize: `14px`,
  outline: `none`,
  textOverflow: `ellipses`,
  position: "absolute",
  left: "50%",
  marginLeft: "-120px"
};

export default function Checkin({setView}) {
  const [currentPosition, setCurrentPosition] = useState({
    lat: 29.951065,
    lng: -90.071533
  });
  const [address, setAddress] = useState('');
  const [name, setName] = useState('');
  const getPlaceInfo = useCallback((results) => {
  /*
  formatted_address: "701 W Judge Perez Dr, Chalmette, LA 70043, USA"
  name: "Lacy's Cue Sports Bar"
  */
  // get places info from search bar
  console.log(setAddress(results.formatted_address))
  console.log(setName(results.name))
  }, []);

  // Check in
  const addCheckIn = () => {
    console.log("results", address);
    console.log("results", name);
  }

  // populates places drop down
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
    libraries
  });

  if (loadError) {
    return 'Error loading maps';
  }
  if (!isLoaded) {
    return 'Loading maps';
  }

  return(
    <div>
      <ArrowBackIosIcon color="primary" onClick={()=> setView('Home')} />
      <div>
        <Search
        currentPosition={currentPosition}
        searchBox={searchBox}
        getPlaceInfo={getPlaceInfo}
        />
      </div>
      <div></div>
      <div style={{"padding": "70px"}}>
        <Button variant="outlined" color="primary" onClick={addCheckIn}>Check in</Button>
      </div>
    </div>
  )
}