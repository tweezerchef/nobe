import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
interface Book {
  books: {
    id: string;
    title: string;
    author: string;
    description: string;
  }
  id: string;
  wishlist: boolean;
  owned: boolean;
}
const Profile = () => {
  const [userBooks, setUserBooks] = useState<Book[]>([]);
  const getUserBooks = async () => {
    try {
      const res = await axios.get(`/books/1b27a0fe-08d8-4b24-9b52-92d3d16e571d`);
      setUserBooks(res.data);
    } catch (err) {
      console.error(err);
    }
  }
  //console.log(userBooks[0].books);

  useEffect(() => {
    getUserBooks();
  }, [])

  return (
    <div>
      <h1>Profile</h1>
      <h2>My Books</h2>
      {userBooks.map((book) => (
        <div key={book.id}>
          <h3>{book.books.title}</h3>
          {/* <p> <img src={book.books.image} /></p> */}
          <p>{book.books.author}</p>
        </div>
      ))}
    </div>
  )
}

export default Profile;
