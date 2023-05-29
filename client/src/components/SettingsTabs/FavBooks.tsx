/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import {
  Box,
  Button, Container, FormControl, FormHelperText, Grid,
  InputAdornment, OutlinedInput, Slider, TextField,
} from '@material-ui/core';
import ExploreBooks from '../HomePage/HomeExploreBooks';

function FavBooks() {
  return (
    <Box>
      <Box justifyContent="right" sx={{ height: '100vh', width: '100vh', ml: 25 }}>
        <ExploreBooks ourBooks={[]} nearMeBooks={[]} />
      </Box>
    </Box>
  );
}
export default FavBooks;
