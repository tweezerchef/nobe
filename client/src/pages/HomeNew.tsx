import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Stack from '@mui/joy/Stack';
import Chip from '@mui/material/Chip';
import { FlameStyledChip, StyledDivider } from '../styles/Home/style';
import Feed from './Feed';
import HomeWishList from '../components/HomePage/HomeWishList';
import HomeUserDisplay from '../components/UserDisplay/HomeUserdisplay.';
import HomePlaces from '../components/HomePage/HomePlaces';
import HomeRecommendedBooks from '../components/HomePage/HomeRecommendedBooks';

function HomeNew() {
  const colWidth = {
    xs: 12, sm: 6, md: 4, lg: 3,
  } as const;
  return (
    <Box sx={{ flexGrow: 1, marginTop: '10px' }}>
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
        <Grid xs={2}>
          <HomeUserDisplay />
          <Feed />
        </Grid>
        <Grid xs={10}>
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
                height: '200px', // Adjust the height of the banner as needed
                backgroundImage: 'url(https://i.imgur.com/oB9cYCo.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
            <StyledDivider textAlign="right">
              <Chip color="primary" label="Your Wish List" />
            </StyledDivider>
            <Box overflow="clip" alignContent="center" alignItems="center" sx={{ width: '100%', height: '30vh' /* adjust this */ }}>
              <HomeWishList />
            </Box>
            <StyledDivider textAlign="left">
              <FlameStyledChip label="Hot Places To Read" />
            </StyledDivider>
            <Box overflow="clip" alignContent="center" alignItems="center" sx={{ width: '100%', height: '30vh' /* adjust this */ }}>
              <HomePlaces />
            </Box>
            <Box
              sx={{
                width: '100%',
                height: '400px', // Adjust the height of the banner as needed
                backgroundImage: 'url(https://i.imgur.com/lAKiMMj.jpg',
                backgroundSize: 'cover',
                backgroundPosition: 'bottom',
              }}
            />

            <StyledDivider textAlign="right">
              <Chip color="primary" label="Let Us Guide You" />
            </StyledDivider>
            <Box overflow="clip" alignContent="center" alignItems="center" sx={{ width: '100%', height: '30vh' /* adjust this */ }}>
              <HomeRecommendedBooks />
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}

export default HomeNew;
