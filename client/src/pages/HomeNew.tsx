import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import Hidden from '@mui/material/Hidden';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Stack from '@mui/joy/Stack';
import Chip from '@mui/joy/Chip';
import Diversity2Icon from '@mui/icons-material/Diversity2';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Scrollbars } from 'react-custom-scrollbars';
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
              height: '23.48vh',
              maxHeight: '215px',
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
          <Grid
            xs={12}
            sm={9.5}
            width="100%"
            sx={{
              height: '98vh', overflow: 'auto', paddingBottom: '9vh',
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
                  height: '23.48vh',
                  maxHeight: '200px',
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
                overflow="clip"
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
              <Box overflow="clip" alignContent="center" alignItems="center" sx={{ width: '100%', minHeight: '25vh', maxHeight: '33vh' }}>
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
                {/* <HomeRecommendedBooks nearMeBooks={nearMeBooks}/> */}
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
                <HomeFriends friendIdArray={friendIdArray} />
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
                  maxHeight: isMobile ? '95vw' : '350px',
                }}
              >
                {userId
              && <FriendFinder friendIdArray={friendIdArray} userId={userId} />}
              </Box>
              <img src="https://nobe.s3.us-east-2.amazonaws.com/Banner+Small+.png" alt="logo" style={{ height: '275px' }} />
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </MaxWidthDiv>
  );
}

export default HomeNew;
