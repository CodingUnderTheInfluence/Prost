import React, { useState } from 'react';
// import { Marker, InfoWindow } from '@react-google-maps/api';
import BarMarker from './BarMarker.jsx';


const BarMarkers = ({ parties }) => {
  return (
    parties.length && parties.map(party => (
      <BarMarker party={party} />
    ))
  );
};
















// const BarMarkers = ({ parties }) => {
//   const [show, setShow] = useState('');

//   const handleClick = (id) => {
//     // setInfo({ lat: e.latLng.lat(), lng: e.latLng.lng() });
//     setShow(id);
//   };
//   return (
//     <div>
//       {parties.length && parties.map(({ bar_name, latitude, longitude, id }) => {
//         return (

//           <Marker
//             key={id}
//             position={{
//               lat: +latitude,
//               lng: +longitude,
//             }}
//             onClick={() => handleClick(id)}
//           >
//             {show && <InfoWindow>
//               <div>{bar_name}</div>
//             </InfoWindow>}
//           </Marker>
//         )
//       })}
//     </div >
//   );
// }

export default BarMarkers;
