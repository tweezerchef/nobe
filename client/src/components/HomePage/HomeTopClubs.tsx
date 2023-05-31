import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Stack from '@mui/joy/Stack';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import IconButton from '@mui/material/IconButton';
import Slide from '@mui/material/Slide';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { Club } from '../../typings/types';
import ClubCard from './ClubCard/ClubCard';

function HomeTopClubs() {
  const [currentPage, setCurrentPage] = useState(0);
  const [slideDirection, setSlideDirection] = useState<'right' | 'left' | undefined>('left');
  const [topClubs, setTopClubs] = useState<Club[]>([]);

  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const getTopClubs = () => {
    axios.get('/api/clubs/top')
      .then((response) => {
        setTopClubs(response.data);
      }).catch((err) => {
        console.error(err);
      });
  };
  const clubsPerPage = 3;

  const handleNextPage = () => {
    setSlideDirection('left');
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setSlideDirection('right');
    setCurrentPage((prevPage) => prevPage - 1);
  };

  useEffect(() => {
    getTopClubs();
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
        height: isMobile ? '80vw' : '20vw',
        maxHeight: isMobile ? '80vw' : '300px',
        marginTop: isMobile ? '.2vh' : '1.5vh',
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
        {[...Array(Math.ceil(topClubs.length / clubsPerPage))].map((_, index) => (
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
                {topClubs
                  .slice(index * clubsPerPage, index * clubsPerPage + clubsPerPage)
                  .map((club) => (
                    <Box key={club?.id}>
                      <ClubCard club={club} />
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
        disabled={currentPage >= Math.ceil((topClubs.length || 0) / clubsPerPage) - 1}
      >
        <NavigateNextIcon />
      </IconButton>
    </Box>
  );
}

export default HomeTopClubs;
