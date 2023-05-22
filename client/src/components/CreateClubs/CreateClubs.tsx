import React, { useState, useContext } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { Button } from '@material-ui/core';
import GifSearch from './GifSearch';
import UserContext from '../../hooks/Context';
import PhotoUpload from '../Button/ImageUploadButton';

const createClubs = (props: any) => {
  const [clubName, setClubName] = useState('');
  const [clubDescription, setClubDescription] = useState('');
  const [clubImage, setClubImage] = useState(null);
  const { setClubs } = props;

  const userContext = useContext(UserContext);
  const user = userContext?.user;
  const setUser = userContext?.setUser;
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

    const body = {
      name: clubName,
      description: clubDescription,
      image: clubImage,
      userId: user?.id,
      email: user?.email,
    };
    try {
      axios.post('/api/create-club', body)
        .then((data) => {
          setClubs(data.data.clubs);
          setClubName('');
          setClubDescription('');
          return data;
        }).then((data) => {
          if (setUser && data?.data?.user && data?.data?.user !== undefined) {
            setUser(data?.data?.user);
          }
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
      <PhotoUpload setClubImage={setClubImage} />
      <Button variant="contained" size="small" color="primary" onClick={() => handleSubmit()}>
        Create Club
      </Button>
    </Box>
  );
};

export default createClubs;
