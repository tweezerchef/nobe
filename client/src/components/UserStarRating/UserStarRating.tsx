import React, { useContext } from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import UserContext from '../../hooks/Context';

function UserStarRating(props: any) {
  const userContext = useContext(UserContext);
  const user = userContext?.user;
  const setUser = userContext?.setUser;
  const { book, id } = props;

  // eslint-disable-next-line react/destructuring-assignment
  const rating = props.value;

  const [value, setValue] = React.useState<number | null>(rating);

  const handleRatingChange = (event: React.ChangeEvent<{}>, newValue: number | null) => {
    axios.post('/review', { rating: newValue, book, id })
      .catch((error) => {
        console.error('Failed to update rating:', error);
      });

    setValue(newValue);
  };

  return (
    <Box
      sx={{
        '& > legend': { mt: 2 },
      }}
    >
      <Typography sx={{ fontSize: 'md' }} component="legend">Your Rating</Typography>
      <Rating
        name="simple-controlled"
        value={value}
        onChange={handleRatingChange}
      />
    </Box>
  );
}

export default UserStarRating;
