import React, { useContext, useState, useEffect } from 'react';
import Stack from '@mui/joy/Stack';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import Box from '@mui/material/Box';
import { IconButton } from '@mui/material';
import Slide from '@mui/material/Slide';
import { User } from '../../typings/types';
import UserContext from '../../hooks/Context';
import FriendCard from './FriendCard/FriendCard';

type Friendships = {
  id: string;
  userId: string;
  friendId: string;
  confirmed: boolean;
  friend?: User
  user?: User

};

function FriendsComponent() {
  const [currentPage, setCurrentPage] = useState(0);
  const [slideDirection, setSlideDirection] = useState<'right' | 'left' | undefined>('left');
  const [friends, setFriends] = useState<Friendships[]>([]);
  const userContext = useContext(UserContext);
  const user = userContext?.user;

  const getFriends = () => {
    console.log('friends', user);
    if (user?.friendships) {
      setFriends(user?.friendships);
    }
  };
  const friendsPerPage = 4;

  const handleNextPage = () => {
    setSlideDirection('left');
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setSlideDirection('right');
    setCurrentPage((prevPage) => prevPage - 1);
  };

  useEffect(() => {
    getFriends();
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '300px',
        paddingBottom: '0',
      }}
    >
      <IconButton
        onClick={handlePrevPage}
        sx={{
          margin: 5, marginRight: 10, padding: 0, alignSelf: 'center', justifySelf: 'start',

        }}
        disabled={currentPage === 0}
      >
        <NavigateBeforeIcon />
      </IconButton>

      <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
        {friends.map((friend, index) => (
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              display: currentPage === index ? 'block' : 'none',
            }}
          >
            <Slide direction={slideDirection} in={currentPage === index}>
              <Stack
                spacing={2}
                direction="row"
                maxWidth="100%"
                maxHeight="100%"
                alignContent="center"
                justifyContent="center"
              >
                {friends.slice(
                  index * friendsPerPage,
                  index * friendsPerPage + friendsPerPage,
                )
                  // eslint-disable-next-line @typescript-eslint/no-shadow
                  .map((friend) => (
                    <Box>
                      {friend.friend
                      && <FriendCard userFriend={friend.friend} />}
                    </Box>
                  ))}
              </Stack>
            </Slide>

          </Box>
        ))}
      </Box>

      <IconButton
        onClick={handleNextPage}
        sx={{
          margin: 5, marginLeft: 10, padding: 0, alignSelf: 'center', justifySelf: 'end',
        }}
        disabled={currentPage >= Math.ceil((friends.length || 0) / friendsPerPage) - 1}
      >
        <NavigateNextIcon />
      </IconButton>
    </Box>
  );
}
export default FriendsComponent;
