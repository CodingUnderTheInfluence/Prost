import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { GoogleMap, Marker, MarkerClusterer, useLoadScript } from '@react-google-maps/api';
import beer from '../../../../images/beer.png';
import { TextField } from '@material-ui/icons';
import Search from './Search.jsx';
import BarInfo from './BarInfo.jsx';
import PrivateSwitch from './PrivateSwitch.jsx';
import FriendsMarkers from '../Map/FriendsMarkers.jsx';
import BarMarkers from '../Map/BarMarkers.jsx';
import Directions from '../Directions/Directions.jsx';
import Create from './Create.jsx';
import DangerMarkers from '../Map/DangerMarkers.jsx';
// import PeopleSearch from './PeopleSearch.jsx';
import QuickCreate from './QuickCreate.jsx';
import mapStyle from '../../../helpers/mapStyle';
import { getDetails } from 'use-places-autocomplete';
// import mapParties from '../../../helpers/mapStyle';
// used for the load script to get google places
const libraries = ['places'];

const mapStyles = {
  width: '98vw',
  height: '75vh',
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


const start = '1217 Magazine St, New Orleans, LA 70130, USA';
const end = '500 Chartres St, New Orleans, LA 70130, USA';


const MapContainer = ({ setMapLatLng, username, gId }) => {
  const [currentPosition, setCurrentPosition] = useState({
    lat: 29.951065,
    lng: -90.071533,
  });
  const [publicLocations, setPublicLocations] = useState([]);
  const [friendLocations, setFriendLocations] = useState([]);
  const [privateSwitch, setPrivateSwitch] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const [myLocation, setMyLocation] = useState({});
  const [dangerMarkers, setDangerMarkers] = useState([]);
  const [parties, setParties] = useState([]);
  const [searchMarker, setSearchMarker] = useState({});
  const [click, setClick] = useState(false);
  const [placeInfo, setplaceInfo] = useState(null);
  // const [origin, setOrigin] = useState('');
  // const [destination, setDestination] = useState('');
  // const [getDirections, setGetDirections] = useState(false);

  const defaultCenter = {
    lat: 29.951065,
    lng: -90.071533,
  };

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
    libraries,
  });

  // get the toggle for the switch to update state
  const getSwitch = (pSwitch) => setPrivateSwitch(pSwitch);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      axios.get('/db/maps')
        .then(({ data }) => {
          setFriendLocations(data);
        });
    }
    return () => { isMounted = false; };
    // --removed priviteSwitch in second arg to reload state when marker was clicked 
  }, [privateSwitch]);

  // TODO:
  /// //////////       get info for bars to display        /////////////////////////////
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
    setDangerMarkers(current => [
      ...current,
      {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
        time: new Date(),
      },
    ]);
  });

  // save reference to map to use it later and not reload state
  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
    // --removed priviteSwitch in second arg to reload state when marker was clicked 
  }, []);

  // move map to the where the user has searched
  const panTo = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(15);
    setCurrentPosition({ lat, lng });
    setSearchMarker({ lat, lng });
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
    console.info(results, 'SEARCH RESULTS');
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

  const directionInput = (value, type) => {
    // if (type === 'origin') {
    //   setOrigin(start);
    //   console.log(value);
    // } else if (type === 'destination') {
    //   setDestination(end);
    //   console.log(destination);
    // }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.target.id === 'origin' ? setOrigin(e.target.value)
        : setDestination(e.target.value);
      setGetDirections(true);
      console.log('directions', origin, destination);

    }
  };

  return (
    <div>
      {click && (
        <BarInfo
          placeInfo={placeInfo}
          searchMarker={searchMarker}
        />
      )}
      {/* TODO: */}
      {/* <input
        value={origin}
        onChange={(e) => {
          e.preventDefault();
          setOrigin(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            setGetDirections(true);
          }
        }}
      /> */}

      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={12}
        center={currentPosition || defaultCenter}
        options={options}
        draggable={true}
        // TODO: 
        onClick={onMapClick}
        onLoad={onMapLoad}
      >
        <Search
          panTo={panTo}
          currentPosition={currentPosition}
          searchBoxStyle={searchBoxStyle}
          getPlaceInfo={getPlaceInfo}
        />
        <Marker
          onClick={handleMarkerClick}
          key={searchMarker.lat}
          position={{
            lat: +searchMarker.lat,
            lng: +searchMarker.lng,
          }}
          icon={{
            url: beer,
            scaledSize: new window.google.maps.Size(30, 30)
          }}
        />
        <DangerMarkers dangerMarkers={dangerMarkers} />
        <BarMarkers parties={parties} />
        <FriendsMarkers friendLocations={friendLocations} />
        <Directions
        // origin={origin}
        // destination={destination}
        // getDirections={getDirections}
        />
      </GoogleMap>
      {/* <div onKeyDown={handleKeyPress}>
        <input
          id='origin'
          type='text'
          onChange={(e) => directionInput(e.target.value, e.target.id)}
        ></input>
        <input
          id='destination'
          type='text'
          onChange={(e) => directionInput(e.target.value, e.target.id)}
        ></input>
      </div> */}
      <PrivateSwitch gId={gId} getSwitch={getSwitch} />
      <QuickCreate
        style={{
          position: 'absolute',
          zIndex: 10,
          bottom: 100,
        }}
        getMyLocation={getMyLocation}
        panTo={panTo}
      />
    </div >
  );
};

MapContainer.propTypes = {
  setMapLatLng: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  gId: PropTypes.string.isRequired,
};

export default MapContainer;
