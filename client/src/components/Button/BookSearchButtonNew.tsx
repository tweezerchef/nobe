import React, {
  useState, useEffect, useContext,
} from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import { IconButton } from '@mui/material';
import TextField from '@mui/material/TextField';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import InputAdornment from '@mui/material/InputAdornment';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@material-ui/core/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Book from '../Book/HomeBook';
import UserContext from '../../hooks/Context';

interface OurBooks {
  id: string;
  title: string;
  image: string;
}

interface Club {
  clubId: string;
  name: string;
  description: string;
  image: string;
  clubMembers: string[];
}

function BookSearchButtonNew(props: any) {
  const [books, setBooks] = useState<Book[]>([]);
  const [searchText, setSearchText] = useState('');
  const [selectedBook, setSelectedBook] = useState<OurBooks | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [ourBooks, setOurBooks] = useState<OurBooks[]>([]);
  //   const [showBigBook, setShowBigBook] = useState(false);
  //   const [bigBookPosition, setBigBookPosition] = useState({ top: 0, left: 0 });

  const {
    isDiscussionCreator, discussionId, discussionImage, setDiscussionImage, clubId,
  } = props;

  const userContext = useContext(UserContext);
  const user = userContext?.user;

  const member = user?.clubMembers?.reduce((acc: boolean, club: Club) => {
    if (club.clubId === clubId) {
      acc = true;
      return acc;
    }
    return acc;
  }, false);

  //   const handleBookClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, book: any) => {
  //     const rect = (e.target as Element).getBoundingClientRect();
  //     let bigBookWidth = window.innerWidth * 0.75; // This should match your BigBook width style
  //     let bigBookHeight = window.innerHeight * 0.85;

  //     // Apply maxWidth and maxHeight restrictions
  //     bigBookWidth = Math.min(bigBookWidth, 665);
  //     bigBookHeight = Math.min(bigBookHeight, 850);

  //     // Apply minWidth and minHeight restrictions (values are arbitrary, adjust as needed)
  //     bigBookWidth = Math.max(bigBookWidth, 200);
  //     bigBookHeight = Math.max(bigBookHeight, 200);

  //     let { left } = rect;
  //     let { top } = rect;

  //     // If BigBook would overflow the right edge, align it to the right with some padding
  //     if (window.innerWidth - left < bigBookWidth) {
  //       left = window.innerWidth - bigBookWidth - 40;
  //     }

  //     // If BigBook would overflow the bottom edge, align it to the bottom with some padding
  //     if (window.innerHeight - top < bigBookHeight) {
  //       top = window.innerHeight - bigBookHeight - 20;
  //     }

  //     setBigBookPosition({ top, left });
  //     setSelectedBook(book);
  //     setShowBigBook(true);
  //   };
  //   const handleBigBookClose = () => {
  //     setShowBigBook(false);
  //   };

  const handleClickOpen = () => {
    setOpen(true);
    setSelectedBook(null);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getOurBooks = async () => {
    axios.get('/bookdata/titles')
      .then((response) => {
        // console.log(response.data);
        setOurBooks(response.data);
      });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      if (selectedBook) {
        const response = await axios.get(
          `/bookdata/title/searchOne?title=${selectedBook.title}`,
        );
        const bookData = response.data;
        const bookTitle = selectedBook.title;
        const updatedDiscussion = await axios.put(
          `/api/clubs/discussions/${discussionId}`,
          {
            image: bookData[0].image,
            bookTitle,
          },
        );
        setDiscussionImage(updatedDiscussion.data.image);
        handleClose();
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (discussionImage) {
      setDiscussionImage(discussionImage);
    }
    getOurBooks();
  }, [discussionId, discussionImage]);

  // TOM
  const handleSearch = async (id: string) => {
    setLoading(true);
    try {
      const res = await axios.get(`/bookdata/id?id=${id}`);
      setBooks((prevBooks) => [...[res.data], ...prevBooks]);
    //   setCurrentPage(0);
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
        // setCurrentPage(0);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  //   const getRecommendations = () => {
  //     axios.get('/recommendations/random').then((res) => setBooks(res.data));
  //   };
  //   const booksPerPage = 4;

  //   const handleNextPage = () => {
  //     setSlideDirection('left');
  //     setCurrentPage((prevPage) => prevPage + 1);
  //   };

  //   const handlePrevPage = () => {
  //     setSlideDirection('right');
  //     setCurrentPage((prevPage) => prevPage - 1);
  //   };

  //   useEffect(() => {
  //     getRecommendations();
  //   }, []);

  return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: '15px', paddingBottom: '40px',
    }}
    >
      {isDiscussionCreator && member && (
        <Button variant="contained" color="primary" onClick={handleClickOpen}>
          Add a Book
        </Button>
      )}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Add a Book</DialogTitle>
        <form onSubmit={handleSubmit}>
          <div style={{
            margin: '20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
          >
            <Box>
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
            </Box>
            {selectedBook && (
            <>
              <div>Book Cover:</div>
              <img alt="" src={selectedBook?.image} />
            </>
            )}
          </div>
          <DialogActions>
            <Button onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit">
              Add Book
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

export default BookSearchButtonNew;
