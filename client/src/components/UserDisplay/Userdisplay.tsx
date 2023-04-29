import React, { useContext, useEffect, useState } from 'react';
import Book from '../Book/Book';
import UserContext from '../../hooks/Context';
import BookDisplay from '../BookDisplay/BookDisplay';
import Avatar from '@mui/material/Avatar';
import Link from '@mui/material/Link';



function UserDisplay({ user }: { user: any }) {
  const userBooks = user.UserBooks;
  console.log(userBooks, 10)

  // const userContext = useContext(UserContext);
  // const profile = userContext?.user;

  const [books, setBooks] = useState<any>([]);

  // const getUserBooks = () => {
  // const booksArray = userBooks?.map((userbook: any) => userbook.Books);
  // console.log(booksArray, 20);
  // setBooks(booksArray);
  // }

  // useEffect(() => {
  //   if (profile && user.UserBooks) {
  //     getUserBooks();
  //   }
  // }, []);

  useEffect(() => {
    const booksArray = userBooks?.map((userbook: any) => userbook.Books);
    console.log(booksArray, 20);
    setBooks(booksArray);
  }, [userBooks]);

  console.log(books, 24)

  return (
    <div>
       <Link
      component="button"
      variant="body2"
      onClick={() => {
        console.info("I'm a button.");
      }}
    >
        <div className="user-firstName">{user.firstName}</div>
        <Avatar alt="user-image" src={user.picture} />
        </Link>
        <BookDisplay books={books} />
          </div>
  );
}
export default UserDisplay