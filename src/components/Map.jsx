import React, { useState, useEffect, useRef } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';


const MapContainer = () => {

    const [ currentPosition, setCurrentPosition ] = useState({});

    const success = position => {
        const currentPosition = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
        }
        setCurrentPosition(currentPosition);
    };
    const defaultCenter = {
        lat: 40.730610,
        lng: -73.935242
    }
    const mapStyles = {        
        height: "100vh",
        width: "100%"};
    
    
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(success);
    }, []);

    return (
        <LoadScript
        googleMapsApiKey="AIzaSyA4DS2H8CUZ9f7tTm7AMAIWzSs7Y6EAlMY">
            <GoogleMap
            mapContainerStyle={mapStyles}
            zoom={15}
            center={currentPosition ? currentPosition : defaultCenter}
            draggable={true}
            />
        </LoadScript>
    )
}

export default MapContainer;