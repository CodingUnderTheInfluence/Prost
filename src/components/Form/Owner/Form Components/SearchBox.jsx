import React, { useState } from 'react';
import { StandaloneSearchBox } from '@react-google-maps/api';
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
import { ContactPhoneSharp } from '@material-ui/icons';
// import "@reach/combobox/styles.css";


const searchStyle = {
    position: 'absolute',
    zIndex: 2,
    padding: '10px',
};

const SearchBox = ({ panTo, currentPosition, searchBoxStyle, getPlaceInfo }) => {
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

    return (
        <div style={searchStyle}>
            <Combobox
                onSelect={async (address) => {
                    setValue(address, false);
                    clearSuggestions();
                    try {
                        const results = await getGeocode({ address });
                        const details = await getDetails(results[0]);
                        getPlaceInfo(details);
                        console.info('this is results', results);
                        const { lat, lng } = await getLatLng(results[0]);
                        panTo({ lat, lng });
                        setValue('');

                        // setPlaceInfo(details);
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


export default SearchBox;
