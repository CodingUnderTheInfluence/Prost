import React, { useState } from 'react';
import { Marker, InfoWindow } from '@react-google-maps/api';
import barCapacity from '../../../helpers/barCapacity';
import beer from '../../../../images/beer.png';


const BarMarker = ({ party: { id, bar_name, latitude, longitude } }) => {
  const [show, setShow] = useState(false);
  const [getBarCapacity, setBarCapacity] = useState(0);
  const [color, setColor] = useState('green');

  const handleClick = (id) => {
    barCapacity(id)
      .then(size => {
        setShow(!show);
        if (size > 20) {
          setColor('red');
          setBarCapacity('full');
        } else if (size > 10 && size < 19) {
          setColor('#f59314');
          setBarCapacity(size);
        } else {
          setColor('green');
          setBarCapacity(size);
        }
      });
  };

  return (
    <Marker
      position={{
        lat: +latitude,
        lng: +longitude,
      }}
      icon={{
        url: beer,
        scaledSize: new window.google.maps.Size(30, 30)
      }}
      onClick={() => handleClick(id)}
    >
      {show &&
        <InfoWindow>
          <div>
            <div>{bar_name}</div>
            <div style={{ color: color }}>Capacity:{getBarCapacity}</div>
          </div>
        </InfoWindow>}
    </Marker >
  )
}

export default BarMarker;
