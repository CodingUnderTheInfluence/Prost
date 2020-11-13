import React, { useState, useEffect } from 'react';
import { Marker, InfoWindow } from '@react-google-maps/api';
import axios from 'axios';
import warning from '../../../../images/warning.png';

const DangerMarker = ({ danger: { lat, lng } }) => {
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (event) => {
    event.preventDefault();
    setSelected(event.target.value);
  };
  const postReport = () => {
    axios.post('/db/maps/report', {
      latitude: lat,
      longitude: lng,
      report: selected,
    })
      .then(({ data }) => {
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
      icon={{ url: warning }}

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
export default DangerMarker;
