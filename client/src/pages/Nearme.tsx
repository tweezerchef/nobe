import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { GeoapifyGeocoderAutocomplete, GeoapifyContext } from '@geoapify/react-geocoder-autocomplete'



function Locations() {

const [userLocation, setUserLocation] = useState('');

const onPlaceSelect = (value: any) => {
  console.log(value);
}

const onSuggectionChange = (value: any) => {
  console.log(value);
}


  return (
    <div>
      <h1>Near Me</h1>
      <GeoapifyContext apiKey="6d182d93697140e88a9e75ab8d892bc5">
      <GeoapifyGeocoderAutocomplete placeholder="Enter address here"
        placeSelect={onPlaceSelect}
        suggestionsChange={onSuggectionChange}
        />
    </GeoapifyContext>

    </div>
  )

}

export default Locations;