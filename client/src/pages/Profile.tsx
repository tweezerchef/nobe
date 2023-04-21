import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid, Card, CardMedia, CardContent, FormControl, TextField, Checkbox, FormControlLabel, Button } from '@material-ui/core';
import Carousel from 'react-material-ui-carousel'



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
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      padding: theme.spacing(2),
    },
    card: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      height: '100%',
      borderRadius: 0,
    },
    media: {
      height: '100%',
      backgroundSize: 'contain',
    },
    title: {
      textAlign: 'center',
    },
    form: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: theme.spacing(2),
    },
    input: {
      marginRight: theme.spacing(2),
      flex: 1,
    },
    button: {
      marginLeft: theme.spacing(2),
    },
  }));
  const classes = useStyles();
  const [userBooks, setUserBooks] = useState<Book[]>([]);
  const [wishlist, setWishlist] = useState<boolean>(false);
  const [owned, setOwned] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const getUserBooks = async () => {
    try {
      const res = await axios.get(`/books/6b15b543-6649-42d0-93b7-922f1fd7d44e`);
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
      await axios.post(`/books/c1a2f75d-4c90-4cfd-b8bf-d78594306adb`,
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
    <div className={classes.root}>
      <Typography variant="h3" className={classes.title}>Profile</Typography>
      <Typography variant="h4" className={classes.title}>My Books</Typography>
      <form onSubmit={handleSubmit} className={classes.form}>
        <label>
          Book Title:
          <input type="text" className={classes.input} value={title} onChange={handleTitleChange} />
        </label>
        <label>
          <input type="checkbox" checked={wishlist} onChange={handleWishlistChange} />
          Add to Wishlist
        </label>
        <label>
          <input type="checkbox" checked={owned} onChange={handleOwnedChange} />
          Add to Owned Books
        </label>
        <button className={classes.button} type="submit">Add Book</button>
      </form>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <Typography variant="h5">Owned Books</Typography>
          {ownedBooks.length > 0 ?
            <Carousel>
              {ownedBooks.map((book) => (
                <div key={book.id}>
                  <Card className={classes.card}>
                    <CardMedia component="img" className={classes.media} image={book.books.image} />
                    <CardContent>
                      <Typography variant="h5">{book.books.title}</Typography>
                      <Typography variant="body1">{book.books.author}</Typography>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </Carousel> :
            <Typography variant="body1">No owned books</Typography>
          }
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Typography variant="h5">Wishlist</Typography>
          {wishlistBooks.length > 0 ?
            <Carousel>
              {wishlistBooks.map((book) => (
                <div key={book.id}>
                  <Card className={classes.card}>
                    <CardMedia component="img" className={classes.media} image={book.books.image} />
                    <CardContent>
                      <Typography variant="h5">{book.books.title}</Typography>
                      <Typography variant="body1">{book.books.author}</Typography>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </Carousel> :
            <Typography variant="body1">No wishlist books</Typography>
          }
        </Grid>
      </Grid>
    </div>
  );


}

export default Profile;
