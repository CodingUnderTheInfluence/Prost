import React, { useState, useEffect, useRef } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';


const MapContainer = () => {

    const [ currentPosition, setCurrentPosition ] = useState({});
    const [ publicLocations, setPublicLocations ] = useState([]);
    const [ friendLocations, setFriendLocations ] = useState([]);
    const [ myLocation, setMyLocation ] = useState({})

    const success = position => {
        const currentPosition = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
        }
        setCurrentPosition(currentPosition);
        setMyLocation({
            name: 'TestName',
            location: {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            }
        })
    };
    const defaultCenter = {
        lat: 40.730610,
        lng: -73.935242
    }
    const mapStyles = {        
        height: "100vh",
        width: "100%"};
    
    
    useEffect(() => {
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(success);
        }
    }, []);

    return (
        <LoadScript
        googleMapsApiKey="">
            <GoogleMap
            mapContainerStyle={mapStyles}
            zoom={15}
            center={currentPosition ? currentPosition : defaultCenter}
            draggable={true}>
 
            <Marker key={myLocation.name} position={myLocation.location} />
            {
                //PLACEHOLDER
                publicLocations.map(item => {
                    return (
                        <Marker key={item.name} position={item.location}/>
                    )
                })
            }
            {
                //PLACEHOLDER
                friendLocations.map(item => {
                    return (
                        <Marker key={item.name} position={item.location} />
                    )
                })
            }
            </GoogleMap>
        </LoadScript>
    )
}

export default MapContainer;