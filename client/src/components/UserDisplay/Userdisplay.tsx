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
  Name, Desc, ProfileInfo, ProfileImage,
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

  // console.log(books, 24)

  return (
    <div>
      <ProfileCard>
        <Avatar
          src={user.picture}
          alt={user.name}
          style={{ width: '7rem', height: '7rem' }}
        />
        <ProfileInfo>
          <Name variant="h2">{user.firstName}</Name>
          <Desc>{user.description}</Desc>
          <Status>
            <li>
              <StatusValue variant="h3" />
              <StatusText>Posts</StatusText>
            </li>
            <li>
              <StatusValue variant="h3" />
              <StatusText>Followers</StatusText>
            </li>
            <li>
              <StatusValue variant="h3">{user.following}</StatusValue>
              <StatusText>Following</StatusText>
            </li>
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

{ /* <Link to={`/profile/${user.id}`}>
        <div className="user-firstName" />
        <StyledCard>
          <ProfileImage>
            <ProfilePicture src={user.picture} />
          </ProfileImage>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {user.firstName}
            </Typography>
          </CardContent>
          <CardActions>
            <PinkButton> Share </PinkButton>
            <GrayOutlineButton> Learn More </GrayOutlineButton>
          </CardActions>
        </StyledCard>
      </Link> */ }
export default UserDisplay;
