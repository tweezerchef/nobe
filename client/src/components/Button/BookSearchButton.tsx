import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/material/Box';
import BigBook from '../Book/BookBig';
import UserContext from '../../hooks/Context';

function BookSearchButton(props: any) {
  const [book, setBooks] = useState<any | null>(null);
  const [title, setTitle] = useState<string>('');
  const [open, setOpen] = React.useState(false);
  const [timeline, setTimeLine] = useState<string>('');
  const [discussionImage, setDiscussionImage] = useState<string>('');
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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await axios.get(`/bookdata/title/searchOne?title=${title}`);
      setBooks(response.data);
      setDiscussionImage(response.data.image);
      handleClose();

      const updatedDiscussion = await axios.put(`/api/clubs/discussions/${discussionId}`, {
        discussionImage,
      });
      // console.log(updatedDiscussion);
    } catch (error) {
      console.error(error);
      // Handle the error here
    }
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  useEffect(() => {
    // console.log(book);
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
          <TextField
            autoFocus
            id="club-name"
            label="Book Title"
            variant="outlined"
            type="string"
            fullWidth
            value={title}
            onChange={handleTitleChange}
            required
          />
          <TextField
            id="book-timeline"
            label="Book Timeline for Readers"
            variant="outlined"
            type="string"
            fullWidth
            value={timeline}
            onChange={(e) => setTimeLine(e.target.value)}
            required
          />
          <Button variant="contained" color="primary" type="submit">
            Add Book
          </Button>
        </Box>
      </Dialog>
      { book
        && (
        <Box mt={2} textAlign="center">
          <img src={book.image} alt={book.title} height="100px" />
          {book.title}
        </Box>
        )}
    </div>
  );
}

export default BookSearchButton;
