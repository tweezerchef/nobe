/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { GeoapifyGeocoderAutocomplete, GeoapifyContext } from '@geoapify/react-geocoder-autocomplete';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import ReactiveButton from 'reactive-button';
import Grid from '@mui/material/Grid';
import ButtonGroup from '@mui/material/ButtonGroup';
import Card from '@mui/joy/Card/Card';
import { Button, CardContent, Modal } from '@material-ui/core';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import OpenIconSpeedDial from '../components/ActionButton/ActionButton';
import BookDisplay from '../components/BookDisplay/BookDisplay';
import UserContext from '../hooks/Context';
import UserDisplay from '../components/UserDisplay/Userdisplay';

interface UserBook {
  Books: Book;
  // Add any other properties if necessary
}

interface Book {
  books: {
    id: string;
    title: string;
    author: string;
    image: string;
  }
  id: string;
  userId: string;
  wishlist: boolean;
  owned: boolean;
}

interface Props {
  radius: number;
  setRadius: (value: number) => void;
}

function Locations() {
  const userContext = useContext(UserContext);
  const user = userContext?.user;
  const id = user?.id;

  // console.log(user);

  const [longitude, setLongitude] = useState(0);
  const [latitude, setLatitude] = useState(0);
  const [radius, setRadius] = useState(0);
  const [convertRadius, setConvertRadius] = useState(0);
  const [booksNearBy, setBooksNearBy] = useState<Book[]>([]);
  const [displayBooks, setDisplayBooks] = useState<any>([]);
  const [buttonState, setButtonState] = useState('idle');
  const [locationState, setLocationState] = useState('idle');
  const [radiusState, setRadiusState] = useState('idle');
  const [userLongitude, setUserLongitude] = useState(0);
  const [userLatitude, setUserLatitude] = useState(0);
  // const [isUserLoaded, setIsUserLoaded] = useState(false);
  const [open, setOpen] = React.useState(false);

  const location = useLocation();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const saveLocation = async () => {
    setLocationState('loading');
    // console.log(userLongitude, userLongitude, 63)
    try {
      const res = await axios.put(`/location/${id}/coordinates`, {
        longitude: userLongitude,
        latitude: userLatitude,
      });
      // console.log(res, 68)
      setTimeout(() => {
        setLocationState('success');
      }, 2000);
    } catch (err) {
      // console.error(err);
    }
  };

  const saveRadius = async () => {
    setRadiusState('loading');
    // console.log(convertRadius, 82);
    try {
      const res = await axios.put(`/location/${id}/radius`, {
        radius,
      });
      // console.log(res, 84)
      setTimeout(() => {
        setRadiusState('success');
      }, 1500);
    } catch (err) {
    // console.error(err);
    }
  };

  const getBooksNearMe = async () => {
    setButtonState('loading');
    try {
      const res = await axios.get('/location/locations', { params: { lon: user?.longitude, lat: user?.latitude, radius: user?.radius } });
      // console.log(res.data, 99);
      setBooksNearBy(res.data);
      setTimeout(() => {
        setButtonState('success');
      }, 2000);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (!location.state === null) {
      const myData = location.state;
      setDisplayBooks(myData);
    }
  }, [location]);

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

  // console.log(longitude, '1');
  // console.log(latitude, '2');
  // console.log(radius, '3');

  const onSuggectionChange = (value: any) => {
    // console.log(value);
  };

  const handleRadiusChange = (e: any) => {
    const newRadius = e.target.value;

    setRadius(newRadius);
  };

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  // console.log(displayBooks, 206);

  return (

    <div style={{ overflow: 'auto' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{
          display: 'flex', justifyContent: 'center', width: '100%', height: '60px', background: 'rgb(32, 32, 35)',
        }}
        >
          <div style={{
            display: 'flex', justifyContent: 'center', maxWidth: '800px', width: '100%',
          }}
          >
            <ReactiveButton
              rounded
              size="medium"
              buttonState={buttonState}
              idleText="Search For Books"
              loadingText="Loading"
              successText="Done"
              onClick={getBooksNearMe}
              color="blue"
              style={{ margin: '10px' }}
            />
            <ReactiveButton
              rounded
              size="medium"
              idleText="Set Location Preference"
              onClick={handleOpen}
              color="blue"
              style={{ margin: '10px' }}
            />
            <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
              <Box sx={style}>
                <h1>Enter Address</h1>
                <GeoapifyContext apiKey="6d182d93697140e88a9e75ab8d892bc5">
                  <GeoapifyGeocoderAutocomplete
                    placeholder="Enter address here"
                    placeSelect={onPlaceSelect}
                    suggestionsChange={onSuggectionChange}
                  />
                </GeoapifyContext>
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
                <h1>Set Radius</h1>
                <FormControl sx={{ m: 1, width: '18ch' }} variant="outlined">
                  <OutlinedInput
                    sx={{ height: '3ch' }}
                    id="outlined-adornment-weight"
                    endAdornment={<InputAdornment position="end">mi</InputAdornment>}
                    onChange={handleRadiusChange}
                    value={radius}
                  />
                  <FormHelperText id="outlined-weight-helper-text">Miles</FormHelperText>
                  <Slider
                    defaultValue={0}
                    value={radius}
                    onChange={handleRadiusChange}
                    aria-label="Default"
                    valueLabelDisplay="auto"
                  />
                </FormControl>
                <ReactiveButton
                  rounded
                  size="medium"
                  buttonState={radiusState}
                  idleText="Save Radius"
                  loadingText="Saving"
                  successText="Done"
                  onClick={saveRadius}
                  color="blue"
                />
              </Box>
            </Modal>
          </div>
        </div>
      </div>
      {location.state === null ? (
        // eslint-disable-next-line @typescript-eslint/no-shadow
        booksNearBy.map((user: any) => (
          <UserDisplay user={user} key={user.id} />
        ))
      ) : (
        // eslint-disable-next-line @typescript-eslint/no-shadow
        location.state.map((user: any) => (
          <UserDisplay user={user} key={user.id} />
        ))
      )}
    </div>
  );
}
export default Locations;
