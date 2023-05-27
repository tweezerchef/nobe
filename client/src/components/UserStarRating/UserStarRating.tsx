import React, { useContext } from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import axios from 'axios';
import { Tooltip } from '@material-ui/core';
import UserContext from '../../hooks/Context';

interface UserStarRatingProps {
  book: string;
  id: string;
  userRating: number;
  setUserRating: (value: number) => void;
}

function UserStarRating({
  book, id, userRating, setUserRating,
}: UserStarRatingProps) {
  const userContext = useContext(UserContext);
  const user = userContext?.user;
  const setUser = userContext?.setUser;

  // eslint-disable-next-line react/destructuring-assignment

  const [value, setValue] = React.useState<number | null>(userRating);

  const handleRatingChange = (event: React.ChangeEvent<{}>, newValue: number | null) => {
    if (newValue !== null) {
      axios.post('/review/starReview', { rating: newValue, book, id })
        .catch((error) => {
          console.error('Failed to update rating:', error);
        });
      setUserRating(newValue);
      setValue(newValue);
    }
  };

  return (
    <Tooltip title="your rating" placement="top-end">

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center', // Center the content horizontally
          justifyContent: 'center', // Center the content vertically
          size: 'lg',
        }}
      >
        <Rating
          name="simple-controlled"
          value={userRating}
          onChange={handleRatingChange}
        />

      </Box>
    </Tooltip>

  );
}

export default UserStarRating;
