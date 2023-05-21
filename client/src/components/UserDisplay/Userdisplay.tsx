/* eslint-disable max-len */
/* eslint-disable no-console */
/* eslint-disable no-lone-blocks */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {
  useContext,
  useEffect, useState,
} from 'react';
import Avatar from '@mui/material/Avatar';
import { Link } from 'react-router-dom';
import axios from 'axios';
// import Book from '../Book/Book';
// import UserContext from '../../hooks/Context';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { Container } from '@material-ui/core';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import styled from 'styled-components';
import BookDisplay from '../BookDisplay/BookDisplay';
import {
  ProfileCard, MessageButton, FollowButton, Action, StatusText, StatusValue, Status,
  Name, Desc, ProfileInfo, ProfileImage, StatusItem,
} from './style';
import { useChatContext } from '../../hooks/ChatContext';

interface UserProfile {
  id: string;
  firstName: string;
  picture: string;
}

// This code generates a user display card that shows a user's name, description, activity count, post count,
// club count, and avatar. It also has a follow and message button. It also displays a book display
// component that shows all the books that the user has added to their profile. This code is used
// to display a user's profile page.

function UserDisplay({ user }: { user: any }) {
  const userBooks = user.UserBooks;
  // console.log(userBooks, 10);

  // const profile = userContext?.user;
  // const [profile, setProfile] = useState<UserProfile | null>(null);

  const [books, setBooks] = useState<any>([]);
  const { chatState, setChatState, setChatUser } = useChatContext();

  const handleChatButtonClick = () => {
    setChatState(!chatState);
    setChatUser(user);
  };

  useEffect(() => {
    const booksArray = userBooks?.map((userbook: any) => userbook.Books);
    setBooks(booksArray);
  }, [userBooks]);

  return (
    <div>
      <ProfileCard>
        <Link to={`/profile/${user.id}`}>
          <Avatar
            src={user.picture}
            alt={user.name}
            style={{
              width: '5rem', height: '5rem', marginLeft: '10px', marginTop: '10px',
            }}
          />
        </Link>
        <ProfileInfo>
          <Name variant="h2">{user.firstName}</Name>
          <Desc>{user.description}</Desc>
          <Status>
            <StatusItem>
              <StatusValue>{user.Activity.length}</StatusValue>
              <StatusText>Activity</StatusText>
            </StatusItem>
            <StatusItem>
              <StatusValue>{user.Posts.length}</StatusValue>
              <StatusText>Posts</StatusText>
            </StatusItem>
            <StatusItem>
              <StatusValue>{user.clubMembers.length}</StatusValue>
              <StatusText>Clubs</StatusText>
            </StatusItem>
          </Status>
          <Action>
            <FollowButton variant="contained">Follow</FollowButton>
            <MessageButton variant="contained" onClick={handleChatButtonClick}>Message</MessageButton>
          </Action>
        </ProfileInfo>
      </ProfileCard>
      <BookDisplay books={books} />
    </div>
  );
}

export default UserDisplay;
