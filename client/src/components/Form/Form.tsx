/* eslint-disable max-len */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/function-component-definition */
/* eslint-disable react/jsx-no-undef */
import TextField from '@material-ui/core/TextField';
import React, { useState } from 'react';
import { Button, Paper, Input } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import FormControl from '@mui/material/FormControl';
import axios from 'axios';

const Form: React.FC = () => {
  const [textValue, setTextValue] = useState<string>('');

  const onTextChange = (e: any) => setTextValue(e.target.value);
  const handleReset = () => setTextValue('');
  const { register, handleSubmit } = useForm();
  const [name, setName] = useState('');

  const onSubmit = async () => {
    try {
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
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Paper>
      <h2>Form Demo</h2>
      <FormControl className="input-form ">
        <h4 className="create-form-heading">Create Username</h4>
        <Input className="form-control" {...register('name', { required: true })} onChange={(event) => setName(event.target.value)} />
      </FormControl>
      <Button onSubmit={handleSubmit(onSubmit)}>Submit</Button>
      <Button onClick={handleReset}>Reset</Button>
    </Paper>
  );
};
export default Form;
