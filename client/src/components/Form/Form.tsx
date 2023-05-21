/* eslint-disable no-lone-blocks */
/* eslint-disable max-len */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/function-component-definition */
/* eslint-disable react/jsx-no-undef */
import { Controller, useForm } from 'react-hook-form';
import styled from 'styled-components';
import React, { useContext, useState } from 'react';
import FormControl from '@mui/material/FormControl';
import axios from 'axios';
import { GeoapifyGeocoderAutocomplete, GeoapifyContext } from '@geoapify/react-geocoder-autocomplete';
import '@geoapify/geocoder-autocomplete/styles/minimal.css';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import {
  Container,
  Grid,
  Typography,
  Button,
  TextField,
  Stepper,
  Step,
  StepLabel,
  Slider,
  Box,
  Paper,
} from '@mui/material';
import { Sheet } from '@mui/joy';
import UserContext from '../../hooks/Context';

const steps = ['Step 1', 'Step 2', 'Step 3', 'Step 4'];
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

type FormData = {
  firstName: string;
  lastName: string;
};

const Form: React.FC = () => {
  const userContext = useContext(UserContext);
  const user = userContext?.user;
  const id = user?.id;
  const [formData, setFormData] = useState({});
  const {
    register, handleSubmit, reset, control,
  } = useForm();
  const onSubmit = (data: any) => console.log(data);

  const [name, setName] = useState('');
  const [longitude, setLongitude] = useState(0);
  const [latitude, setLatitude] = useState(0);
  const [radius, setRadius] = useState(0);

  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleChange = (event:any) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  // const onSubmit = async () => {
  //   try {
  // const res = await axios.put(`/location/${id}/coordinates`, {
  //   name,
  //   longitidue: longitude,
  //   latitude,
  //   radius,
  //   favBooks: endTime,
  //   favReadingSpots: description,
  //   Hobbies: location,
  //   favGenres: invites,
  // });
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };
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
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Grid container direction="column" alignItems="center" spacing={2}>
        <Grid item xs={12}>
          {activeStep === 0 && (
            <div>
              <Box sx={{ marginTop: 2, width: 300 }}>
                <Typography variant="h6">Step 1 - User Information</Typography>
                <Controller
                  name="textValue"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <TextField onChange={onChange} value={value} label="Name" />
                  )}
                />
              </Box>
              <Box sx={{ marginTop: 2, width: 300 }}>
                <Grid container spacing={1}>
                  <Grid xs={8}>
                    <h5>Enter Address</h5>
                    <GeoapifyContext apiKey="6d182d93697140e88a9e75ab8d892bc5">
                      <GeoapifyGeocoderAutocomplete
                        placeholder="Enter address here"
                        placeSelect={onPlaceSelect}
                        suggestionsChange={onSuggectionChange}
                      />
                    </GeoapifyContext>
                  </Grid>
                  <Grid xs={4}>
                    <h5>Set Radius</h5>
                    <FormControl sx={{ m: 1, width: '7ch' }} variant="outlined">
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
              </Box>
              <Box sx={{ marginTop: 2, width: 300 }}>
                <Slider
                  aria-label="Always visible"
                  value={radius}
                  getAriaValueText={valuetext}
                  onChange={handleRadiusChange}
                  step={5}
                  marks={marks}
                  valueLabelDisplay="auto"
                />
              </Box>
            </div>
          )}
          {activeStep === 1 && (
            <>
              <Typography variant="h6">Step 2 - Favorite Books & Places to Read</Typography>
              <TextField
                label="Email"
                name="email"
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            </>
          )}
          {activeStep === 2 && (
            <>
              <Typography variant="h6">Step 3 - Favorite Genres & Hobbies</Typography>
              <TextField
                label="Phone"
                name="phone"
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            </>
          )}
          {activeStep === 3 && (
            <>
              <Typography variant="h6">Step 4</Typography>
              <TextField
                label="Phone"
                name="phone"
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            </>
          )}
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleNext}
            disabled={activeStep === steps.length - 1}
          >
            {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
          </Button>
          {activeStep > 0 && (
            <Button
              variant="contained"
              color="secondary"
              onClick={handleBack}
              sx={{ marginLeft: 8 }}
            >
              Back
            </Button>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Form;
