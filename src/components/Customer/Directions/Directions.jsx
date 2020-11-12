import React, { useState, useEffect } from 'react';
import { DirectionsService, DirectionsRenderer } from '@react-google-maps/api';
import directions from '../../../data/directions.json';

const Directions = ({ origin, destination, getDirections }) => {
  const [response, setResponse] = useState(null);

  const directionsCallback = (response) => {
    console.log('hello', response)
    if (response !== null) {
      response.status === 'OK' ? setResponse(() => response)
        : console.info('direction response: ', response);
    }
  };

  return (
    <div>
      { (origin && destination && getDirections)
        && (
          <DirectionsService
            options={{
              origin: origin,
              destination: destination,
              travelMode: 'DRIVING'
            }}
            callback={directionsCallback}
          />
        )
      }
      {response !== null && <DirectionsRenderer
        options={{ directions: response }}
        onLoad={(dirs) => console.info('directions: ', dirs)}
      />}
    </div>
  );
};


export default Directions;