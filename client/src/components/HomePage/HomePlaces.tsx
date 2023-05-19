import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Stack from '@mui/joy/Stack';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import { IconButton } from '@mui/material';
import Slide from '@mui/material/Slide';
import { Place } from '../../typings/types';
import PlaceCard from './PlaceCard/PlaceCard';

interface PlacePicture {
  id: string;
  url: string;
  googlePic: boolean;
  placeId: string;

}

function HomePlaces() {
  const [currentPage, setCurrentPage] = useState(0);
  const [slideDirection, setSlideDirection] = useState<'right' | 'left' | undefined>('left');
  const [places, setPlaces] = useState([]);

  const getPlaces = () => {
    axios.get('/places')
      .then((response) => {
        setPlaces(response.data);
      });
  };
  const placesPerPage = 5;

  const handleNextPage = () => {
    setSlideDirection('left');
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setSlideDirection('right');
    setCurrentPage((prevPage) => prevPage - 1);
  };

  useEffect(() => {
    getPlaces();
  }, []);
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '400px',
      }}
    >
      <IconButton
        onClick={handlePrevPage}
        sx={{ margin: 0, padding: 0, alignSelf: 'center' }}
        disabled={currentPage === 0}
      >
        <NavigateBeforeIcon />
      </IconButton>
      <Stack spacing={2} direction="row" maxWidth="100%">
        {places.length > 0 && places

      && places.map((place) => <PlaceCard place={place} />)}
      </Stack>
    </Box>
  );
}

export default HomePlaces;
