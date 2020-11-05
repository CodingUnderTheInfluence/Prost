import React, { useState, useEffect } from 'react';
import { DirectionsService, DirectionsRenderer } from '@react-google-maps/api';
import directions from '../../../data/directions.json';


const Directions = () => {
  const [response, setResponse] = useState(null);
  const [origin, setOrigin] = useState('1217 Magazine St, New Orleans, LA 70130, USA');
  const [destination, setDestination] = useState('500 Chartres St, New Orleans, LA 70130, USA');

  const directionsCallback = (response) => {

    if (response) {
      console.log('directions inside if!!!!!', response)
      response.status === 'OK' ? setResponse(() => response)
        : console.log('direction response: ', response);
    }
  };

  const getOrigin = (ref) => {
    setOrigin(ref);
  };

  const getDestination = (ref) => {
    setDestination(ref);
  };

  const onClick = () => {
    // if (origin.value)
  };

  return (
    <>
      <input />
      <input />
      <DirectionsService
        options={{
          origin: '1217 Magazine St, New Orleans, LA 70130, USA',
          destination: '500 Chartres St, New Orleans, LA 70130, USA',
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

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////                                            ///////////////////////////////////////////
////////////////////////////////////              Real api call                 ///////////////////////////////////////////
///////////////////////////////////                                            ///////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// const Directions = () => {
//   const [response, setResponse] = useState(null);
//   const [origin, setOrigin] = useState('');
//   const [destination, setDestination] = useState('');

//   const directionsCallback = ((res) => {
//     if (!res) {
//       res.status === 'OK' ? setResponse(() => res)
//         : console.log('direction response: ', res);
//     }
//   });

//   const getOrigin = (ref) => {
//     setOrigin(ref);
//   };

//   const getDestination = (ref) => {
//     setDestination(ref);
//   };

//   const onClick = () => {
//     // if (origin.value)
//   };

//   return (
//     <>
//       <DirectionsService
//         options={{
//           origin: origin,
//           destination: destination,
//           travelMode: 'DRIVING'
//         }}
//         callback={directionsCallback}
//       />
//       {response && <DirectionsRenderer options={{ directions: response }} onLoad={(dirs) => console.log('directions: ', dirs)} />}
//     </>
//   );
// };

export default Directions;