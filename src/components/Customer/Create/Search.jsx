import React from 'react';
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
} from '@reach/combobox';
import { makeStyles } from '@material-ui/core';
import { ContactPhoneSharp } from '@material-ui/icons';
// import "@reach/combobox/styles.css";

const searchStyle = {
  position: 'absolute',
  zIndex: 2,
  left: '25%',
  paddingTop: '30px',
};

const useStyles = makeStyles(() => ({
  box: {
    height: '30px',
    maxWidth: 'auto',
    fontSize: '12pt',
    fontWeight: '200',
    // position: 'absolute',
  },
  list: {
    fontSize: '12pt',
    fontFamily: 'Helvetica, Verdana, sans-serif',
  },
  popover: {
    fontWeight: '300',
    fontFamily: 'Helvetica, Verdana, sans-serif',
  },
  option: {
    fontWeight: '300',
    fontFamily: 'Helvetica, Verdana, sans-serif',
  },
}));

const Search = ({
  panTo, currentPosition, searchBoxStyle, getPlaceInfo,
}) => {
  const classes = useStyles();
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
            panTo({ lat, lng, key: 'bar' });
            setValue('');
          } catch (err) {
            console.warn(err);
          }
        }}
      >
        <ComboboxInput
          className={classes.box}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          disabled={!ready}
          placeholder="Find bars"
        />
        {/* takes the suggestions from google places */}
        <ComboboxPopover className={classes.popover}>
          <ComboboxList className={classes.list}>
            {status === 'OK'
              && data.map(({ place_id, description }) => (
                <ComboboxOption key={place_id} value={description} />
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>

      {/* <BarInfo placeInfo={placeInfo} /> */}
    </div>
  );
};

// TODO:
/// /////////////////        search function currently being worked on          ////////////////////

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
