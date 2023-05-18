import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { get } from 'http';
import PlaceCard from './PlaceCard/PlaceCard';
import { Place } from '../../typings/types';

interface PlacePicture {
  id: string;
  url: string;
  googlePic: boolean;
  placeId: string;

}

function HomePlaces() {
  const [places, setPlaces] = useState([]);

  const getPlaces = () => {
    axios.get('/places')
      .then((response) => {
        setPlaces(response.data);
      });
  };
  useEffect(() => {
    getPlaces();
  }, []);
  return (
    <div>
      {places.length > 0 && places
      && <PlaceCard place={places[0]} />}
    </div>
  );
}

export default HomePlaces;
