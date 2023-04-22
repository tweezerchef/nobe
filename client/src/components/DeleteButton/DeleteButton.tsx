import * as React from 'react';
import Box from '@mui/material/Box';
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import axios from 'axios';

const DeleteButton = (props: any) => {
  const { book, id, getUserBooks } = props;
  console.log(book);
  const handleDeleteClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    // Make an API call to update the rating on the server
    axios.delete(`/books/${id}`, {
      data: {
        bookId: book.id,
      },
    })
      .then(response => {
        console.log('Book removed');
        getUserBooks()
      })
      .catch(error => {
        console.error('Book not removed:', error);
      });
  };

  return (
    <Box
      sx={{
        position: 'absolute',
        right: 0,
        mr: 1,
        '& > legend': { mt: 2 },
      }}
    >
      <Typography sx={{ fontSize: 'md' }} component="legend"></Typography>
      <IconButton onClick={handleDeleteClick} sx={{ p: 0 }}>
        <ClearIcon name="simple-controlled" />
      </IconButton>
    </Box>
  );
}

export default DeleteButton;