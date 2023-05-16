/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { GeoapifyGeocoderAutocomplete, GeoapifyContext } from '@geoapify/react-geocoder-autocomplete';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import ReactiveButton from 'reactive-button';
import Grid from '@mui/material/Grid';
import ButtonGroup from '@mui/material/ButtonGroup';
import Card from '@mui/joy/Card/Card';
import { Button, CardContent } from '@material-ui/core';
import ModalClose from '@mui/joy/ModalClose';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import UserContext from '../../hooks/Context';

interface NearByProps {
  handleClose: (params: false) => void;
}

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

function NearBy({ handleClose }: NearByProps) {
  const userContext = useContext(UserContext);
  const user = userContext?.user;
  const id = user?.id;
  console.log(user, 31);

  const [longitude, setLongitude] = useState(0);
  const [latitude, setLatitude] = useState(0);
  const [radius, setRadius] = useState(0);
  const [convertRadius, setConvertRadius] = useState(0);
  const [booksNearBy, setBooksNearBy] = useState<any>([]);
  const [displayBooks, setDisplayBooks] = useState<any>([]);
  const [buttonState, setButtonState] = useState('idle');
  const [locationState, setLocationState] = useState('idle');
  const [radiusState, setRadiusState] = useState('idle');
  const [userLongitude, setUserLongitude] = useState(0);
  const [userLatitude, setUserLatitude] = useState(0);
  const [userLocation, setUserLocation] = useState<any>([]);

  const navigate = useNavigate();

  const getUserLocation = async () => {
    try {
      const res = await axios.get(`/location/${id}/location`);
      // console.log(res, 45);
      setUserLocation(res.data);
    } catch (error) {
      // console.error(error);
    }
  };

  // console.log(userLocation, 52);
  const handleLookForBooksClick = async () => {
    setButtonState('loading');
    try {
      getUserLocation();
      const response = await axios.get('/location/locations', { params: { lon: userLocation.longitude, lat: userLocation.latitude, radius: userLocation.radius } });
      const data = await response.data;
      navigate('/locations', { state: data });
    } catch (error) {
      console.error(error);
    }
  };
  const saveLocation = async () => {
    setLocationState('loading');
    // console.log(userLongitude, userLongitude, 63)
    try {
      const res = await axios.put(`/location/${id}/location`, {
        longitude: userLongitude,
        latitude: userLatitude,
        radius,
      });
      getUserLocation();
      // console.log(res, 68);
      setTimeout(() => {
        setLocationState('success');
      }, 2000);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const convert = radius * 32;
    setConvertRadius(convert);
  }, [radius]);

  const onPlaceSelect = (value: any) => {
    // console.log(value);
    setLatitude(value.properties.lat);
    setLongitude(value.properties.lon);
    setUserLatitude(value.properties.lat);
    setUserLongitude(value.properties.lon);
  };

  const onSuggectionChange = (value: any) => {
    // console.log(value);
  };

  const handleRadiusChange = (e: any) => {
    const newRadius = e.target.value;

    setRadius(newRadius);
  };

  // const handleOpen = () => setOpen(true);

  const valuetext = (value: number) => `${value}°C`;
  // console.log(displayBooks, 154);

  return (
    <div>
      <ModalClose
        variant="outlined"
        sx={{
          position: 'absolute',
          top: '16px',
          right: '16px',
          boxShadow: '0 2px 12px 0 rgba(0 0 0 / 0.2)',
          borderRadius: '50%',
          bgcolor: 'background.body',
        }}
        onClick={() => handleClose(false)}
      />
      <Grid container spacing={1}>
        <Grid xs={7}>
          <h5>Enter Address</h5>
          <GeoapifyContext apiKey="6d182d93697140e88a9e75ab8d892bc5">
            <GeoapifyGeocoderAutocomplete
              placeholder="Enter address here"
              placeSelect={onPlaceSelect}
              suggestionsChange={onSuggectionChange}
            />
          </GeoapifyContext>
        </Grid>
        <Grid xs={5}>
          <h5>Set Radius</h5>
          <FormControl sx={{ m: 1, width: '8ch' }} variant="outlined">
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
      </Grid>
      <Box sx={{ marginTop: 2, width: 300 }}>
        <Slider
          defaultValue={0}
          value={radius}
          onChange={handleRadiusChange}
          aria-label="Default"
          valueLabelDisplay="auto"
        />
      </Box>
      <Box sx={{ marginTop: 2 }}>
        <Grid container spacing={1}>
          <Grid xs={6}>
            <ReactiveButton
              rounded
              size="medium"
              buttonState={locationState}
              idleText="Save Location"
              loadingText="Saving"
              successText="Done"
              onClick={saveLocation}
              color="blue"
            />
          </Grid>
          <Grid xs={6}>
            <ReactiveButton
              rounded
              size="medium"
              buttonState={buttonState}
              idleText="Look for Books"
              loadingText="Loading"
              successText="Done"
              onClick={handleLookForBooksClick}
              color="blue"
            />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
export default NearBy;
