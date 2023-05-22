/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import {
  Box,
  Button, Container, FormControl, FormHelperText, Grid,
  InputAdornment, OutlinedInput, Slider, TextField,
} from '@material-ui/core';
import HomeBuildRecomendations from '../HomePage/HomeExploreBooks';

function FavBooksPlaces() {
  return (
    <Box>
      <Box justifyContent="right" sx={{ height: '100vh', width: '100vh', ml: 25 }}>
        <HomeBuildRecomendations />
      </Box>
    </Box>
  );
}
export default FavBooksPlaces;
