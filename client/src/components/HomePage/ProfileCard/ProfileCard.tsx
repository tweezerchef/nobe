import React, {
  useContext,
} from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/joy/Stack';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
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

    </Box>
  );
}

export default ProfileCard;
