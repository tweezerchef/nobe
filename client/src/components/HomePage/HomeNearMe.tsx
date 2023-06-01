import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Stack from '@mui/joy/Stack';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { IconButton } from '@mui/material';
import Slide from '@mui/material/Slide';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [currentPage, setCurrentPage] = useState(0);
  const [slideDirection, setSlideDirection] = useState<'right' | 'left' | undefined>('left');
  const [userBooks, setUserBooks] = useState([]);
  const [showBigBook, setShowBigBook] = useState(false);
  const [bigBookPosition, setBigBookPosition] = useState({ top: 0, left: 0 });
  const [selectedBook, setSelectedBook] = useState(null);
  const userBooksPerPage = 2;

  const handleBookClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, book: any) => {
    const rect = (e.target as Element).getBoundingClientRect();
    let bigBookWidth = window.innerWidth * 0.75; // This should match your BigBook width style
    let bigBookHeight = window.innerHeight * 0.85; // This should match your BigBook height style

    // Apply maxWidth and maxHeight restrictions
    bigBookWidth = Math.min(bigBookWidth, 665);
    bigBookHeight = Math.min(bigBookHeight, 850);

    // Apply minWidth and minHeight restrictions (values are arbitrary, adjust as needed)
    bigBookWidth = Math.max(bigBookWidth, 200);
    bigBookHeight = Math.max(bigBookHeight, 200);

    let { left } = rect;
    let { top } = rect;

    // If BigBook would overflow the right edge, align it to the right with some padding
    if (window.innerWidth - left < bigBookWidth) {
      left = window.innerWidth - bigBookWidth - 40;
    }

    // If BigBook would overflow the bottom edge, align it to the bottom with some padding
    if (window.innerHeight - top < bigBookHeight) {
      top = window.innerHeight - bigBookHeight - 20;
    }

    setBigBookPosition({ top, left });
    setSelectedBook(book);
    setShowBigBook(true);
  };
  const handleBigBookClose = () => {
    setShowBigBook(false);
  };

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
        height: isMobile ? '80vw' : '18vw',
        maxHeight: isMobile ? '80vw' : '250px',
        marginTop: isMobile ? '.2vh' : '1.5vh',
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
                      <NearMeUserBook
                        userBook={userBook}
                        onClick={handleBookClick}
                        onClose={handleBigBookClose}
                        showBigBook={showBigBook && userBook.Books === selectedBook}
                        bigBookPosition={bigBookPosition}
                      />
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
