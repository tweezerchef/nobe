/* eslint-disable @typescript-eslint/no-redeclare */
import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import Stack from '@mui/joy/Stack';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import Box from '@mui/material/Box';
import { IconButton } from '@mui/material';
import Slide from '@mui/material/Slide';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import UserContext from '../../hooks/Context';
import { UserBook } from '../../typings/types';
import Book from '../Book/HomeBook';
import MaxWidthDiv from '../../hooks/MaxWidth';

interface HomeWishListProps {
  nearMeBooks: string[];
}

function HomeLendingLibrary({ nearMeBooks }: HomeWishListProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const userContext = useContext(UserContext);
  const user = userContext?.user;
  const id = user?.id;
  const [books, setBooks] = useState<Book[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [showBigBook, setShowBigBook] = useState(false);
  const [bigBookPosition, setBigBookPosition] = useState({ top: 0, left: 0 });
  const [selectedBook, setSelectedBook] = useState(null);
  const [slideDirection, setSlideDirection] = useState<'right' | 'left' | undefined>('left');

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

  const booksPerPage = 4;

  const handleNextPage = () => {
    setSlideDirection('left');
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setSlideDirection('right');
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const getUserBooks = async () => {
    const booksArray: Book[] = [];

    const userBooks = await axios.get(`/user-books/wishlist/${id}`);
    userBooks.data.forEach((book: UserBook) => {
      booksArray.push(book.Books);
    });
    setBooks(booksArray);
  };

  useEffect(() => {
    getUserBooks();
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
          height: isMobile ? '80vw' : '20vw',
          maxHeight: isMobile ? '80vw' : '370px',
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
            {books.map((book: Book) => (
              <Box key={book.id}>
                <Book
                  book={book}
                  onClick={handleBookClick}
                  onClose={handleBigBookClose}
                  showBigBook={showBigBook && book === selectedBook}
                  bigBookPosition={bigBookPosition}
                  nearMeBooks={nearMeBooks}
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
              {books.map((book, index) => (
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
                      {books
                        .slice(index * booksPerPage, index * booksPerPage + booksPerPage)
                        .map((book: Book) => (
                          <Box key={book.id}>
                            <Book
                              book={book}
                              onClick={handleBookClick}
                              onClose={handleBigBookClose}
                              showBigBook={showBigBook && book === selectedBook}
                              bigBookPosition={bigBookPosition}
                              nearMeBooks={nearMeBooks}
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
                marginLeft: 10, marginRight: 1, padding: 0, alignSelf: 'center', justifySelf: 'end',
              }}
              disabled={currentPage >= Math.ceil((books.length || 0) / booksPerPage) - 1}
            >
              <NavigateNextIcon />
            </IconButton>
          </>
        )}
      </Box>
    </MaxWidthDiv>
  );
}

export default HomeLendingLibrary;
