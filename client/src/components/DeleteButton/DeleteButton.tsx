import * as React from 'react';
import Box from '@mui/material/Box';
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import axios from 'axios';

const DeleteButton = (props: any) => {
  const { userBook, id, getUserBooks, setUserBooks, inventory } = props;
  console.log(userBook)
  const handleDeleteClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    axios.delete(`/user-books/${id}`, {
      data: {
        bookId: userBook.books.id,
      },
    })
      .then(response => {
        //console.log('Book removed');
        getUserBooks(inventory);
        setUserBooks((prevUserBooks: any) => prevUserBooks.filter((b: any) => b.id !== userBook.books.id));
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