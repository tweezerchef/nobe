import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
// import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/material/Box';
import Autocomplete from '@mui/material/Autocomplete';
// import BigBook from '../Book/BookBig';
import UserContext from '../../hooks/Context';

interface OurBooks {
  id: string;
  title: string;
}

function BookSearchButton(props: any) {
  const [book, setBooks] = useState<any | null>(null);
  // const [title, setTitle] = useState<string>('');
  const [open, setOpen] = React.useState(false);
  const [discussionImage, setDiscussionImage] = useState<string>('');
  // console.log(discussionImage);
  const [discussion, setDiscussion] = useState<string>('');
  const [ourBooks, setOurBooks] = useState<OurBooks[]>([]);
  const [selectedBook, setSelectedBook] = useState<OurBooks | null>(null);
  const { isDiscussionCreator, discussionId } = props;

  const userContext = useContext(UserContext);
  const user = userContext?.user;
  const userId = user?.id;

  const handleClickOpen = () => {
    setOpen(true);
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
        console.log(bookData);
        setBooks(bookData);
        setDiscussionImage(bookData[0].image);

        const updatedDiscussion = await axios.put(
          `/api/clubs/discussions/${discussionId}`,
          {
            discussionImage,
          },
        );
        handleClose();
      }
    } catch (error) {
      console.error(error);
    }
  };

  // const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setTitle(event.target.value);
  // };

  async function fetchImage() {
    const response = await axios.get(`/api/clubs/discussions/${discussionId}`);
    // console.log(response);
    setDiscussionImage(response.data.image);
  }

  useEffect(() => {
    // console.log(book);
    if (discussionId) {
      fetchImage();
    }
    getOurBooks();
  }, [book]);

  return (
    <div>
      {isDiscussionCreator && (
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Add a Book
      </Button>
      )}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Add a Book</DialogTitle>
        <Box
          component="form"
          sx={{
            margin: '20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            '& > :not(style)': { m: 1 },
            justifyContent: 'center',
          }}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <Autocomplete
            id="book-title"
            options={ourBooks}
            getOptionLabel={(option) => option.title}
            value={selectedBook}
            onChange={(event, newValue) => setSelectedBook(newValue)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Book Title"
                variant="outlined"
                fullWidth
                required
              />
            )}
          />
          <Button variant="contained" color="primary" type="submit">
            Add Book
          </Button>
        </Box>
      </Dialog>
      {selectedBook && discussionImage && (
      <Box mt={2} textAlign="center">
        <img
          alt={selectedBook.title}
          title={`Discussion image for ${selectedBook.title}`}
          src={discussionImage}
          height="100px"
        />
        {selectedBook.title}
      </Box>
      )}
    </div>
  );
}

export default BookSearchButton;
