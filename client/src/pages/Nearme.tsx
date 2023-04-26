import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { GeoapifyGeocoderAutocomplete, GeoapifyContext } from '@geoapify/react-geocoder-autocomplete'
import BookDisplay from "../components/MattsBookDisplay/BookDisplay";
import Navbar from "../components/Navbar/Navbar";
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import ReactiveButton from 'reactive-button';
import Grid from '@mui/material/Grid';
import OpenIconSpeedDial from "../components/ActionButton/ActionButton";
import ButtonGroup from '@mui/material/ButtonGroup';
import Card from "@mui/joy/Card/Card";
import { CardContent } from "@material-ui/core";
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';



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


const userString = localStorage.getItem('user');
const user = userString ? JSON.parse(userString) : null;
let id: string
user ? (id = user.id) : (id = '');


function Locations() {

const [longitude, setLongitude] = useState(0);
const [latitude, setLatitude] = useState(0);
const [radius, setRadius] = useState(0);
const [covertRadius, setConvertRadius] = useState(0);
const [booksNearBy, setBooksNearBy] = useState<Book[]>([]);
const [displayBooks, setDisplayBooks] = useState<any>([])
const [buttonState, setButtonState] = useState('idle');
const [locationState, setLocationState] = useState('idle');
const [radiusState, setRadiusState] = useState('idle');
const [userLongitude, setUserLongitude] = useState(0);
const [userLatitude, setUserLatitude] = useState(0);

const  saveLocation = async () => {
  setLocationState('saving');
  try {
    const res = await axios.put(`/location/${user.id}`, {
      longitude: userLongitude,
      latitude: userLatitude
    });
    console.log(res)
    setTimeout(() => {
      setLocationState('success');
    }, 2000);
  } catch (err) {
    console.error(err);
  }

}

const saveRadius = async () => {
  setRadiusState('saving');
  try {
    const res = await axios.put(`/location/${user.id}`, {
      radius: radiusState
    });
    console.log(res)
    setTimeout(() => {
      setRadiusState('success');
    }, 1500);
  } catch (err) {
    console.error(err);
  }

}


const  getBooksNearMe = async () => {
  setButtonState('loading');
  try {
    const res = await axios.get('/location/locations', { params: {lon: longitude, lat: latitude, radius: covertRadius } });
    //console.log(res);
    setBooksNearBy(res.data.userBooks);
    setTimeout(() => {
      setButtonState('success');
    }, 2000);
  } catch (err) {
    //console.error(err);
  }

}

console.log(booksNearBy, 'booksNeaBy')

useEffect(() => {
  const ownedBooks = booksNearBy.flat().filter(book => book.owned === true).map((book) => book.books);
 // console.log(ownedBooks, '69');
  setDisplayBooks(ownedBooks);
}, [booksNearBy]);


useEffect(() => {
 const convert = radius * 32;
 setConvertRadius(convert);
}, [radius]);
//console.log(displayBooks, 'displaybooks');


const onPlaceSelect = (value: any) => {
 // console.log(value);
  setLatitude(value.properties.lat);
  setLongitude(value.properties.lon);
  setUserLatitude(value.properties.lat);
  setUserLongitude(value.properties.lon);
}

// console.log(longitude, '1');
// console.log(latitude, '2');
// console.log(radius, '3');


  const onSuggectionChange = (value: any) => {
   // console.log(value);
  }

  const handleRadiusChange = (e: any) => {
    const newRadius = e.target.value

    setRadius(newRadius);
  };









return (
   <div>
<Grid style={{ display: "flex", justifyContent: "center"}} container rowSpacing={1} columnSpacing={{ xs: 1 }}>
<Grid xs={3}>
<Card sx={{ height: 150, width: 300 }}>
      <h1>Enter Address</h1>
      <GeoapifyContext apiKey="6d182d93697140e88a9e75ab8d892bc5">
        <GeoapifyGeocoderAutocomplete
          placeholder="Enter address here"
          placeSelect={onPlaceSelect}
          suggestionsChange={onSuggectionChange}
        />
    </GeoapifyContext>
    </Card>
    </Grid>
    <Grid xs={3}>
    <Card sx={{ height: 150, width: 300 }}>
    <h1>Set Radius</h1>
    <FormControl sx={{ m: 1, width: '18ch' }} variant="outlined">
          <OutlinedInput sx={{height: '3ch' }}
            id="outlined-adornment-weight"
            endAdornment={<InputAdornment position="end">mi</InputAdornment>}
            aria-describedby="outlined-weight-helper-text"
            onChange={handleRadiusChange}
            value={radius}
          />
          <FormHelperText id="outlined-weight-helper-text">Miles</FormHelperText>
          <Slider defaultValue={0} value={radius}
      onChange={handleRadiusChange}aria-label="Default" valueLabelDisplay="auto" />
        </FormControl>
    </Card>
    </Grid>
    </Grid>
    <ButtonGroup style={{ display: "flex", justifyContent: "center"}}>
    <ReactiveButton
      rounded
      size="small"
      buttonState={locationState}
      idleText="Save Location"
      loadingText="Loading"
      successText="Done"
      onClick={saveLocation}
      color="blue"
    />
    <ReactiveButton
      rounded
      size="small"
      buttonState={radiusState}
      idleText="Save Radius"
      loadingText="Saving"
      successText="Done"
      onClick={saveRadius}
      color="blue"
    />
     <ReactiveButton
      rounded
      size="small"
      buttonState={buttonState}
      idleText="Search For Books"
      loadingText="Loading"
      successText="Done"
      onClick={getBooksNearMe}
      color="blue"
    />
    </ButtonGroup>
    <BookDisplay books={displayBooks} id={id} />
    </div>
  )



}
export default Locations;