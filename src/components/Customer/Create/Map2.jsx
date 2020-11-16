import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
} from 'react';
import '../../../styles/location.css';
import {
  GoogleMap,
  Marker,
  MarkerClusterer,
  useLoadScript,
} from '@react-google-maps/api';
import axios from 'axios';
import propTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import beer from '../../../../images/beer.png';
import beerGold from '../../../../images/beerGold.png';
import user from '../../../../images/user.png';
// import { GiBeerStein } from "react-icons/gi";
import Search from './Search.jsx';
import BarInfo from './BarInfo.jsx';
import PrivateSwitch from './PrivateSwitch.jsx';
import FriendsMarkers from '../Map/FriendsMarkers.jsx';
import BarMarkers from '../Map/BarMarkers.jsx';
// import Directions from '../Directions/Directions.jsx';
// import DirectionsBtn from '../Directions/DirectionsBtn.jsx';
import DangerMarkers from '../Map/DangerMarkers.jsx';
import QuickCreate from './QuickCreate.jsx';
import mapStyle from '../../../helpers/mapStyle';

const libraries = ['places'];

const mapStyles = {
  width: '100vw',
  height: '90vh',
};

const options = {
  zoomControl: false,
  scaleControl: false,
  mapTypeControl: false,
  fullscreenControl: false,
  styles: mapStyle,
};

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

const MapContainer = ({ setMapLatLng, username, gId }) => {
  const [currentPosition, setCurrentPosition] = useState({
    lat: 29.95115,
    lng: -90.0715,
  });
  const [friendLocations, setFriendLocations] = useState([]);
  const [privateSwitch, setPrivateSwitch] = useState(false);
  const [myLocation, setMyLocation] = useState({});
  const [dangerMarkers, setDangerMarkers] = useState([]);
  const [parties, setParties] = useState([]);
  const [searchMarker, setSearchMarker] = useState({});
  const [click, setClick] = useState(false);
  const [placeInfo, setplaceInfo] = useState(null);

  const defaultCenter = {
    lat: 29.95115,
    lng: -90.0715,
  };

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
    libraries,
  });

  // get the toggle for the switch to update state
  const getSwitch = (pSwitch) => setPrivateSwitch(pSwitch);

  // TODO:
  // useEffect(() => {
  //   const success = (pos) => {
  //     const { latitude, longitude } = pos.coords;
  //     setCurrentPosition({ lat: latitude, lng: longitude });
  //   };
  //   const fail = () => null;
  //   navigator.geolocation.getCurrentPosition(success, fail);
  // }, []);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      axios.get('/db/maps')
        .then(({ data }) => {
          const publicPpl = data.filter((friend) => !friend.isPrivate);
          setFriendLocations(publicPpl);
        });
    }
    return () => { isMounted = false; };
  }, [privateSwitch]);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      axios.get('/db/bar/all')
        .then(({ data }) => {
          setParties(data);
        });
    }
    return () => { isMounted = false; };
  }, []);

  // sets the makers to the user click
  const onMapClick = useCallback((e) => {
    setDangerMarkers((current) => [
      ...current,
      {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
        time: new Date(),
      },
    ]);
  });

  const getDblClickDangerMarker = (object) => {
    const removeMarker = dangerMarkers.filter((target) => target.lat !== object.lat);
    setDangerMarkers(removeMarker);
  };

  // save reference to map to use it later and not reload state
  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
    // --removed priviteSwitch in second arg to reload state when marker was clicked
  }, []);

  // move map to the where the user has searched
  const panTo = useCallback(({ lat, lng, key }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(15);
    if (key === 'user') {
      setCurrentPosition({ lat, lng });
    }
    setSearchMarker({ lat, lng, key });
  }, []);

  const handleMarkerClick = () => {
    setClick(!click);
  };

  const getMyLocation = ({ latitude, longitude }) => {
    axios.put(`/db/maps/${gId}`, { latitude, longitude })
      .then(() => console.info('maps put success'))
      .catch(() => console.warn('maps put failed'));
    setMyLocation({
      lat: latitude,
      lng: longitude,
    });
  };

  // get places info from search bar
  const getPlaceInfo = useCallback((results) => {
    const { lat, lng } = results;
    setSearchMarker({ lat, lng });
    setplaceInfo(results);
  }, []);

  // error handling for loading maps
  if (loadError) {
    return 'Error loading maps';
  }
  if (!isLoaded) {
    return 'Loading maps';
  }

  return (
    <div>
      {click && (
        <BarInfo
          placeInfo={placeInfo}
          searchMarker={searchMarker}
          customerId={gId}
        />
      )}
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={12}
        center={currentPosition || defaultCenter}
        options={options}
        draggable
        onClick={onMapClick}
        onLoad={onMapLoad}
      >
        <Search
          panTo={panTo}
          currentPosition={currentPosition}
          searchBoxStyle={searchBoxStyle}
          getPlaceInfo={getPlaceInfo}
        />
        {searchMarker.key === 'bar' ? (
          <Marker
            key="bar"
            onClick={handleMarkerClick}
            position={{
              lat: +searchMarker.lat,
              lng: +searchMarker.lng,
            }}
            icon={{
              url: beerGold,
            }}
          />
        )
          : (
            <Marker
              key="user"
              position={{
                lat: +searchMarker.lat,
                lng: +searchMarker.lng,
              }}
              icon={{
                url: user,
              }}
            />
          )}
        <DangerMarkers
          dangerMarkers={dangerMarkers}
          getDblClickDangerMarker={getDblClickDangerMarker}
        />
        <BarMarkers parties={parties} />
        <FriendsMarkers friendLocations={friendLocations} />
        <PrivateSwitch
          className="privateSwitch"
          gId={gId}
          getSwitch={getSwitch}
        />
      </GoogleMap>
      {/* <DirectionsBtn /> */}
      <QuickCreate
        // className="myLocationDiv"
        getMyLocation={getMyLocation}
        panTo={panTo}
      />
      {/* TODO: */}
    </div>
  );
};

MapContainer.propTypes = {
  setMapLatLng: propTypes.func,
  username: propTypes.string,
  gId: propTypes.string,
};

export default MapContainer;
