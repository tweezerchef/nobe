import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid, Card, CardMedia, CardContent } from '@material-ui/core';



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
  }));
  const classes = useStyles();
  const [userBooks, setUserBooks] = useState<Book[]>([]);
  const getUserBooks = async () => {
    try {
      const res = await axios.get(`/books/e2a5eb89-3fd5-4f3a-a884-3e75e1c59b1b`);
      setUserBooks(res.data);
    } catch (err) {
      console.error(err);
    }
  }
  // console.log(userBooks[0]);

  useEffect(() => {
    getUserBooks();
  }, [])

  // <p> <img src={book.books.image} /></p>
  return (
    <div className={classes.root}>
      <Typography variant="h3" className={classes.title}>Profile</Typography>
      <Typography variant="h4" className={classes.title}>My Books</Typography>
      <Grid container spacing={2}>
        {userBooks.map((book) => (
          <Grid item xs={12} sm={6} md={4} key={book.id}>
            <Card className={classes.card}>
              <CardMedia component="img" className={classes.media} image={book.books.image} />
              <CardContent>
                <Typography variant="h5">{book.books.title}</Typography>
                <Typography variant="body1">{book.books.author}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );

}

export default Profile;
