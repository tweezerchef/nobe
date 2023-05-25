import React, {
  useContext,
} from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/joy/Stack';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Unstable_Grid2';
import { margin, padding } from '@mui/system';
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
        backgroundColor: '#dce9f3',
        height: '100%',
      }}
    >
      <Stack direction="row" spacing={2} alignItems="center">
        <Link to={`/profile/${user?.id}`}>
          <Avatar
            src={user?.picture}
            alt={user?.firstName}
            style={{
              width: '5rem', height: '5rem', margin: '1rem',
            }}

          />
        </Link>
        <Link to={`/profile/${user?.id}`}>
          <Typography variant="h5">
            {user?.firstName}
          </Typography>
        </Link>
      </Stack>
      <Divider sx={{ borderBottomWidth: 6, bgcolor: 'ThreeDDarkShadow' }} variant="middle" />
      <Grid container spacing={{ xs: 0, md: 1 }} columns={{ xs: 4, sm: 8, md: 12 }}>

        <Grid xs={1} sm={2} md={3} sx={{ paddingRight: '0', marginRight: '0', paddingLeft: '3' }}>
          <Typography variant="body1" align="left">
            Friends:
            {' '}
            {user?.friendships?.length}
          </Typography>
        </Grid>
        <Grid xs={3} sm={4} md={5}>
          <Typography variant="body1" align="left" sx={{ paddingLeft: '0', marginLeft: '0', paddingRight: '0' }}>
            Lending Library:
            {' '}
            {owned}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ProfileCard;
