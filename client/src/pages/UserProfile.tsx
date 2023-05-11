import { useNavigate } from 'react-router-dom';
import React, {
  useState, useEffect,
  useContext,
} from 'react';
import axios from 'axios';
import {
  Typography, Grid, TextField, Button, Box,
} from '@material-ui/core';

import Modal from '@mui/material/Modal';
import BookDisplay from '../components/BookDisplay/BookDisplay';
import UserContext from '../hooks/Context';
import NearBy from '../components/NearBy/NearBy';
import { Book, UserBook } from '../typings/types';

function UsersProfile() {
  const [books, setBooks] = useState<Book[]>([]);
  const [inventory, setInventory] = useState<string>('Owned');
  const [title, setTitle] = useState<string>('');
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();

  // const chatContext = useContext(ChatContext);

  const userContext = useContext(UserContext);
  const user = userContext?.user;
  const id = user?.id;

  const handleNearMeClick = async () => {
    try {
    // eslint-disable-next-line max-len
      const response = await axios.get('/location/locations', { params: { lon: user?.longitude, lat: user?.latitude, radius: user?.radius } });
      // console.log(response);
      const data = await response.data;
      navigate('/locations', { state: data });
    } catch (error) {
      console.error(error);
    }
  };

  const getUserBooks = async (query: string) => {
    setIsLoading(true);
    const booksArray: Book[] = [];

    if (query === 'Owned') {
      const userBooks = await axios.get(`/user-books/owned/${id}`);
      userBooks.data.forEach((book: UserBook) => {
        booksArray.push(book.Books);
      });
      setBooks(booksArray);
    }
    if (query === 'Wishlist') {
      const userBooks = await axios.get(`/user-books/wishlist/${id}`);
      userBooks.data.forEach((book: UserBook) => {
        booksArray.push(book.Books);
      });
      setBooks(booksArray);
    }
    setIsLoading(false);
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions, no-console, no-sequences
    axios.get(`/bookdata/title/searchOne?title=${title}`).then((response) => { setBooks([response.data]); });
  };
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const ownedClicked = () => {
    getUserBooks('Owned');
    setInventory('Owned');
  };

  const wishClicked = () => {
    getUserBooks('Wishlist');
    setInventory('Wishlist');
  };

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  useEffect(() => {
    getUserBooks(inventory);
  }, []);

  // console.log(user, 168);
  return (

    <div>

      <div style={{ display: 'flex', justifyContent: 'center', margin: '20px' }}>
        <Grid container>
          <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
            <Typography variant="h4">
              {user?.firstName}
              's
              {' '}
              Books
            </Typography>
          </Grid>
        </Grid>

      </div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{
          display: 'flex', justifyContent: 'center', width: '100%', background: '#002884',
        }}
        >
          <div style={{
            display: 'flex', justifyContent: 'center', maxWidth: '800px', width: '100%',
          }}
          >
            <Button variant="contained" style={{ margin: '10px' }} color="primary" type="submit">Book Search</Button>
            <form onSubmit={handleSubmit}>
              <TextField
                label="Book Title"
                value={title}
                onChange={handleTitleChange}
                fullWidth
              />

            </form>
            <Button variant="contained" color="primary" style={{ margin: '10px' }} onClick={ownedClicked}>Owned</Button>
            <Button variant="contained" color="primary" style={{ margin: '10px' }} onClick={wishClicked}>WishList</Button>
            {user?.radius && user?.latitude && user?.latitude > 0 && user?.radius > 0 ? (<Button variant="contained" color="primary" style={{ margin: '10px' }} onClick={handleNearMeClick}>Near Me</Button>)
              : (<Button variant="contained" color="primary" style={{ margin: '10px' }} onClick={handleOpen}>Near Me</Button>)}
            <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
              <Box sx={style}>
                <NearBy />
              </Box>
            </Modal>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }} />
        <div style={{ margin: '15px' }}>
          <Typography variant="h5">
            {inventory}
            {' '}
            Books
          </Typography>
        </div>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <BookDisplay books={books} id={id} />
        )}
      </div>
    </div>

  );
}

export default UsersProfile;
