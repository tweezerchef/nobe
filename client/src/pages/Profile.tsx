import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid, Card, CardMedia, CardContent, FormControl, TextField, Checkbox, FormControlLabel, Button } from '@material-ui/core';


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
const Profile = () => {


  //const classes = useStyles();
  const [userBooks, setUserBooks] = useState<Book[]>([]);
  const [wishlist, setWishlist] = useState<boolean>(false);
  const [owned, setOwned] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
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
  // console.log(userBooks[0]);
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

  useEffect(() => {
    getUserBooks();
  }, [])

  const ownedBooks = userBooks.filter(book => book.owned);
  const wishlistBooks = userBooks.filter(book => book.wishlist);
  //
  return (
    <div >
      <Typography variant="h3" >Profile</Typography>
      <Typography variant="h4" >My Books</Typography>
      <form onSubmit={handleSubmit} >
        <label>
          Book Title:
          <input type="text" value={title} onChange={handleTitleChange} />
        </label>
        <label>
          <Checkbox checked={wishlist} onChange={handleWishlistChange} />
          Add to Wishlist
        </label>
        <label>
          <Checkbox checked={owned} onChange={handleOwnedChange} />
          Add to Owned Books
        </label>
        <button type="submit">Add Book</button>
      </form>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <Typography variant="h5">Owned Books</Typography>
          {ownedBooks.length > 0 ?
            <Grid container spacing={2}>
              {ownedBooks.map((book) => (
                <div key={book.id}>
                  <Card >
                    <CardMedia component="img" image={book.books.image} />
                    <CardContent>
                      <Typography variant="h5">{book.books.title}</Typography>
                      <Typography variant="body1">{book.books.author}</Typography>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </Grid> :
            <Typography variant="body1">No owned books</Typography>
          }
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Typography variant="h5">Wishlist</Typography>
          {wishlistBooks.length > 0 ?
            <Grid container spacing={2} >
              {wishlistBooks.map((book) => (
                <div key={book.id}>
                  <Card >
                    <CardMedia component="img" image={book.books.image} />
                    <CardContent>
                      <Typography variant="h5">{book.books.title}</Typography>
                      <Typography variant="body1">{book.books.author}</Typography>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </Grid> :
            <Typography variant="body1">No wishlist books</Typography>
          }
        </Grid>
      </Grid>
    </div>
  );


}

export default Profile;
