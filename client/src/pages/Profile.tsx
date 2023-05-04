<<<<<<< HEAD
import { useParams, useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useRef, useContext, } from 'react';
=======
import { useParams } from 'react-router-dom';
import React, {
  useState, useEffect, useRef, useContext,
} from 'react';
>>>>>>> e62027a10d75fe47661da48fe878020f08ba6319
import axios from 'axios';
import {
  Typography, Grid, TextField, Button, Box,
} from '@material-ui/core';
import io from 'socket.io-client';
import Modal from '@mui/material/Modal';
import BookDisplay from '../components/BookDisplay/BookDisplay';
import UserContext from '../hooks/Context';
import NearBy from '../components/NearBy/NearBy';

interface UserBook {
  wishlist: any;
  owned: any;
  Books: Book;
}
interface Book {
  books: {
    id: string;
    title: string;
    author: string;
    image: string;
  }
  id: string;
  wishlist: boolean;
  owned: boolean;
}

interface UserProfile {
  id: string;
  firstName: string;
  picture: string;
  UserBooks: UserBook[];
}

function Profile() {
  const [books, setBooks] = useState<Book[]>([]);
  const [inventory, setInventory] = useState<string>('Owned');
  const [title, setTitle] = useState<string>('');
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [socket, setSocket] = useState<any>(null);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
<<<<<<< HEAD
  const navigate = useNavigate();


  // const chatContext = useContext(ChatContext);
=======
>>>>>>> e62027a10d75fe47661da48fe878020f08ba6319

  const userContext = useContext(UserContext);
  const user = userContext?.user;

  const { id } = user;
  const friendId: string = useParams().id || '';

  const newSocket = io('http://localhost:3000');

  const getProfile = async () => {
<<<<<<< HEAD
    try {
      const response = await axios.get(`/user/id?id=${friendId}`);
      //console.log(response.data)
      setProfile(response.data);
    } catch (error) {
      console.error(error);
=======
    if (friendId !== '') {
      try {
        const response = await axios.get(`/user/id?id=${friendId}`);
        await setProfile(response.data);
      } catch (error) {
        console.error(error);
      }
>>>>>>> e62027a10d75fe47661da48fe878020f08ba6319
    }
  };


  const handleNearMeClick = async () => {
  try {
    const response = await axios.get('/location/locations', { params: { lon: user.longitude, lat: user.latitude, radius: user.radius } });
    const data = await response.data
    navigate('/locations', { state: data });
  } catch (error) {
    console.error(error);
  }
}


  const getUserBooks = (query: string) => {
    const booksArray: Book[] = [];

    if (query == 'Owned') {
      profile?.UserBooks?.forEach((book: UserBook) => {
        if (book.owned) booksArray.push(book.Books);
      });
      setBooks(booksArray);
    }
    if (query == 'Wishlist') {
      profile?.UserBooks?.forEach((book: UserBook) => {
        if (book.wishlist) booksArray.push(book.Books);
      });
      setBooks(booksArray);
    }
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    axios.get(`/bookdata/title/searchOne?title=${title}`).then((response) => { setBooks([response.data]), console.log(response.data); });
    // .then(() => console.log(books))
  };
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const follow = async () => {
    const userId = user.id;
    const userFirstName = user.firstName;

    try {
      newSocket.emit('new-follow', {
        message: `${userFirstName} has followed you`,
      });
      await axios.post('/api/friendship', { userId, friendId });
    } catch (error) {
      console.error(error);
    }
  };

  const ownedClicked = () => {
    getUserBooks('Owned');
    setInventory('Owned');
  };

  const wishClicked = () => {
    getUserBooks('Wishlist');
    setInventory('Wishlist');
  };

  useEffect(() => {
    if (friendId !== '') {
      getProfile();
    } else {
      setProfile(user);
    }
  }, []);

  useEffect(() => {
    if (profile) {
      getUserBooks(inventory);
    }
  }, [profile, inventory]);

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

<<<<<<< HEAD
console.log(user, 168);
=======
>>>>>>> e62027a10d75fe47661da48fe878020f08ba6319
  return (

    <div>

      <div style={{ display: 'flex', justifyContent: 'center', margin: '20px' }}>
        <Grid container>
          <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
            <Typography variant="h4">
              {friendId === '' ? `${user.firstName}'s` : `${profile?.firstName}'s`}
              {' '}
              Books
            </Typography>
            {friendId === '' ? null : (
              <Button variant="contained" color="primary" style={{ margin: '10px' }} onClick={follow}>Follow</Button>)}
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
            { user.latitude > 0 && user.radius > 0 ? (<Button variant="contained" color="primary" style={{ margin: '10px' }} onClick={handleNearMeClick}>Near Me</Button> )
            : (<Button variant="contained" color="primary" style={{ margin: '10px' }} onClick={handleOpen}>Near Me</Button> ) }
            <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
              <Box sx={style}>
                <NearBy />
              </Box>
            </Modal>
          </div>
        </div>

        {friendId === '' ? (

          <div style={{ display: 'flex', justifyContent: 'center' }} />

        ) : null}

        <div style={{ margin: '15px' }}>
          <Typography variant="h5">
            {inventory}
            {' '}
            Books
          </Typography>
        </div>
        <BookDisplay books={books} id={id} />
      </div>

    </div>
  );
}

export default Profile;
