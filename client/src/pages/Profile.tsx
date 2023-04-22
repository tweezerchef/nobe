import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid, Card, CardMedia, CardContent, FormControl, TextField, Checkbox, FormControlLabel, Button } from '@material-ui/core';
import Navbar from '../components/Navbar/Navbar';
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
  console.log(userBooks)
  useEffect(() => {
    getUserBooks();
  }, [])

  return (
    <div >
      <Navbar children={undefined} />
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
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} >
        <div style={{ display: 'flex', justifyContent: 'center', background: 'rgb(32, 32, 35)' }}>
          <button style={{ margin: '10px' }} onClick={wishClicked}>WishList</button>
          <button style={{ margin: '10px' }} onClick={ownedClicked}>Owned</button>
        </div>
        <Typography variant="h5">My books</Typography>
        {books.length > 0 ?
          <BookDisplay books={books} id={user.id} /> :
          <Typography variant="body1">No books</Typography>
        }
      </div>


    </div>
  );


}

export default Profile;
