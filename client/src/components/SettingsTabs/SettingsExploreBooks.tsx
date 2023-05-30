/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {
  useState, useEffect, useContext,
} from 'react';
import axios from 'axios';
import Stack from '@mui/joy/Stack';
import Divider from '@mui/material/Divider';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import Box from '@mui/material/Box';
import { IconButton } from '@mui/material';
import Slide from '@mui/material/Slide';
import TextField from '@mui/material/TextField';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import InputAdornment from '@mui/material/InputAdornment';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Book from '../Book/HomeBook';
import MaxWidthDiv from '../../hooks/MaxWidth';
import UserContext from '../../hooks/Context';

interface SettingsExploreBooksProps {
  ourBooks: OurBooks[];
  nearMeBooks: string[];
}
interface OurBooks {
  id: string;
  title: string;
}

function SettingsExploreBooks() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [currentPage, setCurrentPage] = useState(0);
  const [slideDirection, setSlideDirection] = useState<'right' | 'left' | undefined>('left');
  const [books, setBooks] = useState<Book[]>([]);
  const [searchText, setSearchText] = useState('');
  const [showBigBook, setShowBigBook] = useState(false);
  const [bigBookPosition, setBigBookPosition] = useState({ top: 0, left: 0 });
  const [selectedBook, setSelectedBook] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [nearMeBooks, setNearMeBooks] = useState<string[]>([]);
  const [ourBooks, setOurBooks] = useState<OurBooks[]>([]);

  const userContext = useContext(UserContext);
  const user = userContext?.user;
  const userId = user?.id;

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

  const getNearMeBooks = async () => {
    // Get user's latitude, longitude, and radius from the user object
    if (!user) return;
    const { latitude, longitude, radius } = user;

    // Make the request to fetch nearMeBooks with query parameters
    const response = await axios.get('/location/locations/login', {
      params: {
        lat: latitude,
        lon: longitude,
        radius,
      },
    });

    setNearMeBooks(response.data);
  };
  const getOurBooks = async () => {
    axios.get('/bookdata/titles')
      .then((response) => {
        setOurBooks(response.data);
      });
  };

  useEffect(() => {
    getNearMeBooks();
    getOurBooks();
  }, []);

  const handleSearch = async (id: string) => {
    setLoading(true);
    try {
      const res = await axios.get(`/bookdata/id?id=${id}`);
      setBooks((prevBooks) => [...[res.data], ...prevBooks]);
      setCurrentPage(0);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchOnBlur = async () => {
    setLoading(true);
    try {
      if (searchText === '') {
        const res = await axios.get(`/google-books/?title=${inputValue}`);
        setBooks((prevBooks) => [...res.data, ...prevBooks]);
        setCurrentPage(0);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
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
    getRecommendations();
  }, []);

  return (
    <MaxWidthDiv>
      <Box>
        <Divider textAlign="right">
          <Box
            component="form"
            onSubmit={(event) => {
              event.preventDefault(); // Prevent form submission
            }}
            sx={{
              '& > :not(style)': { m: 1, width: '350px' },
            }}
            noValidate
            autoComplete="off"
          >
            <Autocomplete
              id="combo-box-demo"
              options={ourBooks}
              getOptionLabel={(option: OurBooks) => (option.title)}
              sx={{ width: 350 }}
              disablePortal
              onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
              }}
              onChange={(event: any, newValue: OurBooks | null) => {
                setLoading(true); // set loading before request
                if (newValue) {
                  setSearchText(newValue.id);
                  handleSearch(newValue.id);
                } else {
                  setSearchText('');
                }
              }}
              onBlur={() => {
                setLoading(true); // set loading before request
                handleSearchOnBlur();
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  id="Search"
                  label="Search for a book"
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: (
                      <InputAdornment position="start">
                        <IconButton type="submit" onClick={() => setLoading(true)}>
                          {!loading && <SearchOutlinedIcon />}
                        </IconButton>
                        {loading && <CircularProgress size={20} />}
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
              )}
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
            height: isMobile ? '80vw' : '20vw',
            maxHeight: isMobile ? '80vw' : '370px',
            marginTop: isMobile ? '.2vh' : '1.5vh',
            paddingBottom: '0',
          }}
        >
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
              padding: 0, alignSelf: 'center', justifyContent: 'flex-end',
            }}
            disabled={currentPage >= Math.ceil((books.length || 0) / booksPerPage) - 1}
          >
            <NavigateNextIcon />
          </IconButton>
        </Box>
      </Box>
    </MaxWidthDiv>
  );
}
export default SettingsExploreBooks;
