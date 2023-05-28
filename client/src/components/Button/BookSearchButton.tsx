import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
// import Box from '@mui/material/Box';
import Autocomplete from '@mui/material/Autocomplete';
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

function BookSearchButton(props: any) {
  const [open, setOpen] = React.useState(false);
  const [ourBooks, setOurBooks] = useState<OurBooks[]>([]);
  const [selectedBook, setSelectedBook] = useState<OurBooks | null>(null);
  const {
    isDiscussionCreator, discussionId, discussionImage, setDiscussionImage, clubId, setBookTitle,
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
        setBookTitle(bookTitle);
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

export default BookSearchButton;
