/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {
// useContext,
  useEffect, useState,
} from 'react';
import Avatar from '@mui/material/Avatar';
import { Link } from 'react-router-dom';
import axios from 'axios';
// import Book from '../Book/Book';
// import UserContext from '../../hooks/Context';
import BookDisplay from '../BookDisplay/BookDisplay';

interface UserProfile {
  id: string;
  firstName: string;
  picture: string;
}

function UserDisplay({ user }: { user: any }) {
  const userBooks = user.UserBooks;
  // console.log(userBooks, 10);

  // const userContext = useContext(UserContext);
  // const profile = userContext?.user;
  // const [profile, setProfile] = useState<UserProfile | null>(null);

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
  // const getProfile = async () => {
  //   try {
  //     const response = await axios.get(`/user/id?id=${user.id}`);
  //     // console.log(response.data)
  //     setProfile(response.data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  useEffect(() => {
    const booksArray = userBooks?.map((userbook: any) => userbook.Books);
    // console.log(booksArray, 20);
    setBooks(booksArray);
  }, [userBooks]);

  // console.log(books, 24)

  return (
    <div>
      <Link to={`/profile/${user.id}`}>
        <div className="user-firstName">{user.firstName}</div>
        <Avatar alt="user-image" src={user.picture} />
        <div className="profile-card">
          <div className="profile-card-header">
            <div className="profile-image" />

            <div className="profile-info">
              <h3 className="profile-name">Dev Ed</h3>
              <p className="profile-desc">Developer/Conent Creator</p>
            </div>
          </div>

          <div className="profile-card-body">
            <ul className="status">
              <li>
                <span className="status-value">532</span>
                <span className="status-text">Posts</span>
              </li>

              <li>
                <span className="status-value">1.5m</span>
                <span className="status-text">Followers</span>
              </li>

              <li>
                <span className="status-value">423</span>
                <span className="status-text">Following</span>
              </li>
            </ul>

            <div className="action">
              {/* <button className="btn btn-pink">Follow</button>
              <button className="btn btn-gray-outline">Message</button> */}
            </div>
          </div>
        </div>
      </Link>
      <BookDisplay books={books} />
    </div>
  );
}
export default UserDisplay;
