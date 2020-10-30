import React, { useState } from 'react';
import { TextField } from '@material-ui/core';
import { results } from './places.json';
import BarInfo from './BarInfo.jsx';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
  getDetails,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
  ComboboxOptionText,
} from "@reach/combobox";
// import "@reach/menu-button/styles.css";


const searchStyle = {
  position: 'absolute', 
  zIndex: 2,
  left: '50%',
  padding: '10px',
};
const dropDown = {
  backgroundColor: '#f5f5f5',
  textAlign: 'left'
}


const Search = ({panTo, currentPosition}) => {

  const [ placeInfo, setPlaceInfo ] = useState(null);
  const {
    ready, 
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions
  } = usePlacesAutocomplete({
    requestOptions: {
      location: {
        lat: () => currentPosition.lat,
        lng: () => currentPosition.lng
      },
      radius: 10000,
    }
  });

  return (
    <div style={searchStyle}>
      <Combobox onSelect={async (address) => {
        setValue(address, false);
        clearSuggestions();
        try {
          const results = await getGeocode({ address });
          const { lat, lng } = await getLatLng(results[0]);
          panTo({ lat, lng });
          // searchInfo({lat, lng});

          const details = await getDetails(results[0]);
          setPlaceInfo(details);
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
        <ComboboxPopover style={dropDown}>
          <ComboboxList style={{listStyleType: 'none'}}>
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
  
////////////////////        dummy data          ////////////////////  

// const Search = ({panTo, searchInfo}) => {
//   const [ placeInfo, setPlaceInfo ] = useState(null);
//   const [ bars, setBars ] = useState(results);
//   const {
//     ready, 
//     value,
//     suggestions: { status, data },
//     setValue,
//     clearSuggestions
//   } = usePlacesAutocomplete({
//     requestOptions: {
//       location: {
//         lat: () => 29.951065,
//         lng: () => -90.071533,
//       },
//       radius: 10 * 1610,
//     }
//   });

//   return (
//     <div>
//       <Combobox onSelect={async (address) => {
//         setValue(address, false);
//         clearSuggestions();
//         console.log(bars);
//       }}
//       >
//         <ComboboxInput 
//           value={value} 
//           onChange={(e) => {
//             setValue(e.target.value);
//           }}
//           disabled={!ready} 
//           placeholder='Find bars'
//         />
//         {/* takes the suggestions from google places */}
//         <ComboboxPopover>
//           <ComboboxList>
//             {status === 'OK' 
//               && bars.map(({ place_id, description }) => (
//                 <ComboboxOption key={place_id} value={description} />
//               ))}
//           </ComboboxList>
//         </ComboboxPopover>
//       </Combobox>

//       <BarInfo placeInfo={placeInfo} />
//     </div>
//   );
// };

export default Search;