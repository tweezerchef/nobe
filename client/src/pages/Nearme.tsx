import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { GeoapifyGeocoderAutocomplete, GeoapifyContext } from '@geoapify/react-geocoder-autocomplete'

interface Book {
  books: {
    id: string;
    title: string;
    author: string;
    description: string;
  }
}

interface Props {
  radius: number;
  setRadius: (value: number) => void;
}




function Locations() {

// const [longitude, setLongitude] = useState(0);
// const [latitude, setLatitude] = useState(0);
const [radius, setRadius] = useState(0);
const [booksNearBy, setBooksNearBy] = useState<Book[]>([]);

const  getBooksNearMe = async () => {
  try {
    const res = await axios.get('/location/locations', { params: {longitude: longitude, latitude: latitude, radius: radius } });
    console.log(res);
   // setBooksNearBy(res.data);
  } catch (err) {
    console.error(err);
  }
}



const onPlaceSelect = (value: any) => {
  console.log(value);
  // setLatitude(value.properties.lon);
  // setLongitude(value.properties.lat);
}

// console.log(longitude, '1');
// console.log(latitude, '2');
console.log(radius, '3');


const onSuggectionChange = (value: any) => {
  console.log(value);
}

const handleRadiusChange = (e:any) => {
  const newRadius = e.target.value
  setRadius(newRadius);
};



  return (
    <div>
      <h1>Near Me</h1>
      <GeoapifyContext apiKey="6d182d93697140e88a9e75ab8d892bc5">
      <GeoapifyGeocoderAutocomplete
        placeholder="Enter address here"
        placeSelect={onPlaceSelect}
        suggestionsChange={onSuggectionChange}
      />
    </GeoapifyContext>
    <input
      type="number"
      value={radius}
      onChange={handleRadiusChange}
      placeholder="Set Range"
    />
    <button type="button" onClick={getBooksNearMe}>Search for Books</button>
    </div>
  )

}

export default Locations;