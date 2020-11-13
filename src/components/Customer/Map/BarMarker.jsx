import React, { useState } from 'react';
import { Marker, InfoWindow } from '@react-google-maps/api';
import PropTypes from 'prop-types';
import { barCapacity, barPercentCapacity } from '../../../helpers/barCapacity';
import beer from '../../../../images/beer.png';

const BarMarker = ({
  party: {
    id, bar_name, latitude, longitude,
  },
}) => {
  const [show, setShow] = useState(false);
  const [getBarCapacity, setBarCapacity] = useState('bar not registered');
  const [color, setColor] = useState('black');

  const handleClick = async (id) => {
    const barCap = await barCapacity(id);
    if (barCap !== null) {
      const { covidTotal, current } = barCap;
      const percent = barPercentCapacity(covidTotal, current);
      setBarCapacity(`Capacity: ${percent * 100}%`);
      if (percent > 0 && percent <= 0.25) {
        setColor('Green');
      } else if (percent > 0.25 && percent <= 0.75) {
        setColor('#f59314');
      } else if (percent > 0.75) {
        setColor('red');
      }
    }
    setShow(true);
    // barCapacity(id)
    //   .then((size) => {
    //     setShow(!show);
    //     if (size > 20) {
    //       setColor('red');
    //       setBarCapacity(size);
    //     } else if (size > 10 && size < 19) {
    //       setColor('#f59314');
    //       setBarCapacity(size);
    //     } else {
    //       setColor('green');
    //       setBarCapacity(size);
    //     }
    //   });
  };

  return (
    <Marker
      position={{
        lat: +latitude,
        lng: +longitude,
      }}
      icon={{
        url: beer,
        scaledSize: new window.google.maps.Size(30, 30),
      }}
      onClick={() => handleClick(id)}
    >
      {show && (
        <InfoWindow>
          <div>
            <h3>{bar_name}</h3>
            <h4 style={{ color: color }}>{getBarCapacity}</h4>
          </div>
        </InfoWindow>
      )}
    </Marker>
  );
};

BarMarker.propTypes = {
  party: PropTypes.shape({
    id: PropTypes.number,
    bar_name: PropTypes.string,
    latitude: PropTypes.number,
    longitude: PropTypes.number,
  }),
};

export default BarMarker;
