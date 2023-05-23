// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';
import { Grid } from '@mui/material';

const genres = [
  'Fiction',
  'Non-fiction',
  'Mystery/Thriller',
  'Romance',
  'Science Fiction',
  'Fantasy',
  'Young Adult',
  'Historical Fiction',
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
  'Historical',
  'Science',
  "Children's",
  'Travel',
  'Cooking',
  'Graphic Novel',
];

function FavGenres() {
  const [checkedGenres, setCheckedGenres] = useState<string[]>([]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const genre = event.target.name;
    if (event.target.checked) {
      setCheckedGenres((prevState) => [...prevState, genre]);
    } else {
      setCheckedGenres((prevState) => prevState.filter((item) => item !== genre));
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Grid container spacing={2} justifyContent="center">
        {[0, 1, 2, 3, 4].map((column) => (
          <Grid key={column} item xs={12} sm={6} md={4} lg={3}>
            <FormControl component="fieldset" variant="standard">
              <FormGroup>
                {genres.slice(column * 5, column * 5 + 5).map((genre) => (
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
    </Box>
  );
}

export default FavGenres;
