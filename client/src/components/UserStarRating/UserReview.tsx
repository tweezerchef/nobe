import React, { useState } from 'react';
import Button from '@mui/material/Button';
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
}

// eslint-disable-next-line react/function-component-definition
const UserReview: React.FC<UserReviewProps> = ({
  open, handleClose, book, id,
}) => {
  const [review, setReview] = useState('');

  const handleReviewChange = ((event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setReview(event.target.value);
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Add this line to prevent default form submission behavior
    // console.log('review', review);
    axios.post('/review/WrittenReview', { review, book, id }).then(handleClose);
  };

  return (
    <div>
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
    </div>
  );
};
export default UserReview;
