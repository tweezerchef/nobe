import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid, Card, CardMedia, CardContent, FormControl, TextField, Checkbox, FormControlLabel, Button } from '@material-ui/core';
import ResponsiveAppBar from '../components/Navbar/ResponsiveAppBar';
import BookDisplay from '../components/MattsBookDisplay/BookDisplay';
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

// interface Books {
//   books: {
//     id: string;
//     title: string;
//     author: string;
//     image: string;
//   }
// }

const Profile = () => {

  //const classes = useStyles();
  const [userBooks, setUserBooks] = useState<Book[]>([]);
  const [wishlist, setWishlist] = useState<boolean>(false);
  const [owned, setOwned] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [books, setBooks] = useState<any[]>([]);
  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;

  const getUserBooks = async () => {
    try {
      const res = await axios.get(`/books/${user.id}`);
      setUserBooks(res.data);
    } catch (err) {
      console.error(err);
    }
  }
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleWishlistChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWishlist(event.target.checked);
    if (event.target.checked) {
      setOwned(false);
    }
  };

  const handleOwnedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOwned(event.target.checked);
    if (event.target.checked) {
      setWishlist(false);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await axios.post(`/books/${user.id}`,
        {
          title,
          wishlist,
          owned
        }
      );
      setTitle("");
      setWishlist(false);
      setOwned(false);
      getUserBooks();
    } catch (error) {
      console.error(error);
    }
  };

  const ownedBooks = userBooks.filter(book => book.owned).map((book) => book.books);
  const ownedClicked = (event: React.MouseEvent<HTMLButtonElement>) => {
    setBooks(ownedBooks)
  }

  const wishlistBooks = userBooks.filter(book => book.wishlist).map((book) => book.books);
  const wishClicked = (event: React.MouseEvent<HTMLButtonElement>) => {
    setBooks(wishlistBooks)
  }


  useEffect(() => {
    getUserBooks();
  }, [])

  return (
    <div >
      <ResponsiveAppBar />
      <div style={{ display: "flex", justifyContent: "center", margin: "20px" }}>
        <Typography variant="h4">{`${user.firstName}'s`} Books</Typography>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <form onSubmit={handleSubmit} >
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12}>
              <TextField
                label="Book Title"
                value={title}
                onChange={handleTitleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={2} alignItems="center">
                <Grid item>
                  <Checkbox checked={wishlist} onChange={handleWishlistChange} />
                </Grid>
                <Grid item>
                  Add to Wishlist
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={2} alignItems="center">
                <Grid item>
                  <Checkbox checked={owned} onChange={handleOwnedChange} />
                </Grid>
                <Grid item>
                  Add to Owned Books
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" type="submit">
                Add Book
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%', background: 'rgb(32, 32, 35)', marginTop: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'center', maxWidth: '800px', width: '100%' }}>
            <Button variant="contained" color="primary" style={{ margin: '10px' }} onClick={wishClicked}>WishList</Button>
            <Button variant="contained" color="primary" style={{ margin: '10px' }} onClick={ownedClicked}>Owned</Button>
          </div>
        </div>
        <div style={{ margin: '15px' }}>
          <Typography variant="h5">Books</Typography>
        </div>
        {books.length > 0 ?
          <BookDisplay books={books} id={user.id} getUserBooks={getUserBooks} setBooks={setBooks} /> :
          <Typography variant="body1">No books</Typography>
        }
      </div>
    </div>
  );


}

export default Profile;
