import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { Button } from '@mui/material';
import GifSearch from './GifSearch';

const createClubs = (props: any) => {
  const [clubName, setClubName] = useState('');
  const [clubDescription, setClubDescription] = useState('');
  const [clubImage, setClubImage] = useState('');
  const { setClubs } = props;

  const handleSubmit = async () => {
    if (!clubName || !clubDescription || !clubImage) {
      alert('Please enter a value for all fields!');
      return;
    }

    const existingClubs = await axios.get('/api/clubs');
    const clubExists = existingClubs.data.some((club: { name: string; }) => club.name === clubName);

    if (clubExists) {
      alert('Club name already exists!');
      return;
    }
    const user = localStorage.getItem('user');
    if (!user) {
      throw new Error('No user found');
    }
    const parsed = JSON.parse(user);
    const { id } = parsed;

    const body = {
      name: clubName,
      description: clubDescription,
      image: clubImage,
      userId: id,
    };
    try {
      axios.post('/api/create-club', body)
        .then((data) => {
          setClubs(data.data);
          setClubName('');
          setClubDescription('');
          setClubImage('');
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box
      component="form"
      sx={{
        maxWidth: '600px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& > :not(style)': { m: 1, width: '25ch' },
        justifyContent: 'center',
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="club-name"
        label="Club Name"
        variant="outlined"
        value={clubName}
        onChange={(e) => setClubName(e.target.value)}
        required
      />
      <TextField
        id="club-description"
        label="Club Description"
        variant="outlined"
        value={clubDescription}
        onChange={(e) => setClubDescription(e.target.value)}
        required
      />
      <GifSearch setClubImage={setClubImage} />
      <Button variant="contained" color="primary" onClick={() => handleSubmit()}>
        Create a new club
      </Button>
    </Box>
  );
};

export default createClubs;
