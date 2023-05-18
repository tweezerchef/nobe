import React, {
  useContext,
} from 'react';
import Avatar from '@mui/material/Avatar';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import UserContext from '../../hooks/Context';

import {
  ProfileCard, StatusText, StatusValue, Status,
  Name, ProfileInfo, ProfileImage, StatusItem,
} from './homeStyle';

function HomeUserDisplay() {
  const userContext = useContext(UserContext);
  const user = userContext?.user;
  const owned = 10;
  const wishlist = 10;
  return (
    <Box sx={{ flexGrow: 1 }} maxWidth="100%">
      <ProfileCard>
        <Link to={`/profile/${user?.id}`}>
          <Avatar
            src={user?.picture}
            alt={user?.firstName}
            style={{
              width: '5rem', height: '5rem', marginLeft: '10px', marginTop: '10px',
            }}
          />
        </Link>
        <ProfileInfo>
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
    </Box>
  );
}

export default HomeUserDisplay;
