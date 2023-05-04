import { useState } from "react";
import usePlacesAutoComplete, { getGeocode, getLatLng } from "use-places-autocomplete";
import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption } from "@reach/combobox";
import "@reach/combobox/styles.css";
import axios from "axios";
import "../../styles/mapstyles.css";

type PlacesProps = {
  setLatLng: (position: google.maps.LatLngLiteral) => void;
  setLocation: React.Dispatch<React.SetStateAction<string>>;
};

function Places({ setLatLng, setLocation }: PlacesProps) {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutoComplete();

  // console.log({ status, data });

  const handleSelect = async (val: string) => {
    setValue(val, false);
    clearSuggestions();

    const results = await getGeocode({ address: val });
    console.log(results);
    const placeId = results[0].place_id;

    const { lat, lng } = await getLatLng(results[0]);
    // console.log("lat and lng", typeof lat, typeof lng);

    setLatLng({ lat, lng });
    setLocation(val);

    try {
      await axios.post('/api/places-to-read/place', { address: val, lat: lat, lng: lng, altLoc: placeId });
    } catch (err) {
      console.error(err);
    }
    setValue("");
  };

  return (
    <Combobox onSelect={handleSelect}>
      <ComboboxInput
        value={value}
        onChange={e => setValue(e.target.value)} className="combobox-input"
        placeholder="Search an address"
      />
      <ComboboxPopover>
        <ComboboxList>
          {status === "OK" && data.map(({ place_id, description }) => (
            <ComboboxOption
              key={place_id}
              value={description}
            />
          ))}
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>
  )
}

export default Places;