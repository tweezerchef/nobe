import { useState } from "react";
import usePlacesAutoComplete, { getGeocode, getLatLng } from "use-places-autocomplete";
import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption } from "@reach/combobox";
import "@reach/combobox/styles.css";
import axios from "axios";
import "../../styles/mapstyles.css";

type PlacesProps = {
  setLatLng: (position: google.maps.LatLngLiteral) => void;
  setAddress: React.Dispatch<React.SetStateAction<string>>;
};

function Places({ setLatLng, setAddress }: PlacesProps) {
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
    const { lat, lng } = await getLatLng(results[0]);
    console.log(lat, lng);

    setLatLng({ lat, lng });
    setAddress(val);

    try {
      await axios.post('/api/places-to-read/place', { address: val, lat: lat, lng: lng });
    } catch (err) {
      console.error(err);
    }
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