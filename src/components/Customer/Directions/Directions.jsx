import React, { useState, useEffect } from 'react';
import { DirectionsService, DirectionsRenderer } from '@react-google-maps/api';
import directions from '../../../data/directions.json';


const Directions = () => {
  const [response, setResponse] = useState(null);
  const [origin, setOrigin] = useState('1217 Magazine St, New Orleans, LA 70130, USA');
  const [destination, setDestination] = useState('500 Chartres St, New Orleans, LA 70130, USA');

  const directionsCallback = (response) => {

    if (response !== null) {
      response.status === 'OK' ? setResponse(() => response)
        : console.log('direction response: ', response);
    }
  };

  return (
    <>
      <DirectionsService
        options={{
          origin: origin,
          destination: destination,
          travelMode: 'DRIVING'
        }}
        callback={directionsCallback}
      />
      {response && <DirectionsRenderer
        options={{ directions: response }}
        onLoad={(dirs) => console.log('directions: ', dirs)}
      />}
    </>
  );
};


export default Directions;