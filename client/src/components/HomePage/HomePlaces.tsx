import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Stack from '@mui/joy/Stack';
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
    <Box maxWidth="100%" maxHeight="40vh" overflow="auto">
      <Stack spacing={2} direction="row" maxWidth="100%">
        {places.length > 0 && places

      && places.map((place) => <PlaceCard place={place} />)}
      </Stack>
    </Box>
  );
}

export default HomePlaces;
