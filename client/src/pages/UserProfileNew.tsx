/* eslint-disable react/no-unescaped-entities */
import React, {
  useState, useContext, useEffect,
} from 'react';
import ScrollBar from 'react-scrollbars-custom';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Stack from '@mui/joy/Stack';
import Chip from '@mui/joy/Chip';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Slide from '@mui/material/Slide';
import styled from 'styled-components';
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
import MaxWidthDiv from '../hooks/MaxWidth';

const StyledTrack = styled.div`
    background-color: #f1f1f1;
    left: 2px !important;
`;
const StyledTrackHome = styled.div`
    background-color: #f1f1f1;
    height: 100%;
`;

const StyledThumb = styled.div`
    background-color: #888;
    border-radius: 3px;
`;
const TrackYHome = React.forwardRef<HTMLDivElement>(
  (props, ref) => <StyledTrackHome {...props} ref={ref} />,
);

const TrackY = React.forwardRef<HTMLDivElement>(
  (props, ref) => <StyledTrack {...props} ref={ref} />,
);
const ThumbY = React.forwardRef<HTMLDivElement>(
  (props, ref) => <StyledThumb {...props} ref={ref} />,
);

function UserProfile() {
  const [user, setUser] = useState<User | null>(null);
  const [userName, setUserName] = useState<string>('');
  const { chatState, setChatState, setChatUser } = useChatContext();
  const [loaded, setLoaded] = useState(false);
  const [nearMeBooks, setNearMeBooks] = useState<string[]>([]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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
    <MaxWidthDiv>
      <Box sx={{
        flexGrow: 1, overflow: 'clip', height: '98vh', width: '100%',
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
              borderRight: { xs: 'var(--Grid-borderWidth) solid', sm: 'none' },
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
              position: 'sticky',
              top: '0px',
              height: '100vh',
              paddingBottom: '8vh',
              display: { xs: 'none', sm: 'block' },
            }}
          >
            <Box sx={{
              width: '100%',
              height: '225px',
              backgroundSize: 'cover',
              backgroundPosition: 'right 70% bottom 78%',
              overflow: 'clip',
              backgroundImage: 'url(https://i.imgur.com/ZmgMDQ2.png)',
            }}
            >
              <ProfileCard />
            </Box>
            <div
              style={{
                width: '100%',
                height: '70vh',
                overflow: 'hidden',
              }}
            >
              <ScrollBar
                style={{ width: '100%', height: '100%' }}
                trackYProps={{
                  renderer: (props) => {
                    const { elementRef, ...restProps } = props;
                    return <TrackY {...restProps} ref={elementRef} />;
                  },
                }}
                thumbYProps={{
                  renderer: (props) => {
                    const { elementRef, ...restProps } = props;
                    return <ThumbY {...restProps} ref={elementRef} />;
                  },
                }}
              >
                <Feed />
              </ScrollBar>
            </div>
          </Grid>
          <Slide direction="up" in={loaded} mountOnEnter unmountOnExit>
            <Grid
              xs={12}
              sm={9.5}
              width="100%"
              sx={{
                height: '98vh', overflow: 'auto', paddingBottom: '9vh',
              }}
            >

              <ScrollBar
                trackYProps={{
                  renderer: (props) => {
                    const { elementRef, ...restProps } = props;
                    return <TrackYHome {...restProps} ref={elementRef} />;
                  },
                }}
                thumbYProps={{
                  renderer: (props) => {
                    const { elementRef, ...restProps } = props;
                    return <ThumbY {...restProps} ref={elementRef} />;
                  },
                }}
              >
                <Stack
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
                  spacing={1}
                  width="100%"
                >
                  <Box
                    sx={{
                      width: '100%',
                      height: '210px',
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
                      sx={{ paddingTop: '.5rem' }}
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
                  <Box
                    overflow="hidden"
                    alignContent="center"
                    alignItems="center"
                    sx={{
                      width: '100%',
                      minHeight: isMobile ? '90vw' : '280px',
                      maxHeight: isMobile ? '95vw' : '350px',
                    }}
                  >
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
                  <Box
                    overflow="clip"
                    alignContent="center"
                    alignItems="center"
                    sx={{
                      width: '100%',
                      minHeight: isMobile ? '90vw' : '280px',
                      maxHeight: isMobile ? '95vw' : '350px',
                    }}
                  >
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
              </ScrollBar>
            </Grid>
          </Slide>
        </Grid>
      </Box>
    </MaxWidthDiv>
  );
}

export default UserProfile;
