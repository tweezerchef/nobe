import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Stack from '@mui/joy/Stack';
import Chip from '@mui/joy/Chip';
import Diversity2Icon from '@mui/icons-material/Diversity2';
import UserContext from '../hooks/Context';
import { FlameStyledChip, StyledDivider } from '../styles/Home/style';
import Feed from './Feed';
import HomeWishList from '../components/HomePage/HomeWishList';
import HomeUserDisplay from '../components/UserDisplay/HomeUserdisplay.';
import HomePlaces from '../components/HomePage/HomePlaces';
import HomeNearMe from '../components/HomePage/HomeNearMe';
import HomeExploreBooks from '../components/HomePage/HomeExploreBooks';
import HomeFriends from '../components/HomePage/Friends';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import HomeRecommendedBooks from '../components/HomePage/HomeRecommendedBooks';

function HomeNew() {
  const [nearMeBooks, setNearMeBooks] = useState<any[]>([]);

  const userContext = useContext(UserContext);
  const user = userContext?.user;

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
  useEffect(() => {
    getNearMeBooks();
  }, [user]);

  const colWidth = {
    xs: 12, sm: 6, md: 4, lg: 3,
  } as const;
  return (
    <Box sx={{
      flexGrow: 1, marginTop: '10px', overflow: 'auto', height: '100vh',
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
            height: '20vh',
            backgroundImage: 'url(https://i.imgur.com/ZmgMDQ2.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
          >
            <HomeUserDisplay />
          </Box>
          <Box sx={{
            width: '100%', maxHeight: '70vh', overflowY: 'auto', overflowX: 'clip',
          }}
          >
            <Feed />
          </Box>
        </Grid>
        <Grid xs={9.5} sx={{ height: '99vh', overflow: 'auto', paddingBottom: '9vh' }}>
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
                height: '20vh',
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
            <Box overflow="clip" alignContent="center" alignItems="center" sx={{ width: '100%', minHeight: '30vh', maxHeight: '33vh' }}>
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
                height: '30vh',
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
            <Box overflow="clip" alignContent="center" alignItems="center" sx={{ width: '100%', minHeight: '19vh', maxHeight: '33vh' /* adjust this */ }}>
              {/* <HomeRecommendedBooks /> */}
            </Box>
            <StyledDivider textAlign="left">
              <FlameStyledChip size="lg">
                Books You Want In Your Hood
              </FlameStyledChip>
            </StyledDivider>
            <Box overflow="clip" alignContent="center" alignItems="center" sx={{ width: '100%', minHeight: '24vh', maxHeight: '29vh' /* adjust this */ }}>
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
            <Box overflow="clip" alignContent="center" alignItems="center" sx={{ width: '100%', minHeight: '39vh', maxHeight: '43vh' /* adjust this */ }}>
              <HomeExploreBooks />
            </Box>
            <StyledDivider textAlign="left">
              <Chip size="lg">
                <Diversity2Icon />
                Friends
              </Chip>
            </StyledDivider>
            <Box overflow="clip" alignContent="center" alignItems="center" justifyContent="center" justifyItems="center" sx={{ width: '100%', maxHeight: '35vh' /* adjust this */ }}>
              <HomeFriends />
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                vh: '28vh',

              }}
            >
              <img src="https://nobe.s3.us-east-2.amazonaws.com/backroundBottomtues_auto_x3.png" style={{ height: '300px' }} alt="logo" />
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}

export default HomeNew;
