import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Stack from '@mui/joy/Stack';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { IconButton } from '@mui/material';
import Slide from '@mui/material/Slide';
import UserContext from '../../hooks/Context';
import { UserBook } from '../../typings/types';
import NearMeUserBook from './NearMeUserBook/NearMeUserBook';

function HomeNearMe() {
  const userContext = useContext(UserContext);
  const user = userContext?.user;
  const id = user?.id;
  const lat = user?.latitude || 29.9584;
  const lon = user?.longitude || -90.0651;
  const radius = user?.radius || 10;

  const [currentPage, setCurrentPage] = useState(0);
  const [slideDirection, setSlideDirection] = useState<'right' | 'left' | undefined>('left');
  const [userBooks, setUserBooks] = useState([]);
  const userBooksPerPage = 2;

  const getBooks = () => {
    axios.get('/location/locations/home', {
      params: {
        lat,
        lon,
        radius,
        id,
      },
    })
      .then((response) => {
        setUserBooks(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleNextPage = () => {
    setSlideDirection('left');
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setSlideDirection('right');
    setCurrentPage((prevPage) => prevPage - 1);
  };

  useEffect(() => {
    getBooks();
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
        height: '200px',
        paddingBottom: '0',
        marginTop: '4px',
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
      <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
        {userBooks.map((userBook, index) => (
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
            <Slide
              direction={slideDirection}
              in={currentPage === index}
            >
              <Stack
                spacing={2}
                direction="row"
                maxWidth="100%"
                maxHeight="95%"
                alignContent="center"
                justifyContent="center"
              >
                {userBooks
                  .slice(index * userBooksPerPage, index * userBooksPerPage + userBooksPerPage)
                  // eslint-disable-next-line @typescript-eslint/no-shadow
                  .map((userBook: UserBook) => (
                    <Box key={userBook.id}>
                      <NearMeUserBook userBook={userBook} />
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
        disabled={currentPage >= Math.ceil((userBooks.length || 0) / userBooksPerPage) - 1}
      >
        <NavigateNextIcon />
      </IconButton>
    </Box>
  );
}
export default HomeNearMe;
