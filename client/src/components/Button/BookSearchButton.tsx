import React, { useState, useContext } from 'react';
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
  const { isDiscussionCreator } = props;

  const userContext = useContext(UserContext);
  const user = userContext?.user;
  const id = user?.id;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    axios.get(`/bookdata/title/searchOne?title=${title}`).then((response) => { setBooks(response.data); });
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

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
        >
          <form onSubmit={handleSubmit}>
            <TextField
              autoFocus
              id="club-name"
              label="Book Title"
              variant="outlined"
              type="string"
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
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
              Create Club
            </Button>
          </form>
        </Box>
      </Dialog>
    </div>
  );
}

export default BookSearchButton;
