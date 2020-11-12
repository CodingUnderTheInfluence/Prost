import React, { useState } from 'react';
import { DirectionsService, DirectionsRenderer } from '@react-google-maps/api';
import { TextField, Button } from '@material-ui/core';

const Directions = () => {
  const [response, setResponse] = useState(null);
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [getDirections, setGetDirections] = useState(false);


  const directionsCallback = (response) => {
    if (response !== null) {
      response.status === 'OK' ? setResponse(() => response)
        : console.info('direction response: ', response);
    }
  };

  // const directionInput = (value, type) => {
  //   if (type === 'origin') {
  //     setOrigin(start);
  //     console.log(value);
  //   } else if (type === 'destination') {
  //     setDestination(end);
  //     console.log(destination);
  //   }
  // };

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
      <div style={{ position: 'absolute', bottom: '20px' }} onKeyDown={handleKeyPress}>
        <TextField
          id='origin'
          type='text'
        // onChange={(e) => directionInput(e.target.value, e.target.id)}
        ></TextField>
        <TextField
          id='destination'
          type='text'
        // onChange={(e) => directionInput(e.target.value, e.target.id)}
        ></TextField>
        {/* <Button
        variant="contained"
        onClick={setGetDirections(true)}
      >
        Directions
        </Button> */}
      </div>
      {
        (origin && destination && getDirections)
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
      {
        response !== null && <DirectionsRenderer
          options={{ directions: response }}
          onLoad={(dirs) => console.info('directions: ', dirs)}
        />
      }
    </div >
  );
};


export default Directions;
