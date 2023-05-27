/* eslint-disable react/no-unescaped-entities */
import React, {
  useState, useContext, useEffect,
} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Stack from '@mui/joy/Stack';
import Chip from '@mui/joy/Chip';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Slide from '@mui/material/Slide';
import UserContext from '../hooks/Context';
import { FlameStyledChip, StyledDivider } from '../styles/Home/style';
import Feed from './Feed';
import ProfileCard from '../components/HomePage/ProfileCard/ProfileCard';
import { User } from '../typings/types';
import UserProfileFollowButton from '../components/Button/UserProfileFollowButton';
import { useChatContext } from '../hooks/ChatContext';
// eslint-disable-next-line import/no-cycle
import UserProfileLendingLibrary from '../components/UserProfile/UserProfileLendingLibrary';
import UserProfileFeed from '../components/UserProfile/UserProfileFeed';
import UserProfileFavoriteBooks from '../components/UserProfile/UserProfileFavoriteBooks';

function UserProfile() {
  const [user, setUser] = useState<User | null>(null);
  const [userName, setUserName] = useState<string>('');
  const { chatState, setChatState, setChatUser } = useChatContext();
  const [loaded, setLoaded] = useState(false);
  const [nearMeBooks, setNearMeBooks] = useState<string[]>([]);

  const userId: string = useParams().id || '';
  const userContext = useContext(UserContext);
  const loggedInUser = userContext?.user;

  const getNearMeBooks = async () => {
    // Get user's latitude, longitude, and radius from the user object
    if (!loggedInUser) return;
    const { latitude, longitude, radius } = loggedInUser;

    // Make the request to fetch nearMeBooks with query parameters
    const response = await axios.get('/location/locations/login', {
      params: {
        lat: latitude,
        lon: longitude,
        radius,
      },
    });

    setNearMeBooks(response.data);
  };

  function getUser() {
    axios.get(`/user/id?id=${userId}`)
      .then((response) => {
        setUser(response.data);
        console.log('response data', response.data);
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        response.data.username ? setUserName(response.data.username)
          : setUserName(response.data.firstName);
        setLoaded(true);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  const handleChatButtonClick = () => {
    if (!user) return;
    setChatState(!chatState);
    setChatUser(user);
  };

  useEffect(() => {
    getUser();
    getNearMeBooks();
  }, [userId]);
  // useEffect(() => {
  //   console.log(userId);
  //   getUser();
  //   getNearMeBooks();
  // }, []);

  const colWidth = {
    xs: 12, sm: 6, md: 4, lg: 3,
  } as const;
  return (
    <Box sx={{
      flexGrow: 1, overflow: 'clip', height: '98vh',
    }}
    >
      <Grid
        container
        spacing={0}
        sx={(theme) => ({
          '--Grid-borderWidth': '1px',
          borderTop: 'var(--Grid-borderWidth) solid',
          borderColor: 'divider',
          '& > div': {
            borderRight: 'var(--Grid-borderWidth) solid',
            borderBottom: 'var(--Grid-borderWidth) solid',
            borderColor: 'divider',
            ...(Object.keys(colWidth) as Array<keyof typeof colWidth>).reduce(
              (result, key) => ({
                ...result,
                [`&:nth-of-type(${12 / colWidth[key]}n)`]: {
                  [theme.breakpoints.only(key)]: {
                    borderRight: 'none',
                  },
                },
              }),
              {},
            ),
          },
        })}
      >
        <Grid
          xs={2.5}
          sx={{
            position: 'sticky', top: '0px', height: '100vh', paddingBottom: '8vh',
          }}
        >
          <Box sx={{
            width: '100%',
            height: '225px',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            overflow: 'clip',
            backgroundImage: 'url(https://i.imgur.com/ZmgMDQ2.png)',
          }}
          >
            <ProfileCard />
          </Box>
          <Box sx={{
            width: '100%', maxHeight: '70vh', overflowY: 'auto', overflowX: 'clip',
          }}
          >
            <Feed />
          </Box>
        </Grid>
        <Slide direction="up" in={loaded} mountOnEnter unmountOnExit>
          <Grid xs={9.5} sx={{ height: '99vh', overflow: 'auto', paddingBottom: '9vh' }}>
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="center"
              spacing={2}
              width="100%"
            >
              <Box
                sx={{
                  width: '100%',
                  height: '225px',
                  backgroundImage: 'url(https://i.imgur.com/oB9cYCo.png)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  flexDirection: 'column',
                  overflow: 'hidden',
                }}
              >
                <Stack
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  spacing={3}
                  width="100%"
                  sx={{ paddingTop: '2vh' }}
                >
                  <UserProfileFollowButton friendId={userId} />
                  <Avatar
                    src={user?.picture}
                    alt={user?.firstName}
                    style={{
                      width: '6rem',
                      height: '6rem',
                      margin: '1rem',
                    }}
                  />
                  <Button variant="contained" onClick={handleChatButtonClick}>Message</Button>
                </Stack>
                <Typography variant="h3" align="center">
                  {userName}
                  's Profile
                </Typography>
              </Box>
              <StyledDivider textAlign="right">
                <Chip size="lg">
                  {userName}
                  's Lending Library
                </Chip>
              </StyledDivider>
              <Box overflow="clip" alignContent="center" alignItems="center" sx={{ width: '100%', minHeight: '200px', maxHeight: '32vh' }}>
                { user
                && (
                <UserProfileLendingLibrary
                  nearMeBooks={nearMeBooks}
                  user={user}
                  key={user.id}
                />
                )}
              </Box>
              <StyledDivider textAlign="left">
                <FlameStyledChip size="lg">
                  {userName}
                  's Favorite Books
                </FlameStyledChip>
              </StyledDivider>
              <Box overflow="clip" alignContent="center" alignItems="center" sx={{ width: '100%', minHeight: '200px', maxHeight: '32vh' }}>
                { user
                && <UserProfileFavoriteBooks nearMeBooks={nearMeBooks} user={user} key={user.id} />}
              </Box>
              <StyledDivider textAlign="center">
                <Chip size="lg">
                  {userName}
                  's Feed
                </Chip>
              </StyledDivider>
              <Box overflow="hide" alignContent="center" alignItems="center" sx={{ width: '95%', height: '500px' }}>

                {user
                    && <UserProfileFeed user={user} key={user.id} />}
              </Box>
              <img src="https://nobe.s3.us-east-2.amazonaws.com/Banner+Small+.png" alt="logo" style={{ height: '275px', width: '80%' }} />
            </Stack>
          </Grid>
        </Slide>
      </Grid>
    </Box>
  );
}

export default UserProfile;
