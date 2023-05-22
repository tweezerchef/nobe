import React from 'react';
import Avatar from '@mui/material/Avatar';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';

import {
  ProfileCard, StatusText, StatusValue, Status,
  Name, ProfileInfo, StatusItem, AvatarWrapper,
} from './homeStyle';
import { User } from '../../../typings/types';
import { StyledDivider } from '../PlaceCard/styles';

interface FriendCardProps {
  userFriend: User;
}

function FriendCard({ userFriend }: FriendCardProps) {
  const user = userFriend;
  const owned = 10;
  const wishlist = 10;
  return (
  // <Box sx={{ flexGrow: 1 }} maxWidth="100%" maxHeight="100%">
    <ProfileCard>
      <AvatarWrapper>
        <Link to={`/profile/${user?.id}`}>
          <Avatar
            src={user?.picture}
            alt={user?.firstName}
            style={{
              width: '5rem', height: '5rem',
            }}
          />
        </Link>

      </AvatarWrapper>
      <ProfileInfo>
        <StyledDivider />
        <Name variant="h2">{user?.firstName}</Name>
        {/* <Desc>{user?.description}</Desc> */}
        <Status>
          <StatusItem>
            <StatusValue>{user?.Activity.length}</StatusValue>
            <StatusText>Activity</StatusText>
          </StatusItem>
          <StatusItem>
            <StatusValue>{user?.Posts.length}</StatusValue>
            <StatusText>Posts</StatusText>
          </StatusItem>
          <StatusItem>
            <StatusValue>{user?.clubMembers.length}</StatusValue>
            <StatusText>Clubs</StatusText>
          </StatusItem>
        </Status>
        <Status>
          <StatusItem>
            <StatusValue>{owned}</StatusValue>
            <StatusText>Inventory</StatusText>
          </StatusItem>
          <StatusItem>
            <StatusValue>{wishlist}</StatusValue>
            <StatusText>Wish List</StatusText>
          </StatusItem>
        </Status>
      </ProfileInfo>
    </ProfileCard>
  // </Box>
  );
}

export default FriendCard;
