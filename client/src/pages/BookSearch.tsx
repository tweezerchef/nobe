import React, { useState, useContext } from 'react';
import axios from 'axios';
import { TextField, Button } from '@material-ui/core';
import Box from '@mui/material/Box';
import BigBook from '../components/Book/BookBig';
import UserContext from '../hooks/Context';

function BookPage() {
  const userContext = useContext(UserContext);
  const user = userContext?.user;
  const id = user?.id;
  const [book, setBooks] = useState<any | null>(null);
  const [title, setTitle] = useState<string>('');
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    axios.get(`/bookdata/title/searchOne?title=${title}`).then((response) => { setBooks(response.data); });
    // .then(() => console.log(books))
  };
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  return (
    <>
      <Box
        paddingTop={2}
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        minHeight="10vh"
      >
        <h1>Search For A Book</h1>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Book Title"
            value={title}
            onChange={handleTitleChange}
            fullWidth
          />
          <Button type="submit">Submit</Button>
        </form>
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="70vh"
      >
        <div>
          {book && <BigBook book={book} id={id} />}
          {/* {books.length > 0 && <BigBook book={books[0]} id={id} />} */}
          {/* <QuoteDisplay /> */}
        </div>
      </Box>
    </>

  );
}

export default BookPage;
