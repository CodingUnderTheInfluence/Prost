import React, { useState } from 'react';
import { Marker, InfoWindow } from '@react-google-maps/api';
import barCapacity from '../../../helpers/barCapacity';


const style = {
  red: 'red',
  yellow: 'yellow',
  green: 'green'
}

const BarMarker = ({ party: { bar_name, id, latitude, longitude } }) => {
  const [show, setShow] = useState(false);
  const [getBarCapacity, setBarCapacity] = useState(0);
  const [color, setColor] = useState('green');

  const handleClick = (id) => {
    barCapacity(id)
      .then(size => {
        setShow(id);
        if (size > 20) {
          setColor('red');
        } else if (size > 10 && size < 19) {
          setColor('yellow');
        } else {
          setColor('green');
        }
        setBarCapacity(size);
      });
  };

  return (
    <Marker
      key={id}
      position={{
        lat: +latitude,
        lng: +longitude,
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
