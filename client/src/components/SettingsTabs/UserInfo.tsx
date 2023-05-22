/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import {
  Box,
  Button, Container, Slider, TextField, Grid,
} from '@material-ui/core';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import styled from 'styled-components';
import { Sheet } from '@mui/joy';
import { GeoapifyGeocoderAutocomplete, GeoapifyContext } from '@geoapify/react-geocoder-autocomplete';
import '@geoapify/geocoder-autocomplete/styles/minimal.css';

const UserDetail = styled.div({
  position: 'relative',
});

const ProfileImage = styled.img({
  borderRadius: '50%',
  boxShadow: '0px 0px 5px 0px #c1c1c1',
  cursor: 'pointer',
  width: '100px',
  height: '100px',
});

const marks = [
  {
    value: 0,
    label: '0 mi',
  },
  {
    value: 25,
    label: '25 mi',
  },
  {
    value: 50,
    label: '50 mi',
  },
  {
    value: 75,
    label: '75 mi',
  },
  {
    value: 100,
    label: '100 mi',
  },
];
function UserInfo() {
  const [image, setImage] = useState('');

  const [name, setName] = useState('');
  const [longitude, setLongitude] = useState(0);
  const [latitude, setLatitude] = useState(0);
  const [radius, setRadius] = useState(0);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target) {
          setImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const onPlaceSelect = (value: any) => {
    // console.log(value);
    setLatitude(value.properties.lat);
    setLongitude(value.properties.lon);
  };
  const onSuggectionChange = (value: any) => {
    // console.log(value);
  };

  const handleRadiusChange = (e: any) => {
    const newRadius = e.target.value;

    setRadius(newRadius);
  };

  const valuetext = (value: number) => `${value}Â°C`;

  return (
    <Box sx={{
      height: '100vh', width: '100%', justifyContent: 'center', alignItems: 'center',
    }}
    >
      <Container>
        <ProfileImage
          alt="User Pic"
          src="https://d30y9cdsu7xlg0.cloudfront.net/png/138926-200.png"
          id="profile-image1"
          height="200"
        />
        <input
          id="profile-image-upload"
          className="hidden"
          type="file"
          onChange={() => {}}
        />
        <UserDetail>
          <form>
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <TextField
              label="First Name"
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <TextField
              label="Last Name"
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <TextField
              label="Mobile Number"
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <TextField
              label="Favorite Generes"
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <TextField
              label="Favorite Hobbies"
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <Box>
              <h3> Location Preferences </h3>
              <Grid container spacing={1}>
                <Grid xs={4}>
                  <GeoapifyContext apiKey="6d182d93697140e88a9e75ab8d892bc5">
                    <GeoapifyGeocoderAutocomplete
                      placeholder="Enter address here"
                      placeSelect={onPlaceSelect}
                      suggestionsChange={onSuggectionChange}
                    />
                  </GeoapifyContext>
                </Grid>
                <Grid xs={3}>
                  <FormControl sx={{ m: 1, width: '10ch' }} variant="outlined">
                    <OutlinedInput
                      sx={{ height: '4ch' }}
                      id="outlined-adornment-weight"
                      endAdornment={<InputAdornment position="end">mi</InputAdornment>}
                      onChange={handleRadiusChange}
                      value={radius}
                    />
                    <FormHelperText id="outlined-weight-helper-text">Miles</FormHelperText>
                  </FormControl>
                </Grid>
                <Grid xs={4}>
                  <Slider
                    aria-label="Always visible"
                    value={radius}
                    getAriaValueText={valuetext}
                    onChange={handleRadiusChange}
                    step={5}
                    marks={marks}
                    valueLabelDisplay="auto"
                  />
                </Grid>
              </Grid>
            </Box>
            <Button variant="contained" color="primary" fullWidth>
              Update Profile
            </Button>
          </form>
        </UserDetail>
      </Container>
    </Box>
  );
}
export default UserInfo;
