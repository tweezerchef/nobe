import React, { useContext, useState } from 'react';
import Book from '../Book/Book';
import UserContext from '../../hooks/Context';
import BookDisplay from '../BookDisplay/BookDisplay';

interface UserBook {
  Books: Book;
  // Add any other properties if necessary
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


function UserDisplay () {
   //const userBooks = user.UserBooks

  const [books, setBooks] = useState<any>([]);

  // const bookFunction = () => {
  // const displayArray = []
  // userBooks.forEach(userbook => displayArray.push(userbook.book))
  // }

// const booksNearMe = () => {
  //   const booksArray: Book[] = [];
  //   userBooks?.forEach((book: UserBook) => {
  //     booksArray.push(book.Books);
  //   });
  //   setBooks(booksArray);

  // }

    return (
      <div>
    <div className="user-data">
    {/* <div className="user-firstName">{user.firstName}</div>
    <div className="user-picture">{user.picture}</div> */}
    <BookDisplay books={books}/>
    </div>
    </div>
    );
}
export default UserDisplay