import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Stack from '@mui/joy/Stack';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { IconButton } from '@mui/material';
import Slide from '@mui/material/Slide';
import { padding } from '@mui/system';
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
  const placesPerPage = 3;

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
        alignContent: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '300px',
        paddingBottom: '0',
      }}
    >
      <IconButton
        onClick={handlePrevPage}
        sx={{
          margin: 5, padding: 0, alignSelf: 'center', justifySelf: 'start',
        }}
        disabled={currentPage === 0}
      >
        <NavigateBeforeIcon />
      </IconButton>

      <Box sx={{ position: 'relative', width: '90%', height: '100%' }}>
        {[...Array(Math.ceil(places.length / placesPerPage))].map((_, index) => (
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              display: currentPage === index ? 'block' : 'none',
            }}
          >
            <Slide direction={slideDirection} in={currentPage === index} mountOnEnter unmountOnExit>
              <Stack
                spacing={2}
                direction="row"
                maxWidth="100%"
                maxHeight="95%"
                alignContent="center"
                justifyContent="center"
              >
                {places
                  .slice(index * placesPerPage, index * placesPerPage + placesPerPage)
                  .map((place: Place) => (
                    <Box key={place.id}>
                      <PlaceCard place={place} />
                    </Box>
                  ))}
              </Stack>
            </Slide>
          </Box>
        ))}

      </Box>

      <IconButton
        onClick={handleNextPage}
        sx={{
          margin: 5, padding: 0, alignSelf: 'center', justifySelf: 'end',
        }}
        disabled={currentPage >= Math.ceil((places.length || 0) / placesPerPage) - 1}
      >
        <NavigateNextIcon />
      </IconButton>
    </Box>
  );
}

export default HomePlaces;
