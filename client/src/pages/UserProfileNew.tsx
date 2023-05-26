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
import ProfileCard from '../components/HomePage/ProfileCard/ProfileCard';

function UserProfile() {
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
            height: '25vh',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
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
                height: '23.48vh',
                backgroundImage: 'url(https://i.imgur.com/oB9cYCo.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}

export default UserProfile;
