import React, { useState } from 'react';
import propTypes from 'prop-types';
import { Marker, InfoWindow, Data } from '@react-google-maps/api';
import axios from 'axios';
import warning from '../../../../images/warning.png';

const DangerMarker = ({ danger, getDblClickDangerMarker, allDanger }) => {
  const { lat, lng } = danger;
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState('Assult');
  const [success, setSuccess] = useState(false);

  const handleChange = (event) => {
    event.preventDefault();
    setSelected(event.target.value);
  };

  const handleDblClick = (e) => {
    // console.log('filted danger', allDanger.filter((target) => target.lat !== danger.lat));
    getDblClickDangerMarker(danger);
  };

  const postReport = () => {
    axios.post('/db/maps/report', {
      latitude: lat,
      longitude: lng,
      report: selected,
    })
      .then(() => {
        setSuccess(true);
      })
      .catch((err) => console.warn(err));
  };

  const handleClick = () => {
    setShow(!show);
  };
  return (
    <Marker
      position={{ lat, lng }}
      onClick={handleClick}
      onDblClick={handleDblClick}
      icon={{
        url: warning,
      }}

    >
      {show
        && (
          <InfoWindow>
            {success ? (<p>{`${selected} Reported!`}</p>) : (
              <span>
                <select onChange={handleChange}>
                  <option value="Theft">Theft</option>
                  <option selected value="Assult">Assult</option>
                  <option value="Shooting">Shooting</option>
                </select>
                <button type="button" onClick={postReport}>Submit Report</button>
              </span>
            )}
          </InfoWindow>
        )}
    </Marker>
  );
};

DangerMarker.propTypes = {
  allDanger: propTypes.any,
  danger: propTypes.shape({
    lat: propTypes.number,
    lng: propTypes.number,
  }),
};

export default DangerMarker;
