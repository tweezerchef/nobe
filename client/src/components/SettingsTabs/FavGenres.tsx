/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useState, useEffect, useContext } from 'react';
import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';
import { Grid } from '@mui/material';
import axios from 'axios';
import ReactiveButton from 'reactive-button';
import UserContext from '../../hooks/Context';

const genres = [
  'Fiction',
  'Non-fiction',
  'Mystery/Thriller',
  'Romance',
  'Science Fiction',
  'Fantasy',
  'Young Adult',
  'Biography',
  'Autobiography',
  'Horror',
  'Self-help',
  'Personal Development',
  'Poetry',
  'Drama',
  'Crime',
  'Comedy',
  'Adventure',
  'Action',
  'Historical Fiction',
  'Historical',
  'Science',
  "Children's",
  'Travel',
  'Cooking',
  'Graphic Novel',
  'Business',
  'Health',
  'Sports',
];

function FavGenres() {
  const userContext = useContext(UserContext);
  const user = userContext?.user;
  const id = user?.id;

  const [checkedGenres, setCheckedGenres] = useState<string[]>([]);
  const [buttonState, setButtonState] = useState('idle');

  useEffect(() => {
    const fetchUserGenres = async () => {
      try {
        const response = await axios.get(`/user-settings/${id}/genres`);
        console.log(response, 56);
        const userGenres = response.data.UserGenre;
        const genresArray = userGenres.map((obj: { genre: any; }) => obj.genre);
        console.log(genresArray);
        setCheckedGenres(genresArray || []);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserGenres();
  }, []);

  const updateUserGenres = async () => {
    setButtonState('loading');
    try {
      const res = await axios.put(`/user-settings/${id}/genres`, {
        checkedGenres,
      });
      // console.log(res);
      setTimeout(() => {
        setButtonState('success');
      }, 2000);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const genre = event.target.name;
    if (event.target.checked) {
      setCheckedGenres((prevState) => [...prevState, genre]);
    } else {
      setCheckedGenres((prevState) => prevState.filter((item) => item !== genre));
    }
  };

  return (
    <Box sx={{
      height: '100vh', width: '75%', ml: 25,
    }}
    >
      <Box>
        <h1> Select Your Favorite Genres! </h1>
      </Box>
      <Grid container spacing={25} justifyContent="center">
        {[0, 1, 2, 3].map((column) => (
          <Grid key={column} item xs={12} sm={6} md={4} lg={3}>
            <FormControl component="fieldset" variant="standard">
              <FormGroup>
                {genres.slice(column * 7, column * 7 + 7).map((genre) => (
                  <FormControlLabel
                    key={genre}
                    control={(
                      <Checkbox
                        checked={checkedGenres.includes(genre)}
                        onChange={handleChange}
                        name={genre}
                      />
                    )}
                    label={genre}
                  />
                ))}
              </FormGroup>
            </FormControl>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ mt: 5, width: '50%' }}>
        <ReactiveButton
          rounded
          size="medium"
          buttonState={buttonState}
          idleText="Update Your Favorite Genres"
          loadingText="Updating..."
          successText="Updated!"
          onClick={updateUserGenres}
          color="blue"
        />
      </Box>
    </Box>
  );
}

export default FavGenres;
