/* eslint-disable camelcase */
import React, {
    useState, useEffect, useRef, useCallback,
} from 'react';
import axios from 'axios';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { useLoadScript } from '@react-google-maps/api';
import { Grid, Typography, Button } from '@material-ui/core';
import SearchBox from './SearchBox.jsx'

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
};

const BarSearch = ({ setView, customerId }) => {
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
        console.info('results', results);
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
        console.info('barInfo', barInfo);
    };

    // populates places drop down
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: 'AIzaSyANp7sI4cfvx8WLl6OgcsePepOM5oSuXZY',
        libraries,
    });

    if (loadError) {
        return 'Error loading maps';
    }
    if (!isLoaded) {
        return 'Loading maps';
    }

    return (
        <Grid container direction="column" justify="center" alignItems="center">
            <Grid item container direction="row" justify="center" alignItems="center">
                <SearchBox
                    currentPosition={currentPosition}
                    searchBox={searchBox}
                    getPlaceInfo={getPlaceInfo}
                />
            </Grid>
            <Grid item container direction="row" justify="center" alignItems="center">
                <Button variant="outlined" color="primary" onClick={addCheckIn}>Check in</Button>
            </Grid>
        </Grid>
    );
}

export default BarSearch;
