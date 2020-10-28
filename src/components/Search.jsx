import React from 'react';
import { useLoadScript } from '@react-google-maps/api';
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

// const libraries = ['places'];
//   const { isLoaded, loadError } = useLoadScript({
//     libraries,
//   })

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
      <Combobox onSelect={(address) => {
          console.log(address);
        }}
      >
        <ComboboxInput 
          value={value} 
          onChange={(e) => {
            setValue(e.target.value);
          }}
          disabled={!ready} 
          placeholder='Enter address'
        />
      </Combobox>
    </div>
  );

};

export default Search;