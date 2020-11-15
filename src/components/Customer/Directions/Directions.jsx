import React, { useState } from 'react';
import { DirectionsService, DirectionsRenderer } from '@react-google-maps/api';
import { TextField, Button } from '@material-ui/core';
import { Fab } from '@material-ui/core';

const Directions = () => {
  const [response, setResponse] = useState(null);
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [getDirections, setGetDirections] = useState(false);
  const [show, setShow] = useState(false);

  const directionsCallback = (response) => {
    if (response !== null) {
      response.status === 'OK' ? setResponse(() => response)
        : console.info('direction response: ', response);
    }
  };

  return (
    // <Fab
    //   onClick={() => setShow(true)}
    // >

    <div className="directions">
      <div style={{ position: 'absolute', bottom: '20px' }}>
        <TextField
          id="origin"
          type="text"
          onChange={(e) => setOrigin(e.target.value)}
        />
        <TextField
          id="destination"
          type="text"
          onChange={(e) => setDestination(e.target.value)}
        />
        <Button
          variant="contained"
          onClick={() => setGetDirections(true)}
        >
          Directions
            </Button>
        <Button
          variant="contained"
          onClick={() => {
            setResponse(null);
            setShow(false);
          }}
        >
          Remove Directions
            </Button>
      </div>
      {
        (origin && destination && getDirections)
        && (
          <DirectionsService
            options={{
              origin,
              destination,
              travelMode: 'DRIVING',
            }}
            callback={directionsCallback}
          />
        )
      }
      {
        response !== null && (
          <DirectionsRenderer
            options={{ directions: response }}
            onLoad={() => setGetDirections(false)}
          />
        )
      }
    </div>

    // </Fab>
  );
};

export default Directions;
