import React, {
  useContext,
} from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/joy/Stack';

import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import UserContext from '../../hooks/Context';

import {
  StatusText, StatusValue, Status,
  Name, ProfileInfo, StatusItem,
} from './homeStyle';

function HomeUserDisplay() {
  const userContext = useContext(UserContext);
  const user = userContext?.user;
  const owned = 10;
  const wishlist = 10;
  return (
    <Box sx={{ flexGrow: 1 }} maxWidth="100%" height="100%">
      <Card sx={{
        backgroundColor: 'transparent',
        height: '100%',
        width: '100%',
        display: 'flex',
        // alignItems: 'center',
        // justifyContent: 'center',
        boxShadow: 'none',
      }}
      >
        <Stack direction="row" spacing={1}>
          <Link to={`/profile/${user?.id}`}>
            <Avatar
              src={user?.picture}
              alt={user?.firstName}
              style={{
                width: '3rem', height: '3rem',
              }}
            />
            {user?.firstName}
          </Link>
        </Stack>
        <ProfileInfo>
          <Name variant="h2" />
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
      </Card>
    </Box>
  );
}

export default HomeUserDisplay;
