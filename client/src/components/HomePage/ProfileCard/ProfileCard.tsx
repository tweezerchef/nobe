import React, {
  useContext,
} from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/joy/Stack';
import { Link } from 'react-router-dom';
import Box, { BoxProps } from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import { margin } from '@mui/system';
import UserContext from '../../../hooks/Context';

function ProfileCard() {
  const userContext = useContext(UserContext);
  const user = userContext?.user;
  const owned = user?.UserBooks?.filter((book) => book.owned === true).length;
  const wishlist = user?.UserBooks?.filter((book) => book.wishlist === true).length;

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
        display: 'flex',
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
        <Divider sx={{ borderBottomWidth: 6, bgcolor: 'ThreeDDarkShadow' }} />
        <Box sx={{
          display: 'flex', flexWrap: 'wrap', alignItems: 'center', alignContent: 'center', paddingLeft: '2rem', width: '100%', marginTop: '2rem', overflowBottom: 'clip',
        }}
        >
          <Grid>
            <Grid container spacing={3} alignContent="center" justifyContent="center" alignItems="center">
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

export default ProfileCard;
