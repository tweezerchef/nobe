import React, {
  useContext,
} from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/joy/Stack';
import { useNavigate, Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import UserContext from '../../../hooks/Context';

function ProfileCard() {
  const userContext = useContext(UserContext);
  const user = userContext?.user;
  const owned = user?.UserBooks?.filter((book) => book.owned === true).length;
  const wishlist = user?.UserBooks?.filter((book) => book.wishlist === true).length;
  const username = user?.username ? user.username : user?.firstName;
  const navigate = useNavigate();
  const handleProfileClick = () => {
    navigate('/home');
  };

  return (

    <Box
      sx={{
        boxShadow: 'none',
        flexGrow: 1,
        backgroundColor: 'transparent',
        height: '100%',
        width: '100%',
        alignContent: 'center',
        justifyContent: 'center',
      }}
    >
      <Grid container spacing={2} direction="column">
        <Grid>
          <Stack direction="row" spacing={2} alignItems="center" alignContent="center">
            <Avatar
              src={user?.picture}
              alt={user?.firstName}
              onClick={handleProfileClick}
              style={{
                width: '4rem',
                height: '4rem',
                margin: '1rem',
                marginLeft: '4rem',
                marginTop: '1.5rem',
              }}
            />
            <Typography variant="h5" onClick={handleProfileClick}>
              {username}
            </Typography>
          </Stack>
        </Grid>
        <Divider sx={{ borderBottomWidth: 6, bgcolor: 'ThreeDDarkShadow' }} />
        <Box sx={{
          alignItems: 'center', alignContent: 'center', paddingLeft: '3rem', width: '90%', marginTop: '2rem', overflowBottom: 'clip',
        }}
        >
          <Grid>
            <Grid container spacing={4} alignContent="center" justifyContent="center" alignItems="center">
              <Grid>
                <Typography variant="h6" align="center" sx={{ margin: '.1rem' }}>
                  Friends:
                  {' '}
                  {user?.friendships?.length}
                  {'  '}

                </Typography>
              </Grid>
              <Grid>
                <Typography variant="h6" align="center" sx={{ margin: '.1rem' }}>
                  Lending Library:
                  {' '}
                  {owned}
                  {'  '}

                </Typography>
              </Grid>
              <Grid>
                <Typography variant="h6" align="center" sx={{ margin: '.1rem' }}>
                  Wish List:
                  {' '}
                  {wishlist}
                  {'  '}

                </Typography>
              </Grid>
              <Grid>
                <Typography variant="h6" align="center" sx={{ margin: '.1rem' }}>
                  Clubs:
                  {' '}
                  {user?.clubMembers?.length}
                  {'  '}

                </Typography>
              </Grid>
              <Grid>
                <Typography variant="h6" align="center" sx={{ margin: '.1rem' }}>
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

export default ProfileCard;
