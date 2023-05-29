import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import axios from 'axios';

interface UserReviewProps {
  open: boolean;
  handleClose: () => void;
  book: any;
  id: any;
  setUserBooks: React.Dispatch<React.SetStateAction<any[]>>;
}

// eslint-disable-next-line react/function-component-definition
const UserReview: React.FC<UserReviewProps> = ({
  open, handleClose, book, id, setUserBooks,
}) => {
  const [review, setReview] = useState('');

  const handleReviewChange = ((event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setReview(event.target.value);
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    axios.post('/review/review', { review, book, id })
      .then((res) => {
      // Ensure that res.data is indeed a UserBook
        setUserBooks((prevUserBooks: any[]) => {
          if (!prevUserBooks || prevUserBooks.length === 0) {
            return [res.data];
          }
          return [res.data, ...prevUserBooks];
        });
      })
      .then(handleClose)
      .catch((error) => {
        console.error('Failed to add review:', error);
      });
  };

  return (
    <Box>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        {' '}
        {/* Adjust maxWidth as per need */}
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <DialogContentText>Add Your Written Review</DialogContentText>
            <TextField
              autoFocus
              id="name"
              label="Review"
              type="Review"
              variant="standard"
              onChange={handleReviewChange}
              fullWidth
              multiline // allows multiple lines of input
              rows={5}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Add Review</Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};
export default UserReview;
