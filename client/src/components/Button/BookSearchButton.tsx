import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import Autocomplete from '@mui/material/Autocomplete';
// import BigBook from '../Book/BookBig';

interface OurBooks {
  id: string;
  title: string;
  image: string;
}

function BookSearchButton(props: any) {
  const [book, setBooks] = useState<any | null>(null);
  // const [title, setTitle] = useState<string>('');
  const [open, setOpen] = React.useState(false);
  const [ourBooks, setOurBooks] = useState<OurBooks[]>([]);
  const [selectedBook, setSelectedBook] = useState<OurBooks | null>(null);
  const {
    isDiscussionCreator, discussionId, discussionImage, setDiscussionImage,
  } = props;

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
        // console.log(bookData);
        setBooks(bookData);
        const updatedDiscussion = await axios.put(
          `/api/clubs/discussions/${discussionId}`,
          {
            discussionImage: bookData[0].image,
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
            fullWidth
            options={ourBooks}
            getOptionLabel={(option) => option.title}
            value={selectedBook}
            onChange={(event, newValue) => setSelectedBook(newValue)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Book Title"
                variant="outlined"
                required
              />
            )}
          />
          {selectedBook && (
          <>
            <div>Book Cover:</div>
            <img alt="" src={selectedBook?.image} />
            <Button variant="contained" color="primary" type="submit">
              Add Book
            </Button>

          </>
          )}
        </Box>
      </Dialog>
    </div>
  );
}

export default BookSearchButton;
