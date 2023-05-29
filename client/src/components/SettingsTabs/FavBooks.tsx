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
      <Box
        alignContent="right"
        alignItems="right"
        sx={{ height: '100vh', width: '100vh', ml: 30 }}
      >
        <ExploreBooks ourBooks={[]} nearMeBooks={[]} />
      </Box>
    </Box>
  );
}
export default FavBooks;
