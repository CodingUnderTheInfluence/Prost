import React, { useState, useEffect, useRef } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow, useLoadScript } from '@react-google-maps/api';
import Search from './Search.jsx';

// nola lat long
// lat: 29.951065,
// lng: -90.071533,

const MapContainer = () => {

  const [ currentPosition, setCurrentPosition ] = useState(null);
  const [ publicLocations, setPublicLocations ] = useState([]);
  const [ friendLocations, setFriendLocations ] = useState([]);
  const [ selectedItem, setSelectedItem ] = useState({});
  const [ myLocation, setMyLocation ] = useState({});

  const libraries = ['places'];
  const mapStyles = {
    width: '100vw',
    height: '100vh'
  };
  const defaultCenter = {
    lat: 40.730610,
    lng: -73.935242
  };
  const options = {
    zoomControl: true
  };

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: '',
    libraries
  });

  if (loadError) {
    return 'Error loading maps';
  } 
  if (!isLoaded) {
    return 'Loading maps';
  }

  // useEffect(() => {
  //   if(navigator.geolocation) {
  //       navigator.geolocation.getCurrentPosition(success);
  //   }
  // }, []);

  return (
    <>
      <Search />
      <GoogleMap 
        mapContainerStyle={mapStyles}
        zoom={15}
        center={defaultCenter}
        center={currentPosition  ? currentPosition : defaultCenter}
        options={options}
        draggable={true}
      >
        <Marker key={myLocation.name} position={myLocation.location} onClick={()=> onSelect(myLocation)}/>
        {
          //PLACEHOLDER
          publicLocations.map(item => {
            return (
              <Marker key={item.name} position={item.location} onClick={()=> onSelect(item)}/>
            )
          })
        }
        {
          //PLACEHOLDER
          friendLocations.map(item => {
            return (
              <Marker key={item.name} position={item.location} onClick={()=> onSelect(item)} />
            )
          })
        }
        {
          selectedItem.location 
          && (<InfoWindow
                position={selectedItem.location}
                clickable={true}
                onCloseClick={() => setSelectedItem({})}
              >
              <p>{selectedItem.name}</p>
              </InfoWindow>)
        }
      </GoogleMap>
    </>
  );
};

export default MapContainer;

