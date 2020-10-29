import React, { useState, useEffect, useRef, useCallback } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow, useLoadScript } from '@react-google-maps/api';
import Search from './Search.jsx';

// nola lat long
// lat: 29.951065,
// lng: -90.071533,

// used for the load script to get google places
const libraries = ['places'];

const MapContainer = () => {

  const [ currentPosition, setCurrentPosition ] = useState(null);
  const [ publicLocations, setPublicLocations ] = useState([]);
  const [ friendLocations, setFriendLocations ] = useState([]);
  const [ selectedItem, setSelectedItem ] = useState({});
  const [ myLocation, setMyLocation ] = useState({});
  const [ markers, setMarkers ] = useState([]);
  const [ searchMarker, setSearchMarker ] = useState({});

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
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
    libraries
  });

  // sets the makers to the user click
  const onMapClick = useCallback((e) => {
    setMarkers(current => [
      ...current, 
      {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
        time: new Date()
      }
    ]);
  });

  // save reference to map to use it later and not reload state
  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  // move map to the where the user has searched
  const panTo = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(16);
  }, []);

  // get places info from search bar
  const searchInfo = useCallback(({ lat, lng}) => {

    setSearchMarker({ lat, lng });
    // const { location } = info.geometry;
    // setSearchMarker({ 
    //   lat: parseFloat(location.lat()), 
    //   lng: parseFloat(location.lng())
    // });
  });

  if (loadError) {
    return 'Error loading maps';
  } 
  if (!isLoaded) {
    return 'Loading maps';
  }

  return (
    <>
      <Search panTo={panTo} searchInfo={searchInfo} />
      <GoogleMap 
        mapContainerStyle={mapStyles}
        zoom={15}
        center={defaultCenter}
        center={currentPosition  ? currentPosition : defaultCenter}
        options={options}
        draggable={true}
        onClick={onMapClick}
        onLoad={onMapLoad}
      >
        <Marker 
          position={{
            lat: searchMarker.lat, 
            lng: searchMarker.lng
          }}/>
        {/* {markers.map(({lat, lng, time}) => (
          <Marker 
            key={time.toISOString()} 
            position={{ lat, lng }}
          />
        ))} */}
      </GoogleMap>
    </>

  );

};

export default MapContainer;

