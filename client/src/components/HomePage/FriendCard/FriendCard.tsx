import React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/joy/Stack';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import { User } from '../../../typings/types';
import FollowButton from '../../Button/FollowButton';

interface FriendCardProps {
  userFriend: User;
  userId: string;
  friendIdArray: string[];
}
function FriendCard({ userFriend, friendIdArray, userId }: FriendCardProps) {
  const user = userFriend;
  const owned = user?.UserBooks?.filter((book) => book.owned === true).length;
  const wishlist = user?.UserBooks?.filter((book) => book.wishlist === true).length;

  return (

    <Box
      sx={{
        flexGrow: 1,
        backgroundColor: '#dce9f39b',
        boxShadow: '0px 0px 25px  rgba(37, 37, 37, 0.6)',
        minHeight: '29vh',
        maxHeight: '33vh',
        marginTop: '1.5vh',
        width: '20vw',
        alignContent: 'center',
        justifyContent: 'center',
        display: 'flex',
        borderRadius: '3rem',
      }}
    >
      <Grid container spacing={2} direction="column">
        <Grid>
          <Stack direction="row" spacing={2} alignItems="center">
            <Link to={`/profile/${user?.id}`}>
              <Avatar
                src={user?.picture}
                alt={user?.firstName}
                style={{
                  width: '4rem',
                  height: '4rem',
                  margin: '1rem',
                  marginLeft: '1.5rem',
                  marginTop: '1.5rem',
                }}
              />
            </Link>
            <Link to={`/profile/${user?.id}`}>
              <Typography variant="h5">
                {user?.firstName}
              </Typography>
            </Link>
          </Stack>
        </Grid>
        <Divider sx={{ borderBottomWidth: 6, bgcolor: 'ThreeDDarkShadow' }} variant="middle" />
        <Box sx={{
          display: 'flex', flexWrap: 'wrap', alignItems: 'center', alignContent: 'center', paddingLeft: '2rem', width: '100%', marginTop: '1rem', overflowBottom: 'clip',
        }}
        >
          <Grid>
            <Grid container spacing={2} alignContent="center" justifyContent="center" alignItems="center">
              <Grid>
                <Typography variant="body1" align="left" sx={{ margin: '.2rem' }}>
                  Friends:
                  {' '}
                  {user?.friendships?.length}
                  {'  '}

                </Typography>
              </Grid>
              <Grid>
                <Typography variant="body1" align="left" sx={{ margin: '.2rem' }}>
                  Lending Library:
                  {' '}
                  {owned}
                  {'  '}

                </Typography>
              </Grid>
              <Grid>
                <Typography variant="body1" align="left" sx={{ margin: '.2rem' }}>
                  Wish List:
                  {' '}
                  {wishlist}
                  {'  '}

                </Typography>
              </Grid>
              <Grid>
                <Typography variant="body1" align="left" sx={{ margin: '.2rem' }}>
                  Clubs:
                  {' '}
                  {user?.clubMembers?.length}
                  {'  '}

                </Typography>
              </Grid>
              <Grid>
                <Typography variant="body1" align="left" sx={{ margin: '.2rem' }}>
                  Posts:
                  {' '}
                  {user?.Posts?.length}
                  {'  '}

                </Typography>
              </Grid>
            </Grid>
            <FollowButton userId={userId} friendIdArray={friendIdArray} friendId={user?.id} />
          </Grid>
        </Box>
      </Grid>
    </Box>
  );
}

export default FriendCard;
