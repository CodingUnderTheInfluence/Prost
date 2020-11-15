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
} from '@reach/combobox';
import { makeStyles } from '@material-ui/core';
import { ContactPhoneSharp } from '@material-ui/icons';
// import "@reach/combobox/styles.css";

const searchStyle = {
  position: 'absolute',
  zIndex: 2,
  padding: '10px',
};

const useStyles = makeStyles((theme) => ({
  box: {
    height: '30px',
    maxWidth: 'auto',
    fontSize: '14pt',
    position: 'flex',
  },
  list: {
    fontSize: '12pt',
    fontFamily: 'Helvetica, Verdana, sans-serif',
  },
  popover: {

  },
}));

const SearchBox = ({
  panTo,
  currentPosition,
  searchBoxStyle,
  getPlaceInfo,
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
          setValue(address, false);
          clearSuggestions();
          try {
            const results = await getGeocode({ address });
            const { place_id } = results[0];
            const details = await getDetails({ placeId: place_id });
            getPlaceInfo(details);
            const { lat, lng } = await getLatLng(results[0]);
            panTo({ lat, lng });
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
          placeholder="Search for Bar"
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
    </div>
  );
};

export default SearchBox;
