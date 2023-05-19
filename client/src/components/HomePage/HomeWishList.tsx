import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import Stack from '@mui/joy/Stack';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import Box from '@mui/material/Box';
import { IconButton } from '@mui/material';
import Slide from '@mui/material/Slide';
import UserContext from '../../hooks/Context';
import { UserBook } from '../../typings/types';
import Book from '../Book/HomeBook';

interface Book {
  books: {
    id: string;
    title: string;
    author: string;
    image: string;
  }
  id: string;
  wishlist: boolean;
  owned: boolean;
}

function HomeWishList() {
  const userContext = useContext(UserContext);
  const user = userContext?.user;
  const id = user?.id;
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [slideDirection, setSlideDirection] = useState<'right' | 'left' | undefined>('left');

  const reviewsPerPage = 4;

  const handleNextPage = () => {
    setSlideDirection('left');
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setSlideDirection('right');
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const getUserBooks = async () => {
    setIsLoading(true);
    const booksArray: Book[] = [];

    const userBooks = await axios.get(`/user-books/wishlist/${id}`);
    userBooks.data.forEach((book: UserBook) => {
      booksArray.push(book.Books);
    });
    setBooks(booksArray);

    setIsLoading(false);
  };

  useEffect(() => {
    getUserBooks();
  }, []);

  return (
    <Box maxWidth="100%" maxHeight="90%" overflow="contain" alignContent="center" alignItems="center" position="static">
      {books && books.length && (
        <IconButton onClick={handlePrevPage} disabled={currentPage === 0}>
          <NavigateBeforeIcon />
        </IconButton>
      )}

      {[...Array(Math.ceil(books.length / reviewsPerPage))].map((_, index) => (
        <Box sx={{ overflow: 'hidden', width: '100%', height: '100%' }}>
          <Slide direction={slideDirection} in={currentPage === index} mountOnEnter unmountOnExit>
            <Stack spacing={2} direction="row" maxWidth="100%" maxHeight="95%" alignContent="center">
              {books
                .slice(
                  index * reviewsPerPage,
                  index * reviewsPerPage + reviewsPerPage,
                )
                .map((book: Book) => (
                  <Box key={book.id}>
                    <Book book={book} />
                  </Box>
                ))}
            </Stack>
          </Slide>
        </Box>

      ))}

      <IconButton
        onClick={handleNextPage}
        disabled={currentPage >= Math.ceil((books.length || 0) / reviewsPerPage) - 1}
      >
        <NavigateNextIcon />
      </IconButton>
    </Box>
  );
}

export default HomeWishList;
