/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { GeoapifyGeocoderAutocomplete, GeoapifyContext } from '@geoapify/react-geocoder-autocomplete';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import ReactiveButton from 'reactive-button';
import { Modal } from '@material-ui/core';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import Form from '../components/Form/Form';

function UserForm() {
  // const userContext = useContext(UserContext);
  // const user = userContext?.user;
  // const id = user?.id;

  // const [longitude, setLongitude] = useState(0);
  // const [latitude, setLatitude] = useState(0);
  // const [radius, setRadius] = useState(0);
  // const [convertRadius, setConvertRadius] = useState(0);
  // const [booksNearBy, setBooksNearBy] = useState<Book[]>([]);
  // const [displayBooks, setDisplayBooks] = useState<any>([]);
  // const [buttonState, setButtonState] = useState('idle');
  // const [locationState, setLocationState] = useState('idle');
  // const [radiusState, setRadiusState] = useState('idle');
  // const [userLongitude, setUserLongitude] = useState(0);
  // const [userLatitude, setUserLatitude] = useState(0);

  // useEffect(() => {
  //   const convert = radius * 32;
  //   setConvertRadius(convert);
  // }, [radius]);

  // const onPlaceSelect = (value: any) => {
  //   // console.log(value);
  //   setLatitude(value.properties.lat);
  //   setLongitude(value.properties.lon);
  //   setUserLatitude(value.properties.lat);
  //   setUserLongitude(value.properties.lon);
  // };

  // // console.log(longitude, '1');
  // // console.log(latitude, '2');
  // // console.log(radius, '3');

  // const onSuggectionChange = (value: any) => {
  //   // console.log(value);
  // };

  // const handleRadiusChange = (e: any) => {
  //   const newRadius = e.target.value;

  //   setRadius(newRadius);
  // };

  // const style = {
  //   position: 'absolute' as 'absolute',
  //   top: '50%',
  //   left: '50%',
  //   transform: 'translate(-50%, -50%)',
  //   width: 400,
  //   bgcolor: 'background.paper',
  //   border: '2px solid #000',
  //   boxShadow: 24,
  //   p: 4,
  // };

  // console.log(displayBooks, 206);

  return (
    <div>
      <Form />
    </div>

  );
}
export default UserForm;
