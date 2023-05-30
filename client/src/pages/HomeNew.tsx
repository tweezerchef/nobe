import React, {
  useState, useContext, useEffect,
} from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Stack from '@mui/joy/Stack';
import Chip from '@mui/joy/Chip';
import Diversity2Icon from '@mui/icons-material/Diversity2';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import ScrollBar from 'react-scrollbars-custom';
import styled from 'styled-components';
import UserContext from '../hooks/Context';
import { FlameStyledChip, StyledDivider } from '../styles/Home/style';
import Feed from './Feed';
import HomeWishList from '../components/HomePage/HomeWishList';
import ProfileCard from '../components/HomePage/ProfileCard/ProfileCard';
import HomePlaces from '../components/HomePage/HomePlaces';
import HomeNearMe from '../components/HomePage/HomeNearMe';
import HomeExploreBooks from '../components/HomePage/HomeExploreBooks';
import HomeFriends from '../components/HomePage/Friends';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import HomeRecommendedBooks from '../components/HomePage/HomeRecommendedBooks';
import FriendFinder from '../components/HomePage/FriendFinder';
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
const StyledThumbHome = styled.div`
    background-color: #888;
    border-radius: 3px;

`;
const TrackYHome = React.forwardRef<HTMLDivElement>(
  (props, ref) => <StyledTrackHome {...props} ref={ref} />,
);
const ThumbYHome = React.forwardRef<HTMLDivElement>(
  (props, ref) => <StyledThumbHome {...props} ref={ref} />,
);

const TrackY = React.forwardRef<HTMLDivElement>(
  (props, ref) => <StyledTrack {...props} ref={ref} />,
);
const ThumbY = React.forwardRef<HTMLDivElement>(
  (props, ref) => <StyledThumb {...props} ref={ref} />,
);

interface Friendship {
  id: string;
  userId: string;
  friendId: string;

}

interface ourBooks {
  id: string;
  title: string;
}

function HomeNew() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [nearMeBooks, setNearMeBooks] = useState<string[]>([]);
  const [friendIdArray, setFriendIdArray] = useState<string[]>([]);
  const [ourBooks, setOurBooks] = useState<ourBooks[]>([]);

  const userContext = useContext(UserContext);
  const user = userContext?.user;
  const userId = user?.id;

  const getNearMeBooks = async () => {
    // Get user's latitude, longitude, and radius from the user object
    if (!user) return;
    const { latitude, longitude, radius } = user;

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
  const getOurBooks = async () => {
    axios.get('/bookdata/titles')
      .then((response) => {
        setOurBooks(response.data);
      });
  };

  function getFriendIds() {
    const friendIds = user?.friendships?.reduce((acc: string[], friendship: Friendship) => {
      if (friendship && friendship.friendId && friendship.friendId.length > 0) {
        acc.push(friendship.friendId);
      }
      return acc;
    }, []) || [];

    setFriendIdArray(friendIds);
  }

  useEffect(() => {
    getNearMeBooks();
    getFriendIds();
    getOurBooks();
  }, []);

  useEffect(() => {
    axios.get('/user/id', {
      params: {
        id: userId,
      },
    }).then((response) => {
      console.log('response.data', response.data);
      userContext?.setUser(response.data);
    }).then(() => getFriendIds)
      .catch((err) => {
        console.error(err);
      });
  }, [friendIdArray]);

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
              height: '200px',
              backgroundSize: 'cover',
              backgroundPosition: 'right 40% bottom 69%',
              overflow: 'hidden',
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
                style={{ width: '100%' }}
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
          <Grid
            xs={12}
            sm={9.5}
            width="100%"
            sx={{
              height: '98vh', overflow: 'auto', paddingBottom: '9vh',
            }}
          >

            <ScrollBar
              style={{ overflow: 'hide' }}
              trackYProps={{
                renderer: (props) => {
                  const { elementRef, ...restProps } = props;
                  return <TrackYHome {...restProps} ref={elementRef} />;
                },
              }}
              thumbYProps={{
                renderer: (props) => {
                  const { elementRef, ...restProps } = props;
                  return <ThumbYHome {...restProps} ref={elementRef} />;
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
                    height: '200px',
                    backgroundImage: 'url(https://i.imgur.com/oB9cYCo.png)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
                <StyledDivider textAlign="right">
                  <Chip size="lg">
                    Your Wish List
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
                  <HomeWishList nearMeBooks={nearMeBooks} />
                </Box>
                <StyledDivider textAlign="left">
                  <FlameStyledChip size="lg">
                    Hot Places To Read
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
                  <HomePlaces />
                </Box>
                <Box
                  sx={{
                    width: '100%',
                    height: '25vh',
                    backgroundImage: 'url(https://i.imgur.com/lAKiMMj.jpg',
                    backgroundSize: 'cover',
                    backgroundPosition: 'bottom',
                  }}
                />

                <StyledDivider textAlign="right">
                  <Chip size="lg">
                    Let Us Guide You
                  </Chip>
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
                  <HomeRecommendedBooks nearMeBooks={nearMeBooks} />
                </Box>
                <StyledDivider textAlign="left">
                  <FlameStyledChip size="lg">
                    Books You Want In Your Hood
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
                  <HomeNearMe />
                </Box>
                <Box
                  sx={{
                    width: '100%',
                    height: '25vh',
                    backgroundImage: 'url(https://i.imgur.com/3IgzOa8.jpg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'top',
                  }}
                />
                <Box
                  overflow="clip"
                  alignContent="center"
                  alignItems="center"
                  sx={{
                    width: '100%',
                    minHeight: isMobile ? '90vw' : '335px',
                    maxHeight: isMobile ? '95vw' : '450px',
                  }}
                >
                  {ourBooks
              && <HomeExploreBooks ourBooks={ourBooks} nearMeBooks={nearMeBooks} />}

                </Box>
                <StyledDivider textAlign="left">
                  <Chip size="lg">
                    <Diversity2Icon />
                    Friends
                  </Chip>
                </StyledDivider>
                <Box
                  overflow="clip"
                  alignContent="center"
                  alignItems="center"
                  justifyContent="center"
                  justifyItems="center"
                  sx={{
                    width: '100%',
                    minHeight: isMobile ? '90vw' : '280px',
                    maxHeight: isMobile ? '95vw' : '350px',
                  }}
                >
                  <HomeFriends
                    friendIdArray={friendIdArray}
                    setFriendIdArray={setFriendIdArray}
                  />
                </Box>
                <Box
                  overflow="clip"
                  alignContent="center"
                  alignItems="center"
                  justifyContent="center"
                  justifyItems="center"
                  sx={{
                    width: '100%',
                    minHeight: isMobile ? '90vw' : '280px',
                    maxHeight: isMobile ? '95vw' : '370px',
                  }}
                >
                  {userId
              && (
              <FriendFinder
                friendIdArray={friendIdArray}
                userId={userId}
                setFriendIdArray={setFriendIdArray}
              />
              )}
                </Box>
                <img src="https://nobe.s3.us-east-2.amazonaws.com/Banner+Small+.png" alt="logo" style={{ height: '275px' }} />
              </Stack>
            </ScrollBar>
          </Grid>
        </Grid>
      </Box>
    </MaxWidthDiv>
  );
}

export default HomeNew;
