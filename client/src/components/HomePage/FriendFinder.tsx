import React, {
  useState, useEffect, ChangeEvent, FormEvent,
} from 'react';
import Stack from '@mui/joy/Stack';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import Box from '@mui/material/Box';
import { IconButton } from '@mui/material';
import Slide from '@mui/material/Slide';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import InputAdornment from '@mui/material/InputAdornment';
import Divider from '@mui/material/Divider';
import Autocomplete from '@mui/material/Autocomplete';
import { User } from '../../typings/types';
import FriendCard from './FriendCard/FriendCard';

function FriendsComponent() {
  const [currentPage, setCurrentPage] = useState(0);
  const [slideDirection, setSlideDirection] = useState<'right' | 'left' | undefined>('left');
  const [randomUsers, setRandomUsers] = useState<User[]>([]);
  const [searchText, setSearchText] = useState('');
  const [userArray, setUserArray] = useState<User[]>([]);

  const getRandomUsers = () => {
    axios.get('/user/randomUsers').then((res) => {
      setRandomUsers(res.data);
    });
  };
  const getSearchUser = (id: string) => {
    axios.get(`/user/id?id=${id}`).then((res) => {
      setRandomUsers((prevUsers) => [...[res.data], ...prevUsers]);
    });
  };
  const getUsersArray = () => {
    axios.get('/user/allUsers').then((res) => {
      setUserArray(res.data);
    });
  };

  const randomUsersPerPage = 3;

  const handleNextPage = () => {
    setSlideDirection('left');
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setSlideDirection('right');
    setCurrentPage((prevPage) => prevPage - 1);
  };

  useEffect(() => {
    getRandomUsers();
    getUsersArray();
  }, []);

  return (
    <Box>
      <Divider textAlign="right">
        <Box
          component="form"
          onSubmit={(event) => {
            event.preventDefault(); // Prevent form submission
          }}
          sx={{
            '& > :not(style)': { m: 1, width: '350px' },
          }}
          noValidate
          autoComplete="off"
        >
          <Autocomplete
            id="combo-box-demo"
            options={userArray}
            getOptionLabel={(option: User) => (option.username ? `${option.firstName} ${option.username}` : option.firstName)}
            sx={{ width: 350 }}
            disablePortal
            onChange={(event: any, newValue: User | null) => {
              if (newValue) {
                setSearchText(newValue.id);
                getSearchUser(newValue.id);
              }
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                id="Search"
                InputProps={{
                  ...params.InputProps,
                  startAdornment: (
                    <InputAdornment position="start">
                      <IconButton type="submit">
                        <SearchOutlinedIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'black',
                      borderRadius: 6,
                      width: '350px',
                    },
                    '& input': {
                      width: '100%', // Adjust these values as needed
                      color: 'black',
                    },
                  },
                }}
              />
            )}
          />
        </Box>
      </Divider>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          alignContent: 'center',
          justifyContent: 'center',
          justifyItems: 'center',
          width: '100%',
          height: '300px',
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
          {randomUsers.map((friend, index) => (
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
                  {randomUsers.slice(
                    index * randomUsersPerPage,
                    index * randomUsersPerPage + randomUsersPerPage,
                  )
                  // eslint-disable-next-line @typescript-eslint/no-shadow
                    .map((randomUser) => (
                      <Box>
                        {randomUser
                      && <FriendCard userFriend={randomUser} />}
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
          disabled={currentPage >= Math.ceil((randomUsers.length || 0) / randomUsersPerPage) - 1}
        >
          <NavigateNextIcon />
        </IconButton>
      </Box>
    </Box>
  );
}
export default FriendsComponent;
