import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import { Details } from '@material-ui/icons';
import Search from './Search.jsx';
import BarInfo from './BarInfo.jsx';
import PrivateSwitch from './PrivateSwitch.jsx';
import FriendsMarkers from './FriendsMarkers.jsx';
// import Create from './Create.jsx';
// import PeopleSearch from './PeopleSearch.jsx';
import QuickCreate from './QuickCreate.jsx';
// import BarCard from './BarInfoCardTest.jsx';
import mapStyle from '../../../helpers/mapStyle';
// import mapParties from '../../../helpers/mapStyle';
// used for the load script to get google places
const libraries = ['places'];

const mapStyles = {
  width: '98vw',
  height: '75vh',
};

const options = {
  zoomControl: true,
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

const MapContainer = ({ setMapLatLng, gId }) => {
  const [currentPosition, setCurrentPosition] = useState({
    lat: 29.951065,
    lng: -90.071533,
  });
  const [publicLocations, setPublicLocations] = useState([]);
  const [friendLocations, setFriendLocations] = useState([]);
  const [privateSwitch, setPrivateSwitch] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const [myLocation, setMyLocation] = useState({});
  const [markers, setMarkers] = useState([]);
  const [parties, setParties] = useState([]);
  const [searchMarker, setSearchMarker] = useState({});
  const [click, setClick] = useState(false);
  const [placeInfo, setplaceInfo] = useState(null);

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
  }, [privateSwitch]);

  /// //////////       get info for bars to display        /////////////////////////////
  // useEffect(() => {
  //   let isMounted = true;
  //   if (isMounted) {
  //     axios.get('/db/bar/all')
  //       .then(({ data }) => {
  //         setParties(data);
  //       });
  //   }
  //   return () => { isMounted = false };
  // }, []);

  // const onMapClick = useCallback((e) => {
  //   setMarkers(current => [
  //     ...current,
  //     {
  //       lat: e.latLng.lat(),
  //       lng: e.latLng.lng(),
  //       time: new Date()
  //     }
  //   ]);
  // });

  // sets the makers to the user click
  // const onMapClick = useCallback((e) => {
  //   setMarkers(current => [
  //     ...current,
  //     {
  //       lat: e.latLng.lat(),
  //       lng: e.latLng.lng(),
  //       time: new Date(),
  //     },
  //   ]);
  // });

  // save reference to map to use it later and not reload state
  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, [privateSwitch]);

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
    const { lat, lng } = results;
    setSearchMarker({ lat, lng });
    setplaceInfo(results);
  }, []);

  if (loadError) {
    return 'Error loading maps';
  }
  if (!isLoaded) {
    return 'Loading maps';
  }

  return (

    <div style={{ align: 'center' }}>
      {click
        ? (
          <BarInfo
            placeInfo={placeInfo}
            searchMarker={searchMarker}
          />
        )
        : null}
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={15}
        center={currentPosition || defaultCenter}
        options={options}
        draggable
        // onClick={onMapClick}
        onLoad={onMapLoad}
      >
        <Marker
          onClick={handleMarkerClick}
          key={searchMarker.lat}
          position={{
            lat: +searchMarker.lat,
            lng: +searchMarker.lng,
          }}
        />
        {parties.map(({ latitude, longitude, id }) => {
          console.info(latitude, longitude);
          return (
            <Marker
              key={id}
              position={{
                lat: +latitude,
                lng: +longitude,
              }}
            />
          );
        })}
        {/* {click ? <BarInfo
            placeInfo={placeInfo}
            searchMarker={searchMarker}
          />
        )
        : null}
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={12}
        center={currentPosition || defaultCenter}
        options={options}
        draggable={true}
        // onClick={onMapClick}
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
        />
        <FriendsMarkers friendLocations={friendLocations} />

      </GoogleMap>
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
    </div>
  );
};

MapContainer.propTypes = {
  setMapLatLng: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  gId: PropTypes.number.isRequired,
};

export default MapContainer;
