import React, { useContext, useEffect, useState } from 'react';
import Book from '../Book/Book';
import UserContext from '../../hooks/Context';
import BookDisplay from '../BookDisplay/BookDisplay';
import Avatar from '@mui/material/Avatar';


function UserDisplay({ user }: { user: any }) {
  const userBooks = user.UserBooks;
  console.log(userBooks, 10)

  const [books, setBooks] = useState<any>([]);


  useEffect(() => {
    const booksArray = userBooks?.map((userbook: any) => userbook.Books);
    console.log(booksArray, 20);
    setBooks(booksArray);
  }, [userBooks]);

  console.log(books, 24)

  return (
    <div>
      <div className="user-data">
        <div className="user-firstName">{user.firstName}</div>
        <Avatar alt="user-image" src={user.picture} />
        <BookDisplay book={books}/>
        </div>
      </div>
  );
}
export default UserDisplay