/* eslint-disable @typescript-eslint/no-redeclare */
import React, {
  useState, useEffect, ReactNode,
} from 'react';
import Stack from '@mui/joy/Stack';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import Box from '@mui/material/Box';
import { IconButton } from '@mui/material';
import Slide from '@mui/material/Slide';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import MaxWidthDiv from '../../hooks/MaxWidth';
import TrendingCard from './TrendingCard/TrendingCard';

interface Book {
  rank: any;
  weeks_on_list: ReactNode;
  rank_last_week: any;
  book_image: string;
  title: string;
  author: string;
  primary_isbn10: string;
}

function HomeTrending() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [trending, setTrending] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [slideDirection, setSlideDirection] = useState<'right' | 'left' | undefined>('left');
  const [loading, setLoading] = useState(true);

  const booksPerPage = 3;

  const handleNextPage = () => {
    setSlideDirection('left');
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setSlideDirection('right');
    setCurrentPage((prevPage) => prevPage - 1);
  };

  async function fetchTrending(category: string) {
    const localStorageData = localStorage.getItem('trendingBooks');
    const localStorageTimestamp = localStorage.getItem('trendingBooksTimestamp');
    const currentTime = new Date().getTime();
    if (
      localStorageData
      && localStorageTimestamp
      && currentTime - parseInt(localStorageTimestamp, 10) < 10 * 60 * 60 * 1000
    ) {
      // Data exists in local storage and it's within the 10-minute threshold
      setTrending(JSON.parse(localStorageData));
      setLoading(false);
    } else {
      const response = await fetch(`/api/trending?category=${category}`);
      const data = await response.json();
      setTrending(data.results.books);
      setLoading(false);
      localStorage.setItem('trendingBooks', JSON.stringify(data.results.books));
      localStorage.setItem('trendingBooksTimestamp', currentTime.toString());
    }
  }

  useEffect(() => {
    fetchTrending('mass-market-monthly');
  }, []);

  return (
    <MaxWidthDiv>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          alignContent: 'center',
          justifyContent: 'center',
          width: '100%',
          height: isMobile ? '80vw' : '23vw',
          maxHeight: isMobile ? '80vw' : '360px',
          marginTop: isMobile ? '.2vh' : '1.5vh',
          paddingBottom: '0',
        }}
      >
        {isMobile ? (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              overflowX: 'scroll',
              width: '100%',
              height: '30vh',
              '&::-webkit-scrollbar': {
                display: 'none',
              },
              msOverflowStyle: 'none',
            }}
          >
            {trending.map((book: Book) => (
              <Box key={book.primary_isbn10}>
                <TrendingCard
                  book={book}
                />
              </Box>
            ))}
          </Box>
        ) : (
          <>
            <IconButton
              onClick={handlePrevPage}
              sx={{
                marginRight: 10, padding: 0, alignSelf: 'center', justifySelf: 'start',
              }}
              disabled={currentPage === 0}
            >
              <NavigateBeforeIcon />
            </IconButton>

            <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
              {trending.map((book, index) => (
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
                      maxHeight="100%"
                      alignContent="center"
                      justifyContent="center"
                    >
                      {trending
                        .slice(index * booksPerPage, index * booksPerPage + booksPerPage)
                        // eslint-disable-next-line @typescript-eslint/no-shadow
                        .map((book: Book) => (
                          <Box key={book.primary_isbn10}>
                            <TrendingCard key={book.primary_isbn10} book={book} />
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
                marginLeft: 10, marginRight: 1, padding: 0, alignSelf: 'center', justifySelf: 'end',
              }}
              disabled={currentPage >= Math.ceil((trending.length || 0) / booksPerPage) - 1}
            >
              <NavigateNextIcon />
            </IconButton>
          </>
        )}
      </Box>
    </MaxWidthDiv>
  );
}

export default HomeTrending;
