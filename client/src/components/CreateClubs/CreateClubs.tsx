import React, { useState, useContext } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { Button } from '@material-ui/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import GifSearch from './GifSearch';
import UserContext from '../../hooks/Context';
import PhotoUpload from '../Button/ImageUploadButton';

const createClubs = (props: any) => {
  const [clubName, setClubName] = useState('');
  const [clubDescription, setClubDescription] = useState('');
  const [clubImage, setClubImage] = useState(null);
  const { setClubs, handleClose } = props;

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

    // const body = {
    //   name: clubName,
    //   description: clubDescription,
    //   image: clubImage,
    //   userId: user?.id,
    //   email: user?.email,
    // };
    if (user && user.id && user.email && clubImage) {
      const data = new FormData();
      data.append('name', clubName);
      data.append('description', clubDescription);
      data.append('userId', user?.id);
      data.append('email', user?.email);
      data.append('image', clubImage);
      try {
        axios.post('/api/create-club', data)
          .then((response) => {
            setClubs(response.data.clubs);
            setClubName('');
            setClubDescription('');
            return response;
          }).then((response) => {
            if (setUser && response?.data?.user && response?.data?.user !== undefined) {
              setUser(response?.data?.user);
            }
          });
        handleClose();
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <Box
      component="form"
      sx={{
        // maxWidth: '100%',
        margin: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& > :not(style)': { m: 1 },
        justifyContent: 'center',
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        autoFocus
        id="club-name"
        label="Club Name"
        variant="outlined"
        type="string"
        fullWidth
        value={clubName}
        onChange={(e) => setClubName(e.target.value)}
        required
      />
      <TextField
        id="club-description"
        label="Club Description"
        variant="outlined"
        type="string"
        fullWidth
        value={clubDescription}
        onChange={(e) => setClubDescription(e.target.value)}
        required
      />
      {/* <GifSearch setClubImage={setClubImage} /> */}
      <PhotoUpload setClubImage={setClubImage} />
      <Button variant="contained" color="primary" onClick={() => handleSubmit()}>
        Create Club
      </Button>
    </Box>
  );
};

export default createClubs;
