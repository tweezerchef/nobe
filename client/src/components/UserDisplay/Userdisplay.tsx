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

  useEffect(() => {
    const booksArray = userBooks?.map((userbook: any) => userbook.Books);
    // console.log(booksArray, 20);
    setBooks(booksArray);
  }, [userBooks]);

  return (
    <div>
      <ProfileCard>
        <Link to={`/profile/${user.id}`}>
          <Avatar
            src={user.picture}
            alt={user.name}
            style={{ width: '7rem', height: '7rem' }}
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
            <MessageButton variant="contained">Message</MessageButton>
          </Action>
        </ProfileInfo>
      </ProfileCard>
      <BookDisplay books={books} />
    </div>
  );
}

export default UserDisplay;
