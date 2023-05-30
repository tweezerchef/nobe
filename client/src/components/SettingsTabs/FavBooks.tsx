/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext, useState } from 'react';
import {
  Box,
  Button, Container, FormControl, FormHelperText, Grid,
  InputAdornment, OutlinedInput, Slider, TextField,
} from '@material-ui/core';
import axios from 'axios';
import UserContext from '../../hooks/Context';
import SettingsExploreBooks from './SettingsExploreBooks';

function FavBooks() {
  return (
    <Box>
      <Box
        alignContent="right"
        alignItems="right"
        sx={{ height: '100vh', width: '100vh', ml: 30 }}
      >
        <SettingsExploreBooks />
      </Box>
    </Box>
  );
}
export default FavBooks;
