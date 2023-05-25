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
import UserContext from '../../../hooks/Context';

function ProfileCard() {
  const userContext = useContext(UserContext);
  const user = userContext?.user;
  const owned = 10;
  const wishlist = 10;

  return (

    <Box
      sx={{
        backgroundColor: 'transparent',
        boxShadow: 'none',
        flexGrow: 1,
      }}
    >
      <Stack direction="row" spacing={1} alignItems="center" padding=".7vh">
        <Link to={`/profile/${user?.id}`}>
          <Avatar
            src={user?.picture}
            alt={user?.firstName}
            style={{
              width: '4rem', height: '4rem',
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
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>

        <Grid xs={4} sm={4} md={4}>
          <Typography variant="body2" align="center">
            Friends:
            {' '}
            {user?.friends.length}
          </Typography>
        </Grid>

      </Grid>
    </Box>
  );
}

export default ProfileCard;
