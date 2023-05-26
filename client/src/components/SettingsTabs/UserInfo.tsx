/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext, useEffect, useState } from 'react';
import {
  Box,
  Button, Container, Slider, TextField, Grid,
} from '@material-ui/core';
import { useLocation } from 'react-router-dom';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import styled from 'styled-components';
import { Sheet } from '@mui/joy';
import { GeoapifyGeocoderAutocomplete, GeoapifyContext } from '@geoapify/react-geocoder-autocomplete';
import '@geoapify/geocoder-autocomplete/styles/minimal.css';
import ReactiveButton from 'reactive-button';
import axios from 'axios';
import UserContext from '../../hooks/Context';
import PhotoUpload from '../Button/ImageUploadButton';

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
  const userContext = useContext(UserContext);
  const user = userContext?.user;
  const id = user?.id;

  const [userImage, setUserImage] = useState<string | null>(null);
  // console.log('userImage', userImage);
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [longitude, setLongitude] = useState(0);
  const [latitude, setLatitude] = useState(0);
  const [radius, setRadius] = useState(0);
  const [buttonState, setButtonState] = useState('idle');
  const location = useLocation();

  const updateUserInfo = async () => {
    if (user && user.id) {
      const data = new FormData();
      if (userImage) {
        data.append('image', userImage);
      }
      if (username) {
        data.append('username', username);
      }
      if (firstName) {
        data.append('firstName', firstName);
      }
      if (lastName) {
        data.append('lastName', lastName);
      }
      if (phoneNumber) {
        data.append('phoneNumber', phoneNumber);
      }
      if (longitude) {
        data.append('longitude', longitude.toString());
      }
      if (latitude) {
        data.append('latitude', latitude.toString());
      }
      if (radius) {
        data.append('radius', radius.toString());
      }
      setButtonState('loading');
      try {
        const res = await axios.put(`/user-settings/${id}/preferences`, data);
        // console.log(res);
        const updatedUser = res.data;
        setTimeout(() => {
          setButtonState('success');
        }, 2000);
      } catch (err) {
        console.error(err);
      }
    }
  };

  useEffect(() => {
    if (location.state !== null) {
      const myData = location.state;
      console.log(myData, 118);
      setUsername(myData);
    }
  }, [location]);

  useEffect(() => {
    if (user?.picture) {
      setUserImage(user.picture);
    }
  }, [user?.picture]);

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
      height: '100vh', width: '75%', ml: 20,
    }}
    >
      <Container>
        { user?.picture === undefined ? (
          <ProfileImage
            alt="User Pic"
            src="https://d30y9cdsu7xlg0.cloudfront.net/png/138926-200.png"
            id="profile-image1"
            height="250"
          />
        )
          : (
            <ProfileImage
              alt="User Pic"
              src={user?.picture}
              id="profile-image1"
              height="250"
            />
          )}

        <PhotoUpload setClubImage={setUserImage} />
        <UserDetail>
          <form>
            { location.state === null ? (
              <TextField
                defaultValue={user?.username}
                label="Username"
                variant="outlined"
                fullWidth
                margin="normal"
                onChange={(event) => setUsername(event.target.value)}
              />
            ) : (
              <TextField
                defaultValue={username}
                label="Username"
                variant="outlined"
                fullWidth
                margin="normal"
                onChange={(event) => setUsername(event.target.value)}
              />
            )}
            <TextField
              defaultValue={user?.firstName}
              label="First Name"
              variant="outlined"
              fullWidth
              margin="normal"
              onChange={(event) => setFirstName(event.target.value)}
            />
            <TextField
              defaultValue={user?.lastName}
              label="Last Name"
              variant="outlined"
              fullWidth
              margin="normal"
              onChange={(event) => setLastName(event.target.value)}
            />
            <TextField
              label="Mobile Number"
              variant="outlined"
              fullWidth
              margin="normal"
              onChange={(event) => setPhoneNumber(event.target.value)}
            />
            <Box sx={{ mt: 2 }}>
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
            <Box sx={{ mt: 4, width: 'auto' }}>
              <ReactiveButton
                rounded
                size="medium"
                buttonState={buttonState}
                idleText="Update User Information"
                loadingText="Loading"
                successText="Done"
                onClick={updateUserInfo}
                color="blue"
              />
            </Box>
          </form>
        </UserDetail>
      </Container>
    </Box>
  );
}

export default UserInfo;
