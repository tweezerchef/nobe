/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext, useState } from 'react';
import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import ReactiveButton from 'reactive-button';
import UserContext from '../../hooks/Context';

const hobbies = [
  'Reading',
  'Sports',
  'Photography',
  'Cooking',
  'Painting',
  'Gardening',
  'Traveling',
  'Hiking',
  'Music',
  'Dancing',
  'Writing',
  'Yoga',
  'Gaming',
  'Fishing',
  'Cycling',
  'Singing',
  'Knitting',
  'Running',
  'Film/TV',
  'Crafting',
  'Collecting',
  'Chess',
  'Volunteering',
  'Playing an instrument',
  'Board games',
];

function FavHobbies() {
  const userContext = useContext(UserContext);
  const user = userContext?.user;
  const id = user?.id;

  const [checkedHobbies, setCheckedHobbies] = useState<string[]>([]);
  const [buttonState, setButtonState] = useState('idle');

  const updateUserHobbies = async () => {
    setButtonState('loading');
    try {
      const res = await axios.put(`/user/${id}/hobbies`, {
      });
      console.log(res);
      setTimeout(() => {
        setButtonState('success');
      }, 2000);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const hobby = event.target.name;
    if (event.target.checked) {
      setCheckedHobbies((prevState) => [...prevState, hobby]);
    } else {
      setCheckedHobbies((prevState) => prevState.filter((item) => item !== hobby));
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <h1> Select Your Favorite Hobbies! </h1>
      <Grid container spacing={2} justifyContent="center">
        {[0, 1, 2, 3, 4].map((column) => (
          <Grid key={column} item xs={12} sm={6} md={4} lg={3}>
            <FormControl component="fieldset" variant="standard">
              <FormGroup>
                {hobbies.slice(column * 5, column * 5 + 5).map((hobby) => (
                  <FormControlLabel
                    key={hobby}
                    control={(
                      <Checkbox
                        checked={checkedHobbies.includes(hobby)}
                        onChange={handleChange}
                        name={hobby}
                      />
                    )}
                    label={hobby}
                  />
                ))}
              </FormGroup>
            </FormControl>
          </Grid>
        ))}
      </Grid>
      <ReactiveButton
        rounded
        size="medium"
        buttonState={buttonState}
        idleText="Update Your Favorite Hobbies"
        loadingText="Loading"
        successText="Done"
        onClick={updateUserHobbies}
        color="blue"
      />
    </Box>
  );
}

export default FavHobbies;
