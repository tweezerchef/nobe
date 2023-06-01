import React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/joy/Stack';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { User } from '../../../typings/types';
import FollowButton from '../../Button/FollowButton';

interface FriendCardProps {
  userFriend: User;
  userId: string;
  friendIdArray: string[];
  setFriendIdArray: React.Dispatch<React.SetStateAction<string[]>>;
}
function FriendCard({
  userFriend, friendIdArray, userId, setFriendIdArray,
}: FriendCardProps) {
  const user = userFriend;
  const owned = user?.UserBooks?.filter((book) => book.owned === true).length;
  const wishlist = user?.UserBooks?.filter((book) => book.wishlist === true).length;
  const username = user?.username ? user.username : user?.firstName;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (

    <Box
      sx={{
        flexGrow: 1,
        backgroundColor: '#dce9f39b',
        boxShadow: '0px 0px 25px  rgba(37, 37, 37, 0.6)',
        width: isMobile ? '70vw' : '18vw',
        height: isMobile ? '55vw' : '16vw',
        minHeight: isMobile ? '55vw' : '220px',
        maxHeight: isMobile ? '55vw' : '270px',
        minWidth: isMobile ? '70vw' : '250px',
        maxWidth: isMobile ? '70vw' : '300px',
        marginTop: '1.5vh',
        overflow: 'hidden',
        flexDirection: 'column',
        alignContent: 'center',
        justifyContent: 'center',
        display: 'flex',
        borderRadius: '3rem',
      }}
    >

      <Grid container spacing={1} direction="column" sx={{ position: 'relative' }}>
        <FollowButton
          userId={userId}
          friendIdArray={friendIdArray}
          setFriendIdArray={setFriendIdArray}
          friendId={user?.id}
        />
        <Grid>
          <Stack direction="column" spacing={1} alignItems="center">
            <Link to={`/profile/${user?.id}`}>
              <Avatar
                src={user?.picture}
                alt={user?.firstName}
                sx={{
                  width: '4.8rem',
                  height: '4.8rem',
                }}
              />
            </Link>
            <Link to={`/profile/${user?.id}`}>
              <Typography variant="h5">
                {username}
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
          </Grid>
        </Box>
      </Grid>
    </Box>
  );
}

export default FriendCard;
