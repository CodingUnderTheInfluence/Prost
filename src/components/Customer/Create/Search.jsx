import React, { useState } from 'react';
import { StandaloneSearchBox } from '@react-google-maps/api';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
  getDetails,
} from 'use-places-autocomplete';

import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
  ComboboxOptionText,
} from "@reach/combobox";
import { ContactPhoneSharp } from '@material-ui/icons';
// import "@reach/combobox/styles.css";

const searchStyle = {
  position: 'absolute',
  zIndex: 2,
  left: '50%',
  padding: '10px',
};

const Search = ({ panTo, currentPosition, searchBoxStyle, getPlaceInfo }) => {
  // const [ placeInfo, setPlaceInfo ] = useState(null);
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: {
        lat: () => currentPosition.lat,
        lng: () => currentPosition.lng,
      },
      radius: 1000,
      types: ['establishment'],
    },
  });

  // console.log('data', data);

  return (
    <div style={searchStyle}>
      <Combobox
        onSelect={async (address) => {
          setValue(address);
          clearSuggestions();
          try {
            const results = await getGeocode({ address });
            const { place_id } = results[0];
            const details = await getDetails({ placeId: place_id });
            getPlaceInfo(details);
            const { lat, lng } = await getLatLng(results[0]);
            panTo({ lat, lng });
            setValue('');
          }
          catch (err) {
            console.warn(err);
          }
        }}
      >
        <ComboboxInput
          style={searchBoxStyle}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          disabled={!ready}
          placeholder="Find bars"
        />
        {/* takes the suggestions from google places */}
        <ComboboxPopover>
          <ComboboxList>
            {status === 'OK'
              && data.map((results) => {
                return (
                  <ComboboxOption key={results.place_id} value={results.description} />
                )
              })}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>

      {/* <BarInfo placeInfo={placeInfo} /> */}
    </div>
  );
};

// TODO:
////////////////////        search function currently being worked on          ////////////////////

// const Search = ({panTo, currentPosition, getPlaceInfo}) => {
//   const [ value, setValue ] = useState('');

//   const { latitude, longitude} = currentPosition;

//   const onLoad = (ref) => {
//     console.info(this);
//   }

//   return (
//     <StandaloneSearchBox
//       bounds={[latitude, longitude]}
//       onLoad={onLoad}
//       // onPlacesChanged={handlePlacesChange}

//     >
//       <input
//         type="text"
//         placeholder="Customized your placeholder"
//         style={{
//           boxSizing: `border-box`,
//           border: `1px solid transparent`,
//           width: `240px`,
//           height: `32px`,
//           padding: `0 12px`,
//           borderRadius: `3px`,
//           boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
//           fontSize: `14px`,
//           outline: `none`,
//           textOverflow: `ellipses`,
//           position: "absolute",
//           left: "50%",
//           marginLeft: "-120px",
//           zIndex: 10
//         }}

//       />
//     </StandaloneSearchBox>
//   );

// };

export default Search;
