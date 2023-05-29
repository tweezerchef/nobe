/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext } from 'react';
// import usePlacesAutoComplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
// import {
//   Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption,
// } from '@reach/combobox';
// import '@reach/combobox/styles.css';
// import axios from 'axios';
// import '../../styles/mapstyles.css';
// import UserContext from '../../hooks/Context';

// type PlacesProps = {
//   setLatLng: (position: google.maps.LatLngLiteral) => void;
//   setLocation: React.Dispatch<React.SetStateAction<string>>;
//   setPlaceId: React.Dispatch<React.SetStateAction<string>>;
// };

function FavPlaces() {
  // { setLatLng, setLocation, setPlaceId }: PlacesProps
  // const {
  //   value,
  //   setValue,
  //   suggestions: { status, data },
  //   clearSuggestions,
  // } = usePlacesAutoComplete();

  // const handleSelect = async (val: string) => {
  //   setValue(val, false);
  //   clearSuggestions();
  //   const results = await getGeocode({ address: val });
  //   const placeId = results[0].place_id;
  //   setPlaceId(placeId);
  //   const { lat, lng } = await getLatLng(results[0]);

  //   setLatLng({ lat, lng });
  //   setLocation(val);

  //   setValue('');
  // };

  return (
    <h1> COMING SOON !!</h1>
    // <Combobox onSelect={handleSelect}>
    //   <ComboboxInput
    //     value={value}
    //     onChange={(e) => setValue(e.target.value)}
    //     className="combobox-input"
    //     placeholder="Search an address"
    //   />
    //   <ComboboxPopover>
    //     <ComboboxList>
    //       {status === 'OK' && data.map(({ place_id, description }) => (
    //         <ComboboxOption
    //           key={place_id}
    //           value={description}
    //         />
    //       ))}
    //     </ComboboxList>
    //   </ComboboxPopover>
    // </Combobox>
  );
}

export default FavPlaces;
