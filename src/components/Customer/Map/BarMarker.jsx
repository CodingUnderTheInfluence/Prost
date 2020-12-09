import React, { useState } from 'react';
import { Marker, InfoWindow } from '@react-google-maps/api';
import PropTypes from 'prop-types';
import { barCapacity, barPercentCapacity } from '../../../helpers/barCapacity';
import beer from '../../../../images/beer.png';
import beerGold from '../../../../images/beerGold.png';

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
      setBarCapacity(`Capacity: ${percent}%`);
      if (percent >= 0 && percent <= 25) {
        setColor('Green');
      } else if (percent > 25 && percent <= 75) {
        setColor('#f59314');
      } else if (percent > 75) {
        setColor('red');
      }
    }
    setShow(!show);
  };

  return (
    <Marker
      position={{
        lat: +latitude,
        lng: +longitude,
      }}
      icon={{
        url: beerGold,
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
    latitude: PropTypes.string,
    longitude: PropTypes.string,
  }),
};

export default BarMarker;
