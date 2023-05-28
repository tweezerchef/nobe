import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import Stack from '@mui/joy/Stack';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import Slide from '@mui/material/Slide';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Avatar from '@mui/material/Avatar';
import { get } from 'http';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import UserContext from '../../../hooks/Context';
import { User } from '../../../typings/types';

interface BookOwnerNearMeProps {
  bookId: string;
}

function BookOwnerNearMe({ bookId }: BookOwnerNearMeProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const userContext = useContext(UserContext);
  const user = userContext?.user;
  if (!user) return null;
  const { latitude, longitude, radius } = user;
  const lat = latitude;
  const lon = longitude;
  const rad = radius;
  const [currentPage, setCurrentPage] = useState(0);
  const [slideDirection, setSlideDirection] = useState<'right' | 'left' | undefined>('left');
  const [usersArray, setUsersArray] = useState<User[]>([]);
  const [selectedOwner, setSelectedOwner] = useState<User>(user);
  const usersPerPage = 6;

  const getBookOwners = async () => {
    try {
      const res = await axios.get('/location/locations/book', {
        params: {
          bookId,
          radius,
          lat,
          lon,
        },
      });
      console.log(res.data);
      setUsersArray(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleNextPage = () => {
    setSlideDirection('left');
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setSlideDirection('right');
    setCurrentPage((prevPage) => prevPage - 1);
  };
  useEffect(
    () => {
      getBookOwners();
    },
    [],
  );
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        width: '100%',
        height: isMobile ? '20vw' : '10vw',
        maxHeight: isMobile ? '20vw' : '50px',
        marginTop: isMobile ? '.2vh' : '.2vh',
        paddingBottom: '0',
      }}
    >
      {isMobile ? (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            overflowX: 'scroll',
            width: '100%',
            height: '30vh',
            '&::-webkit-scrollbar': {
              display: 'none',
            },
            msOverflowStyle: 'none',
          }}
        >
          {usersArray.map((user: User) => (
            <Box key={user.id}>
              <Link to={`/profile/${user?.id}`}>
                <Avatar
                  sx={{
                    width: '50px',
                    height: '50px',
                    margin: '5px',
                    cursor: 'pointer',
                  }}
                  alt={user.username}
                  src={user.picture}
                  onClick={() => setSelectedOwner(user)}
                />
              </Link>
            </Box>
          ))}
        </Box>
      ) : (
        <IconButton
          onClick={handlePrevPage}
          sx={{
            marginRight: 1, padding: 0, alignSelf: 'center', justifySelf: 'start',
          }}
          disabled={currentPage === 0}
        >
          <NavigateBeforeIcon />
        </IconButton>
      )}
      <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
        {usersArray.map((user: User, index: number) => (
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              display: currentPage === index ? 'block' : 'none',
            }}
            key={user.id}
          >

            <Slide
              direction={slideDirection}
              in={currentPage === index}
            >
              <Stack
                spacing={1}
                direction="column"
                maxWidth="100%"
                maxHeight="100%"
                alignItems="center"
                alignContent="center"
                justifyContent="center"
              >
                <Link to={`/profile/${user?.id}`}>
                  <Avatar
                    sx={{
                      width: '3rem',
                      height: '3rem',
                      margin: '.5rem',
                      cursor: 'pointer',
                    }}
                    alt={user?.username}
                    src={user?.picture}
                    onClick={() => setSelectedOwner(user)}
                  />
                  {user.username ? (
                    <Typography variant="body2">{user.username}</Typography>
                  ) : (
                    <Typography variant="body2">{user.firstName}</Typography>
                  )}
                </Link>
              </Stack>
            </Slide>
          </Box>
        ))}
      </Box>
      <IconButton
        onClick={handleNextPage}
        sx={{
          marginLeft: 1, marginRight: 0.5, padding: 0, alignSelf: 'center', justifySelf: 'end',
        }}
        disabled={currentPage >= Math.ceil((usersArray.length || 0) / usersPerPage) - 1}
      >
        <NavigateNextIcon />
      </IconButton>
    </Box>
  );
}

export default BookOwnerNearMe;
