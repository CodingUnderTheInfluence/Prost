import React from 'react';
import { StandaloneSearchBox } from '@react-google-maps/api';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
  ComboboxOptionText,
} from "@reach/combobox";
// import "@reach/combobox/styles.css";

const Search = () => {
  const {
    ready, 
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions
  } = usePlacesAutocomplete({
    requestOptions: {
      location: {
        lat: () => 40.730610,
        lng: () => -73.935242
      },
      radius: 10 * 1610,
    }
  });

  return (
    <div>
      <Combobox onSelect={async (address) => {
        try {
          const results = await getGeocode({address});
          const { lat, lng } = await getLatLng(results[0]);
          console.log(lat, lng)
        }
        catch(err) {
          console.error(err);
        }
      }}
      >
        <ComboboxInput 
          value={value} 
          onChange={(e) => {
            setValue(e.target.value);
          }}
          disabled={!ready} 
          placeholder='Find bars'
        />
        {/* takes the suggestions from google places */}
        <ComboboxPopover>
          {status === 'OK' 
            && data.map(({ place_id, description }) => (
              <ComboboxOption key={place_id} value={description} />
            ))}
        </ComboboxPopover>
      </Combobox>
    </div>
  );
};

export default Search;