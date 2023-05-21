import React, {
  useState, useEffect, ChangeEvent, FormEvent,
} from 'react';
import axios from 'axios';
import Stack from '@mui/joy/Stack';
import Divider from '@mui/material/Divider';
import Chip from '@mui/joy/Chip';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import Box from '@mui/material/Box';
import { IconButton } from '@mui/material';
import Slide from '@mui/material/Slide';
import TextField from '@mui/material/TextField';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import InputAdornment from '@mui/material/InputAdornment';
import Book from '../Book/HomeBook';

function HomeBuildRecomendations() {
  const [currentPage, setCurrentPage] = useState(0);
  const [slideDirection, setSlideDirection] = useState<'right' | 'left' | undefined>('left');
  const [books, setBooks] = useState<Book[]>([]);
  const [searchText, setSearchText] = useState('');

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
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const handleSearch = (event: FormEvent) => {
    event.preventDefault(); // Prevent form submission
    axios.get(`/bookdata/title/searchOne?title=${searchText}`).then((res) => {
      setBooks((prevBooks) => [...[res.data], ...prevBooks]);
    });
    // Here you would typically call your search function with `searchText` as argument
    // performSearch(searchText);
  };

  const getRecommendations = () => {
    axios.get('/recommendations/random').then((res) => setBooks(res.data));
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

  useEffect(() => {
    // getRecommendations();
  }, []);

  return (
    <Box>
      <Divider textAlign="right">
        <Box
          component="form"
          onSubmit={handleSearch}
          sx={{
            '& > :not(style)': { m: 1, width: '350px' },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="Search"
            onChange={handleInputChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconButton onClick={handleSearch}>
                    <SearchOutlinedIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'black',
                  borderRadius: 6,
                  width: '350px',
                },
                '& input': {
                  width: '100%', // Adjust these values as needed
                  color: 'black',
                },
              },
            }}
          />
        </Box>
      </Divider>

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
            margin: 5, marginRight: 10, padding: 0, alignSelf: 'center', justifySelf: 'start',

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
              <Slide direction={slideDirection} in={currentPage === index}>
                <Stack
                  spacing={2}
                  direction="row"
                  maxWidth="100%"
                  maxHeight="100%"
                  alignContent="center"
                  justifyContent="center"
                >
                  {books
                    .slice(
                      index * booksPerPage,
                      index * booksPerPage + booksPerPage,
                    )
                  // eslint-disable-next-line @typescript-eslint/no-shadow
                    .map((book: Book) => (
                      <Box>
                        <Book book={book} />
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
            margin: 5, marginLeft: 10, padding: 0, alignSelf: 'center', justifySelf: 'end',
          }}
          disabled={currentPage >= Math.ceil((books.length || 0) / booksPerPage) - 1}
        >
          <NavigateNextIcon />
        </IconButton>
      </Box>
    </Box>
  );
}
export default HomeBuildRecomendations;
